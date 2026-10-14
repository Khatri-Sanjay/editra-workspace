# Public API

## Package entry points

`ngx-editra`: EditraEditorComponent, EditraToolbarComponent, EditraIconComponent, EditraColourPickerComponent,
editraIconNames, EditraIconName, defaultToolbar, EDITRA_CONFIG,
provideEditra, EDITRA_DIALOG_PRESENTER, provideEditraDialogs and typed configuration/change/document/
extension/provider/dialog presentation exports.

`ngx-editra/core`: EditraEngine, createSchema, createCommands, normalizeConfig, orderExtensions,
parseHTML, serializeHTML, parseJSON, documentJSON, plainText, safeUrl, validateUrl, resolveVideo,
safeColor, safeFont, dimension, alignment, markActive/markStatus, cellBackground,
tableAttribute, setParagraphAttribute, automaticLinks and typed contracts.

Table dimension helpers: resizeTableRow, resizeTableColumns, setTableWidthPercent,
fitTableToPage, distributeTableColumns and resetTableRowHeights. Resize helpers return validated
transactions or null; commands use the usual ProseMirror Command signature.

`ngx-editra/extensions`: imageExtension, videoExtension, importMarkdown, exportMarkdown.

## Media document attributes

Image/video nodes use `width: 0` and `height: 0` for automatic sizing, or positive pixel
dimensions for custom sizing. `fullWidth: true` fills the available content width responsively.
`align` supports left/center/right positioning, and `aspect` controls proportional interactive
resizing. A resize saves custom dimensions and sets `fullWidth` to false. These are document
attributes, rather than global editor configuration options.

## Component inputs

| Input      | Type           | Purpose                                    |
| ---------- | -------------- | ------------------------------------------ |
| `config`   | `EditraConfig` | Immutable editor configuration.            |
| `readonly` | `boolean`      | Display content without editing.           |
| `required` | `boolean`      | Enable semantic empty-document validation. |

Forms disabled state is set through the form API.

## Component outputs

Outputs: contentChange ({html, document, text}), selectionChange ({from,to}), editorFocus,
editorBlur, editorReady, editorDestroyed, editorError (Error), dirtyChange (boolean),
transactionState ({docChanged, selectionChanged, from, to, dirty}).
Selection-only transactions never emit full contentChange.

## Instance methods

| Method                           | Return type      | Purpose                                                  |
| -------------------------------- | ---------------- | -------------------------------------------------------- |
| `getHTML()`                      | `string`         | Export canonical HTML.                                   |
| `getText()`                      | `string`         | Export plain text including captions and image alt text. |
| `getJSON()`                      | `EditraDocument` | Export the document model.                               |
| `getMarkdown()`                  | `string`         | Export Markdown under the documented conversion policy.  |
| `setHTML(html: string)`          | `void`           | Replace content using the HTML policy.                   |
| `setJSON(value: EditraDocument)` | `void`           | Validate and replace document content.                   |
| `setMarkdown(value: string)`     | `void`           | Import Markdown.                                         |
| `clear()`                        | `void`           | Clear content with editing history.                      |
| `focus()` / `blur()`             | `void`           | Control browser editing focus.                           |
| `isEmpty()`                      | `boolean`        | Check semantic document emptiness.                       |
| `isDirty()`                      | `boolean`        | Check editor dirty state.                                |

Programmatic setters silently synchronize an attached form
control without marking it dirty or emitting contentChange/valueChanges.
clear is a user-style transaction with history. DOM focus/blur are no-ops before browser activation.
State/conversion getters and setters work during SSR. Plain text includes captions and image alt text;
counts use whitespace-separated words and Unicode code points, including block separators.
setJSON/setMarkdown can throw on invalid input;
writeValue/setHTML report parsing failures through editorError without destroying existing content.

## Core engine

Core EditraEngine is an imperative framework adapter API with a read-only EditorState getter and apply(Transaction).
Do not mutate the Angular component's private engine. Use documented methods or extensions.

## Markdown conversion policy

CommonMark conversion supports its ordinary blocks/marks. Tables/videos export as safe raw HTML;
colour/font/size marks lose presentation. Raw HTML Markdown imports and custom nodes are not lossless.
