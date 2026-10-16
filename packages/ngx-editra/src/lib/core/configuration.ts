import type { EditraConfig } from './types';

/** Validates finite bounds while preserving trusted extension/provider identities. */
export function normalizeConfig(config: EditraConfig = {}): EditraConfig {
	const ids = new Set<string>(),
		groups = new Set<string>();
	for (const group of config.toolbar?.groups ?? []) {
		if (groups.has(group.id)) throw new Error(`Duplicate toolbar group: ${group.id}`);
		groups.add(group.id);
	}
	for (const item of [
		...(config.toolbar?.items ?? []),
		...(config.toolbar?.groups ?? []).flatMap((group) => [...group.items]),
	]) {
		if (ids.has(item.id)) throw new Error(`Duplicate toolbar item: ${item.id}`);
		ids.add(item.id);
	}
	for (const [name, value] of Object.entries({
		minHeight: config.minHeight,
		toolbarStickyOffset: config.toolbar?.stickyOffset,
		maxHeight: config.maxHeight,
		maxRows: config.table?.maxRows,
		maxColumns: config.table?.maxColumns,
		maxInputLength: config.security?.maxInputLength,
	})) {
		if (value !== undefined && (!Number.isFinite(value) || value < 0))
			throw new Error(`Invalid configuration: ${name}`);
	}
	if (
		config.minHeight !== undefined &&
		config.maxHeight !== undefined &&
		config.maxHeight < config.minHeight
	)
		throw new Error('maxHeight must be at least minHeight');
	return {
		placeholder: 'Start writing…',
		minHeight: 180,
		theme: 'light',
		spellcheck: true,
		...config,
		security: { maxInputLength: 1_000_000, ...config.security },
		table: { maxRows: 50, maxColumns: 20, ...config.table },
	};
}
