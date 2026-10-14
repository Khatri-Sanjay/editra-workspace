import { Plugin } from 'prosemirror-state';
import type { Schema } from 'prosemirror-model';
import { safeUrl } from './security';
import type { EditraSecurityConfig } from './types';

/** URL recognition proposes marks; the centralized policy decides which URLs are permitted. */
export function automaticLinks(schema: Schema, security: EditraSecurityConfig = {}): Plugin {
	return new Plugin({
		appendTransaction(transactions, _old, state) {
			const link = schema.marks['link'];
			if (
				!link ||
				!transactions.some((tr) => tr.docChanged) ||
				transactions.some((tr) => tr.getMeta('editra-auto-link') === true)
			)
				return null;
			const tr = state.tr;
			state.doc.descendants((node, pos) => {
				if (!node.isText || !node.text || link.isInSet(node.marks)) return;
				for (const match of node.text.matchAll(/https?:\/\/[^\s<>]+/gu)) {
					const candidate = match[0].replace(/[.,;!?)]+$/u, ''),
						href = safeUrl(candidate, security, true);
					if (href)
						tr.addMark(
							pos + match.index,
							pos + match.index + candidate.length,
							link.create({ href, newTab: true }),
						);
				}
			});
			return tr.docChanged ? tr.setMeta('editra-auto-link', true) : null;
		},
	});
}
