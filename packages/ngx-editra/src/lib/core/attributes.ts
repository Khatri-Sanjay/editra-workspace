import type { Node, Mark } from 'prosemirror-model';
/** ProseMirror's upstream attributes are untyped; narrow them at this boundary. */
export function attributes(node: Node | Mark): Readonly<Record<string, unknown>> {
	return node.attrs as Readonly<Record<string, unknown>>;
}
export function stringAttribute(node: Node | Mark, key: string): string {
	const value = attributes(node)[key];
	return typeof value === 'string' ? value : '';
}
