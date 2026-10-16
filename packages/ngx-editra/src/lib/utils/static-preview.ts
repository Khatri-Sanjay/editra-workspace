import {
	createSchema,
	normalizeConfig,
	orderExtensions,
	parseHTML,
	serializeHTML,
} from '../core/public-api';
import type { EditraConfig } from '../core/public-api';

/** Rebuild display HTML from validated schema attributes, never from raw input markup. */
export function staticPreview(html: string, config: EditraConfig = {}): string {
	const normalized = normalizeConfig(config);
	const extensions = orderExtensions(normalized.extensions ?? []);
	const schema = createSchema(normalized, extensions);
	return serializeHTML(parseHTML(html, schema, { ...normalized, extensions }));
}
