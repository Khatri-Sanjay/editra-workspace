import type { EditraSecurityConfig, EditraVideoProvider } from './types';

export type EditraUrlResult =
	| { readonly ok: true; readonly url: string }
	| {
			readonly ok: false;
			readonly reason: 'invalid-url' | 'unsupported-protocol' | 'credentials-not-allowed';
	  };
export function validateUrl(
	value: unknown,
	policy: EditraSecurityConfig = {},
	link = false,
): EditraUrlResult {
	if (typeof value !== 'string' || value.length > 4096 || /[\u0000-\u0020\u007f]/u.test(value))
		return { ok: false, reason: 'invalid-url' };
	try {
		const url = new URL(value);
		if (url.username || url.password) return { ok: false, reason: 'credentials-not-allowed' };
		if (
			url.protocol === 'https:' ||
			(policy.allowHttp && url.protocol === 'http:') ||
			(link && url.protocol === 'mailto:')
		)
			return { ok: true, url: url.href };
		return { ok: false, reason: 'unsupported-protocol' };
	} catch {
		return { ok: false, reason: 'invalid-url' };
	}
}
export function safeUrl(
	value: unknown,
	policy: EditraSecurityConfig = {},
	link = false,
): string | null {
	const result = validateUrl(value, policy, link);
	return result.ok ? result.url : null;
}
export function safeColor(value: unknown): string | null {
	if (typeof value !== 'string') return null;
	if (/^#[\da-f]{3}(?:[\da-f]{3})?$/iu.test(value)) return value.toLowerCase();
	const rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/u.exec(value);
	if (!rgb) return null;
	const components = rgb.slice(1).map(Number);
	return components.every((n) => n <= 255)
		? '#' + components.map((n) => n.toString(16).padStart(2, '0')).join('')
		: null;
}
export function dimension(value: unknown, fallback = 0, max = 4096): number {
	const parsed =
		typeof value === 'number'
			? value
			: typeof value === 'string'
				? Number(value.replace(/px$/u, ''))
				: NaN;
	return Number.isFinite(parsed) && parsed >= 0 ? Math.min(max, Math.round(parsed)) : fallback;
}
export function alignment(value: unknown): 'left' | 'center' | 'right' | 'justify' {
	return value === 'center' || value === 'right' || value === 'justify' ? value : 'left';
}
export const fonts = ['Arial', 'Georgia', 'Verdana', 'Times New Roman', 'monospace'] as const;
export function safeFont(value: unknown): string | null {
	const font = typeof value === 'string' ? value.replace(/^(['"])(.*)\1$/u, '$2') : '';
	return fonts.some((candidate) => candidate === font) ? font : null;
}
export function escapeHTML(value: string): string {
	return value.replace(
		/[&<>"']/gu,
		(char) =>
			({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char,
	);
}

export const youtubeProvider: EditraVideoProvider = {
	id: 'youtube',
	embedOrigins: ['https://www.youtube-nocookie.com'],
	matches: (url) =>
		[
			'youtube.com',
			'www.youtube.com',
			'm.youtube.com',
			'youtu.be',
			'www.youtube-nocookie.com',
		].includes(url.hostname),
	getEmbedUrl(url) {
		const id =
			url.hostname === 'youtu.be'
				? url.pathname.slice(1)
				: url.pathname === '/watch'
					? url.searchParams.get('v')
					: /^\/(?:shorts|embed)\/([^/]+)$/u.exec(url.pathname)?.[1];
		return id && /^[\w-]{11}$/u.test(id)
			? new URL(`https://www.youtube-nocookie.com/embed/${id}`)
			: null;
	},
};
export const vimeoProvider: EditraVideoProvider = {
	id: 'vimeo',
	embedOrigins: ['https://player.vimeo.com'],
	matches: (url) => ['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(url.hostname),
	getEmbedUrl(url) {
		const id = /^\/(?:video\/)?(\d+)$/u.exec(url.pathname)?.[1];
		return id ? new URL(`https://player.vimeo.com/video/${id}`) : null;
	},
};
export interface ResolvedVideo {
	readonly original: string;
	readonly src: string;
	readonly provider: string;
	readonly direct: boolean;
}
export function resolveVideo(
	value: unknown,
	policy: EditraSecurityConfig = {},
	providers: readonly EditraVideoProvider[] = [],
): ResolvedVideo | null {
	const original = safeUrl(value, policy);
	if (!original) return null;
	const url = new URL(original);
	if (/\.mp4$/iu.test(url.pathname))
		return { original, src: original, provider: 'mp4', direct: true };
	for (const provider of [...providers, youtubeProvider, vimeoProvider]) {
		if (!provider.matches(url)) continue;
		const embed = provider.getEmbedUrl(url);
		if (embed && safeUrl(embed.href, policy) && provider.embedOrigins.includes(embed.origin))
			return { original, src: embed.href, provider: provider.id, direct: false };
	}
	return null;
}
