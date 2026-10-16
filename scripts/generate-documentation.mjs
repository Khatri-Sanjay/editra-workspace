import { readFile, writeFile, mkdir } from 'node:fs/promises';
import MarkdownIt from 'markdown-it';
import { format, resolveConfig } from 'prettier';

// Only repository-authored Markdown is compiled; raw HTML stays disabled.
const markdown = new MarkdownIt({ html: false });
const pages = [
	['features', 'Feature overview', 'Start here', 'FEATURES'],
	['installation', 'Installation', 'Start here', 'INSTALLATION'],
	['quick-start', 'Quick start', 'Start here', 'QUICK_START'],
	['configuration', 'Configuration', 'Build with Editra', 'CONFIGURATION'],
	['angular-forms', 'Angular Forms', 'Build with Editra', 'ANGULAR_FORMS'],
	['content', 'Load and save content', 'Build with Editra', 'CONTENT'],
	['viewer', 'Display saved content', 'Build with Editra', 'VIEWER'],
	['events', 'Events and lifecycle', 'Build with Editra', 'EVENTS'],
	['toolbar', 'Toolbar', 'Build with Editra', 'TOOLBAR'],
	['theming', 'Theming', 'Build with Editra', 'THEMING'],
	['formatting', 'Text formatting', 'Editor features', 'FORMATTING'],
	['links', 'Links', 'Editor features', 'LINKS'],
	['images', 'Images', 'Editor features', 'IMAGES'],
	['videos', 'Videos', 'Editor features', 'VIDEOS'],
	['tables', 'Tables', 'Editor features', 'TABLES'],
	['layout', 'Columns and lines', 'Editor features', 'LAYOUT'],
	['code-blocks', 'Code blocks', 'Editor features', 'CODE_BLOCKS'],
	['editing-tools', 'Editing tools', 'Editor features', 'EDITING_TOOLS'],
	['markdown', 'Markdown conversion', 'Editor features', 'MARKDOWN'],
	['accessibility', 'Keyboard and accessibility', 'Reference', 'ACCESSIBILITY'],
	['troubleshooting', 'Troubleshooting', 'Reference', 'TROUBLESHOOTING'],
	['plugins', 'Extensions', 'Reference', 'PLUGINS'],
	['api', 'Public API', 'Reference', 'API'],
	['ssr', 'SSR & hydration', 'Reference', 'SSR'],
	['security', 'Security', 'Reference', 'SECURITY'],
	['compatibility', 'Compatibility', 'Reference', 'COMPATIBILITY'],
	['releasing', 'Release process', 'Project', 'RELEASING'],
];
const sources = [
	...pages.map(([slug, title, group, file]) => ({
		slug,
		title,
		group,
		source: `docs/${file}.md`,
	})),
	{ slug: 'project-status', title: 'Project status', group: 'Project', source: 'PROGRESS.md' },
	{ slug: 'contributing', title: 'Contributing', group: 'Project', source: 'CONTRIBUTING.md' },
	{ slug: 'changelog', title: 'Changelog', group: 'Project', source: 'CHANGELOG.md' },
];
const slugs = new Map(sources.map(({ slug, source }) => [source.split('/').pop(), slug]));
const documents = [];
for (const source of sources) {
	const text = await readFile(source.source, 'utf8');
	const tokens = markdown.parse(text, {});
	const introduction = tokens.find(
		(token, index) => token.type === 'inline' && tokens[index - 1]?.type === 'paragraph_open',
	);
	const summary = introduction?.children?.map((token) => token.content).join('') ?? source.title;
	const readingMinutes = Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
	const headings = [];
	const used = new Map();
	for (let index = 0; index < tokens.length; index++) {
		const token = tokens[index];
		if (token.type === 'heading_open') {
			const label = tokens[index + 1]?.content ?? source.title;
			const base = label
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '');
			const count = used.get(base) ?? 0;
			used.set(base, count + 1);
			const id = count ? `${base}-${count}` : base;
			token.attrSet('id', id);
			if (token.tag !== 'h1') headings.push({ id, label });
		}
		for (const child of token.children ?? []) {
			if (child.type !== 'link_open') continue;
			const href = child.attrGet('href');
			const filename = href?.split('/').pop()?.split('#')[0];
			const slug = slugs.get(filename);
			if (slug)
				child.attrSet(
					'href',
					`/guides/${slug}${href.includes('#') ? '#' + href.split('#')[1] : ''}`,
				);
		}
	}
	const blocks = [];
	for (let index = 0; index < tokens.length; index++) {
		const start = index;
		const token = tokens[start];
		if (token.nesting === 1) {
			while (index + 1 < tokens.length) {
				index++;
				if (tokens[index].nesting === -1 && tokens[index].level === token.level) break;
			}
		}
		blocks.push({
			...(['fence', 'code_block'].includes(token.type)
				? { code: token.content, language: token.info.trim().split(/\s+/)[0] || 'text' }
				: {}),
			html: markdown.renderer.render(tokens.slice(start, index + 1), markdown.options, {}),
			id: token.type === 'heading_open' ? token.attrGet('id') : '',
			kind:
				token.type === 'table_open'
					? 'table'
					: ['fence', 'code_block'].includes(token.type)
						? 'code'
						: 'content',
		});
	}
	documents.push({
		...source,
		summary,
		readingMinutes,
		html: markdown.renderer.render(tokens, markdown.options, {}),
		headings,
		blocks,
		search: text.replace(/[`#*]/g, '').toLowerCase(),
	});
}
await mkdir('apps/documentation/src/app/content/generated', { recursive: true });
const generatedPath = 'apps/documentation/src/app/content/generated/guides.ts';
await writeFile(
	generatedPath,
	await format(
		`// Generated from repository Markdown by scripts/generate-documentation.mjs.\nimport type { Guide } from '../../shared/models/guide';\nexport const guides: readonly Guide[] = ${JSON.stringify(documents, null, '\t')};\n`,
		{ ...(await resolveConfig(generatedPath, { editorconfig: true })), parser: 'typescript' },
	),
);
const navigationPath = 'apps/documentation/src/app/content/generated/navigation.ts';
const navigation = documents.map(({ slug, title, group, summary, search }) => ({
	slug,
	title,
	group,
	summary,
	search,
}));
await writeFile(
	navigationPath,
	await format(
		`// Generated navigation/search index; full articles load with the guide route.\nimport type { GuideNavigation } from '../../shared/models/guide';\nexport const guideNavigation: readonly GuideNavigation[] = ${JSON.stringify(navigation)};\n`,
		{ ...(await resolveConfig(navigationPath, { editorconfig: true })), parser: 'typescript' },
	),
);
await writeFile(
	'apps/documentation/prerender-routes.txt',
	['/', '/examples', ...documents.map(({ slug }) => `/guides/${slug}`)].join('\n') + '\n',
);
console.log(`Generated ${documents.length} documentation pages and prerender routes.`);
