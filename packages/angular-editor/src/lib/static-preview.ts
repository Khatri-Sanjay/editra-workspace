import { parseFragment, serialize } from 'parse5';
import type { DefaultTreeAdapterTypes } from 'parse5';

// Angular still sanitizes this preview. Only portable display markup is projected;
// editor-specific styles, data attributes and embedded players stay in the document.
const tags = new Set(
	'p div span h1 h2 h3 h4 h5 h6 ul ol li blockquote pre code strong em b i u s sub sup br hr table thead tbody tfoot tr td th caption img a figure figcaption'.split(
		' ',
	),
);
const attributes = new Set(
	'href src alt title width height colspan rowspan scope start type'.split(' '),
);
export function staticPreview(html: string): string {
	const fragment = parseFragment(html);
	const visit = (parent: DefaultTreeAdapterTypes.ParentNode): void => {
		parent.childNodes = parent.childNodes.flatMap((child) => {
			if (child.nodeName === '#text') return [child];
			if (!('tagName' in child)) return [];
			if (['script', 'style', 'iframe', 'video', 'audio', 'object'].includes(child.tagName))
				return [];
			visit(child);
			if (!tags.has(child.tagName)) {
				for (const nested of child.childNodes) nested.parentNode = parent;
				return child.childNodes;
			}
			child.attrs = child.attrs.filter((attr) => attributes.has(attr.name));
			return [child];
		});
	};
	visit(fragment);
	return serialize(fragment);
}
