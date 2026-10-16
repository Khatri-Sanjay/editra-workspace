# Find, undo, counts, and workspace tools

These tools help writers work with larger documents. They change document state or editor presentation; your form value continues to be HTML.

## Find and replace

Open Find and replace, enter a search term, and use the match navigation controls to move between occurrences. Replace changes the current match; Replace all changes all applicable matches. Review the result and use Undo if needed. Searches are literal text, not user-supplied regular expressions.

## Undo and redo

Use toolbar buttons or the platform undo/redo shortcuts. Text edits, formatting, inserted content, and committed table/media resizing participate in editing history. A resize drag is committed as one operation rather than a history entry for every pointer movement. Escape cancels an in-progress resize.

Loading a document or changing schema/security/extension configuration is different from an ordinary user edit. Schema-related reconfiguration revalidates content and resets history. Do not rely on Undo as a storage backup.

## Word and character counts

The editor displays document counts. Words are separated by whitespace; characters are counted as Unicode code points. Plain-text conversion includes captions and image alternative text. These counts are useful UI feedback, not a substitute for a server-side content limit.

## Fullscreen

Use Fullscreen to expand the editing workspace. Background page scrolling is contained while the editor is fullscreen, and restored when it closes. This is an editor layout mode, not a request to put the entire browser into its native fullscreen API.

## Keep tools available

```typescript
import type { EditraConfig } from 'ngx-editra';

export const config: EditraConfig = {
	toolbar: { sticky: true, stickyOffset: 64, floating: true },
	minHeight: 280,
	maxHeight: 640,
};
```

Sticky keeps the toolbar visible while scrolling. stickyOffset leaves room for an application header, in pixels. Floating enables a selection toolbar. The pin control lets writers change the sticky state. Use [toolbar configuration](TOOLBAR.md) to choose tools and grouping.
