import type { Node } from 'prosemirror-model';
import type { Command, EditorState, Transaction } from 'prosemirror-state';
import { TableMap, findTable } from 'prosemirror-tables';
import { closeHistory } from 'prosemirror-history';
import { attributes } from './attributes';

function bounded(value: number, minimum: number, maximum: number): number {
	return Math.max(minimum, Math.min(maximum, Math.round(value)));
}

/** Resize one physical row without changing spans, content, or selection. */
export function resizeTableRow(
	state: EditorState,
	tablePosition: number,
	rowIndex: number,
	height: number,
): Transaction | null {
	if (
		!Number.isInteger(tablePosition) ||
		tablePosition < 0 ||
		tablePosition >= state.doc.content.size
	)
		return null;
	const table = state.doc.nodeAt(tablePosition);
	if (
		!table ||
		table.type.spec['tableRole'] !== 'table' ||
		!Number.isFinite(height) ||
		!Number.isInteger(rowIndex) ||
		rowIndex < 0 ||
		rowIndex >= table.childCount
	)
		return null;
	let offset = tablePosition + 1;
	for (let index = 0; index < rowIndex; index++) offset += table.child(index).nodeSize;
	const row = table.child(rowIndex);
	const value = bounded(height, 24, 2000);
	if (attributes(row)['height'] === value) return null;
	return closeHistory(
		state.tr.setNodeMarkup(offset, undefined, { ...attributes(row), height: value }),
	).setMeta('editra-table-resize', 'row');
}

/** Apply logical column widths to every unique cell, including merged/spanning cells. */
export function resizeTableColumns(
	state: EditorState,
	tablePosition: number,
	widths: readonly number[],
): Transaction | null {
	if (
		!Number.isInteger(tablePosition) ||
		tablePosition < 0 ||
		tablePosition >= state.doc.content.size
	)
		return null;
	const table = state.doc.nodeAt(tablePosition);
	if (!table || table.type.spec['tableRole'] !== 'table') return null;
	const map = TableMap.get(table);
	if (widths.length !== map.width || widths.some((width) => !Number.isFinite(width))) return null;
	const sizes = widths.map((width) => bounded(width, 48, 4096));
	const tr = state.tr;
	for (const offset of new Set(map.map)) {
		const cell = table.nodeAt(offset);
		if (!cell) continue;
		const start = map.map.indexOf(offset) % map.width;
		const colspan = Number(attributes(cell)['colspan']) || 1;
		const colwidth = sizes.slice(start, start + colspan);
		const previous = attributes(cell)['colwidth'];
		if (
			Array.isArray(previous) &&
			previous.length === colwidth.length &&
			previous.every((value: unknown, index: number) => value === colwidth[index])
		)
			continue;
		tr.setNodeMarkup(tablePosition + 1 + offset, undefined, { ...attributes(cell), colwidth });
	}
	return tr.docChanged ? closeHistory(tr).setMeta('editra-table-resize', 'column') : null;
}

function clearWidths(state: EditorState, table: Node, position: number): Transaction {
	const tr = state.tr;
	table.descendants((node, offset) => {
		if (
			node.type.spec['tableRole'] === 'cell' ||
			node.type.spec['tableRole'] === 'header_cell'
		) {
			tr.setNodeMarkup(position + 1 + offset, undefined, {
				...attributes(node),
				colwidth: null,
			});
			return false;
		}
		return;
	});
	return tr.setNodeMarkup(position, undefined, { ...attributes(table), width: 100 });
}

/** Remove explicit column widths and fit the table to its editing container. */
export function setTableWidthPercent(value: number): Command {
	return (state, dispatch) => {
		const table = findTable(state.selection.$from);
		if (!table || !Number.isFinite(value)) return false;
		let needsChange = Number(attributes(table.node)['width']) !== bounded(value, 10, 100);
		table.node.descendants((node) => {
			if (
				node.type.spec['tableRole'] === 'cell' ||
				node.type.spec['tableRole'] === 'header_cell'
			) {
				if (Array.isArray(attributes(node)['colwidth'])) needsChange = true;
				return false;
			}
			return;
		});
		if (!needsChange) return false;
		if (dispatch)
			dispatch(
				closeHistory(
					clearWidths(state, table.node, table.pos).setNodeMarkup(table.pos, undefined, {
						...attributes(table.node),
						width: bounded(value, 10, 100),
					}),
				),
			);
		return true;
	};
}
export const fitTableToPage: Command = setTableWidthPercent(100);

/** Equalize logical columns while retaining the current rendered table width where available. */
export const distributeTableColumns: Command = (state, dispatch, view) => {
	const table = findTable(state.selection.$from);
	if (!table) return false;
	if (dispatch) {
		const map = TableMap.get(table.node);
		let width = map.width * 120;
		if (view) {
			const dom = view.nodeDOM(table.pos);
			if (dom instanceof Element)
				width =
					(dom.matches('table')
						? dom
						: dom.querySelector('table')
					)?.getBoundingClientRect().width || width;
		}
		const tr = resizeTableColumns(
			state,
			table.pos,
			Array.from({ length: map.width }, () => width / map.width),
		);
		if (tr) dispatch(tr);
	}
	return true;
};

/** Restore content-driven row heights. */
export const resetTableRowHeights: Command = (state, dispatch) => {
	const table = findTable(state.selection.$from);
	if (!table) return false;
	let changed = false;
	table.node.forEach((row) => {
		if (Number(attributes(row)['height']) > 0) changed = true;
	});
	if (!changed) return false;
	if (dispatch) {
		const tr = state.tr;
		table.node.forEach((row, offset) =>
			tr.setNodeMarkup(table.pos + 1 + offset, undefined, { ...attributes(row), height: 0 }),
		);
		dispatch(closeHistory(tr));
	}
	return true;
};
