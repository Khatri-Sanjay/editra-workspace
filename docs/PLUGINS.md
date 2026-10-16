# Plugins and extensions

An extension adds trusted application behavior to the editor. Most applications can use built-in tools without creating one. Start with a command-only extension before adding schema nodes or browser node views.

## Add a command and toolbar button

1. Define an EditraExtension with a unique id.
2. Return the custom command from commands and point a toolbar item at that command name.
3. Pass the extension through config.extensions, including the default media extensions if you still want them.

`EditraExtension` supports unique IDs, explicit `requires`, schema nodes/marks, commands,
keyboard shortcuts, ProseMirror plugins, node views, toolbar items and browser lifecycle callbacks.
Dependencies are ordered before dependants while preserving deterministic registration order.
Duplicate IDs/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.

```typescript
import type { EditraExtension } from 'ngx-editra';
import { imageExtension, videoExtension } from 'ngx-editra';
export const greeting: EditraExtension = {
	id: 'greeting',
	commands: () => ({
		greeting: (state, dispatch) => {
			if (dispatch) dispatch(state.tr.insertText('Hello from an extension'));
			return true;
		},
	}),
	toolbar: [{ id: 'greeting', label: 'Insert greeting', command: 'greeting' }],
};
export const extensions = [imageExtension(), videoExtension(), greeting];
```

On your component, use `config: EditraConfig = { extensions };` and bind `[config]="config"`. Import the EditraConfig type from ngx-editra. The greeting example inserts text at the current selection and participates in document transactions/history.

## Schema, ordering, and cleanup

Pass this list through config.extensions. Explicit lists replace default media node views.
Dispose extension resources in onDestroy; node views must implement destroy. Lifecycle callbacks
are browser-only. Schema functions/serializers must be SSR-safe and extension code is trusted.
Built-in HTML import handles the documented schema; custom nodes need their own import policy.
Custom nodes can implement the SSR-safe `parseElement` hook, which receives a typed tag,
attribute map, child nodes and text. Core tags and blocked executable subtrees take precedence.
JSON imports pass through HTML normalization; a custom node needs both a serializer and a
parseElement importer to round trip. A custom-node round-trip regression test covers this contract.
