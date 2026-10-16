# Keyboard use and accessibility

The editor provides labelled controls, keyboard navigation, focus indicators, and disabled/read-only states. Your application still needs accessible labels, validation messages, good colour contrast, and appropriate focus behavior.

## Useful keyboard actions

| Action                                 | Keyboard interaction                                   |
| -------------------------------------- | ------------------------------------------------------ |
| Navigate toolbar buttons               | Arrow keys, Home, and End within enabled button groups |
| Bold / italic / underline              | Ctrl or Command with B / I / U                         |
| Undo / redo                            | Platform undo/redo shortcuts or toolbar controls       |
| Line break                             | Shift+Enter                                            |
| Close a dialog or palette              | Escape                                                 |
| Navigate colour swatches               | Arrows, Home, End, then Enter to choose                |
| Resize a focused table column boundary | Left / Right arrows                                    |
| Resize a focused table row boundary    | Up / Down arrows                                       |
| Fine resizing                          | Shift+Arrow uses a smaller step                        |

Table resize boundaries are visually unobtrusive but show a focus indicator when reached by keyboard. A committed resize can be undone. Escape cancels a pointer preview. Readonly and disabled editors do not allow resizing.

## Application responsibilities

Give the surrounding form section a meaningful heading, explain what the user should enter, and show validation errors near the editor. Keep toolbar text/background contrast sufficient in every supported theme. Test at narrow widths and with keyboard-only navigation.

Content authors should use logical headings, descriptive links, and image alternative text. Avoid relying on colour alone. For long exported code or tables, keep scrollable regions keyboard-accessible in your application's output UI.

## Verification limits

Automated axe checks and keyboard browser tests cover many interactions. They do not replace manual screen-reader, high-contrast, browser, and assistive-technology testing in your application. Custom dialog presenters and extensions must preserve focus containment, Escape behavior, and focus return. See [toolbar configuration](TOOLBAR.md).
