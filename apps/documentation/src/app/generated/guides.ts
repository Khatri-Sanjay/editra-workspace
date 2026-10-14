// Generated from repository Markdown by scripts/generate-documentation.mjs.
import type { Guide } from '../guide';
export const guides: readonly Guide[] = [
	{
		slug: 'installation',
		title: 'Installation',
		group: 'Start here',
		source: 'docs/INSTALLATION.md',
		html: '<h1 id="installation">Installation</h1>\n<p>This repository currently produces a prerelease tarball. It has not been published.</p>\n<pre><code class="language-sh">npm ci\nnpm run pack\n# From an independent Angular application:\nnpm install /absolute/path/to/artifacts/ngx-editra-0.1.0-alpha.0.tgz\n</code></pre>\n<p>Angular core, common and forms are peers. Angular is never bundled. See COMPATIBILITY.md\nfor executed version evidence. Use the Node/TypeScript range required by your Angular version.\nThe library build itself uses Node 20.20.2/npm 10.8.2/Angular 17.3/TypeScript 5.4.</p>\n<p>Add the public stylesheet to your application\'s SCSS:</p>\n<pre><code class="language-scss">@use \'ngx-editra/styles/editor.scss\';\n</code></pre>\n<p>ProseMirror modules and parse5 are runtime dependencies. Do not force incompatible\nProseMirror versions through package overrides. No Angular Material/CDK dependency is required.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="installation">Installation</h1>\n',
				id: 'installation',
				kind: 'content',
			},
			{
				html: '<p>This repository currently produces a prerelease tarball. It has not been published.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<pre><code class="language-sh">npm ci\nnpm run pack\n# From an independent Angular application:\nnpm install /absolute/path/to/artifacts/ngx-editra-0.1.0-alpha.0.tgz\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Angular core, common and forms are peers. Angular is never bundled. See COMPATIBILITY.md\nfor executed version evidence. Use the Node/TypeScript range required by your Angular version.\nThe library build itself uses Node 20.20.2/npm 10.8.2/Angular 17.3/TypeScript 5.4.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Add the public stylesheet to your application's SCSS:</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<pre><code class="language-scss">@use \'ngx-editra/styles/editor.scss\';\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>ProseMirror modules and parse5 are runtime dependencies. Do not force incompatible\nProseMirror versions through package overrides. No Angular Material/CDK dependency is required.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " installation\n\nthis repository currently produces a prerelease tarball. it has not been published.\n\nsh\nnpm ci\nnpm run pack\n from an independent angular application:\nnpm install /absolute/path/to/artifacts/ngx-editra-0.1.0-alpha.0.tgz\n\n\nangular core, common and forms are peers. angular is never bundled. see compatibility.md\nfor executed version evidence. use the node/typescript range required by your angular version.\nthe library build itself uses node 20.20.2/npm 10.8.2/angular 17.3/typescript 5.4.\n\nadd the public stylesheet to your application's scss:\n\nscss\n@use 'ngx-editra/styles/editor.scss';\n\n\nprosemirror modules and parse5 are runtime dependencies. do not force incompatible\nprosemirror versions through package overrides. no angular material/cdk dependency is required.\n",
	},
	{
		slug: 'quick-start',
		title: 'Quick start',
		group: 'Start here',
		source: 'docs/QUICK_START.md',
		html: "<h1 id=\"quick-start\">Quick start</h1>\n<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { EditraEditorComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-example',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, EditraEditorComponent],\n\ttemplate: `&lt;editra-editor [formControl]=&quot;body&quot; /&gt;`,\n})\nexport class ExampleComponent {\n\treadonly body = new FormControl('&lt;p&gt;Hello &lt;strong&gt;world&lt;/strong&gt;&lt;/p&gt;', { nonNullable: true });\n}\n</code></pre>\n<p>Import the public stylesheet as described in INSTALLATION.md. Form values remain HTML.\nFor a working SSR example, run <code>npm run build</code> followed by <code>npm start</code>, or build the\nplayground and run <code>npm run serve:ssr:playground</code>.</p>\n",
		headings: [],
		blocks: [
			{
				html: '<h1 id="quick-start">Quick start</h1>\n',
				id: 'quick-start',
				kind: 'content',
			},
			{
				html: "<pre><code class=\"language-typescript\">import { Component } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { EditraEditorComponent } from 'ngx-editra';\n\n@Component({\n\tselector: 'app-example',\n\tstandalone: true,\n\timports: [ReactiveFormsModule, EditraEditorComponent],\n\ttemplate: `&lt;editra-editor [formControl]=&quot;body&quot; /&gt;`,\n})\nexport class ExampleComponent {\n\treadonly body = new FormControl('&lt;p&gt;Hello &lt;strong&gt;world&lt;/strong&gt;&lt;/p&gt;', { nonNullable: true });\n}\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Import the public stylesheet as described in INSTALLATION.md. Form values remain HTML.\nFor a working SSR example, run <code>npm run build</code> followed by <code>npm start</code>, or build the\nplayground and run <code>npm run serve:ssr:playground</code>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " quick start\n\ntypescript\nimport { component } from '@angular/core';\nimport { formcontrol, reactiveformsmodule } from '@angular/forms';\nimport { editraeditorcomponent } from 'ngx-editra';\n\n@component({\n\tselector: 'app-example',\n\tstandalone: true,\n\timports: [reactiveformsmodule, editraeditorcomponent],\n\ttemplate: <editra-editor [formcontrol]=\"body\" />,\n})\nexport class examplecomponent {\n\treadonly body = new formcontrol('<p>hello <strong>world</strong></p>', { nonnullable: true });\n}\n\n\nimport the public stylesheet as described in installation.md. form values remain html.\nfor a working ssr example, run npm run build followed by npm start, or build the\nplayground and run npm run serve:ssr:playground.\n",
	},
	{
		slug: 'configuration',
		title: 'Configuration',
		group: 'Build with Editra',
		source: 'docs/CONFIGURATION.md',
		html: "<h1 id=\"configuration\">Configuration</h1>\n<p><code>EditraConfig</code> is exported from <code>ngx-editra</code>; all detailed types are also exported from\n<code>ngx-editra/core</code>. Use an immutable config object. Example:</p>\n<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const editorConfig: EditraConfig = {\n\ttheme: 'auto',\n\tplaceholder: 'Write a description…',\n\tminHeight: 240,\n\timage: { enabled: true, pasteUrls: false },\n\tvideo: { enabled: true },\n\ttable: { enabled: true, maxRows: 50, maxColumns: 20 },\n\tsecurity: { allowHttp: false, maxInputLength: 1_000_000 },\n};\n</code></pre>\n<p>Defaults: light theme, 180px minimum height, spellcheck on, media/tables enabled,\nHTTPS policy, one million HTML/JSON input characters. <code>readonly</code>, <code>autofocus</code> and\n<code>maxHeight</code> are optional. Finite non-negative bounds are checked by <code>normalizeConfig</code>.</p>\n<p>Application defaults can be provided with <code>provideEditra(config)</code> from <code>ngx-editra</code>.\nAn editor's input replaces those defaults. Core <code>normalizeConfig</code> fills built-in defaults.\nChanging theme/layout/read-only does not recreate the editor view. Schema, security, provider\nor extension changes reconfigure document state, reset history and revalidate existing HTML.\nDisabling a schema feature can remove that feature's existing content.</p>\n<p>Output formats are explicit conversions; config changes never silently change form value types.</p>\n",
		headings: [],
		blocks: [
			{
				html: '<h1 id="configuration">Configuration</h1>\n',
				id: 'configuration',
				kind: 'content',
			},
			{
				html: '<p><code>EditraConfig</code> is exported from <code>ngx-editra</code>; all detailed types are also exported from\n<code>ngx-editra/core</code>. Use an immutable config object. Example:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const editorConfig: EditraConfig = {\n\ttheme: 'auto',\n\tplaceholder: 'Write a description…',\n\tminHeight: 240,\n\timage: { enabled: true, pasteUrls: false },\n\tvideo: { enabled: true },\n\ttable: { enabled: true, maxRows: 50, maxColumns: 20 },\n\tsecurity: { allowHttp: false, maxInputLength: 1_000_000 },\n};\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Defaults: light theme, 180px minimum height, spellcheck on, media/tables enabled,\nHTTPS policy, one million HTML/JSON input characters. <code>readonly</code>, <code>autofocus</code> and\n<code>maxHeight</code> are optional. Finite non-negative bounds are checked by <code>normalizeConfig</code>.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Application defaults can be provided with <code>provideEditra(config)</code> from <code>ngx-editra</code>.\nAn editor's input replaces those defaults. Core <code>normalizeConfig</code> fills built-in defaults.\nChanging theme/layout/read-only does not recreate the editor view. Schema, security, provider\nor extension changes reconfigure document state, reset history and revalidate existing HTML.\nDisabling a schema feature can remove that feature's existing content.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Output formats are explicit conversions; config changes never silently change form value types.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " configuration\n\neditraconfig is exported from ngx-editra; all detailed types are also exported from\nngx-editra/core. use an immutable config object. example:\n\ntypescript\nimport type { editraconfig } from 'ngx-editra';\nexport const editorconfig: editraconfig = {\n\ttheme: 'auto',\n\tplaceholder: 'write a description…',\n\tminheight: 240,\n\timage: { enabled: true, pasteurls: false },\n\tvideo: { enabled: true },\n\ttable: { enabled: true, maxrows: 50, maxcolumns: 20 },\n\tsecurity: { allowhttp: false, maxinputlength: 1_000_000 },\n};\n\n\ndefaults: light theme, 180px minimum height, spellcheck on, media/tables enabled,\nhttps policy, one million html/json input characters. readonly, autofocus and\nmaxheight are optional. finite non-negative bounds are checked by normalizeconfig.\n\napplication defaults can be provided with provideeditra(config) from ngx-editra.\nan editor's input replaces those defaults. core normalizeconfig fills built-in defaults.\nchanging theme/layout/read-only does not recreate the editor view. schema, security, provider\nor extension changes reconfigure document state, reset history and revalidate existing html.\ndisabling a schema feature can remove that feature's existing content.\n\noutput formats are explicit conversions; config changes never silently change form value types.\n",
	},
	{
		slug: 'angular-forms',
		title: 'Angular Forms',
		group: 'Build with Editra',
		source: 'docs/ANGULAR_FORMS.md',
		html: '<h1 id="angular-forms">Angular Forms</h1>\n<p>Import <code>EditraEditorComponent</code> with <code>ReactiveFormsModule</code> or <code>FormsModule</code>.\n<code>[formControl]</code>, <code>formControlName</code>, and <code>[(ngModel)]</code> use stable HTML strings.\nNull resets to an empty paragraph. <code>setValue</code>, <code>patchValue</code>, reset, disable and enable\nare supported through ControlValueAccessor.</p>\n<pre><code class="language-html">&lt;editra-editor\n\tformControlName=&quot;description&quot;\n\t[required]=&quot;true&quot;\n\t[readonly]=&quot;readOnly&quot;\n\t(contentChange)=&quot;onContentChange($event)&quot;\n/&gt;\n</code></pre>\n<p><code>required</code> on the editor validates semantic emptiness, since <code>&lt;p&gt;&lt;/p&gt;</code> is a nonempty string\nto Angular\'s ordinary string validator. Set <code>[required]=&quot;true&quot;</code> when you need this behavior.\nEditor-to-form transactions emit changes; programmatic writes do not emit <code>contentChange</code>\nor mark the form dirty. Touched is reported when focus leaves the entire editor, including\nits toolbar/dialog. Moving focus within the editor does not touch the form.</p>\n<p>For autosave, subscribe to form <code>valueChanges</code> or <code>contentChange</code>, and debounce storage\nrequests in your application. Required form consistency itself is synchronous.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="angular-forms">Angular Forms</h1>\n',
				id: 'angular-forms',
				kind: 'content',
			},
			{
				html: '<p>Import <code>EditraEditorComponent</code> with <code>ReactiveFormsModule</code> or <code>FormsModule</code>.\n<code>[formControl]</code>, <code>formControlName</code>, and <code>[(ngModel)]</code> use stable HTML strings.\nNull resets to an empty paragraph. <code>setValue</code>, <code>patchValue</code>, reset, disable and enable\nare supported through ControlValueAccessor.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<pre><code class="language-html">&lt;editra-editor\n\tformControlName=&quot;description&quot;\n\t[required]=&quot;true&quot;\n\t[readonly]=&quot;readOnly&quot;\n\t(contentChange)=&quot;onContentChange($event)&quot;\n/&gt;\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: "<p><code>required</code> on the editor validates semantic emptiness, since <code>&lt;p&gt;&lt;/p&gt;</code> is a nonempty string\nto Angular's ordinary string validator. Set <code>[required]=&quot;true&quot;</code> when you need this behavior.\nEditor-to-form transactions emit changes; programmatic writes do not emit <code>contentChange</code>\nor mark the form dirty. Touched is reported when focus leaves the entire editor, including\nits toolbar/dialog. Moving focus within the editor does not touch the form.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>For autosave, subscribe to form <code>valueChanges</code> or <code>contentChange</code>, and debounce storage\nrequests in your application. Required form consistency itself is synchronous.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' angular forms\n\nimport editraeditorcomponent with reactiveformsmodule or formsmodule.\n[formcontrol], formcontrolname, and [(ngmodel)] use stable html strings.\nnull resets to an empty paragraph. setvalue, patchvalue, reset, disable and enable\nare supported through controlvalueaccessor.\n\nhtml\n<editra-editor\n\tformcontrolname="description"\n\t[required]="true"\n\t[readonly]="readonly"\n\t(contentchange)="oncontentchange($event)"\n/>\n\n\nrequired on the editor validates semantic emptiness, since <p></p> is a nonempty string\nto angular\'s ordinary string validator. set [required]="true" when you need this behavior.\neditor-to-form transactions emit changes; programmatic writes do not emit contentchange\nor mark the form dirty. touched is reported when focus leaves the entire editor, including\nits toolbar/dialog. moving focus within the editor does not touch the form.\n\nfor autosave, subscribe to form valuechanges or contentchange, and debounce storage\nrequests in your application. required form consistency itself is synchronous.\n',
	},
	{
		slug: 'toolbar',
		title: 'Toolbar',
		group: 'Build with Editra',
		source: 'docs/TOOLBAR.md',
		html: "<h1 id=\"toolbar\">Toolbar</h1>\n<p>The toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,\nlists, indentation, media/link dialogs, tables, find/replace and fullscreen.</p>\n<h2 id=\"colour-and-highlight-palettes\">Colour and highlight palettes</h2>\n<p>Font colour and text highlight use Word-style split buttons: the main icon applies the\ncurrent/last-used colour, and the arrow opens an anchored palette. With no font colour selected,\nthe main action is theme-aware Automatic. Font/cell palettes include\ntheme shades and standard colours. Highlight offers familiar highlighter colours.\nRecent colours, custom hex values and a native More colours picker are available.\nAutomatic removes the text-colour mark; No colour removes highlighting; No fill clears cell shading.\nChoosing a colour replaces that mark's value and preserves other formatting and the document selection.\nApplying the same colour does not toggle it off. Caret-only changes affect subsequent typing.</p>\n<p>Palette swatches support arrow/Home/End navigation, Enter activation and Escape closure.\nOutside clicks or moving focus out close the palette. Controls follow disabled/read-only states.\nThe public EditraColourPickerComponent exposes label, kind, value and disabled inputs;\ncolourChange emits a validated colour or null, and opened/closed events let adapters preserve selection.</p>\n<h2 id=\"layout-and-customisation\">Layout and customisation</h2>\n<p><code>config.toolbar.hidden</code> hides the complete toolbar. <code>config.toolbar.items</code> replaces the\ncommand-button list. Each item has <code>id</code>, <code>label</code>, <code>command</code> and an optional <code>icon</code>.\nBuilt-in actions use local SVG icons rather than text buttons. Buttons retain accessible labels,\ntooltips, selection preservation and disabled/active/mixed states. The default layout separates\nnative formatting selectors and insertion tools from grouped editing commands.</p>\n<p><code>icon</code> accepts a built-in icon name such as <code>bold</code>, <code>link</code>, <code>image</code> or <code>find</code>; omitted icons\nare inferred from the command. Existing plain-text custom glyphs such as <code>★</code> remain supported.\nUnknown custom commands use an extension icon. SVG strings are never interpreted as markup.\n<code>editraIconNames</code> and the <code>EditraIconName</code> type are exported from <code>ngx-editra</code> for discovery;\n<code>EditraIconComponent</code> is available for custom Angular UI. Icons inherit currentColor and work\nwithout fonts, external requests or a third-party icon dependency.\nExtension toolbar contributions are appended. <code>groups</code> supplies labeled command groups,\n<code>overflow: 'scroll'</code> keeps them in a horizontal scrolling row, and <code>floating: true</code> enables\na selection toolbar. <code>hiddenItems</code> hides command IDs or formatting input labels. Table\noperations are contextual to a table selection. Native selectors show current/default/mixed values.\nOn small screens the editing-command row scrolls horizontally to keep the toolbar compact;\nkeyboard focus automatically brings off-screen buttons into view.</p>\n<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [\n\t\t\t{ id: 'bold', label: 'Bold', command: 'bold', icon: 'bold' },\n\t\t\t{ id: 'undo', label: 'Undo', command: 'undo' },\n\t\t],\n\t},\n};\n</code></pre>\n<p>Toolbar buttons preserve the document selection on pointer interaction. Arrow/Home/End\nkeys move focus between enabled buttons. Mark buttons expose true/false/mixed pressed state.\nShortcuts use ProseMirror's Mod key: bold, italic, underline, undo/redo, indent/outdent.\nShift+Enter inserts a hard break. Native dialogs provide focus containment and Escape closure.</p>\n<p>Override dialog presentation with <code>provideEditraDialogs({ open, close })</code> from <code>ngx-editra</code>.\nThe default presenter uses showModal/close. Custom presenters must preserve focus containment,\nEscape behavior and focus return. Dialog contents and editor commands remain owned by the library.</p>\n",
		headings: [
			{
				id: 'colour-and-highlight-palettes',
				label: 'Colour and highlight palettes',
			},
			{
				id: 'layout-and-customisation',
				label: 'Layout and customisation',
			},
		],
		blocks: [
			{
				html: '<h1 id="toolbar">Toolbar</h1>\n',
				id: 'toolbar',
				kind: 'content',
			},
			{
				html: '<p>The toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,\nlists, indentation, media/link dialogs, tables, find/replace and fullscreen.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="colour-and-highlight-palettes">Colour and highlight palettes</h2>\n',
				id: 'colour-and-highlight-palettes',
				kind: 'content',
			},
			{
				html: "<p>Font colour and text highlight use Word-style split buttons: the main icon applies the\ncurrent/last-used colour, and the arrow opens an anchored palette. With no font colour selected,\nthe main action is theme-aware Automatic. Font/cell palettes include\ntheme shades and standard colours. Highlight offers familiar highlighter colours.\nRecent colours, custom hex values and a native More colours picker are available.\nAutomatic removes the text-colour mark; No colour removes highlighting; No fill clears cell shading.\nChoosing a colour replaces that mark's value and preserves other formatting and the document selection.\nApplying the same colour does not toggle it off. Caret-only changes affect subsequent typing.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Palette swatches support arrow/Home/End navigation, Enter activation and Escape closure.\nOutside clicks or moving focus out close the palette. Controls follow disabled/read-only states.\nThe public EditraColourPickerComponent exposes label, kind, value and disabled inputs;\ncolourChange emits a validated colour or null, and opened/closed events let adapters preserve selection.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="layout-and-customisation">Layout and customisation</h2>\n',
				id: 'layout-and-customisation',
				kind: 'content',
			},
			{
				html: '<p><code>config.toolbar.hidden</code> hides the complete toolbar. <code>config.toolbar.items</code> replaces the\ncommand-button list. Each item has <code>id</code>, <code>label</code>, <code>command</code> and an optional <code>icon</code>.\nBuilt-in actions use local SVG icons rather than text buttons. Buttons retain accessible labels,\ntooltips, selection preservation and disabled/active/mixed states. The default layout separates\nnative formatting selectors and insertion tools from grouped editing commands.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p><code>icon</code> accepts a built-in icon name such as <code>bold</code>, <code>link</code>, <code>image</code> or <code>find</code>; omitted icons\nare inferred from the command. Existing plain-text custom glyphs such as <code>★</code> remain supported.\nUnknown custom commands use an extension icon. SVG strings are never interpreted as markup.\n<code>editraIconNames</code> and the <code>EditraIconName</code> type are exported from <code>ngx-editra</code> for discovery;\n<code>EditraIconComponent</code> is available for custom Angular UI. Icons inherit currentColor and work\nwithout fonts, external requests or a third-party icon dependency.\nExtension toolbar contributions are appended. <code>groups</code> supplies labeled command groups,\n<code>overflow: 'scroll'</code> keeps them in a horizontal scrolling row, and <code>floating: true</code> enables\na selection toolbar. <code>hiddenItems</code> hides command IDs or formatting input labels. Table\noperations are contextual to a table selection. Native selectors show current/default/mixed values.\nOn small screens the editing-command row scrolls horizontally to keep the toolbar compact;\nkeyboard focus automatically brings off-screen buttons into view.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: "<pre><code class=\"language-typescript\">import type { EditraConfig } from 'ngx-editra';\nexport const config: EditraConfig = {\n\ttoolbar: {\n\t\titems: [\n\t\t\t{ id: 'bold', label: 'Bold', command: 'bold', icon: 'bold' },\n\t\t\t{ id: 'undo', label: 'Undo', command: 'undo' },\n\t\t],\n\t},\n};\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: "<p>Toolbar buttons preserve the document selection on pointer interaction. Arrow/Home/End\nkeys move focus between enabled buttons. Mark buttons expose true/false/mixed pressed state.\nShortcuts use ProseMirror's Mod key: bold, italic, underline, undo/redo, indent/outdent.\nShift+Enter inserts a hard break. Native dialogs provide focus containment and Escape closure.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Override dialog presentation with <code>provideEditraDialogs({ open, close })</code> from <code>ngx-editra</code>.\nThe default presenter uses showModal/close. Custom presenters must preserve focus containment,\nEscape behavior and focus return. Dialog contents and editor commands remain owned by the library.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " toolbar\n\nthe toolbar includes text marks, history, block styles, fonts, sizes, colours, alignment,\nlists, indentation, media/link dialogs, tables, find/replace and fullscreen.\n\n colour and highlight palettes\n\nfont colour and text highlight use word-style split buttons: the main icon applies the\ncurrent/last-used colour, and the arrow opens an anchored palette. with no font colour selected,\nthe main action is theme-aware automatic. font/cell palettes include\ntheme shades and standard colours. highlight offers familiar highlighter colours.\nrecent colours, custom hex values and a native more colours picker are available.\nautomatic removes the text-colour mark; no colour removes highlighting; no fill clears cell shading.\nchoosing a colour replaces that mark's value and preserves other formatting and the document selection.\napplying the same colour does not toggle it off. caret-only changes affect subsequent typing.\n\npalette swatches support arrow/home/end navigation, enter activation and escape closure.\noutside clicks or moving focus out close the palette. controls follow disabled/read-only states.\nthe public editracolourpickercomponent exposes label, kind, value and disabled inputs;\ncolourchange emits a validated colour or null, and opened/closed events let adapters preserve selection.\n\n layout and customisation\n\nconfig.toolbar.hidden hides the complete toolbar. config.toolbar.items replaces the\ncommand-button list. each item has id, label, command and an optional icon.\nbuilt-in actions use local svg icons rather than text buttons. buttons retain accessible labels,\ntooltips, selection preservation and disabled/active/mixed states. the default layout separates\nnative formatting selectors and insertion tools from grouped editing commands.\n\nicon accepts a built-in icon name such as bold, link, image or find; omitted icons\nare inferred from the command. existing plain-text custom glyphs such as ★ remain supported.\nunknown custom commands use an extension icon. svg strings are never interpreted as markup.\neditraiconnames and the editraiconname type are exported from ngx-editra for discovery;\neditraiconcomponent is available for custom angular ui. icons inherit currentcolor and work\nwithout fonts, external requests or a third-party icon dependency.\nextension toolbar contributions are appended. groups supplies labeled command groups,\noverflow: 'scroll' keeps them in a horizontal scrolling row, and floating: true enables\na selection toolbar. hiddenitems hides command ids or formatting input labels. table\noperations are contextual to a table selection. native selectors show current/default/mixed values.\non small screens the editing-command row scrolls horizontally to keep the toolbar compact;\nkeyboard focus automatically brings off-screen buttons into view.\n\ntypescript\nimport type { editraconfig } from 'ngx-editra';\nexport const config: editraconfig = {\n\ttoolbar: {\n\t\titems: [\n\t\t\t{ id: 'bold', label: 'bold', command: 'bold', icon: 'bold' },\n\t\t\t{ id: 'undo', label: 'undo', command: 'undo' },\n\t\t],\n\t},\n};\n\n\ntoolbar buttons preserve the document selection on pointer interaction. arrow/home/end\nkeys move focus between enabled buttons. mark buttons expose true/false/mixed pressed state.\nshortcuts use prosemirror's mod key: bold, italic, underline, undo/redo, indent/outdent.\nshift+enter inserts a hard break. native dialogs provide focus containment and escape closure.\n\noverride dialog presentation with provideeditradialogs({ open, close }) from ngx-editra.\nthe default presenter uses showmodal/close. custom presenters must preserve focus containment,\nescape behavior and focus return. dialog contents and editor commands remain owned by the library.\n",
	},
	{
		slug: 'theming',
		title: 'Theming',
		group: 'Build with Editra',
		source: 'docs/THEMING.md',
		html: '<h1 id="theming">Theming</h1>\n<p>Choose light, dark or auto (prefers-color-scheme) through config.theme. Styles are scoped to the\nAngular editor; the public ProseMirror stylesheet targets only editor-generated class names.</p>\n<p>Override CSS custom properties on editra-editor: --editra-surface, --editra-text,\n--editra-border, --editra-active and --editra-focus. Preserve contrast and visible focus.\nFonts are constrained to Arial, Georgia, Verdana, Times New Roman and monospace.\nToolbar icons are text/unicode, never arbitrary HTML.</p>\n<p>The UI respects reduced motion, wraps on narrow screens, and provides 36px editor controls.\nWCAG automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="theming">Theming</h1>\n',
				id: 'theming',
				kind: 'content',
			},
			{
				html: '<p>Choose light, dark or auto (prefers-color-scheme) through config.theme. Styles are scoped to the\nAngular editor; the public ProseMirror stylesheet targets only editor-generated class names.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Override CSS custom properties on editra-editor: --editra-surface, --editra-text,\n--editra-border, --editra-active and --editra-focus. Preserve contrast and visible focus.\nFonts are constrained to Arial, Georgia, Verdana, Times New Roman and monospace.\nToolbar icons are text/unicode, never arbitrary HTML.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The UI respects reduced motion, wraps on narrow screens, and provides 36px editor controls.\nWCAG automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' theming\n\nchoose light, dark or auto (prefers-color-scheme) through config.theme. styles are scoped to the\nangular editor; the public prosemirror stylesheet targets only editor-generated class names.\n\noverride css custom properties on editra-editor: --editra-surface, --editra-text,\n--editra-border, --editra-active and --editra-focus. preserve contrast and visible focus.\nfonts are constrained to arial, georgia, verdana, times new roman and monospace.\ntoolbar icons are text/unicode, never arbitrary html.\n\nthe ui respects reduced motion, wraps on narrow screens, and provides 36px editor controls.\nwcag automated checks are supplemented by browser keyboard tests, not a full screen-reader audit.\n',
	},
	{
		slug: 'images',
		title: 'Images',
		group: 'Editor features',
		source: 'docs/IMAGES.md',
		html: '<h1 id="images">Images</h1>\n<p>Images are URL-only block nodes. The dialog supports HTTPS URL, alternative text, caption,\nwidth/height, alignment, border, radius, spacing, wrapping and aspect-ratio preservation.\nWidth and height start blank (Auto). With both blank, images use their natural size,\nlimited to the available content width. Choose Full content width to span the content area\nresponsively, or enter pixel dimensions for a custom size. Left/centre/right alignment\npositions the media itself; captions wrap within its width.\nSelect an image then reopen the dialog to edit/replace it; Delete selection removes it.\nPointer handles and arrow keys resize it through one persisted ProseMirror transaction.\nThe corner handle follows the image, supports horizontal and vertical dragging, and starts\nfrom its displayed size. Maintain aspect ratio enables proportional resizing; disabling it\nallows independent width/height changes. Resizing full-width media switches it to a custom\nsize. Escape/pointer cancellation restores the original size. Shift+Arrow uses a 1 px step.\nDimensions survive HTML/JSON round trips and undo/redo. Copy media URL uses the browser clipboard.</p>\n<p><code>imageExtension()</code> from <code>ngx-editra/extensions</code> supplies interactive node views. The default\nAngular adapter registers it; custom extension lists should register it explicitly.\n<code>config.image.enabled = false</code> removes the node from the schema. <code>pasteUrls</code> optionally\nconverts plain supported image URLs into images. Files, base64 uploads and file pickers are absent.</p>\n<p>A valid URL can still fail due to network errors, CORS/embedding policy, authentication or\nhotlink protection. Node views announce image load failure. The library cannot reliably\ndistinguish all remote causes. Captions export as figure/figcaption; image attributes are constrained.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="images">Images</h1>\n',
				id: 'images',
				kind: 'content',
			},
			{
				html: '<p>Images are URL-only block nodes. The dialog supports HTTPS URL, alternative text, caption,\nwidth/height, alignment, border, radius, spacing, wrapping and aspect-ratio preservation.\nWidth and height start blank (Auto). With both blank, images use their natural size,\nlimited to the available content width. Choose Full content width to span the content area\nresponsively, or enter pixel dimensions for a custom size. Left/centre/right alignment\npositions the media itself; captions wrap within its width.\nSelect an image then reopen the dialog to edit/replace it; Delete selection removes it.\nPointer handles and arrow keys resize it through one persisted ProseMirror transaction.\nThe corner handle follows the image, supports horizontal and vertical dragging, and starts\nfrom its displayed size. Maintain aspect ratio enables proportional resizing; disabling it\nallows independent width/height changes. Resizing full-width media switches it to a custom\nsize. Escape/pointer cancellation restores the original size. Shift+Arrow uses a 1 px step.\nDimensions survive HTML/JSON round trips and undo/redo. Copy media URL uses the browser clipboard.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p><code>imageExtension()</code> from <code>ngx-editra/extensions</code> supplies interactive node views. The default\nAngular adapter registers it; custom extension lists should register it explicitly.\n<code>config.image.enabled = false</code> removes the node from the schema. <code>pasteUrls</code> optionally\nconverts plain supported image URLs into images. Files, base64 uploads and file pickers are absent.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>A valid URL can still fail due to network errors, CORS/embedding policy, authentication or\nhotlink protection. Node views announce image load failure. The library cannot reliably\ndistinguish all remote causes. Captions export as figure/figcaption; image attributes are constrained.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' images\n\nimages are url-only block nodes. the dialog supports https url, alternative text, caption,\nwidth/height, alignment, border, radius, spacing, wrapping and aspect-ratio preservation.\nwidth and height start blank (auto). with both blank, images use their natural size,\nlimited to the available content width. choose full content width to span the content area\nresponsively, or enter pixel dimensions for a custom size. left/centre/right alignment\npositions the media itself; captions wrap within its width.\nselect an image then reopen the dialog to edit/replace it; delete selection removes it.\npointer handles and arrow keys resize it through one persisted prosemirror transaction.\nthe corner handle follows the image, supports horizontal and vertical dragging, and starts\nfrom its displayed size. maintain aspect ratio enables proportional resizing; disabling it\nallows independent width/height changes. resizing full-width media switches it to a custom\nsize. escape/pointer cancellation restores the original size. shift+arrow uses a 1 px step.\ndimensions survive html/json round trips and undo/redo. copy media url uses the browser clipboard.\n\nimageextension() from ngx-editra/extensions supplies interactive node views. the default\nangular adapter registers it; custom extension lists should register it explicitly.\nconfig.image.enabled = false removes the node from the schema. pasteurls optionally\nconverts plain supported image urls into images. files, base64 uploads and file pickers are absent.\n\na valid url can still fail due to network errors, cors/embedding policy, authentication or\nhotlink protection. node views announce image load failure. the library cannot reliably\ndistinguish all remote causes. captions export as figure/figcaption; image attributes are constrained.\n',
	},
	{
		slug: 'videos',
		title: 'Videos',
		group: 'Editor features',
		source: 'docs/VIDEOS.md',
		html: "<h1 id=\"videos\">Videos</h1>\n<p>Supported public URLs: YouTube watch/shortened/Shorts URLs with valid video IDs, numeric Vimeo\nURLs and direct MP4 paths. Other providers require explicit registration. Original URL is persisted\nalongside canonical provider-generated embedding. Unsupported providers/paths produce dialog errors.</p>\n<p>The video dialog edits URL, dimensions, alignment, caption, aspect ratio and direct playback controls.\nWidth and height start blank (Auto). Direct video uses its intrinsic size once metadata loads;\nprovider embeds use a responsive preview up to 640 px wide with a 16:9 default ratio.\nThese preview defaults are not written as fixed document dimensions. Full content width\nfills the content area responsively. Left/centre/right alignment positions custom or automatic sizes.\n<code>videoExtension()</code> supplies pointer/keyboard resizing. Responsive CSS constrains width to the editor.\nThe corner handle follows the video and resizes from its displayed dimensions. Maintain aspect\nratio preserves proportions; disabling it allows independent width/height changes. A drag commits\none undoable transaction; Escape cancels. Resizing full-width video switches to a saved custom size.\nEmbeds load lazily; direct video uses metadata preload. Successful embedding/playback is not\nguaranteed by syntactic URL validity. There is no upload or automatic autoplay.</p>\n<pre><code class=\"language-typescript\">import type { EditraVideoProvider } from 'ngx-editra';\nexport const provider: EditraVideoProvider = {\n\tid: 'example',\n\tembedOrigins: ['https://media.example.com'],\n\tmatches: (url) =&gt; url.hostname === 'media.example.com' &amp;&amp; /^\\/watch\\/\\d+$/.test(url.pathname),\n\tgetEmbedUrl: (url) =&gt;\n\t\tnew URL(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),\n};\n// Register with config.video.providers = [provider].\n</code></pre>\n<p>Provider code is trusted and must follow exact-host/path restrictions. See SECURITY.md for CSP.</p>\n",
		headings: [],
		blocks: [
			{
				html: '<h1 id="videos">Videos</h1>\n',
				id: 'videos',
				kind: 'content',
			},
			{
				html: '<p>Supported public URLs: YouTube watch/shortened/Shorts URLs with valid video IDs, numeric Vimeo\nURLs and direct MP4 paths. Other providers require explicit registration. Original URL is persisted\nalongside canonical provider-generated embedding. Unsupported providers/paths produce dialog errors.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The video dialog edits URL, dimensions, alignment, caption, aspect ratio and direct playback controls.\nWidth and height start blank (Auto). Direct video uses its intrinsic size once metadata loads;\nprovider embeds use a responsive preview up to 640 px wide with a 16:9 default ratio.\nThese preview defaults are not written as fixed document dimensions. Full content width\nfills the content area responsively. Left/centre/right alignment positions custom or automatic sizes.\n<code>videoExtension()</code> supplies pointer/keyboard resizing. Responsive CSS constrains width to the editor.\nThe corner handle follows the video and resizes from its displayed dimensions. Maintain aspect\nratio preserves proportions; disabling it allows independent width/height changes. A drag commits\none undoable transaction; Escape cancels. Resizing full-width video switches to a saved custom size.\nEmbeds load lazily; direct video uses metadata preload. Successful embedding/playback is not\nguaranteed by syntactic URL validity. There is no upload or automatic autoplay.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<pre><code class=\"language-typescript\">import type { EditraVideoProvider } from 'ngx-editra';\nexport const provider: EditraVideoProvider = {\n\tid: 'example',\n\tembedOrigins: ['https://media.example.com'],\n\tmatches: (url) =&gt; url.hostname === 'media.example.com' &amp;&amp; /^\\/watch\\/\\d+$/.test(url.pathname),\n\tgetEmbedUrl: (url) =&gt;\n\t\tnew URL(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),\n};\n// Register with config.video.providers = [provider].\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Provider code is trusted and must follow exact-host/path restrictions. See SECURITY.md for CSP.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " videos\n\nsupported public urls: youtube watch/shortened/shorts urls with valid video ids, numeric vimeo\nurls and direct mp4 paths. other providers require explicit registration. original url is persisted\nalongside canonical provider-generated embedding. unsupported providers/paths produce dialog errors.\n\nthe video dialog edits url, dimensions, alignment, caption, aspect ratio and direct playback controls.\nwidth and height start blank (auto). direct video uses its intrinsic size once metadata loads;\nprovider embeds use a responsive preview up to 640 px wide with a 16:9 default ratio.\nthese preview defaults are not written as fixed document dimensions. full content width\nfills the content area responsively. left/centre/right alignment positions custom or automatic sizes.\nvideoextension() supplies pointer/keyboard resizing. responsive css constrains width to the editor.\nthe corner handle follows the video and resizes from its displayed dimensions. maintain aspect\nratio preserves proportions; disabling it allows independent width/height changes. a drag commits\none undoable transaction; escape cancels. resizing full-width video switches to a saved custom size.\nembeds load lazily; direct video uses metadata preload. successful embedding/playback is not\nguaranteed by syntactic url validity. there is no upload or automatic autoplay.\n\ntypescript\nimport type { editravideoprovider } from 'ngx-editra';\nexport const provider: editravideoprovider = {\n\tid: 'example',\n\tembedorigins: ['https://media.example.com'],\n\tmatches: (url) => url.hostname === 'media.example.com' && /^\\/watch\\/\\d+$/.test(url.pathname),\n\tgetembedurl: (url) =>\n\t\tnew url(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),\n};\n// register with config.video.providers = [provider].\n\n\nprovider code is trusted and must follow exact-host/path restrictions. see security.md for csp.\n",
	},
	{
		slug: 'tables',
		title: 'Tables',
		group: 'Editor features',
		source: 'docs/TABLES.md',
		html: '<h1 id="tables">Tables</h1>\n<p>Tables use prosemirror-tables for cell selection, span normalization, column resizing,\nTab/Shift+Tab navigation, copy/paste and history-aware operations.\nThe Word-style insertion picker previews a grid up to 10 columns by 8 rows. Clicking a cell\nor pressing Enter inserts immediately. Numeric rows/columns support larger sizes within the\nconfigured limits, with validation before insertion. The contextual menu supplements toolbar commands.\nCommands insert tables, add/remove rows/columns, delete tables, merge/split cells,\nand toggle header rows/columns. A contextual Table Layout ribbon supplies these actions,\ncell shading, AutoFit to page, and equal column distribution. More table settings contains\ntable border/width, minimum row height and a reset-row-heights action.\nCell text alignment uses the ordinary block alignment commands.</p>\n<p>Column widths, spans, row heights, table appearance and backgrounds are document attributes.\nSelect a table cell and drag its column borders or any point along a row border to\nresize; a guide and pixel readout preview the change, and release commits one history action.\nEscape or pointer cancellation discards the preview. Widths are assigned to logical columns,\nincluding cells with colspan/rowspan, rather than independently mutating table DOM.</p>\n<p>Resize boundaries have no visible icon. Tab focuses a boundary with a visible focus indicator.\nFocused column boundaries use Left/Right; row boundaries use Up/Down. Arrows adjust by 8 px;\nShift+Arrow adjusts by 1 px. Boundaries preserve keyboard focus during updates and are inactive\nin read-only/disabled editors. Row heights are minimums: content can require taller rows.\nGrip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.\nAll table and cell borders use the same 1 px thickness and #b8c2d0 colour. The table\'s\nsolid/dashed/none style applies to both outer and inner borders, including exported HTML.</p>\n<p>AutoFit to page removes fixed column widths. Distribute columns preserves the current rendered\ntable width and gives logical columns equal widths. Percentage width edits remove fixed widths\nso the percentage takes effect. Row heights and cell styles are retained by AutoFit.\nTable overflow is horizontal. Malformed imports are repaired with fixTables.\nInsertion defaults to 3×3, bounded by config.table.maxRows/maxColumns (50/20 defaults).</p>\n<p>Automated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,\nsave/reload, merged-cell dimensions, equal columns, AutoFit, quick insertion, shading and validation.\nBroader native clipboard and cross-browser/manual accessibility coverage remains release work.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="tables">Tables</h1>\n',
				id: 'tables',
				kind: 'content',
			},
			{
				html: '<p>Tables use prosemirror-tables for cell selection, span normalization, column resizing,\nTab/Shift+Tab navigation, copy/paste and history-aware operations.\nThe Word-style insertion picker previews a grid up to 10 columns by 8 rows. Clicking a cell\nor pressing Enter inserts immediately. Numeric rows/columns support larger sizes within the\nconfigured limits, with validation before insertion. The contextual menu supplements toolbar commands.\nCommands insert tables, add/remove rows/columns, delete tables, merge/split cells,\nand toggle header rows/columns. A contextual Table Layout ribbon supplies these actions,\ncell shading, AutoFit to page, and equal column distribution. More table settings contains\ntable border/width, minimum row height and a reset-row-heights action.\nCell text alignment uses the ordinary block alignment commands.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Column widths, spans, row heights, table appearance and backgrounds are document attributes.\nSelect a table cell and drag its column borders or any point along a row border to\nresize; a guide and pixel readout preview the change, and release commits one history action.\nEscape or pointer cancellation discards the preview. Widths are assigned to logical columns,\nincluding cells with colspan/rowspan, rather than independently mutating table DOM.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Resize boundaries have no visible icon. Tab focuses a boundary with a visible focus indicator.\nFocused column boundaries use Left/Right; row boundaries use Up/Down. Arrows adjust by 8 px;\nShift+Arrow adjusts by 1 px. Boundaries preserve keyboard focus during updates and are inactive\nin read-only/disabled editors. Row heights are minimums: content can require taller rows.\nGrip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.\nAll table and cell borders use the same 1 px thickness and #b8c2d0 colour. The table's\nsolid/dashed/none style applies to both outer and inner borders, including exported HTML.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>AutoFit to page removes fixed column widths. Distribute columns preserves the current rendered\ntable width and gives logical columns equal widths. Percentage width edits remove fixed widths\nso the percentage takes effect. Row heights and cell styles are retained by AutoFit.\nTable overflow is horizontal. Malformed imports are repaired with fixTables.\nInsertion defaults to 3×3, bounded by config.table.maxRows/maxColumns (50/20 defaults).</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Automated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,\nsave/reload, merged-cell dimensions, equal columns, AutoFit, quick insertion, shading and validation.\nBroader native clipboard and cross-browser/manual accessibility coverage remains release work.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " tables\n\ntables use prosemirror-tables for cell selection, span normalization, column resizing,\ntab/shift+tab navigation, copy/paste and history-aware operations.\nthe word-style insertion picker previews a grid up to 10 columns by 8 rows. clicking a cell\nor pressing enter inserts immediately. numeric rows/columns support larger sizes within the\nconfigured limits, with validation before insertion. the contextual menu supplements toolbar commands.\ncommands insert tables, add/remove rows/columns, delete tables, merge/split cells,\nand toggle header rows/columns. a contextual table layout ribbon supplies these actions,\ncell shading, autofit to page, and equal column distribution. more table settings contains\ntable border/width, minimum row height and a reset-row-heights action.\ncell text alignment uses the ordinary block alignment commands.\n\ncolumn widths, spans, row heights, table appearance and backgrounds are document attributes.\nselect a table cell and drag its column borders or any point along a row border to\nresize; a guide and pixel readout preview the change, and release commits one history action.\nescape or pointer cancellation discards the preview. widths are assigned to logical columns,\nincluding cells with colspan/rowspan, rather than independently mutating table dom.\n\nresize boundaries have no visible icon. tab focuses a boundary with a visible focus indicator.\nfocused column boundaries use left/right; row boundaries use up/down. arrows adjust by 8 px;\nshift+arrow adjusts by 1 px. boundaries preserve keyboard focus during updates and are inactive\nin read-only/disabled editors. row heights are minimums: content can require taller rows.\ngrip dimensions are bounded to 24–2000 px for rows and 48–4096 px for columns.\nall table and cell borders use the same 1 px thickness and b8c2d0 colour. the table's\nsolid/dashed/none style applies to both outer and inner borders, including exported html.\n\nautofit to page removes fixed column widths. distribute columns preserves the current rendered\ntable width and gives logical columns equal widths. percentage width edits remove fixed widths\nso the percentage takes effect. row heights and cell styles are retained by autofit.\ntable overflow is horizontal. malformed imports are repaired with fixtables.\ninsertion defaults to 3×3, bounded by config.table.maxrows/maxcolumns (50/20 defaults).\n\nautomated tests cover row/column pointer and keyboard resizing, cancellation, isolated undo,\nsave/reload, merged-cell dimensions, equal columns, autofit, quick insertion, shading and validation.\nbroader native clipboard and cross-browser/manual accessibility coverage remains release work.\n",
	},
	{
		slug: 'plugins',
		title: 'Extensions',
		group: 'Reference',
		source: 'docs/PLUGINS.md',
		html: "<h1 id=\"plugins-and-extensions\">Plugins and extensions</h1>\n<p><code>EditraExtension</code> supports unique IDs, explicit <code>requires</code>, schema nodes/marks, commands,\nkeyboard shortcuts, ProseMirror plugins, node views, toolbar items and browser lifecycle callbacks.\nDependencies are ordered before dependants while preserving deterministic registration order.\nDuplicate IDs/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.</p>\n<pre><code class=\"language-typescript\">import type { EditraExtension } from 'ngx-editra';\nimport { imageExtension, videoExtension } from 'ngx-editra/extensions';\nexport const greeting: EditraExtension = {\n\tid: 'greeting',\n\tcommands: () =&gt; ({\n\t\tgreeting: (state, dispatch) =&gt; {\n\t\t\tif (dispatch) dispatch(state.tr.insertText('Hello from an extension'));\n\t\t\treturn true;\n\t\t},\n\t}),\n\ttoolbar: [{ id: 'greeting', label: 'Insert greeting', command: 'greeting' }],\n};\nexport const extensions = [imageExtension(), videoExtension(), greeting];\n</code></pre>\n<p>Pass this list through config.extensions. Explicit lists replace default media node views.\nDispose extension resources in onDestroy; node views must implement destroy. Lifecycle callbacks\nare browser-only. Schema functions/serializers must be SSR-safe and extension code is trusted.\nBuilt-in HTML import handles the documented schema; custom nodes need their own import policy.\nCustom nodes can implement the SSR-safe <code>parseElement</code> hook, which receives a typed tag,\nattribute map, child nodes and text. Core tags and blocked executable subtrees take precedence.\nJSON imports pass through HTML normalization; a custom node needs both a serializer and a\nparseElement importer to round trip. A custom-node round-trip regression test covers this contract.</p>\n",
		headings: [],
		blocks: [
			{
				html: '<h1 id="plugins-and-extensions">Plugins and extensions</h1>\n',
				id: 'plugins-and-extensions',
				kind: 'content',
			},
			{
				html: '<p><code>EditraExtension</code> supports unique IDs, explicit <code>requires</code>, schema nodes/marks, commands,\nkeyboard shortcuts, ProseMirror plugins, node views, toolbar items and browser lifecycle callbacks.\nDependencies are ordered before dependants while preserving deterministic registration order.\nDuplicate IDs/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<pre><code class=\"language-typescript\">import type { EditraExtension } from 'ngx-editra';\nimport { imageExtension, videoExtension } from 'ngx-editra/extensions';\nexport const greeting: EditraExtension = {\n\tid: 'greeting',\n\tcommands: () =&gt; ({\n\t\tgreeting: (state, dispatch) =&gt; {\n\t\t\tif (dispatch) dispatch(state.tr.insertText('Hello from an extension'));\n\t\t\treturn true;\n\t\t},\n\t}),\n\ttoolbar: [{ id: 'greeting', label: 'Insert greeting', command: 'greeting' }],\n};\nexport const extensions = [imageExtension(), videoExtension(), greeting];\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Pass this list through config.extensions. Explicit lists replace default media node views.\nDispose extension resources in onDestroy; node views must implement destroy. Lifecycle callbacks\nare browser-only. Schema functions/serializers must be SSR-safe and extension code is trusted.\nBuilt-in HTML import handles the documented schema; custom nodes need their own import policy.\nCustom nodes can implement the SSR-safe <code>parseElement</code> hook, which receives a typed tag,\nattribute map, child nodes and text. Core tags and blocked executable subtrees take precedence.\nJSON imports pass through HTML normalization; a custom node needs both a serializer and a\nparseElement importer to round trip. A custom-node round-trip regression test covers this contract.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " plugins and extensions\n\neditraextension supports unique ids, explicit requires, schema nodes/marks, commands,\nkeyboard shortcuts, prosemirror plugins, node views, toolbar items and browser lifecycle callbacks.\ndependencies are ordered before dependants while preserving deterministic registration order.\nduplicate ids/schema names/commands/shortcuts/node views and missing/cyclic dependencies throw.\n\ntypescript\nimport type { editraextension } from 'ngx-editra';\nimport { imageextension, videoextension } from 'ngx-editra/extensions';\nexport const greeting: editraextension = {\n\tid: 'greeting',\n\tcommands: () => ({\n\t\tgreeting: (state, dispatch) => {\n\t\t\tif (dispatch) dispatch(state.tr.inserttext('hello from an extension'));\n\t\t\treturn true;\n\t\t},\n\t}),\n\ttoolbar: [{ id: 'greeting', label: 'insert greeting', command: 'greeting' }],\n};\nexport const extensions = [imageextension(), videoextension(), greeting];\n\n\npass this list through config.extensions. explicit lists replace default media node views.\ndispose extension resources in ondestroy; node views must implement destroy. lifecycle callbacks\nare browser-only. schema functions/serializers must be ssr-safe and extension code is trusted.\nbuilt-in html import handles the documented schema; custom nodes need their own import policy.\ncustom nodes can implement the ssr-safe parseelement hook, which receives a typed tag,\nattribute map, child nodes and text. core tags and blocked executable subtrees take precedence.\njson imports pass through html normalization; a custom node needs both a serializer and a\nparseelement importer to round trip. a custom-node round-trip regression test covers this contract.\n",
	},
	{
		slug: 'api',
		title: 'Public API',
		group: 'Reference',
		source: 'docs/API.md',
		html: '<h1 id="public-api">Public API</h1>\n<h2 id="package-entry-points">Package entry points</h2>\n<p><code>ngx-editra</code>: EditraEditorComponent, EditraToolbarComponent, EditraIconComponent, EditraColourPickerComponent,\neditraIconNames, EditraIconName, defaultToolbar, EDITRA_CONFIG,\nprovideEditra, EDITRA_DIALOG_PRESENTER, provideEditraDialogs and typed configuration/change/document/\nextension/provider/dialog presentation exports.</p>\n<p><code>ngx-editra/core</code>: EditraEngine, createSchema, createCommands, normalizeConfig, orderExtensions,\nparseHTML, serializeHTML, parseJSON, documentJSON, plainText, safeUrl, validateUrl, resolveVideo,\nsafeColor, safeFont, dimension, alignment, markActive/markStatus, cellBackground,\ntableAttribute, setParagraphAttribute, automaticLinks and typed contracts.</p>\n<p>Table dimension helpers: resizeTableRow, resizeTableColumns, setTableWidthPercent,\nfitTableToPage, distributeTableColumns and resetTableRowHeights. Resize helpers return validated\ntransactions or null; commands use the usual ProseMirror Command signature.</p>\n<p><code>ngx-editra/extensions</code>: imageExtension, videoExtension, importMarkdown, exportMarkdown.</p>\n<h2 id="media-document-attributes">Media document attributes</h2>\n<p>Image/video nodes use <code>width: 0</code> and <code>height: 0</code> for automatic sizing, or positive pixel\ndimensions for custom sizing. <code>fullWidth: true</code> fills the available content width responsively.\n<code>align</code> supports left/center/right positioning, and <code>aspect</code> controls proportional interactive\nresizing. A resize saves custom dimensions and sets <code>fullWidth</code> to false. These are document\nattributes, rather than global editor configuration options.</p>\n<h2 id="component-inputs">Component inputs</h2>\n<table>\n<thead>\n<tr>\n<th>Input</th>\n<th>Type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>config</code></td>\n<td><code>EditraConfig</code></td>\n<td>Immutable editor configuration.</td>\n</tr>\n<tr>\n<td><code>readonly</code></td>\n<td><code>boolean</code></td>\n<td>Display content without editing.</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>Enable semantic empty-document validation.</td>\n</tr>\n</tbody>\n</table>\n<p>Forms disabled state is set through the form API.</p>\n<h2 id="component-outputs">Component outputs</h2>\n<p>Outputs: contentChange ({html, document, text}), selectionChange ({from,to}), editorFocus,\neditorBlur, editorReady, editorDestroyed, editorError (Error), dirtyChange (boolean),\ntransactionState ({docChanged, selectionChanged, from, to, dirty}).\nSelection-only transactions never emit full contentChange.</p>\n<h2 id="instance-methods">Instance methods</h2>\n<table>\n<thead>\n<tr>\n<th>Method</th>\n<th>Return type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>getHTML()</code></td>\n<td><code>string</code></td>\n<td>Export canonical HTML.</td>\n</tr>\n<tr>\n<td><code>getText()</code></td>\n<td><code>string</code></td>\n<td>Export plain text including captions and image alt text.</td>\n</tr>\n<tr>\n<td><code>getJSON()</code></td>\n<td><code>EditraDocument</code></td>\n<td>Export the document model.</td>\n</tr>\n<tr>\n<td><code>getMarkdown()</code></td>\n<td><code>string</code></td>\n<td>Export Markdown under the documented conversion policy.</td>\n</tr>\n<tr>\n<td><code>setHTML(html: string)</code></td>\n<td><code>void</code></td>\n<td>Replace content using the HTML policy.</td>\n</tr>\n<tr>\n<td><code>setJSON(value: EditraDocument)</code></td>\n<td><code>void</code></td>\n<td>Validate and replace document content.</td>\n</tr>\n<tr>\n<td><code>setMarkdown(value: string)</code></td>\n<td><code>void</code></td>\n<td>Import Markdown.</td>\n</tr>\n<tr>\n<td><code>clear()</code></td>\n<td><code>void</code></td>\n<td>Clear content with editing history.</td>\n</tr>\n<tr>\n<td><code>focus()</code> / <code>blur()</code></td>\n<td><code>void</code></td>\n<td>Control browser editing focus.</td>\n</tr>\n<tr>\n<td><code>isEmpty()</code></td>\n<td><code>boolean</code></td>\n<td>Check semantic document emptiness.</td>\n</tr>\n<tr>\n<td><code>isDirty()</code></td>\n<td><code>boolean</code></td>\n<td>Check editor dirty state.</td>\n</tr>\n</tbody>\n</table>\n<p>Programmatic setters silently synchronize an attached form\ncontrol without marking it dirty or emitting contentChange/valueChanges.\nclear is a user-style transaction with history. DOM focus/blur are no-ops before browser activation.\nState/conversion getters and setters work during SSR. Plain text includes captions and image alt text;\ncounts use whitespace-separated words and Unicode code points, including block separators.\nsetJSON/setMarkdown can throw on invalid input;\nwriteValue/setHTML report parsing failures through editorError without destroying existing content.</p>\n<h2 id="core-engine">Core engine</h2>\n<p>Core EditraEngine is an imperative framework adapter API with a read-only EditorState getter and apply(Transaction).\nDo not mutate the Angular component\'s private engine. Use documented methods or extensions.</p>\n<h2 id="markdown-conversion-policy">Markdown conversion policy</h2>\n<p>CommonMark conversion supports its ordinary blocks/marks. Tables/videos export as safe raw HTML;\ncolour/font/size marks lose presentation. Raw HTML Markdown imports and custom nodes are not lossless.</p>\n',
		headings: [
			{
				id: 'package-entry-points',
				label: 'Package entry points',
			},
			{
				id: 'media-document-attributes',
				label: 'Media document attributes',
			},
			{
				id: 'component-inputs',
				label: 'Component inputs',
			},
			{
				id: 'component-outputs',
				label: 'Component outputs',
			},
			{
				id: 'instance-methods',
				label: 'Instance methods',
			},
			{
				id: 'core-engine',
				label: 'Core engine',
			},
			{
				id: 'markdown-conversion-policy',
				label: 'Markdown conversion policy',
			},
		],
		blocks: [
			{
				html: '<h1 id="public-api">Public API</h1>\n',
				id: 'public-api',
				kind: 'content',
			},
			{
				html: '<h2 id="package-entry-points">Package entry points</h2>\n',
				id: 'package-entry-points',
				kind: 'content',
			},
			{
				html: '<p><code>ngx-editra</code>: EditraEditorComponent, EditraToolbarComponent, EditraIconComponent, EditraColourPickerComponent,\neditraIconNames, EditraIconName, defaultToolbar, EDITRA_CONFIG,\nprovideEditra, EDITRA_DIALOG_PRESENTER, provideEditraDialogs and typed configuration/change/document/\nextension/provider/dialog presentation exports.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p><code>ngx-editra/core</code>: EditraEngine, createSchema, createCommands, normalizeConfig, orderExtensions,\nparseHTML, serializeHTML, parseJSON, documentJSON, plainText, safeUrl, validateUrl, resolveVideo,\nsafeColor, safeFont, dimension, alignment, markActive/markStatus, cellBackground,\ntableAttribute, setParagraphAttribute, automaticLinks and typed contracts.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Table dimension helpers: resizeTableRow, resizeTableColumns, setTableWidthPercent,\nfitTableToPage, distributeTableColumns and resetTableRowHeights. Resize helpers return validated\ntransactions or null; commands use the usual ProseMirror Command signature.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p><code>ngx-editra/extensions</code>: imageExtension, videoExtension, importMarkdown, exportMarkdown.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="media-document-attributes">Media document attributes</h2>\n',
				id: 'media-document-attributes',
				kind: 'content',
			},
			{
				html: '<p>Image/video nodes use <code>width: 0</code> and <code>height: 0</code> for automatic sizing, or positive pixel\ndimensions for custom sizing. <code>fullWidth: true</code> fills the available content width responsively.\n<code>align</code> supports left/center/right positioning, and <code>aspect</code> controls proportional interactive\nresizing. A resize saves custom dimensions and sets <code>fullWidth</code> to false. These are document\nattributes, rather than global editor configuration options.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="component-inputs">Component inputs</h2>\n',
				id: 'component-inputs',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Input</th>\n<th>Type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>config</code></td>\n<td><code>EditraConfig</code></td>\n<td>Immutable editor configuration.</td>\n</tr>\n<tr>\n<td><code>readonly</code></td>\n<td><code>boolean</code></td>\n<td>Display content without editing.</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>Enable semantic empty-document validation.</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Forms disabled state is set through the form API.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="component-outputs">Component outputs</h2>\n',
				id: 'component-outputs',
				kind: 'content',
			},
			{
				html: '<p>Outputs: contentChange ({html, document, text}), selectionChange ({from,to}), editorFocus,\neditorBlur, editorReady, editorDestroyed, editorError (Error), dirtyChange (boolean),\ntransactionState ({docChanged, selectionChanged, from, to, dirty}).\nSelection-only transactions never emit full contentChange.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="instance-methods">Instance methods</h2>\n',
				id: 'instance-methods',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Method</th>\n<th>Return type</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>getHTML()</code></td>\n<td><code>string</code></td>\n<td>Export canonical HTML.</td>\n</tr>\n<tr>\n<td><code>getText()</code></td>\n<td><code>string</code></td>\n<td>Export plain text including captions and image alt text.</td>\n</tr>\n<tr>\n<td><code>getJSON()</code></td>\n<td><code>EditraDocument</code></td>\n<td>Export the document model.</td>\n</tr>\n<tr>\n<td><code>getMarkdown()</code></td>\n<td><code>string</code></td>\n<td>Export Markdown under the documented conversion policy.</td>\n</tr>\n<tr>\n<td><code>setHTML(html: string)</code></td>\n<td><code>void</code></td>\n<td>Replace content using the HTML policy.</td>\n</tr>\n<tr>\n<td><code>setJSON(value: EditraDocument)</code></td>\n<td><code>void</code></td>\n<td>Validate and replace document content.</td>\n</tr>\n<tr>\n<td><code>setMarkdown(value: string)</code></td>\n<td><code>void</code></td>\n<td>Import Markdown.</td>\n</tr>\n<tr>\n<td><code>clear()</code></td>\n<td><code>void</code></td>\n<td>Clear content with editing history.</td>\n</tr>\n<tr>\n<td><code>focus()</code> / <code>blur()</code></td>\n<td><code>void</code></td>\n<td>Control browser editing focus.</td>\n</tr>\n<tr>\n<td><code>isEmpty()</code></td>\n<td><code>boolean</code></td>\n<td>Check semantic document emptiness.</td>\n</tr>\n<tr>\n<td><code>isDirty()</code></td>\n<td><code>boolean</code></td>\n<td>Check editor dirty state.</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Programmatic setters silently synchronize an attached form\ncontrol without marking it dirty or emitting contentChange/valueChanges.\nclear is a user-style transaction with history. DOM focus/blur are no-ops before browser activation.\nState/conversion getters and setters work during SSR. Plain text includes captions and image alt text;\ncounts use whitespace-separated words and Unicode code points, including block separators.\nsetJSON/setMarkdown can throw on invalid input;\nwriteValue/setHTML report parsing failures through editorError without destroying existing content.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="core-engine">Core engine</h2>\n',
				id: 'core-engine',
				kind: 'content',
			},
			{
				html: "<p>Core EditraEngine is an imperative framework adapter API with a read-only EditorState getter and apply(Transaction).\nDo not mutate the Angular component's private engine. Use documented methods or extensions.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="markdown-conversion-policy">Markdown conversion policy</h2>\n',
				id: 'markdown-conversion-policy',
				kind: 'content',
			},
			{
				html: '<p>CommonMark conversion supports its ordinary blocks/marks. Tables/videos export as safe raw HTML;\ncolour/font/size marks lose presentation. Raw HTML Markdown imports and custom nodes are not lossless.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " public api\n\n package entry points\n\nngx-editra: editraeditorcomponent, editratoolbarcomponent, editraiconcomponent, editracolourpickercomponent,\neditraiconnames, editraiconname, defaulttoolbar, editra_config,\nprovideeditra, editra_dialog_presenter, provideeditradialogs and typed configuration/change/document/\nextension/provider/dialog presentation exports.\n\nngx-editra/core: editraengine, createschema, createcommands, normalizeconfig, orderextensions,\nparsehtml, serializehtml, parsejson, documentjson, plaintext, safeurl, validateurl, resolvevideo,\nsafecolor, safefont, dimension, alignment, markactive/markstatus, cellbackground,\ntableattribute, setparagraphattribute, automaticlinks and typed contracts.\n\ntable dimension helpers: resizetablerow, resizetablecolumns, settablewidthpercent,\nfittabletopage, distributetablecolumns and resettablerowheights. resize helpers return validated\ntransactions or null; commands use the usual prosemirror command signature.\n\nngx-editra/extensions: imageextension, videoextension, importmarkdown, exportmarkdown.\n\n media document attributes\n\nimage/video nodes use width: 0 and height: 0 for automatic sizing, or positive pixel\ndimensions for custom sizing. fullwidth: true fills the available content width responsively.\nalign supports left/center/right positioning, and aspect controls proportional interactive\nresizing. a resize saves custom dimensions and sets fullwidth to false. these are document\nattributes, rather than global editor configuration options.\n\n component inputs\n\n| input      | type           | purpose                                    |\n| ---------- | -------------- | ------------------------------------------ |\n| config   | editraconfig | immutable editor configuration.            |\n| readonly | boolean      | display content without editing.           |\n| required | boolean      | enable semantic empty-document validation. |\n\nforms disabled state is set through the form api.\n\n component outputs\n\noutputs: contentchange ({html, document, text}), selectionchange ({from,to}), editorfocus,\neditorblur, editorready, editordestroyed, editorerror (error), dirtychange (boolean),\ntransactionstate ({docchanged, selectionchanged, from, to, dirty}).\nselection-only transactions never emit full contentchange.\n\n instance methods\n\n| method                           | return type      | purpose                                                  |\n| -------------------------------- | ---------------- | -------------------------------------------------------- |\n| gethtml()                      | string         | export canonical html.                                   |\n| gettext()                      | string         | export plain text including captions and image alt text. |\n| getjson()                      | editradocument | export the document model.                               |\n| getmarkdown()                  | string         | export markdown under the documented conversion policy.  |\n| sethtml(html: string)          | void           | replace content using the html policy.                   |\n| setjson(value: editradocument) | void           | validate and replace document content.                   |\n| setmarkdown(value: string)     | void           | import markdown.                                         |\n| clear()                        | void           | clear content with editing history.                      |\n| focus() / blur()             | void           | control browser editing focus.                           |\n| isempty()                      | boolean        | check semantic document emptiness.                       |\n| isdirty()                      | boolean        | check editor dirty state.                                |\n\nprogrammatic setters silently synchronize an attached form\ncontrol without marking it dirty or emitting contentchange/valuechanges.\nclear is a user-style transaction with history. dom focus/blur are no-ops before browser activation.\nstate/conversion getters and setters work during ssr. plain text includes captions and image alt text;\ncounts use whitespace-separated words and unicode code points, including block separators.\nsetjson/setmarkdown can throw on invalid input;\nwritevalue/sethtml report parsing failures through editorerror without destroying existing content.\n\n core engine\n\ncore editraengine is an imperative framework adapter api with a read-only editorstate getter and apply(transaction).\ndo not mutate the angular component's private engine. use documented methods or extensions.\n\n markdown conversion policy\n\ncommonmark conversion supports its ordinary blocks/marks. tables/videos export as safe raw html;\ncolour/font/size marks lose presentation. raw html markdown imports and custom nodes are not lossless.\n",
	},
	{
		slug: 'ssr',
		title: 'SSR & hydration',
		group: 'Reference',
		source: 'docs/SSR.md',
		html: '<h1 id="ssr-and-hydration">SSR and hydration</h1>\n<p>The core entry point is safe to import and construct without window, document, DOMParser\nor navigator. parse5 converts HTML to the canonical document on both server and browser.\nThe deterministic serializer uses escaped strings and validated schema attributes.</p>\n<p>The Angular component renders static content through Angular\'s HTML sanitization.\nAngular may strip styles and embedded iframes from the static representation. There is no\nsanitizer bypass. The canonical document still retains allowed attributes and media URLs.</p>\n<p>The component host has a static <code>ngSkipHydration</code> boundary. Angular hydrates the consuming\napplication, recreates that editor boundary and activates its ProseMirror view afterNextRender.\nThis deliberately avoids hydrating ProseMirror-managed DOM. Initial form content survives;\nstatic content is removed after activation and an empty browser surface owns the view.</p>\n<p>Enable your application\'s normal <code>provideClientHydration</code>/server rendering providers.\nAngular 18+ SSR bootstrap functions need the platform BootstrapContext, and patched newer\nrenderApplication APIs need explicit allowedHosts. The compatibility consumers demonstrate\nversion-specific server setup. Do not set browser globals on the server to hide errors.</p>\n<p>Editor DOM methods are no-ops before activation. Conversion/state methods work during SSR.\nExtension onCreate/onDestroy callbacks run for browser editor activation/destruction only.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="ssr-and-hydration">SSR and hydration</h1>\n',
				id: 'ssr-and-hydration',
				kind: 'content',
			},
			{
				html: '<p>The core entry point is safe to import and construct without window, document, DOMParser\nor navigator. parse5 converts HTML to the canonical document on both server and browser.\nThe deterministic serializer uses escaped strings and validated schema attributes.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>The Angular component renders static content through Angular's HTML sanitization.\nAngular may strip styles and embedded iframes from the static representation. There is no\nsanitizer bypass. The canonical document still retains allowed attributes and media URLs.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The component host has a static <code>ngSkipHydration</code> boundary. Angular hydrates the consuming\napplication, recreates that editor boundary and activates its ProseMirror view afterNextRender.\nThis deliberately avoids hydrating ProseMirror-managed DOM. Initial form content survives;\nstatic content is removed after activation and an empty browser surface owns the view.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Enable your application's normal <code>provideClientHydration</code>/server rendering providers.\nAngular 18+ SSR bootstrap functions need the platform BootstrapContext, and patched newer\nrenderApplication APIs need explicit allowedHosts. The compatibility consumers demonstrate\nversion-specific server setup. Do not set browser globals on the server to hide errors.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Editor DOM methods are no-ops before activation. Conversion/state methods work during SSR.\nExtension onCreate/onDestroy callbacks run for browser editor activation/destruction only.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " ssr and hydration\n\nthe core entry point is safe to import and construct without window, document, domparser\nor navigator. parse5 converts html to the canonical document on both server and browser.\nthe deterministic serializer uses escaped strings and validated schema attributes.\n\nthe angular component renders static content through angular's html sanitization.\nangular may strip styles and embedded iframes from the static representation. there is no\nsanitizer bypass. the canonical document still retains allowed attributes and media urls.\n\nthe component host has a static ngskiphydration boundary. angular hydrates the consuming\napplication, recreates that editor boundary and activates its prosemirror view afternextrender.\nthis deliberately avoids hydrating prosemirror-managed dom. initial form content survives;\nstatic content is removed after activation and an empty browser surface owns the view.\n\nenable your application's normal provideclienthydration/server rendering providers.\nangular 18+ ssr bootstrap functions need the platform bootstrapcontext, and patched newer\nrenderapplication apis need explicit allowedhosts. the compatibility consumers demonstrate\nversion-specific server setup. do not set browser globals on the server to hide errors.\n\neditor dom methods are no-ops before activation. conversion/state methods work during ssr.\nextension oncreate/ondestroy callbacks run for browser editor activation/destruction only.\n",
	},
	{
		slug: 'security',
		title: 'Security',
		group: 'Reference',
		source: 'docs/SECURITY.md',
		html: '<h1 id="content-policy-and-security">Content policy and security</h1>\n<p>All HTML is parsed with parse5 and reconstructed as supported schema nodes/marks.\nExecutable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicit\nattributes survive. Output text and attributes are escaped. HTML sanitization is not regex-based.\nRegexes are used only for constrained scalar validation, URL recognition and literal search.</p>\n<p>URLs require absolute HTTPS by default. HTTP is explicitly opt-in. Credentials, control/space\ncharacters, javascript/data/file URLs and unsupported providers are rejected. Links also\npermit mailto. New-tab links have noopener/noreferrer. CSS values are bounded numbers,\nenumerated alignments/borders, approved fonts, and hex/RGB colours; arbitrary CSS is dropped.</p>\n<p>YouTube/Vimeo match exact hostnames and paths and create canonical HTTPS iframe URLs.\nCustom providers must declare exact allowed embed origins. Iframes use a restricted sandbox,\nlazy loading, referrer policy and fullscreen/picture-in-picture permissions. No autoplay permission\nis granted. Providers are trusted application code, not user-controlled configuration.</p>\n<p>Suggested CSP policy additions for enabled features:</p>\n<pre><code class="language-text">frame-src https://www.youtube-nocookie.com https://player.vimeo.com;\nimg-src \'self\' https:;\nmedia-src \'self\' https:;\nstyle-src-attr \'unsafe-inline\';\n</code></pre>\n<p>Prefer narrower image/media origins for your application. Angular/application script and style\npolicies need their normal nonce/hash configuration. Generated content uses bounded inline style\nattributes, so style-src-attr must permit them; this does not require unsafe-inline scripts.\nApplications prohibiting style attributes need a class-based renderer to preserve all formatting.\nNever permit arbitrary frame origins.\nThird-party providers may have additional requirements and may block playback or embedding.</p>\n<p>Client sanitization is not a replacement for server validation, authorization or safe redisplay.\nRevalidate stored HTML/JSON on the server with the same content policy. Limits are one million\ninput characters and 100 nesting levels. Extension serializers/plugins are trusted application\ncode and need an independent audit; they must not emit unsafe tags/URLs or perform uploads.</p>\n<p>See <a href="https://angular.dev/best-practices/security">Angular security guidance</a> and\n<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr">CSP style attribute behavior</a>.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="content-policy-and-security">Content policy and security</h1>\n',
				id: 'content-policy-and-security',
				kind: 'content',
			},
			{
				html: '<p>All HTML is parsed with parse5 and reconstructed as supported schema nodes/marks.\nExecutable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicit\nattributes survive. Output text and attributes are escaped. HTML sanitization is not regex-based.\nRegexes are used only for constrained scalar validation, URL recognition and literal search.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>URLs require absolute HTTPS by default. HTTP is explicitly opt-in. Credentials, control/space\ncharacters, javascript/data/file URLs and unsupported providers are rejected. Links also\npermit mailto. New-tab links have noopener/noreferrer. CSS values are bounded numbers,\nenumerated alignments/borders, approved fonts, and hex/RGB colours; arbitrary CSS is dropped.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>YouTube/Vimeo match exact hostnames and paths and create canonical HTTPS iframe URLs.\nCustom providers must declare exact allowed embed origins. Iframes use a restricted sandbox,\nlazy loading, referrer policy and fullscreen/picture-in-picture permissions. No autoplay permission\nis granted. Providers are trusted application code, not user-controlled configuration.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Suggested CSP policy additions for enabled features:</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<pre><code class=\"language-text\">frame-src https://www.youtube-nocookie.com https://player.vimeo.com;\nimg-src 'self' https:;\nmedia-src 'self' https:;\nstyle-src-attr 'unsafe-inline';\n</code></pre>\n",
				id: '',
				kind: 'code',
			},
			{
				html: '<p>Prefer narrower image/media origins for your application. Angular/application script and style\npolicies need their normal nonce/hash configuration. Generated content uses bounded inline style\nattributes, so style-src-attr must permit them; this does not require unsafe-inline scripts.\nApplications prohibiting style attributes need a class-based renderer to preserve all formatting.\nNever permit arbitrary frame origins.\nThird-party providers may have additional requirements and may block playback or embedding.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Client sanitization is not a replacement for server validation, authorization or safe redisplay.\nRevalidate stored HTML/JSON on the server with the same content policy. Limits are one million\ninput characters and 100 nesting levels. Extension serializers/plugins are trusted application\ncode and need an independent audit; they must not emit unsafe tags/URLs or perform uploads.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>See <a href="https://angular.dev/best-practices/security">Angular security guidance</a> and\n<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr">CSP style attribute behavior</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: " content policy and security\n\nall html is parsed with parse5 and reconstructed as supported schema nodes/marks.\nexecutable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicit\nattributes survive. output text and attributes are escaped. html sanitization is not regex-based.\nregexes are used only for constrained scalar validation, url recognition and literal search.\n\nurls require absolute https by default. http is explicitly opt-in. credentials, control/space\ncharacters, javascript/data/file urls and unsupported providers are rejected. links also\npermit mailto. new-tab links have noopener/noreferrer. css values are bounded numbers,\nenumerated alignments/borders, approved fonts, and hex/rgb colours; arbitrary css is dropped.\n\nyoutube/vimeo match exact hostnames and paths and create canonical https iframe urls.\ncustom providers must declare exact allowed embed origins. iframes use a restricted sandbox,\nlazy loading, referrer policy and fullscreen/picture-in-picture permissions. no autoplay permission\nis granted. providers are trusted application code, not user-controlled configuration.\n\nsuggested csp policy additions for enabled features:\n\ntext\nframe-src https://www.youtube-nocookie.com https://player.vimeo.com;\nimg-src 'self' https:;\nmedia-src 'self' https:;\nstyle-src-attr 'unsafe-inline';\n\n\nprefer narrower image/media origins for your application. angular/application script and style\npolicies need their normal nonce/hash configuration. generated content uses bounded inline style\nattributes, so style-src-attr must permit them; this does not require unsafe-inline scripts.\napplications prohibiting style attributes need a class-based renderer to preserve all formatting.\nnever permit arbitrary frame origins.\nthird-party providers may have additional requirements and may block playback or embedding.\n\nclient sanitization is not a replacement for server validation, authorization or safe redisplay.\nrevalidate stored html/json on the server with the same content policy. limits are one million\ninput characters and 100 nesting levels. extension serializers/plugins are trusted application\ncode and need an independent audit; they must not emit unsafe tags/urls or perform uploads.\n\nsee [angular security guidance](https://angular.dev/best-practices/security) and\n[csp style attribute behavior](https://developer.mozilla.org/en-us/docs/web/http/reference/headers/content-security-policy/style-src-attr).\n",
	},
	{
		slug: 'compatibility',
		title: 'Compatibility',
		group: 'Reference',
		source: 'docs/COMPATIBILITY.md',
		html: '<p>﻿# Compatibility evidence</p>\n<p>The package is compiled with Angular 17 APIs and partial-Ivy. The exact installed tarball\nwas validated in independent applications with normal npm peer resolution and isolated tooling.</p>\n<table>\n<thead>\n<tr>\n<th>Angular</th>\n<th>Node</th>\n<th>TypeScript</th>\n<th>Production build</th>\n<th>Forms</th>\n<th>SSR</th>\n<th>Hydration boundary activation</th>\n<th>Browser E2E</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>17.3.12</td>\n<td>20.20.2</td>\n<td>5.4.5</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>18.2.14</td>\n<td>20.20.2</td>\n<td>5.5.4</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>19.2.25</td>\n<td>20.20.2</td>\n<td>5.8.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>20.3.33</td>\n<td>20.20.2</td>\n<td>5.9.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>21.2.25</td>\n<td>24.21.0</td>\n<td>5.9.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>22.2.2</td>\n<td>24.21.0</td>\n<td>6.0.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n</tbody>\n</table>\n<p>Tests exercise reactive forms, reset, disabled/read-only mode, repeated mounting, selection formatting,\nsecurity rejection, URL media, tables, themes, mobile layout, axe accessibility, server HTML and browser\nactivation without duplicate nodes or browser console/runtime errors. Media responses are mocked;\nthis establishes integration and canonical URLs, not external provider availability.</p>\n<p>The editor host deliberately uses ngSkipHydration. The surrounding application hydrates;\nProseMirror-managed DOM is activated after rendering rather than hydrated directly.</p>\n<p>Peer ranges begin at tested patch versions: ^17.3.12 || ^18.2.14 || ^19.2.25 || ^20.3.33 ||\n^21.2.25 || ^22.2.2. Future patches/minors rely on SemVer expectations and should remain in CI;\nolder patches and future Angular majors are not claimed as verified.</p>\n<p>Machine-readable results: artifacts/compatibility-results.json and per-version E2E reports.\nThe separate playground suite passed 21 tests and the core/Angular suite passed 41 tests.\nThe consumer suite includes colour palettes, quick table insertion, pointer/keyboard row and column\nresizing, isolated undo, save/reload, merged cells, AutoFit, and light/dark/mobile accessibility.\nIt also covers automatic image/video dimensions, fitted alignment, full-content-width mode,\niframe pointer resizing, independent dimensions, responsive media and actual MP4 metadata.\nThe maintained Angular 22 production graph\'s npm audit reported zero vulnerabilities at validation time.\nGitHub Actions is configured but has not executed remotely in this environment.</p>\n<p>To rerun, set EDITRA_NPM_CLI to npm\'s JavaScript CLI, EDITRA_NODE20 and EDITRA_NODE24 to\nappropriate executables, optionally EDITRA_BROWSER to an installed Chromium browser, then\nrun npm run test:compatibility. Each consumer has its own package-lock.json. When validating\nunchanged consumers, npm ci installs the existing lockfile; the runner uses npm install to refresh\nan explicitly supplied newly built tarball. Candidate-only peer bypass requires explicit\nEDITRA_CANDIDATE_PEERS=1 and is not used for the final report.</p>\n<p>Legacy Angular and Node versions have reached end of support. Compatibility is not a\nsecurity-maintenance guarantee. Runtime/compiler ranges are based on the\n<a href="https://angular.dev/reference/versions">official Angular table</a>.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<p>﻿# Compatibility evidence</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The package is compiled with Angular 17 APIs and partial-Ivy. The exact installed tarball\nwas validated in independent applications with normal npm peer resolution and isolated tooling.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<table>\n<thead>\n<tr>\n<th>Angular</th>\n<th>Node</th>\n<th>TypeScript</th>\n<th>Production build</th>\n<th>Forms</th>\n<th>SSR</th>\n<th>Hydration boundary activation</th>\n<th>Browser E2E</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>17.3.12</td>\n<td>20.20.2</td>\n<td>5.4.5</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>18.2.14</td>\n<td>20.20.2</td>\n<td>5.5.4</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>19.2.25</td>\n<td>20.20.2</td>\n<td>5.8.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>20.3.33</td>\n<td>20.20.2</td>\n<td>5.9.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>21.2.25</td>\n<td>24.21.0</td>\n<td>5.9.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n<tr>\n<td>22.2.2</td>\n<td>24.21.0</td>\n<td>6.0.3</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>Pass</td>\n<td>16 passed</td>\n</tr>\n</tbody>\n</table>\n',
				id: '',
				kind: 'table',
			},
			{
				html: '<p>Tests exercise reactive forms, reset, disabled/read-only mode, repeated mounting, selection formatting,\nsecurity rejection, URL media, tables, themes, mobile layout, axe accessibility, server HTML and browser\nactivation without duplicate nodes or browser console/runtime errors. Media responses are mocked;\nthis establishes integration and canonical URLs, not external provider availability.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>The editor host deliberately uses ngSkipHydration. The surrounding application hydrates;\nProseMirror-managed DOM is activated after rendering rather than hydrated directly.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Peer ranges begin at tested patch versions: ^17.3.12 || ^18.2.14 || ^19.2.25 || ^20.3.33 ||\n^21.2.25 || ^22.2.2. Future patches/minors rely on SemVer expectations and should remain in CI;\nolder patches and future Angular majors are not claimed as verified.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: "<p>Machine-readable results: artifacts/compatibility-results.json and per-version E2E reports.\nThe separate playground suite passed 21 tests and the core/Angular suite passed 41 tests.\nThe consumer suite includes colour palettes, quick table insertion, pointer/keyboard row and column\nresizing, isolated undo, save/reload, merged cells, AutoFit, and light/dark/mobile accessibility.\nIt also covers automatic image/video dimensions, fitted alignment, full-content-width mode,\niframe pointer resizing, independent dimensions, responsive media and actual MP4 metadata.\nThe maintained Angular 22 production graph's npm audit reported zero vulnerabilities at validation time.\nGitHub Actions is configured but has not executed remotely in this environment.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: "<p>To rerun, set EDITRA_NPM_CLI to npm's JavaScript CLI, EDITRA_NODE20 and EDITRA_NODE24 to\nappropriate executables, optionally EDITRA_BROWSER to an installed Chromium browser, then\nrun npm run test:compatibility. Each consumer has its own package-lock.json. When validating\nunchanged consumers, npm ci installs the existing lockfile; the runner uses npm install to refresh\nan explicitly supplied newly built tarball. Candidate-only peer bypass requires explicit\nEDITRA_CANDIDATE_PEERS=1 and is not used for the final report.</p>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Legacy Angular and Node versions have reached end of support. Compatibility is not a\nsecurity-maintenance guarantee. Runtime/compiler ranges are based on the\n<a href="https://angular.dev/reference/versions">official Angular table</a>.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: "﻿ compatibility evidence\n\nthe package is compiled with angular 17 apis and partial-ivy. the exact installed tarball\nwas validated in independent applications with normal npm peer resolution and isolated tooling.\n\n| angular | node    | typescript | production build | forms | ssr  | hydration boundary activation | browser e2e |\n| ------- | ------- | ---------- | ---------------- | ----- | ---- | ----------------------------- | ----------- |\n| 17.3.12 | 20.20.2 | 5.4.5      | pass             | pass  | pass | pass                          | 16 passed   |\n| 18.2.14 | 20.20.2 | 5.5.4      | pass             | pass  | pass | pass                          | 16 passed   |\n| 19.2.25 | 20.20.2 | 5.8.3      | pass             | pass  | pass | pass                          | 16 passed   |\n| 20.3.33 | 20.20.2 | 5.9.3      | pass             | pass  | pass | pass                          | 16 passed   |\n| 21.2.25 | 24.21.0 | 5.9.3      | pass             | pass  | pass | pass                          | 16 passed   |\n| 22.2.2  | 24.21.0 | 6.0.3      | pass             | pass  | pass | pass                          | 16 passed   |\n\ntests exercise reactive forms, reset, disabled/read-only mode, repeated mounting, selection formatting,\nsecurity rejection, url media, tables, themes, mobile layout, axe accessibility, server html and browser\nactivation without duplicate nodes or browser console/runtime errors. media responses are mocked;\nthis establishes integration and canonical urls, not external provider availability.\n\nthe editor host deliberately uses ngskiphydration. the surrounding application hydrates;\nprosemirror-managed dom is activated after rendering rather than hydrated directly.\n\npeer ranges begin at tested patch versions: ^17.3.12 || ^18.2.14 || ^19.2.25 || ^20.3.33 ||\n^21.2.25 || ^22.2.2. future patches/minors rely on semver expectations and should remain in ci;\nolder patches and future angular majors are not claimed as verified.\n\nmachine-readable results: artifacts/compatibility-results.json and per-version e2e reports.\nthe separate playground suite passed 21 tests and the core/angular suite passed 41 tests.\nthe consumer suite includes colour palettes, quick table insertion, pointer/keyboard row and column\nresizing, isolated undo, save/reload, merged cells, autofit, and light/dark/mobile accessibility.\nit also covers automatic image/video dimensions, fitted alignment, full-content-width mode,\niframe pointer resizing, independent dimensions, responsive media and actual mp4 metadata.\nthe maintained angular 22 production graph's npm audit reported zero vulnerabilities at validation time.\ngithub actions is configured but has not executed remotely in this environment.\n\nto rerun, set editra_npm_cli to npm's javascript cli, editra_node20 and editra_node24 to\nappropriate executables, optionally editra_browser to an installed chromium browser, then\nrun npm run test:compatibility. each consumer has its own package-lock.json. when validating\nunchanged consumers, npm ci installs the existing lockfile; the runner uses npm install to refresh\nan explicitly supplied newly built tarball. candidate-only peer bypass requires explicit\neditra_candidate_peers=1 and is not used for the final report.\n\nlegacy angular and node versions have reached end of support. compatibility is not a\nsecurity-maintenance guarantee. runtime/compiler ranges are based on the\n[official angular table](https://angular.dev/reference/versions).\n",
	},
	{
		slug: 'releasing',
		title: 'Release process',
		group: 'Project',
		source: 'docs/RELEASING.md',
		html: '<h1 id="release-preparation">Release preparation</h1>\n<ol>\n<li>Run the validation commands in CONTRIBUTING.md and complete the outstanding acceptance\ncriteria in PROGRESS.md. Do not call this alpha a stable release.</li>\n<li>Update package version, changelog, consumer tarball paths and any demonstrated peer ranges.</li>\n<li>Run npm run pack (production build, dry-run package validation and actual tarball).</li>\n<li>Install that exact tarball into independent consumers; run the full compatibility matrix.</li>\n<li>Confirm README, LICENSE, public declarations, core/extensions exports and SCSS are in the archive.</li>\n<li>Verify package-name ownership and npm account permissions immediately before publication.</li>\n<li>After explicit owner authorization, publish from dist/ngx-editra with an appropriate prerelease tag:</li>\n</ol>\n<pre><code class="language-sh">npm publish --tag next\n</code></pre>\n<p>No workflow publishes automatically. GitHub Actions prepares validation evidence and archives.\nThe npm names checked during development were unregistered; that does not reserve a name or scope.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="release-preparation">Release preparation</h1>\n',
				id: 'release-preparation',
				kind: 'content',
			},
			{
				html: '<ol>\n<li>Run the validation commands in CONTRIBUTING.md and complete the outstanding acceptance\ncriteria in PROGRESS.md. Do not call this alpha a stable release.</li>\n<li>Update package version, changelog, consumer tarball paths and any demonstrated peer ranges.</li>\n<li>Run npm run pack (production build, dry-run package validation and actual tarball).</li>\n<li>Install that exact tarball into independent consumers; run the full compatibility matrix.</li>\n<li>Confirm README, LICENSE, public declarations, core/extensions exports and SCSS are in the archive.</li>\n<li>Verify package-name ownership and npm account permissions immediately before publication.</li>\n<li>After explicit owner authorization, publish from dist/ngx-editra with an appropriate prerelease tag:</li>\n</ol>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<pre><code class="language-sh">npm publish --tag next\n</code></pre>\n',
				id: '',
				kind: 'code',
			},
			{
				html: '<p>No workflow publishes automatically. GitHub Actions prepares validation evidence and archives.\nThe npm names checked during development were unregistered; that does not reserve a name or scope.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' release preparation\n\n1. run the validation commands in contributing.md and complete the outstanding acceptance\n   criteria in progress.md. do not call this alpha a stable release.\n2. update package version, changelog, consumer tarball paths and any demonstrated peer ranges.\n3. run npm run pack (production build, dry-run package validation and actual tarball).\n4. install that exact tarball into independent consumers; run the full compatibility matrix.\n5. confirm readme, license, public declarations, core/extensions exports and scss are in the archive.\n6. verify package-name ownership and npm account permissions immediately before publication.\n7. after explicit owner authorization, publish from dist/ngx-editra with an appropriate prerelease tag:\n\nsh\nnpm publish --tag next\n\n\nno workflow publishes automatically. github actions prepares validation evidence and archives.\nthe npm names checked during development were unregistered; that does not reserve a name or scope.\n',
	},
	{
		slug: 'project-status',
		title: 'Project status',
		group: 'Project',
		source: 'PROGRESS.md',
		html: '<p>﻿# Progress</p>\n<h2 id="status">Status</h2>\n<p>Milestones 1–5 have working implementations and passed automated regression and normal-peer\nconsumer validation. Milestone 6 is not complete; this is an alpha release.\nNo package has been published and no stable-release claim is made.</p>\n<h2 id="implemented">Implemented</h2>\n<ul>\n<li>\n<p>Documentation application with generated Markdown guides, search, routed pages, mobile\nnavigation, light/dark themes, public-package live example and prerendered output.\nIts production build prerenders 20 routes; four documentation browser tests passed,\nincluding all guide routes, code copying, forms editing and automated accessibility.</p>\n</li>\n<li>\n<p>npm workspaces, Angular Package Format/partial-Ivy, core and extensions public entry points.</p>\n</li>\n<li>\n<p>Angular-free ProseMirror engine; strict typed document/configuration/extension contracts.</p>\n</li>\n<li>\n<p>Schema for paragraphs, H1–H6, quotes, lists, code, rules, breaks, URL media and tables.</p>\n</li>\n<li>\n<p>All requested text marks, alignment/indent/line height, history, shortcuts and clear formatting.</p>\n</li>\n<li>\n<p>Server-safe parse5/schema import, deterministic escaped HTML output, JSON validation/round trips.</p>\n</li>\n<li>\n<p>HTML-valued CVA, reactive/named template forms, required semantic validation, disabled/read-only,\nreset/patchValue/setValue, programmatic public setters that silently synchronize form models.</p>\n</li>\n<li>\n<p>Secure static SSR representation, explicit ngSkipHydration boundary, atomic browser activation,\nOnPush/explicit change notifications for modern Angular scheduling, destruction/repeated mounting.</p>\n</li>\n<li>\n<p>Configurable grouped/scrolling/floating toolbar, hidden controls, native dialogs and a presenter DI seam.</p>\n</li>\n<li>\n<p>Local SVG toolbar icons, separated formatting/command strips, default command groups,\naccessible icon labels/tooltips, current-colour indicators and contextual table-action icons.</p>\n</li>\n<li>\n<p>URL-only image/video insertion/editing/replacement, captions/alt/dimensions/alignment/wrapping,\nborders/radius/spacing, pointer/keyboard resize, aspect preservation and clipboard URL copying.</p>\n</li>\n<li>\n<p>Optional automatic media dimensions, full-content-width mode, fitted left/centre/right figures,\nwrapping captions and media-attached corner resizing with cancellation and independent dimensions.</p>\n</li>\n<li>\n<p>Exact-host YouTube/watch/short/Shorts and Vimeo providers, direct MP4, canonical/sandboxed embeds,\nexplicit provider registry, responsive geometry, and loading failure status/error events.</p>\n</li>\n<li>\n<p>Tables: insertion grid, contextual menu, row/column operations, merge/split/headers, cell colours,\nblock alignment, consistent 1 px table/cell borders, invisible pointer/keyboard row and column boundaries, preview/cancel,\nisolated history, AutoFit/equal columns, quick insertion and persisted minimum row heights.</p>\n</li>\n<li>\n<p>Word-style split font/highlight/cell-shading palettes with theme/standard/recent colours,\ncustom hex/native colour input, removal actions, keyboard navigation and selection preservation.</p>\n</li>\n<li>\n<p>Literal find/replace/navigation, word/Unicode character counts, caption-aware plain text,\nCommonMark conversion with explicitly documented presentation limitations.</p>\n</li>\n<li>\n<p>Extension ordering/dependencies/conflict detection, schema import hooks, custom commands/providers,\nbrowser lifecycle callbacks and multiple isolated editor instances.</p>\n</li>\n<li>\n<p>Playground with real package public imports, forms, outputs, themes/presets/plugins and HTML/Markdown import.</p>\n</li>\n<li>\n<p>Developer/API/security/SSR/media/release documentation, MIT license and GitHub Actions preparation workflow.</p>\n</li>\n</ul>\n<h2 id="executed-validation-so-far">Executed validation so far</h2>\n<ul>\n<li>Clean npm ci with Node 20.20.2/npm 10.8.2 passed after removing generated-tarball install dependency.</li>\n<li>Package production builds, actual npm pack and dry-run required-asset checks passed.</li>\n<li>41 current unit/integration tests passed, including automatic/full-width media round trips, parent forms,\nrequired validation, spanned-table resizing and nested-table preservation.</li>\n<li>All 21 current production playground browser tests passed: toolbar state/groups, custom commands,\ncolour palettes, row/column pointer and keyboard resizing, isolated undo/save-reload, safe paste,\nfull-width row-border dragging, consistent solid/dashed/none borders, grid/menu, video replacement,\nautomatic image/video sizing, full-width mode, alignment, real MP4 metadata and independent resizing,\nforms, SSR/hydration, axe and performance.</li>\n<li>Four documentation app browser tests passed, including the live editor and mobile accessibility.</li>\n<li>Candidate Angular 17–21 consumers passed production builds and six browser tests each.</li>\n<li>Angular 22\'s asynchronous activation issue was fixed with explicit change detection; its six tests passed.</li>\n<li>Current normal-peer Angular 17–22 matrix passed: six production consumer builds and 96 browser tests,\nincluding Word-style palettes, table insertion, resizing, persistence and keyboard accessibility.</li>\n<li>npm audit --omit=dev on the Angular 22 production graph reported zero vulnerabilities.</li>\n<li>Browser import/render observations: about 363 ms for 1,000 paragraphs and 529 ms for 100?20 cells.</li>\n<li>Reports and visual capture are in artifacts/.</li>\n<li>Pure Node core import/parse/render/transaction runs succeeded without DOM globals.</li>\n<li>Empty/malformed/oversized-span table normalization checks passed.</li>\n<li>Core measurements at 5,000 paragraphs: approximately 224 ms parse, 45 ms serialize, 10 ms transaction\nin one Windows/Node 20 run. These are observations, not universal performance guarantees.</li>\n</ul>\n<h2 id="architectural-decisions">Architectural decisions</h2>\n<p>See ARCHITECTURE.md. One published package prevents unnecessary fragmentation. Model ownership is\ncentralized in the engine (its EditorState is readable but cannot be reassigned). Browser views use\ntransactions and node views; SSR never constructs them. Imported data never chooses executable\ncallbacks or iframe origins. ProseMirror modules are shared external dependencies.</p>\n<h2 id="remaining-release-work-and-known-limitations">Remaining release work and known limitations</h2>\n<ul>\n<li>Automated compiler/unit/browser/consumer checks passed; packaging/documentation consistency is finalized separately.</li>\n<li>Manual screen-reader/high-contrast evaluation and independent application/security review.</li>\n<li>More native clipboard/table resize/browser memory stress coverage; current tests cannot establish\nall real assistive-technology and external-service behavior.</li>\n<li>Full demo exceeds the CLI\'s 500 kB warning budget. Core and browser performance measurements\nare recorded; further optional-feature bundling work is needed before calling it lightweight.</li>\n<li>SSR Angular sanitization strips styles/iframes in static content; interactive content uses the\nvalidated canonical model inside the explicit boundary.</li>\n<li>CommonMark cannot retain all font/colour/table/media presentation; the conversion policy is documented.</li>\n<li>Row heights are minimums and cannot force content to render shorter than its natural height.</li>\n<li>Real YouTube/Vimeo/media availability and embeddability cannot be inferred from valid URLs;\ndeterministic tests use mock responses for network resources.</li>\n<li>Legacy Angular 17/Node 20/ESLint 8 are end of support. Compatibility is not a maintenance guarantee.</li>\n<li>GitHub Actions files are configured but have not run remotely in this environment.</li>\n<li>Future Angular versions and npm name/account ownership remain unverified until explicitly checked.</li>\n</ul>\n',
		headings: [
			{
				id: 'status',
				label: 'Status',
			},
			{
				id: 'implemented',
				label: 'Implemented',
			},
			{
				id: 'executed-validation-so-far',
				label: 'Executed validation so far',
			},
			{
				id: 'architectural-decisions',
				label: 'Architectural decisions',
			},
			{
				id: 'remaining-release-work-and-known-limitations',
				label: 'Remaining release work and known limitations',
			},
		],
		blocks: [
			{
				html: '<p>﻿# Progress</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="status">Status</h2>\n',
				id: 'status',
				kind: 'content',
			},
			{
				html: '<p>Milestones 1–5 have working implementations and passed automated regression and normal-peer\nconsumer validation. Milestone 6 is not complete; this is an alpha release.\nNo package has been published and no stable-release claim is made.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="implemented">Implemented</h2>\n',
				id: 'implemented',
				kind: 'content',
			},
			{
				html: '<ul>\n<li>\n<p>Documentation application with generated Markdown guides, search, routed pages, mobile\nnavigation, light/dark themes, public-package live example and prerendered output.\nIts production build prerenders 20 routes; four documentation browser tests passed,\nincluding all guide routes, code copying, forms editing and automated accessibility.</p>\n</li>\n<li>\n<p>npm workspaces, Angular Package Format/partial-Ivy, core and extensions public entry points.</p>\n</li>\n<li>\n<p>Angular-free ProseMirror engine; strict typed document/configuration/extension contracts.</p>\n</li>\n<li>\n<p>Schema for paragraphs, H1–H6, quotes, lists, code, rules, breaks, URL media and tables.</p>\n</li>\n<li>\n<p>All requested text marks, alignment/indent/line height, history, shortcuts and clear formatting.</p>\n</li>\n<li>\n<p>Server-safe parse5/schema import, deterministic escaped HTML output, JSON validation/round trips.</p>\n</li>\n<li>\n<p>HTML-valued CVA, reactive/named template forms, required semantic validation, disabled/read-only,\nreset/patchValue/setValue, programmatic public setters that silently synchronize form models.</p>\n</li>\n<li>\n<p>Secure static SSR representation, explicit ngSkipHydration boundary, atomic browser activation,\nOnPush/explicit change notifications for modern Angular scheduling, destruction/repeated mounting.</p>\n</li>\n<li>\n<p>Configurable grouped/scrolling/floating toolbar, hidden controls, native dialogs and a presenter DI seam.</p>\n</li>\n<li>\n<p>Local SVG toolbar icons, separated formatting/command strips, default command groups,\naccessible icon labels/tooltips, current-colour indicators and contextual table-action icons.</p>\n</li>\n<li>\n<p>URL-only image/video insertion/editing/replacement, captions/alt/dimensions/alignment/wrapping,\nborders/radius/spacing, pointer/keyboard resize, aspect preservation and clipboard URL copying.</p>\n</li>\n<li>\n<p>Optional automatic media dimensions, full-content-width mode, fitted left/centre/right figures,\nwrapping captions and media-attached corner resizing with cancellation and independent dimensions.</p>\n</li>\n<li>\n<p>Exact-host YouTube/watch/short/Shorts and Vimeo providers, direct MP4, canonical/sandboxed embeds,\nexplicit provider registry, responsive geometry, and loading failure status/error events.</p>\n</li>\n<li>\n<p>Tables: insertion grid, contextual menu, row/column operations, merge/split/headers, cell colours,\nblock alignment, consistent 1 px table/cell borders, invisible pointer/keyboard row and column boundaries, preview/cancel,\nisolated history, AutoFit/equal columns, quick insertion and persisted minimum row heights.</p>\n</li>\n<li>\n<p>Word-style split font/highlight/cell-shading palettes with theme/standard/recent colours,\ncustom hex/native colour input, removal actions, keyboard navigation and selection preservation.</p>\n</li>\n<li>\n<p>Literal find/replace/navigation, word/Unicode character counts, caption-aware plain text,\nCommonMark conversion with explicitly documented presentation limitations.</p>\n</li>\n<li>\n<p>Extension ordering/dependencies/conflict detection, schema import hooks, custom commands/providers,\nbrowser lifecycle callbacks and multiple isolated editor instances.</p>\n</li>\n<li>\n<p>Playground with real package public imports, forms, outputs, themes/presets/plugins and HTML/Markdown import.</p>\n</li>\n<li>\n<p>Developer/API/security/SSR/media/release documentation, MIT license and GitHub Actions preparation workflow.</p>\n</li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="executed-validation-so-far">Executed validation so far</h2>\n',
				id: 'executed-validation-so-far',
				kind: 'content',
			},
			{
				html: "<ul>\n<li>Clean npm ci with Node 20.20.2/npm 10.8.2 passed after removing generated-tarball install dependency.</li>\n<li>Package production builds, actual npm pack and dry-run required-asset checks passed.</li>\n<li>41 current unit/integration tests passed, including automatic/full-width media round trips, parent forms,\nrequired validation, spanned-table resizing and nested-table preservation.</li>\n<li>All 21 current production playground browser tests passed: toolbar state/groups, custom commands,\ncolour palettes, row/column pointer and keyboard resizing, isolated undo/save-reload, safe paste,\nfull-width row-border dragging, consistent solid/dashed/none borders, grid/menu, video replacement,\nautomatic image/video sizing, full-width mode, alignment, real MP4 metadata and independent resizing,\nforms, SSR/hydration, axe and performance.</li>\n<li>Four documentation app browser tests passed, including the live editor and mobile accessibility.</li>\n<li>Candidate Angular 17–21 consumers passed production builds and six browser tests each.</li>\n<li>Angular 22's asynchronous activation issue was fixed with explicit change detection; its six tests passed.</li>\n<li>Current normal-peer Angular 17–22 matrix passed: six production consumer builds and 96 browser tests,\nincluding Word-style palettes, table insertion, resizing, persistence and keyboard accessibility.</li>\n<li>npm audit --omit=dev on the Angular 22 production graph reported zero vulnerabilities.</li>\n<li>Browser import/render observations: about 363 ms for 1,000 paragraphs and 529 ms for 100?20 cells.</li>\n<li>Reports and visual capture are in artifacts/.</li>\n<li>Pure Node core import/parse/render/transaction runs succeeded without DOM globals.</li>\n<li>Empty/malformed/oversized-span table normalization checks passed.</li>\n<li>Core measurements at 5,000 paragraphs: approximately 224 ms parse, 45 ms serialize, 10 ms transaction\nin one Windows/Node 20 run. These are observations, not universal performance guarantees.</li>\n</ul>\n",
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="architectural-decisions">Architectural decisions</h2>\n',
				id: 'architectural-decisions',
				kind: 'content',
			},
			{
				html: '<p>See ARCHITECTURE.md. One published package prevents unnecessary fragmentation. Model ownership is\ncentralized in the engine (its EditorState is readable but cannot be reassigned). Browser views use\ntransactions and node views; SSR never constructs them. Imported data never chooses executable\ncallbacks or iframe origins. ProseMirror modules are shared external dependencies.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<h2 id="remaining-release-work-and-known-limitations">Remaining release work and known limitations</h2>\n',
				id: 'remaining-release-work-and-known-limitations',
				kind: 'content',
			},
			{
				html: "<ul>\n<li>Automated compiler/unit/browser/consumer checks passed; packaging/documentation consistency is finalized separately.</li>\n<li>Manual screen-reader/high-contrast evaluation and independent application/security review.</li>\n<li>More native clipboard/table resize/browser memory stress coverage; current tests cannot establish\nall real assistive-technology and external-service behavior.</li>\n<li>Full demo exceeds the CLI's 500 kB warning budget. Core and browser performance measurements\nare recorded; further optional-feature bundling work is needed before calling it lightweight.</li>\n<li>SSR Angular sanitization strips styles/iframes in static content; interactive content uses the\nvalidated canonical model inside the explicit boundary.</li>\n<li>CommonMark cannot retain all font/colour/table/media presentation; the conversion policy is documented.</li>\n<li>Row heights are minimums and cannot force content to render shorter than its natural height.</li>\n<li>Real YouTube/Vimeo/media availability and embeddability cannot be inferred from valid URLs;\ndeterministic tests use mock responses for network resources.</li>\n<li>Legacy Angular 17/Node 20/ESLint 8 are end of support. Compatibility is not a maintenance guarantee.</li>\n<li>GitHub Actions files are configured but have not run remotely in this environment.</li>\n<li>Future Angular versions and npm name/account ownership remain unverified until explicitly checked.</li>\n</ul>\n",
				id: '',
				kind: 'content',
			},
		],
		search: "﻿ progress\n\n status\n\nmilestones 1–5 have working implementations and passed automated regression and normal-peer\nconsumer validation. milestone 6 is not complete; this is an alpha release.\nno package has been published and no stable-release claim is made.\n\n implemented\n\n-   documentation application with generated markdown guides, search, routed pages, mobile\n    navigation, light/dark themes, public-package live example and prerendered output.\n    its production build prerenders 20 routes; four documentation browser tests passed,\n    including all guide routes, code copying, forms editing and automated accessibility.\n\n-   npm workspaces, angular package format/partial-ivy, core and extensions public entry points.\n-   angular-free prosemirror engine; strict typed document/configuration/extension contracts.\n-   schema for paragraphs, h1–h6, quotes, lists, code, rules, breaks, url media and tables.\n-   all requested text marks, alignment/indent/line height, history, shortcuts and clear formatting.\n-   server-safe parse5/schema import, deterministic escaped html output, json validation/round trips.\n-   html-valued cva, reactive/named template forms, required semantic validation, disabled/read-only,\n    reset/patchvalue/setvalue, programmatic public setters that silently synchronize form models.\n-   secure static ssr representation, explicit ngskiphydration boundary, atomic browser activation,\n    onpush/explicit change notifications for modern angular scheduling, destruction/repeated mounting.\n-   configurable grouped/scrolling/floating toolbar, hidden controls, native dialogs and a presenter di seam.\n-   local svg toolbar icons, separated formatting/command strips, default command groups,\n    accessible icon labels/tooltips, current-colour indicators and contextual table-action icons.\n-   url-only image/video insertion/editing/replacement, captions/alt/dimensions/alignment/wrapping,\n    borders/radius/spacing, pointer/keyboard resize, aspect preservation and clipboard url copying.\n-   optional automatic media dimensions, full-content-width mode, fitted left/centre/right figures,\n    wrapping captions and media-attached corner resizing with cancellation and independent dimensions.\n-   exact-host youtube/watch/short/shorts and vimeo providers, direct mp4, canonical/sandboxed embeds,\n    explicit provider registry, responsive geometry, and loading failure status/error events.\n-   tables: insertion grid, contextual menu, row/column operations, merge/split/headers, cell colours,\n    block alignment, consistent 1 px table/cell borders, invisible pointer/keyboard row and column boundaries, preview/cancel,\n    isolated history, autofit/equal columns, quick insertion and persisted minimum row heights.\n-   word-style split font/highlight/cell-shading palettes with theme/standard/recent colours,\n    custom hex/native colour input, removal actions, keyboard navigation and selection preservation.\n-   literal find/replace/navigation, word/unicode character counts, caption-aware plain text,\n    commonmark conversion with explicitly documented presentation limitations.\n-   extension ordering/dependencies/conflict detection, schema import hooks, custom commands/providers,\n    browser lifecycle callbacks and multiple isolated editor instances.\n-   playground with real package public imports, forms, outputs, themes/presets/plugins and html/markdown import.\n-   developer/api/security/ssr/media/release documentation, mit license and github actions preparation workflow.\n\n executed validation so far\n\n-   clean npm ci with node 20.20.2/npm 10.8.2 passed after removing generated-tarball install dependency.\n-   package production builds, actual npm pack and dry-run required-asset checks passed.\n-   41 current unit/integration tests passed, including automatic/full-width media round trips, parent forms,\n    required validation, spanned-table resizing and nested-table preservation.\n-   all 21 current production playground browser tests passed: toolbar state/groups, custom commands,\n    colour palettes, row/column pointer and keyboard resizing, isolated undo/save-reload, safe paste,\n    full-width row-border dragging, consistent solid/dashed/none borders, grid/menu, video replacement,\n    automatic image/video sizing, full-width mode, alignment, real mp4 metadata and independent resizing,\n    forms, ssr/hydration, axe and performance.\n-   four documentation app browser tests passed, including the live editor and mobile accessibility.\n-   candidate angular 17–21 consumers passed production builds and six browser tests each.\n-   angular 22's asynchronous activation issue was fixed with explicit change detection; its six tests passed.\n-   current normal-peer angular 17–22 matrix passed: six production consumer builds and 96 browser tests,\n    including word-style palettes, table insertion, resizing, persistence and keyboard accessibility.\n-   npm audit --omit=dev on the angular 22 production graph reported zero vulnerabilities.\n-   browser import/render observations: about 363 ms for 1,000 paragraphs and 529 ms for 100?20 cells.\n-   reports and visual capture are in artifacts/.\n-   pure node core import/parse/render/transaction runs succeeded without dom globals.\n-   empty/malformed/oversized-span table normalization checks passed.\n-   core measurements at 5,000 paragraphs: approximately 224 ms parse, 45 ms serialize, 10 ms transaction\n    in one windows/node 20 run. these are observations, not universal performance guarantees.\n\n architectural decisions\n\nsee architecture.md. one published package prevents unnecessary fragmentation. model ownership is\ncentralized in the engine (its editorstate is readable but cannot be reassigned). browser views use\ntransactions and node views; ssr never constructs them. imported data never chooses executable\ncallbacks or iframe origins. prosemirror modules are shared external dependencies.\n\n remaining release work and known limitations\n\n-   automated compiler/unit/browser/consumer checks passed; packaging/documentation consistency is finalized separately.\n-   manual screen-reader/high-contrast evaluation and independent application/security review.\n-   more native clipboard/table resize/browser memory stress coverage; current tests cannot establish\n    all real assistive-technology and external-service behavior.\n-   full demo exceeds the cli's 500 kb warning budget. core and browser performance measurements\n    are recorded; further optional-feature bundling work is needed before calling it lightweight.\n-   ssr angular sanitization strips styles/iframes in static content; interactive content uses the\n    validated canonical model inside the explicit boundary.\n-   commonmark cannot retain all font/colour/table/media presentation; the conversion policy is documented.\n-   row heights are minimums and cannot force content to render shorter than its natural height.\n-   real youtube/vimeo/media availability and embeddability cannot be inferred from valid urls;\n    deterministic tests use mock responses for network resources.\n-   legacy angular 17/node 20/eslint 8 are end of support. compatibility is not a maintenance guarantee.\n-   github actions files are configured but have not run remotely in this environment.\n-   future angular versions and npm name/account ownership remain unverified until explicitly checked.\n",
	},
	{
		slug: 'contributing',
		title: 'Contributing',
		group: 'Project',
		source: 'CONTRIBUTING.md',
		html: '<h1 id="contributing">Contributing</h1>\n<p>Use Node 20.20.2/npm 10.8.2 for package compilation. Run npm ci, npm run format:check,\nnpm run lint, npm run typecheck, npm run build, npm run test:ci and npm run build:playground.\nBrowser tests use npm run test:e2e; install Chromium with npx playwright install chromium\nor set EDITRA_BROWSER to an installed compatible browser executable.</p>\n<p>Core must have no Angular runtime dependency or browser-global evaluation. Keep changes transaction-based,\nstrictly typed and covered by meaningful tests. Do not use any, ts-ignore or sanitizer bypasses.\nNew features need security, serialization, undo/redo and accessibility consideration.\nRun npm run pack and test the tarball in independent consumers before widening peer ranges.\nCompatibility scripts require EDITRA_NPM_CLI, EDITRA_NODE20 and EDITRA_NODE24 as documented\nin scripts/run-compatibility.mjs. Consumer lockfiles keep each tooling graph separate.</p>\n<p>Update PROGRESS.md, docs and CHANGELOG.md. Never publish automatically or claim unexecuted checks passed.</p>\n',
		headings: [],
		blocks: [
			{
				html: '<h1 id="contributing">Contributing</h1>\n',
				id: 'contributing',
				kind: 'content',
			},
			{
				html: '<p>Use Node 20.20.2/npm 10.8.2 for package compilation. Run npm ci, npm run format:check,\nnpm run lint, npm run typecheck, npm run build, npm run test:ci and npm run build:playground.\nBrowser tests use npm run test:e2e; install Chromium with npx playwright install chromium\nor set EDITRA_BROWSER to an installed compatible browser executable.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Core must have no Angular runtime dependency or browser-global evaluation. Keep changes transaction-based,\nstrictly typed and covered by meaningful tests. Do not use any, ts-ignore or sanitizer bypasses.\nNew features need security, serialization, undo/redo and accessibility consideration.\nRun npm run pack and test the tarball in independent consumers before widening peer ranges.\nCompatibility scripts require EDITRA_NPM_CLI, EDITRA_NODE20 and EDITRA_NODE24 as documented\nin scripts/run-compatibility.mjs. Consumer lockfiles keep each tooling graph separate.</p>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>Update PROGRESS.md, docs and CHANGELOG.md. Never publish automatically or claim unexecuted checks passed.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' contributing\n\nuse node 20.20.2/npm 10.8.2 for package compilation. run npm ci, npm run format:check,\nnpm run lint, npm run typecheck, npm run build, npm run test:ci and npm run build:playground.\nbrowser tests use npm run test:e2e; install chromium with npx playwright install chromium\nor set editra_browser to an installed compatible browser executable.\n\ncore must have no angular runtime dependency or browser-global evaluation. keep changes transaction-based,\nstrictly typed and covered by meaningful tests. do not use any, ts-ignore or sanitizer bypasses.\nnew features need security, serialization, undo/redo and accessibility consideration.\nrun npm run pack and test the tarball in independent consumers before widening peer ranges.\ncompatibility scripts require editra_npm_cli, editra_node20 and editra_node24 as documented\nin scripts/run-compatibility.mjs. consumer lockfiles keep each tooling graph separate.\n\nupdate progress.md, docs and changelog.md. never publish automatically or claim unexecuted checks passed.\n',
	},
	{
		slug: 'changelog',
		title: 'Changelog',
		group: 'Project',
		source: 'CHANGELOG.md',
		html: '<h1 id="changelog">Changelog</h1>\n<h2 id="0-1-0-alpha-0-unreleased">0.1.0-alpha.0 — unreleased</h2>\n<ul>\n<li>ProseMirror document engine with server-safe parsing and deterministic HTML rendering.</li>\n<li>Standalone Angular HTML-valued forms adapter and explicit hydration boundary.</li>\n<li>Text formatting, keyboard history, lists, URL media, table commands and resizing.</li>\n<li>Extension registry, themes, find/replace, counts and CommonMark conversions.</li>\n<li>Packaged SCSS, playground, security/command/forms tests and browser validation.</li>\n<li>Independent Angular consumer matrix and release-preparation workflow.</li>\n</ul>\n<p>This is a prerelease. Completion gaps and executed compatibility evidence are recorded in PROGRESS.md\nand docs/COMPATIBILITY.md. No package has been published.</p>\n',
		headings: [
			{
				id: '0-1-0-alpha-0-unreleased',
				label: '0.1.0-alpha.0 — unreleased',
			},
		],
		blocks: [
			{
				html: '<h1 id="changelog">Changelog</h1>\n',
				id: 'changelog',
				kind: 'content',
			},
			{
				html: '<h2 id="0-1-0-alpha-0-unreleased">0.1.0-alpha.0 — unreleased</h2>\n',
				id: '0-1-0-alpha-0-unreleased',
				kind: 'content',
			},
			{
				html: '<ul>\n<li>ProseMirror document engine with server-safe parsing and deterministic HTML rendering.</li>\n<li>Standalone Angular HTML-valued forms adapter and explicit hydration boundary.</li>\n<li>Text formatting, keyboard history, lists, URL media, table commands and resizing.</li>\n<li>Extension registry, themes, find/replace, counts and CommonMark conversions.</li>\n<li>Packaged SCSS, playground, security/command/forms tests and browser validation.</li>\n<li>Independent Angular consumer matrix and release-preparation workflow.</li>\n</ul>\n',
				id: '',
				kind: 'content',
			},
			{
				html: '<p>This is a prerelease. Completion gaps and executed compatibility evidence are recorded in PROGRESS.md\nand docs/COMPATIBILITY.md. No package has been published.</p>\n',
				id: '',
				kind: 'content',
			},
		],
		search: ' changelog\n\n 0.1.0-alpha.0 — unreleased\n\n-   prosemirror document engine with server-safe parsing and deterministic html rendering.\n-   standalone angular html-valued forms adapter and explicit hydration boundary.\n-   text formatting, keyboard history, lists, url media, table commands and resizing.\n-   extension registry, themes, find/replace, counts and commonmark conversions.\n-   packaged scss, playground, security/command/forms tests and browser validation.\n-   independent angular consumer matrix and release-preparation workflow.\n\nthis is a prerelease. completion gaps and executed compatibility evidence are recorded in progress.md\nand docs/compatibility.md. no package has been published.\n',
	},
];
