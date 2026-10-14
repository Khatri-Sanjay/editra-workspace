import type { NodeView, EditorView } from 'prosemirror-view';
import { DOMSerializer } from 'prosemirror-model';
import type { Node } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { closeHistory } from 'prosemirror-history';
import type { EditraExtension } from 'ngx-editra/core';
import { attributes, dimension } from 'ngx-editra/core';

interface ResizeGesture {
	readonly doc: Node;
	readonly startX: number;
	readonly startY: number;
	readonly width: number;
	readonly height: number;
	readonly pointerId: number;
	readonly events: AbortController;
	readonly shield: HTMLDivElement;
	nextWidth: number;
	nextHeight: number;
	moved: boolean;
}

/** Browser-only node view. DOM previews become one transaction on release. */
class MediaNodeView implements NodeView {
	readonly dom: HTMLElement;
	private readonly controller = new AbortController();
	private renderController = new AbortController();
	private current: Node;
	private readonly handle: HTMLButtonElement;
	private readonly observer: ResizeObserver;
	private gesture: ResizeGesture | undefined;
	constructor(
		node: Node,
		private readonly view: EditorView,
		private readonly getPos: () => number | undefined,
	) {
		this.current = node;
		const document = view.dom.ownerDocument;
		this.dom = document.createElement('div');
		this.dom.className = 'editra-media-view';
		this.dom.contentEditable = 'false';
		this.handle = document.createElement('button');
		this.handle.type = 'button';
		this.handle.className = 'editra-resize';
		this.handle.setAttribute('aria-label', 'Resize ' + node.type.name + '; use arrow keys');
		this.dom.tabIndex = 0;
		this.dom.setAttribute('role', 'group');
		this.dom.setAttribute(
			'aria-label',
			node.type.name + '; click to select and drag the corner to resize',
		);
		const options = { signal: this.controller.signal };
		this.dom.addEventListener(
			'keydown',
			(event) => {
				if (event.target === this.dom && (event.key === 'Enter' || event.key === ' ')) {
					event.preventDefault();
					this.select();
				}
			},
			options,
		);
		this.dom.addEventListener(
			'pointerdown',
			(event) => {
				if (event.target !== this.handle) this.select();
			},
			options,
		);
		this.handle.addEventListener(
			'keydown',
			(event) => {
				if (
					!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key) ||
					!this.view.editable
				)
					return;
				event.preventDefault();
				const rect = this.media()?.getBoundingClientRect();
				if (!rect) return;
				const step = event.shiftKey ? 1 : 10;
				const delta = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -step : step;
				const proportional = attributes(this.current)['aspect'] !== false;
				const width = Math.min(
					this.maximumWidth(),
					Math.max(
						40,
						rect.width +
							(proportional || event.key === 'ArrowLeft' || event.key === 'ArrowRight'
								? delta
								: 0),
					),
				);
				const height = proportional
					? (rect.height * width) / rect.width
					: Math.max(
							40,
							Math.min(
								4096,
								rect.height +
									(event.key === 'ArrowUp' || event.key === 'ArrowDown'
										? delta
										: 0),
							),
						);
				this.resize(width, height);
			},
			options,
		);
		this.handle.addEventListener('pointerdown', (event) => this.start(event), options);
		this.observer = new ResizeObserver(() => this.positionControls());
		this.observer.observe(this.dom);
		this.render();
	}
	private media(): HTMLElement | null {
		return this.dom.querySelector<HTMLElement>('img,video,iframe');
	}
	private select(): void {
		if (!this.view.editable) return;
		const position = this.getPos();
		if (position !== undefined)
			this.view.dispatch(
				this.view.state.tr.setSelection(
					NodeSelection.create(this.view.state.doc, position),
				),
			);
	}
	private maximumWidth(): number {
		const parent = this.dom.parentElement;
		if (!parent) return 4096;
		const style = parent.ownerDocument.defaultView?.getComputedStyle(parent);
		const width =
			parent.clientWidth -
			(parseFloat(style?.paddingLeft ?? '0') || 0) -
			(parseFloat(style?.paddingRight ?? '0') || 0);
		return Math.max(40, Math.min(4096, width || 4096));
	}
	private start(event: PointerEvent): void {
		if (!this.view.editable || event.button !== 0) return;
		const rect = this.media()?.getBoundingClientRect();
		if (!rect || !rect.width || !rect.height) return;
		event.preventDefault();
		event.stopPropagation();
		this.cancel();
		this.select();
		this.handle.focus({ preventScroll: true });
		this.handle.setPointerCapture(event.pointerId);
		const events = new AbortController();
		// Keep iframe hit-testing from taking the pointer into another browsing context.
		const shield = this.view.dom.ownerDocument.createElement('div');
		shield.setAttribute('aria-hidden', 'true');
		shield.style.cssText =
			'position:fixed;inset:0;z-index:2147483647;cursor:nwse-resize;touch-action:none';
		this.view.dom.ownerDocument.body.append(shield);
		this.gesture = {
			doc: this.view.state.doc,
			startX: event.clientX,
			startY: event.clientY,
			width: rect.width,
			height: rect.height,
			pointerId: event.pointerId,
			events,
			shield,
			nextWidth: rect.width,
			nextHeight: rect.height,
			moved: false,
		};
		const window = this.view.dom.ownerDocument.defaultView;
		window?.addEventListener('pointermove', (next) => this.move(next), {
			signal: events.signal,
		});
		window?.addEventListener(
			'pointerup',
			(next) => {
				const gesture = this.gesture;
				if (!gesture || next.pointerId !== gesture.pointerId) return;
				this.cancel();
				if (gesture.moved && this.view.editable && this.view.state.doc === gesture.doc)
					this.resize(gesture.nextWidth, gesture.nextHeight);
			},
			{ signal: events.signal },
		);
		window?.addEventListener('pointercancel', () => this.cancel(), { signal: events.signal });
		window?.addEventListener('blur', () => this.cancel(), { signal: events.signal });
		window?.addEventListener(
			'keydown',
			(key) => {
				if (key.key !== 'Escape') return;
				key.preventDefault();
				key.stopPropagation();
				this.cancel();
			},
			{ capture: true, signal: events.signal },
		);
	}
	private move(event: PointerEvent): void {
		const gesture = this.gesture;
		if (!gesture || event.pointerId !== gesture.pointerId) return;
		if (!this.view.editable || this.view.state.doc !== gesture.doc) {
			this.cancel();
			return;
		}
		const dx = event.clientX - gesture.startX,
			dy = event.clientY - gesture.startY;
		const ratio = gesture.width / gesture.height;
		const proportional = attributes(this.current)['aspect'] !== false;
		const delta = proportional && Math.abs(dy * ratio) > Math.abs(dx) ? dy * ratio : dx;
		gesture.nextWidth = Math.max(40, Math.min(this.maximumWidth(), gesture.width + delta));
		gesture.nextHeight = proportional
			? gesture.nextWidth / ratio
			: Math.max(40, Math.min(4096, gesture.height + dy));
		gesture.nextHeight = Math.min(4096, gesture.nextHeight);
		gesture.moved =
			Math.abs(gesture.nextWidth - gesture.width) >= 1 ||
			Math.abs(gesture.nextHeight - gesture.height) >= 1;
		const media = this.media(),
			figure = this.dom.firstElementChild;
		if (media && figure instanceof HTMLElement) {
			figure.style.width = gesture.nextWidth + 'px';
			media.style.width = '100%';
			media.style.height = gesture.nextHeight + 'px';
			this.positionControls();
		}
	}
	private resize(width: number, height: number): void {
		const position = this.getPos();
		if (position === undefined || !this.view.editable) return;
		const a = attributes(this.current);
		const nextWidth = dimension(width),
			nextHeight = dimension(height);
		if (a['fullWidth'] !== true && a['width'] === nextWidth && a['height'] === nextHeight)
			return;
		this.view.dispatch(
			closeHistory(this.view.state.tr)
				.setNodeMarkup(position, undefined, {
					...a,
					fullWidth: false,
					width: nextWidth,
					height: nextHeight,
				})
				.scrollIntoView(),
		);
		this.view.dispatch(closeHistory(this.view.state.tr).setMeta('addToHistory', false));
	}
	private cancel(restore = true): void {
		const gesture = this.gesture;
		this.gesture = undefined;
		if (!gesture) return;
		gesture.events.abort();
		gesture.shield.remove();
		if (this.handle.hasPointerCapture(gesture.pointerId))
			this.handle.releasePointerCapture(gesture.pointerId);
		if (restore) this.render();
	}
	private positionControls(): void {
		const media = this.media(),
			figure = this.dom.firstElementChild;
		if (!media || !(figure instanceof HTMLElement)) return;
		const rect = media.getBoundingClientRect(),
			origin = figure.getBoundingClientRect();
		this.handle.style.top = Math.max(0, rect.bottom - origin.top - 28) + 'px';
		this.handle.style.left = Math.max(0, rect.right - origin.left - 28) + 'px';
	}
	private render(): void {
		const spec = this.current.type.spec.toDOM?.(this.current);
		if (!spec) return;
		const rendered = DOMSerializer.renderSpec(this.view.dom.ownerDocument, spec).dom;
		const previousFigure = this.dom.firstElementChild;
		const previousMedia = previousFigure?.querySelector('img,video,iframe');
		const nextMedia =
			rendered instanceof HTMLElement ? rendered.querySelector('img,video,iframe') : null;
		const a = attributes(this.current);
		const wrap =
			this.current.type.name === 'image' &&
			a['wrap'] === true &&
			a['fullWidth'] !== true &&
			a['align'] !== 'center';
		this.dom.style.cssFloat = wrap ? (a['align'] === 'right' ? 'right' : 'left') : 'none';
		this.dom.style.width = wrap ? 'fit-content' : '100%';
		if (
			previousFigure &&
			previousMedia &&
			nextMedia &&
			rendered instanceof HTMLElement &&
			previousMedia.tagName === nextMedia.tagName &&
			previousMedia.getAttribute('src') === nextMedia.getAttribute('src')
		) {
			this.syncAttributes(previousFigure, rendered);
			this.syncAttributes(previousMedia, nextMedia);
			const nextCaption = rendered.querySelector('figcaption'),
				oldCaption = previousFigure.querySelector('figcaption');
			if (nextCaption) {
				const caption =
					oldCaption ?? this.view.dom.ownerDocument.createElement('figcaption');
				this.syncAttributes(caption, nextCaption);
				caption.textContent = nextCaption.textContent;
				if (!oldCaption) previousFigure.append(caption);
			} else oldCaption?.remove();
		} else {
			this.observer.disconnect();
			this.observer.observe(this.dom);
			this.renderController.abort();
			this.renderController = new AbortController();
			this.dom.replaceChildren(rendered);
			if (rendered instanceof HTMLElement) rendered.append(this.handle);
			const media = this.media();
			if (media) {
				this.observer.observe(media);
				media.addEventListener(
					'error',
					() => {
						const status = this.view.dom.ownerDocument.createElement('span');
						status.setAttribute('role', 'status');
						const message =
							(this.current.type.name === 'image' ? 'Image' : 'Video') +
							' failed to load. The URL may be inaccessible or block embedding.';
						status.textContent = message;
						this.dom.append(status);
						this.view.dispatch(
							this.view.state.tr.setMeta('editra-media-error', { message }),
						);
					},
					{ once: true, signal: this.renderController.signal },
				);
			}
		}
		this.handle.disabled = !this.view.editable;
		this.dom.tabIndex = this.view.editable ? 0 : -1;
		this.positionControls();
	}
	private syncAttributes(target: Element, source: Element): void {
		for (const attr of Array.from(target.attributes))
			if (!source.hasAttribute(attr.name)) target.removeAttribute(attr.name);
		for (const attr of Array.from(source.attributes))
			if (target.getAttribute(attr.name) !== attr.value)
				target.setAttribute(attr.name, attr.value);
	}
	update(node: Node): boolean {
		if (node.type !== this.current.type) return false;
		if (this.gesture && (!this.view.editable || this.view.state.doc !== this.gesture.doc))
			this.cancel(false);
		this.current = node;
		this.render();
		return true;
	}
	selectNode(): void {
		this.dom.classList.add('ProseMirror-selectednode');
	}
	deselectNode(): void {
		this.dom.classList.remove('ProseMirror-selectednode');
	}
	stopEvent(event: Event): boolean {
		return (
			event.target === this.handle ||
			event.type === 'pointerdown' ||
			event.type === 'mousedown' ||
			(event.type === 'keydown' && event.target === this.dom)
		);
	}
	ignoreMutation(): boolean {
		return true;
	}
	destroy(): void {
		this.cancel(false);
		this.controller.abort();
		this.renderController.abort();
		this.observer.disconnect();
	}
}
export function imageExtension(): EditraExtension {
	return {
		id: 'image',
		nodeViews: { image: (node, view, getPos) => new MediaNodeView(node, view, getPos) },
	};
}
export function videoExtension(): EditraExtension {
	return {
		id: 'video',
		nodeViews: { video: (node, view, getPos) => new MediaNodeView(node, view, getPos) },
	};
}
