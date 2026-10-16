/*
 * Public API Surface of ngx-editra
 */

export { NgxEditraComponent } from './components/ngx-editra/ngx-editra.component';
export {
	defaultToolbar,
	EditraToolbarComponent,
} from './components/editra-toolbar/editra-toolbar.component';
export { EditraIconComponent } from './components/editra-icon/editra-icon.component';
export { EditraColourPickerComponent } from './components/editra-colour-picker/editra-colour-picker.component';
export { editraIconNames } from './components/editra-icon/icon-paths';
export type { EditraIconName } from './components/editra-icon/icon-paths';
export {
	EDITRA_CONFIG,
	provideEditra,
	EDITRA_DIALOG_PRESENTER,
	provideEditraDialogs,
} from './config/editra.config';
export type { EditraDialogPresenter } from './config/editra.config';

export { NgxEditraViewerComponent } from './components/ngx-editra-viewer/ngx-editra-viewer.component';

export { EditraHtmlPipe } from './pipes/html.pipe';
export { exportEmail } from './core/email';
export type { EditraEmailOptions, EditraEmailResult, EditraEmailWarning } from './core/email';

export { EditraCodeCopyDirective } from './directives/code-copy.directive';
export { EditraContentDirective } from './directives/content.directive';

export type {
	EditraDocument,
	EditraMark,
	EditraTheme,
	EditraOutputFormat,
	EditraAlignment,
	EditraSecurityConfig,
	EditraImageConfig,
	EditraVideoConfig,
	EditraTableConfig,
	EditraToolbarItem,
	EditraToolbarConfig,
	EditraToolbarGroup,
	EditraConfig,
	EditraVideoProvider,
	EditraExtension,
	EditraHtmlElement,
	EditraChange,
	EditraCounts,
	EditraTransactionState,
} from './core/types';
export {
	validateUrl,
	safeUrl,
	safeColor,
	dimension,
	alignment,
	fonts,
	safeFont,
	escapeHTML,
	youtubeProvider,
	vimeoProvider,
	resolveVideo,
} from './core/security';
export type { EditraUrlResult, ResolvedVideo } from './core/security';
export { attributes, stringAttribute } from './core/attributes';
export { createSchema } from './core/schema';
export { parseHTML, serializeHTML, documentJSON, parseJSON, plainText } from './core/content';
export {
	markActive,
	markStatus,
	setParagraphAttribute,
	createCommands,
	cellBackground,
	tableAttribute,
} from './core/commands';
export { orderExtensions, EditraEngine } from './core/engine';
export { automaticLinks } from './core/plugins';
export { normalizeConfig } from './core/configuration';
export {
	resizeTableRow,
	resizeTableColumns,
	setTableWidthPercent,
	fitTableToPage,
	distributeTableColumns,
	resetTableRowHeights,
} from './core/table-dimensions';

export { imageExtension, videoExtension } from './extensions/media';
export { importMarkdown, exportMarkdown } from './extensions/markdown';
