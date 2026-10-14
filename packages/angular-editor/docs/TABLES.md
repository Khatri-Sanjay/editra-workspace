# Tables

Tables use prosemirror-tables for cell selection, span normalization, column resizing,
Tab/Shift+Tab navigation, copy/paste and history-aware operations.
The Word-style insertion picker previews a grid up to 10 columns by 8 rows. Clicking a cell
or pressing Enter inserts immediately. Numeric rows/columns support larger sizes within the
configured limits, with validation before insertion. The contextual menu supplements toolbar commands.
Commands insert tables, add/remove rows/columns, delete tables, merge/split cells,
and toggle header rows/columns. A contextual Table Layout ribbon supplies these actions,
cell shading, AutoFit to page, and equal column distribution. More table settings contains
table border/width, minimum row height and a reset-row-heights action.
Cell text alignment uses the ordinary block alignment commands.

Column widths, spans, row heights, table appearance and backgrounds are document attributes.
Select a table cell and drag its column borders or any point along a row border to
resize; a guide and pixel readout preview the change, and release commits one history action.
Escape or pointer cancellation discards the preview. Widths are assigned to logical columns,
including cells with colspan/rowspan, rather than independently mutating table DOM.

Resize boundaries have no visible icon. Tab focuses a boundary with a visible focus indicator.
Focused column boundaries use Left/Right; row boundaries use Up/Down. Arrows adjust by 8 px;
Shift+Arrow adjusts by 1 px. Boundaries preserve keyboard focus during updates and are inactive
in read-only/disabled editors. Row heights are minimums: content can require taller rows.
Grip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.
All table and cell borders use the same 1 px thickness and #b8c2d0 colour. The table's
solid/dashed/none style applies to both outer and inner borders, including exported HTML.

AutoFit to page removes fixed column widths. Distribute columns preserves the current rendered
table width and gives logical columns equal widths. Percentage width edits remove fixed widths
so the percentage takes effect. Row heights and cell styles are retained by AutoFit.
Table overflow is horizontal. Malformed imports are repaired with fixTables.
Insertion defaults to 3×3, bounded by config.table.maxRows/maxColumns (50/20 defaults).

Automated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,
save/reload, merged-cell dimensions, equal columns, AutoFit, quick insertion, shading and validation.
Broader native clipboard and cross-browser/manual accessibility coverage remains release work.
