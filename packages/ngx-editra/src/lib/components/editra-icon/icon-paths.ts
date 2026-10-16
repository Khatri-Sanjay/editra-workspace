/** Static local SVG geometry. No remote assets or user-supplied SVG markup. */
const grid = 'M4 4h16v16H4z M4 9h16 M4 15h16 M9 4v16 M15 4v16';
const row = 'M4 8h16v12H4z M4 14h16 M12 8v12';
const column = 'M8 4h12v16H8z M14 4v16 M8 12h12';
const paths = {
	pin: ['M9 3h6 M10 3v6l-3 4v2h10v-2l-3-4V3 M12 15v7'],
	unpin: ['M9 3h6 M14 3v6l3 4v2h-3 M10 9l-3 4v2h4 M12 15v7 M3 3l18 18'],
	check: ['M4 12l5 5L20 6'],
	previous: ['M15 5l-7 7 7 7'],
	next: ['M9 5l7 7-7 7'],
	replace: ['M4 6h12 M13 3l3 3-3 3 M20 18H8 M11 15l-3 3 3 3'],
	replace_all: ['M4 5h12 M13 2l3 3-3 3 M20 19H8 M11 16l-3 3 3 3 M5 11h14 M5 13h14'],
	text_case: ['M3 19 8 5l5 14 M5 14h6 M16 12h5v7 M21 15h-3a2 2 0 1 0 0 4h3'],
	line_weight: ['M4 5h16 M4 11h16 M4 12h16 M4 17h16 M4 18h16 M4 19h16'],
	close: ['M6 6l12 12 M18 6 6 18'],
	copy_url: ['M12 3h8v12 M9 6h8v12h-4', 'M3 16l3-3a3 3 0 0 1 4 4l-3 3a3 3 0 0 1-4-4 M5 18l3-3'],
	columns: ['M3 4h18v16H3z M12 4v16'],
	image_section_left: ['M3 4h18v16H3z M11 4v16 M5 14l2-3 2 3 M14 8h5 M14 12h5 M14 16h5'],
	image_section_right: ['M3 4h18v16H3z M13 4v16 M15 14l2-3 2 3 M5 8h5 M5 12h5 M5 16h5'],
	fit_image_column: ['M3 4v16 M21 4v16 M7 6h10v12H7z M7 14l3-4 4 5 M3 12h4 M17 12h4'],
	image_content: ['M3 4h8v16H3z M5 15l2-3 2 3 M15 6h6 M15 10h6 M18 14v6 M15 17h6'],
	chevron_down: ['m6 9 6 6 6-6'],
	fitTableToPage: ['M3 4h18v16H3z M9 4v16 M15 4v16 M3 12h18 M7 9l-3 3 3 3 M17 9l3 3-3 3'],
	distributeTableColumns: [
		'M3 4h18v16H3z M9 4v16 M15 4v16 M5 11h2 M5 13h2 M11 11h2 M11 13h2 M17 11h2 M17 13h2',
	],
	undo: ['M8 5 3 10l5 5 M3 10h10a7 7 0 0 1 7 7'],
	redo: ['M16 5l5 5-5 5 M21 10H11a7 7 0 0 0-7 7'],
	bold: ['M7 4h6a4 4 0 0 1 0 8H7z M7 12h7a4 4 0 0 1 0 8H7z'],
	italic: ['M10 4h10 M4 20h10 M15 4 9 20'],
	underline: ['M6 4v7a6 6 0 0 0 12 0V4 M4 21h16'],
	strike: ['M17 5a7 7 0 0 0-10 0c-2 3 0 5 5 7 M7 18a7 7 0 0 0 10 0c1-2 0-4-2-5 M3 12h18'],
	subscript: ['M3 5 13 15 M13 5 3 15 M17 15c0-3 5-3 5 0 0 2-5 3-5 6h5'],
	superscript: ['M3 9 13 19 M13 9 3 19 M17 5c0-3 5-3 5 0 0 2-5 3-5 6h5'],
	clear: ['M3 16 8 3l5 13 M5 11h6 M14 12l4-4 5 5-7 7h-3l-3-3z M15 13l4 4 M13 21h9'],
	align_left: ['M3 4h18 M3 9h12 M3 14h18 M3 19h12'],
	align_center: ['M3 4h18 M6 9h12 M3 14h18 M6 19h12'],
	align_right: ['M3 4h18 M9 9h12 M3 14h18 M9 19h12'],
	align_justify: ['M3 4h18 M3 9h18 M3 14h18 M3 19h18'],
	bullet_list: [
		'M8 6h13 M8 12h13 M8 18h13 M3 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2 M3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2 M3 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2',
	],
	ordered_list: [
		'M10 5h11 M10 12h11 M10 19h11 M3 2h1v5 M2 10c0-2 4-2 4 0 0 1-4 2-4 4h4 M2 18h4l-2 2h2v2H2',
	],
	indent: ['M11 4h10 M11 9h10 M11 14h10 M3 19h18 M3 8l4 4-4 4'],
	outdent: ['M11 4h10 M11 9h10 M11 14h10 M3 19h18 M7 8l-4 4 4 4'],
	blockquote: ['M4 6h6v6H4z M10 12c0 4-2 6-5 6 M14 6h6v6h-6z M20 12c0 4-2 6-5 6'],
	code: ['m8 6-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16'],
	code_block: [
		'M3 3h18v18H3z M3 8h18 M6 5.5h1 M10 5.5h1 M8 11l-3 3 3 3 M16 11l3 3-3 3 M13 10l-2 8',
	],
	horizontal_rule: ['M3 12h18'],
	link: [
		'm10 14 4-4 M9 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0 M15 8l2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0',
	],
	unlink: [
		'M9 16l-2 2a4 4 0 0 1-6-6l3-3 M15 8l2-2a4 4 0 0 1 6 6l-3 3 M3 3l18 18 M4 3v3 M3 6h3 M18 21h3v-3',
	],
	image: ['M3 3h18v18H3z M3 16l5-5 5 5 3-3 5 5 M16 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4'],
	video: ['M3 5h18v14H3z M10 9l5 3-5 3z'],
	table: [grid],
	find: ['M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M15 15l6 6'],
	fullscreen: ['M8 3H3v5 M16 3h5v5 M21 16v5h-5 M8 21H3v-5'],
	fullscreen_exit: ['M3 8h5V3 M21 8h-5V3 M16 21v-5h5 M8 21v-5H3'],
	delete: ['M4 6h16 M9 6V3h6v3 M6 6l1 14h10l1-14 M10 10v6 M14 10v6'],
	copy: ['M9 9h12v12H9z M5 16H3V3h13v2'],
	font: ['M3 19 10 4l7 15 M6 13h8 M18 9h5 M20.5 9v10'],
	font_size: ['M3 18 8 4l5 14 M5 13h6 M19 4v16 M16 7l3-3 3 3 M16 17l3 3 3-3'],
	line_height: ['M10 5h11 M10 12h11 M10 19h11 M2 6l3-3 3 3 M5 3v18 M2 18l3 3 3-3'],
	text_color: ['M5 17 12 3l7 14 M8 12h8'],
	highlight: ['M8 13 16 3l5 4-8 10z M8 13l-4 5 5-1 M4 21h16'],
	cell_color: [grid, 'm11 11 2 2-2 2-2-2z'],
	addRowBefore: [row, 'M9 3h6 M12 1v4'],
	addRowAfter: ['M4 4h16v12H4z M4 10h16 M12 4v12 M9 21h6 M12 18v5'],
	deleteRow: [row, 'M9 3h6'],
	addColumnBefore: [column, 'M1 12h5 M3 9v6'],
	addColumnAfter: ['M4 4h12v16H4z M10 4v16 M4 12h12 M18 12h5 M20.5 9.5v5'],
	deleteColumn: [column, 'M1 12h5'],
	mergeCells: [
		'M3 4h18v16H3z M12 4v4 M12 16v4 M5 12h5l-2-2 M10 12l-2 2 M19 12h-5l2-2 M14 12l2 2',
	],
	splitCell: ['M3 4h18v16H3z M12 4v16 M10 12H5l2-2 M5 12l2 2 M14 12h5l-2-2 M19 12l-2 2'],
	toggleHeaderRow: [grid, 'M5 6h14 M5 7.5h14'],
	toggleHeaderColumn: [grid, 'M6 5v14 M7.5 5v14'],
	deleteTable: ['M3 3h14v14H3z M3 8h14 M8 3v14 M15 15l7 7 M22 15l-7 7'],
	custom: [
		'M9 3h6v4a3 3 0 1 1 6 0v4h-4a3 3 0 1 0 0 6h4v4h-6v-4a3 3 0 1 0-6 0v4H3v-6h4a3 3 0 1 0 0-6H3V3z',
	],
} satisfies Record<string, readonly string[]>;
export type EditraIconName = keyof typeof paths;
export function hasEditraIcon(name: string): name is EditraIconName {
	return Object.prototype.hasOwnProperty.call(paths, name);
}
export const editraIconNames: readonly EditraIconName[] = Object.keys(paths).filter(hasEditraIcon);
export function editraIconPaths(name: string): readonly string[] {
	return paths[hasEditraIcon(name) ? name : 'custom'];
}
