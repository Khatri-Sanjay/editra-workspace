# Configuration

`EditraConfig` is exported from `ngx-editra`; all detailed types are also exported from
`ngx-editra/core`. Use an immutable config object. Example:

```typescript
import type { EditraConfig } from 'ngx-editra';
export const editorConfig: EditraConfig = {
	theme: 'auto',
	placeholder: 'Write a description…',
	minHeight: 240,
	image: { enabled: true, pasteUrls: false },
	video: { enabled: true },
	table: { enabled: true, maxRows: 50, maxColumns: 20 },
	security: { allowHttp: false, maxInputLength: 1_000_000 },
};
```

Defaults: light theme, 180px minimum height, spellcheck on, media/tables enabled,
HTTPS policy, one million HTML/JSON input characters. `readonly`, `autofocus` and
`maxHeight` are optional. Finite non-negative bounds are checked by `normalizeConfig`.

Application defaults can be provided with `provideEditra(config)` from `ngx-editra`.
An editor's input replaces those defaults. Core `normalizeConfig` fills built-in defaults.
Changing theme/layout/read-only does not recreate the editor view. Schema, security, provider
or extension changes reconfigure document state, reset history and revalidate existing HTML.
Disabling a schema feature can remove that feature's existing content.

Output formats are explicit conversions; config changes never silently change form value types.
