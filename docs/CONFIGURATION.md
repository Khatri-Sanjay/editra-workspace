# Configuration

Use configuration to control presentation, document features, and input policy. Keep the configuration object stable during ordinary change detection; replace it deliberately when an option changes.

## Bind configuration to the editor

```html
<ngx-editra [formControl]="body" [config]="editorConfig" />
```

Declare editorConfig on the owning component, using the typed example below.

`EditraConfig` is exported from `ngx-editra`; all detailed types are also exported from
`ngx-editra`. Use an immutable config object. Example:

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

## Configuration reference

| Option                               | Default / meaning                                                          |
| ------------------------------------ | -------------------------------------------------------------------------- |
| placeholder                          | Start writing… when the document is empty                                  |
| minHeight                            | 180 pixels                                                                 |
| maxHeight                            | Optional; must be at least minHeight                                       |
| theme                                | light; also dark or auto                                                   |
| readonly                             | Prevent editing without changing the document format                       |
| autofocus                            | Optional browser focus after activation                                    |
| spellcheck                           | true                                                                       |
| toolbar.hidden                       | Hide the toolbar; this does not remove schema features                     |
| toolbar.items / groups               | Replace command buttons or organize them into labelled groups              |
| toolbar.hiddenItems                  | Hide command IDs or formatting-control labels                              |
| toolbar.overflow                     | wrap or scroll                                                             |
| toolbar.floating                     | Enable a selection toolbar                                                 |
| toolbar.sticky / stickyOffset        | Pin the toolbar; optional application-header offset in pixels              |
| image.enabled / pasteUrls            | Allow image nodes / optionally turn plain supported image URLs into media  |
| video.enabled / providers            | Allow video nodes / register trusted provider functions                    |
| table.enabled / maxRows / maxColumns | Allow tables; insertion bounds default to 50 rows and 20 columns           |
| security.allowHttp                   | false; HTTPS is the default URL policy                                     |
| security.maxInputLength              | 1,000,000 input characters                                                 |
| extensions                           | Trusted extension list; an explicit list replaces default media extensions |

## Application-wide defaults

```typescript
import { provideEditra } from 'ngx-editra';

// Add to your application's providers:
export const editorDefaults = provideEditra({ theme: 'auto', minHeight: 240 });
```

An editor's config input replaces these application defaults rather than deeply merging with them. Built-in normalization still supplies missing built-in defaults. Do not create a fresh config object inline in the template on every check.

To change only presentation, assign a new object, for example `this.editorConfig = { ...this.editorConfig, theme: 'dark' };`. Keep the field mutable if your application updates it. Schema or security changes can alter existing content; make them intentional user/application actions.
