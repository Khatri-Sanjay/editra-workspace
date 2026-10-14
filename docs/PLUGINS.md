# Plugins and extensions

`EditraExtension` supports unique IDs, explicit `requires`, schema nodes/marks, commands,
keyboard shortcuts, ProseMirror plugins, node views, toolbar items and browser lifecycle callbacks.
Dependencies are ordered before dependants while preserving deterministic registration order.
Duplicate IDs/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.

```typescript
import type { EditraExtension } from 'ngx-editra';
import { imageExtension, videoExtension } from 'ngx-editra/extensions';
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

Pass this list through config.extensions. Explicit lists replace default media node views.
Dispose extension resources in onDestroy; node views must implement destroy. Lifecycle callbacks
are browser-only. Schema functions/serializers must be SSR-safe and extension code is trusted.
Built-in HTML import handles the documented schema; custom nodes need their own import policy.
Custom nodes can implement the SSR-safe `parseElement` hook, which receives a typed tag,
attribute map, child nodes and text. Core tags and blocked executable subtrees take precedence.
JSON imports pass through HTML normalization; a custom node needs both a serializer and a
parseElement importer to round trip. A custom-node round-trip regression test covers this contract.
