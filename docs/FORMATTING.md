# Text and paragraph formatting

Use the toolbar to change how content looks without writing HTML. Most text tools apply to selected text; when there is only a caret, mark tools affect what you type next.

## Format text

1. Select a word or sentence in the editor.
2. Choose Bold, Italic, Underline, Strike, Subscript, or Superscript.
3. Choose the same toggle again to remove that mark. Clear formatting removes text marks from the selection.

Bold, italic, and underline also support the platform modifier key: Ctrl on Windows/Linux or Command on macOS, together with B, I, or U.

## Headings, fonts, and size

Use Paragraph style to choose a paragraph or heading level. Headings describe document structure; use them in a logical order instead of using size alone to create a heading.

Font controls support Arial, Georgia, Verdana, Times New Roman, and monospace. Font-size values and imported styles are validated. A mixed indicator means the current selection contains more than one value; choosing a value applies it to the selection.

## Text colour and highlighting

The main colour button applies the last chosen colour. Its arrow opens a palette. Pick a theme colour, a standard colour, a recent colour, or a custom value. Automatic removes the explicit text colour. No colour removes highlighting. Applying the same colour again keeps it applied rather than toggling it off.

Use colour with sufficient contrast in both themes. Do not use colour as the only way to convey meaning.

## Convert text case

Select text and use Text case. Choices include uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and toggle case. Conversion changes the selected text while retaining its marks. In a selected table-cell range, the conversion is limited to those cells.

## Paragraph layout

| Tool                         | How to use it                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| Left, centre, right, justify | Place the caret in a paragraph, or select paragraphs, then choose an alignment            |
| Line height                  | Choose spacing for the selected paragraph content                                         |
| Bullet or numbered list      | Select paragraphs and activate the appropriate list tool                                  |
| Indent / outdent             | Adjust paragraph indentation or the nesting level of list items                           |
| Blockquote                   | Use for quoted content rather than simply italicizing a paragraph                         |
| Inline code                  | Add the code command to a custom toolbar, or import code markup; see the code-block guide |

Enter creates a new block. Shift+Enter creates a line break inside the current block. Undo restores a previous document state.

## Configure the visible tools

Toolbar configuration controls presentation; hiding a button does not remove its document feature or sanitize imported content. Use schema feature configuration when you need to disable supported image, video, or table content. See [toolbar configuration](TOOLBAR.md) and [configuration](CONFIGURATION.md).
