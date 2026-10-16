# Inline code and code blocks

Inline code is for a short fragment within a sentence. Code blocks are for multiple lines whose whitespace should be preserved.

## Insert and edit code

1. Place the caret in the document or select content to format.
2. Choose the code-block tool for a separate block. Inline code can be imported from supported HTML/Markdown or exposed with the custom toolbar button below.
3. Enter your code and choose the language label in the code-block controls.

Code is stored as text, not executed. For example, typing an HTML script tag into a code block displays that text rather than running a script. A language label describes the content; it does not enable syntax highlighting.

## Add an inline-code button

The built-in inline-code mark uses the code command; it is not a separate button in the default toolbar. To expose it, configure your toolbar with the following code and bind the resulting config to your editor:

```typescript
import { defaultToolbar } from 'ngx-editra';
import type { EditraConfig } from 'ngx-editra';

export const config: EditraConfig = {
	toolbar: {
		items: [...defaultToolbar, { id: 'inline-code', label: 'Inline code', command: 'code' }],
	},
};
```

Select a short fragment and click Inline code to toggle that mark. The copy control described below belongs to multi-line code blocks.

## Copy a code block

Use the copy button on the block. It copies the code text without the language selector or other editor controls. Clipboard access requires HTTPS or localhost and may be blocked by browser permissions. A failed copy is reported instead of silently succeeding.

## Save and display code

The normal HTML form value preserves code text, whitespace, and supported language metadata. Copy buttons and language editing controls are UI and are not stored in the document.

NgxEditraViewerComponent recreates copy controls when rendering saved code. If you use the HTML pipe instead, add EditraCodeCopyDirective to the content container. See [displaying saved content](VIEWER.md).
