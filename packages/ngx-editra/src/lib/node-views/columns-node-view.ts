import { TextSelection } from 'prosemirror-state';
import type { Node } from 'prosemirror-model';
import type { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';
import { closeHistory } from 'prosemirror-history';

/** Editable content stays in contentDOM; the divider is editor-only UI. */
export class ColumnsNodeView implements NodeView {
	readonly dom: HTMLDivElement;
	readonly contentDOM: HTMLDivElement;
	private readonly handle: HTMLButtonElement;
	private readonly events = new AbortController();
	private readonly observer: ResizeObserver;
	private gesture: AbortController | undefined;
	private frame: number | undefined;
	private pointerId: number | undefined;
	private observedChildren: HTMLElement[] = [];
	constructor(
		private node: Node,
		private readonly view: EditorView,
		private readonly getPos: () => number | undefined,
	) {
		const doc = view.dom.ownerDocument;
		this.dom = doc.createElement('div');
		this.dom.className = 'editra-columns-view';
		this.contentDOM = doc.createElement('div');
		this.contentDOM.setAttribute('data-editra-columns', 'true');
		this.contentDOM.style.cssText =
			'display:flex;flex-wrap:wrap;gap:16px;align-items:stretch;clear:both;margin:16px 0';
		this.handle = doc.createElement('button');
		this.handle.type = 'button';
		this.handle.hidden = true;
		this.handle.contentEditable = 'false';
		this.handle.className = 'editra-column-resize';
		this.handle.setAttribute('aria-label', 'Resize content columns');
		this.handle.title =
			'Drag to resize columns. Double-click or press Home to make them equal.';
		this.dom.append(this.contentDOM, this.handle);
		const options = { signal: this.events.signal };
		this.contentDOM.addEventListener(
			'pointerdown',
			(event) => {
				if (
					!this.view.editable ||
					event.button !== 0 ||
					!(event.target instanceof HTMLElement) ||
					event.target.parentElement !== this.contentDOM ||
					!event.target.hasAttribute('data-editra-column')
				)
					return;
				const last = event.target.lastElementChild;
				if (last && event.clientY <= last.getBoundingClientRect().bottom + 2) return;
				const position = this.view.state.doc.resolve(this.view.posAtDOM(event.target, 0));
				let depth = position.depth;
				while (depth > 0 && position.node(depth).type.name !== 'content_column') depth--;
				if (!depth) return;
				const column = position.node(depth),
					end = position.end(depth),
					tr = this.view.state.tr;
				const paragraph = this.view.state.schema.nodes['paragraph'];
				if (!paragraph) return;
				const reuse =
					column.lastChild?.type === paragraph && column.lastChild.content.size === 0;
				if (!reuse) tr.insert(end, paragraph.create());
				tr.setSelection(TextSelection.create(tr.doc, reuse ? end - 1 : end + 1));
				event.preventDefault();
				event.stopPropagation();
				this.view.dispatch(tr);
				this.view.focus();
			},
			options,
		);
		this.handle.addEventListener('pointerdown', (event) => this.start(event), options);
		this.handle.addEventListener('dblclick', () => this.commit(50), options);
		this.handle.addEventListener(
			'keydown',
			(event) => {
				if (!['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return;
				event.preventDefault();
				this.commit(
					event.key === 'Home'
						? 50
						: this.weight() +
								(event.key === 'ArrowLeft' ? -1 : 1) * (event.shiftKey ? 1 : 5),
				);
			},
			options,
		);
		this.observer = new ResizeObserver(() => this.position());
		this.observer.observe(this.contentDOM);
	}
	private weight(): number {
		return Number(this.node.child(0).attrs['weight']) || 50;
	}
	private position(): void {
		const left = this.contentDOM.children[0] as HTMLElement | undefined;
		const right = this.contentDOM.children[1] as HTMLElement | undefined;
		if (!left || !right || !this.dom.isConnected) {
			this.handle.hidden = true;
			return;
		}
		for (const old of this.observedChildren)
			if (old !== left && old !== right) this.observer.unobserve(old);
		this.observer.observe(left);
		this.observer.observe(right);
		this.observedChildren = [left, right];
		const a = left.getBoundingClientRect(),
			b = right.getBoundingClientRect(),
			origin = this.dom.getBoundingClientRect();
		this.handle.hidden = !a.width || !b.width || Math.abs(a.top - b.top) > 2;
		this.handle.disabled = !this.view.editable;
		this.handle.style.left = a.right - origin.left + 'px';
		this.handle.style.top = a.top - origin.top + 'px';
		this.handle.style.height = Math.min(80, Math.max(40, Math.max(a.height, b.height))) + 'px';
		this.handle.setAttribute(
			'aria-description',
			`Left column ${this.weight()} percent. Arrow keys resize; Home resets.`,
		);
	}
	private preview(weight: number): void {
		this.contentDOM.style.setProperty('--editra-preview-left', String(weight));
		this.contentDOM.classList.add('editra-columns-preview');
		this.position();
	}
	private start(event: PointerEvent): void {
		if (!this.view.editable || event.button !== 0) return;
		event.preventDefault();
		this.cancel();
		const doc = this.view.state.doc,
			initial = this.weight();
		const available = this.contentDOM.clientWidth - 16;
		if (available <= 0) return;
		const left = this.contentDOM.children[0]?.getBoundingClientRect().width;
		if (left === undefined) return;
		const startX = event.clientX;
		let next = initial;
		const gesture = (this.gesture = new AbortController());
		this.pointerId = event.pointerId;
		this.dom.classList.add('editra-columns-dragging');
		this.handle.setPointerCapture(event.pointerId);
		const window = this.dom.ownerDocument.defaultView;
		window?.addEventListener(
			'pointermove',
			(move) => {
				if (move.pointerId !== event.pointerId) return;
				if (!this.view.editable || this.view.state.doc !== doc) {
					this.cancel();
					return;
				}
				next = Math.max(
					5,
					Math.min(95, Math.round(((left + move.clientX - startX) / available) * 100)),
				);
				this.preview(next);
			},
			{ signal: gesture.signal },
		);
		window?.addEventListener(
			'pointerup',
			(up) => {
				if (up.pointerId !== event.pointerId) return;
				this.cancel();
				if (this.view.state.doc === doc && next !== initial) this.commit(next);
			},
			{ signal: gesture.signal },
		);
		window?.addEventListener('pointercancel', () => this.cancel(), { signal: gesture.signal });
		window?.addEventListener('blur', () => this.cancel(), { signal: gesture.signal });
		window?.addEventListener(
			'keydown',
			(key) => {
				if (key.key === 'Escape') {
					key.preventDefault();
					this.cancel();
				}
			},
			{ signal: gesture.signal },
		);
	}
	private cancel(): void {
		this.gesture?.abort();
		this.gesture = undefined;
		if (this.pointerId !== undefined && this.handle.hasPointerCapture(this.pointerId))
			this.handle.releasePointerCapture(this.pointerId);
		this.pointerId = undefined;
		this.dom.classList.remove('editra-columns-dragging');
		this.contentDOM.classList.remove('editra-columns-preview');
		this.contentDOM.style.removeProperty('--editra-preview-left');
		this.position();
	}
	private commit(weight: number): void {
		const pos = this.getPos();
		if (!this.view.editable || pos === undefined) return;
		weight = Math.max(5, Math.min(95, Math.round(weight)));
		if (weight === this.weight()) return;
		const tr = closeHistory(this.view.state.tr);
		tr.setNodeMarkup(pos + 1, undefined, { ...this.node.child(0).attrs, weight });
		tr.setNodeMarkup(pos + 1 + this.node.child(0).nodeSize, undefined, {
			...this.node.child(1).attrs,
			weight: 100 - weight,
		});
		this.view.dispatch(tr);
		this.view.dispatch(closeHistory(this.view.state.tr).setMeta('addToHistory', false));
	}
	update(node: Node): boolean {
		if (node.type !== this.node.type) return false;
		this.cancel();
		this.node = node;
		this.handle.disabled = !this.view.editable;
		const window = this.dom.ownerDocument.defaultView;
		if (this.frame !== undefined) window?.cancelAnimationFrame(this.frame);
		this.frame = window?.requestAnimationFrame(() => {
			this.frame = undefined;
			this.position();
		});
		return true;
	}
	stopEvent(event: Event): boolean {
		return event.target === this.handle;
	}
	ignoreMutation(mutation: ViewMutationRecord): boolean {
		return (
			this.handle.contains(mutation.target) ||
			(mutation.type === 'attributes' &&
				(mutation.target === this.dom || mutation.target === this.contentDOM))
		);
	}
	destroy(): void {
		this.cancel();
		if (this.frame !== undefined)
			this.dom.ownerDocument.defaultView?.cancelAnimationFrame(this.frame);
		this.events.abort();
		this.observer.disconnect();
	}
}
