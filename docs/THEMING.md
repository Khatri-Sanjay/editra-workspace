# Theming

Choose light, dark or auto (prefers-color-scheme) through config.theme. Styles are scoped to the
Angular editor; the public ProseMirror stylesheet targets only editor-generated class names.

Override CSS custom properties on editra-editor: --editra-surface, --editra-text,
--editra-border, --editra-active and --editra-focus. Preserve contrast and visible focus.
Fonts are constrained to Arial, Georgia, Verdana, Times New Roman and monospace.
Toolbar icons are text/unicode, never arbitrary HTML.

The UI respects reduced motion, wraps on narrow screens, and provides 36px editor controls.
WCAG automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.
