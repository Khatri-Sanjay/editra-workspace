/*
 * Public API Surface of ngx-editra
 */

export * from './lib/editor.component';
export * from './lib/toolbar.component';
export { EditraIconComponent } from './lib/icon.component';
export { EditraColourPickerComponent } from './lib/colour-picker.component';
export { editraIconNames } from './lib/icon-paths';
export type { EditraIconName } from './lib/icon-paths';
export * from './lib/configuration';
export type {
	EditraConfig,
	EditraChange,
	EditraDocument,
	EditraExtension,
	EditraTheme,
	EditraToolbarConfig,
	EditraToolbarItem,
	EditraToolbarGroup,
	EditraAlignment,
	EditraCounts,
	EditraHtmlElement,
	EditraOutputFormat,
	EditraTransactionState,
	EditraImageConfig,
	EditraVideoConfig,
	EditraTableConfig,
	EditraSecurityConfig,
	EditraVideoProvider,
} from 'ngx-editra/core';

export { EditraViewerComponent } from './lib/viewer.component';

export { EditraHtmlPipe } from './lib/html.pipe';

export { EditraCodeCopyDirective } from './lib/code-copy.directive';
