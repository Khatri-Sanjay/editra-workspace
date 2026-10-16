import { TableView } from 'prosemirror-tables';
import type { Node } from 'prosemirror-model';
import { attributes } from './attributes';
import { dimension } from './security';

/** Constructed exclusively by the browser column-resizing plugin. */
export class EditraTableView extends TableView {
	constructor(node: Node, minimum: number) {
		super(node, minimum);
		this.applyAppearance(node);
	}
	override update(node: Node): boolean {
		const updated = super.update(node);
		if (updated) this.applyAppearance(node);
		return updated;
	}
	private applyAppearance(node: Node): void {
		const attrs = attributes(node);
		if (!this.table.style.width || this.table.style.width.endsWith('%'))
			this.table.style.width = `${dimension(attrs['width'], 100, 100)}%`;
		this.table.style.borderWidth = `${Math.max(1, dimension(attrs['borderWidth'], 1, 8))}px`;
		this.table.style.borderColor = '#b8c2d0';
		this.table.style.borderStyle = ['solid', 'dashed', 'dotted', 'double', 'none'].includes(
			String(attrs['border']),
		)
			? String(attrs['border'])
			: 'solid';
	}
}
