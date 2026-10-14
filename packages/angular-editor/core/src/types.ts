import type { MarkSpec, NodeSpec, Schema, Node } from 'prosemirror-model';
import type { Command, Plugin } from 'prosemirror-state';
import type { NodeViewConstructor } from 'prosemirror-view';

/** Stable, serializable public document shape. Attribute values are validated on import. */
export interface EditraDocument {
	readonly type: string;
	readonly attrs?: Readonly<Record<string, unknown>>;
	readonly content?: readonly EditraDocument[];
	readonly marks?: readonly EditraMark[];
	readonly text?: string;
}
export interface EditraMark {
	readonly type: string;
	readonly attrs?: Readonly<Record<string, unknown>>;
}
export type EditraTheme = 'light' | 'dark' | 'auto';
export type EditraOutputFormat = 'html' | 'json' | 'text' | 'markdown';
export type EditraAlignment = 'left' | 'center' | 'right' | 'justify';
export interface EditraSecurityConfig {
	readonly allowHttp?: boolean;
	readonly maxInputLength?: number;
}
export interface EditraImageConfig {
	readonly enabled?: boolean;
	readonly pasteUrls?: boolean;
}
export interface EditraVideoConfig {
	readonly enabled?: boolean;
	readonly providers?: readonly EditraVideoProvider[];
}
export interface EditraTableConfig {
	readonly enabled?: boolean;
	readonly maxRows?: number;
	readonly maxColumns?: number;
}
export interface EditraToolbarItem {
	readonly id: string;
	readonly label: string;
	readonly command: string;
	/** Built-in icon name (defaults to the command), or a plain-text custom glyph. Never SVG markup. */
	readonly icon?: string;
}
export interface EditraToolbarConfig {
	readonly hidden?: boolean;
	readonly items?: readonly EditraToolbarItem[];
	readonly groups?: readonly EditraToolbarGroup[];
	readonly hiddenItems?: readonly string[];
	readonly overflow?: 'wrap' | 'scroll';
	readonly floating?: boolean;
	/** Keep the main toolbar visible while scrolling through the editor. */
	readonly sticky?: boolean;
	/** Pixels below a fixed application header. Defaults to zero. */
	readonly stickyOffset?: number;
}
export interface EditraToolbarGroup {
	readonly id: string;
	readonly label: string;
	readonly items: readonly EditraToolbarItem[];
}
export interface EditraConfig {
	readonly placeholder?: string;
	readonly minHeight?: number;
	readonly maxHeight?: number;
	readonly readonly?: boolean;
	readonly autofocus?: boolean;
	readonly spellcheck?: boolean;
	readonly theme?: EditraTheme;
	/** Forms always use HTML; use explicit conversion methods for other formats. */
	readonly toolbar?: EditraToolbarConfig;
	readonly image?: EditraImageConfig;
	readonly video?: EditraVideoConfig;
	readonly table?: EditraTableConfig;
	readonly security?: EditraSecurityConfig;
	readonly extensions?: readonly EditraExtension[];
}
export interface EditraVideoProvider {
	readonly id: string;
	/** Exact allowed embed origins; canonical results are checked against this list. */
	readonly embedOrigins: readonly string[];
	matches(url: URL): boolean;
	getEmbedUrl(url: URL): URL | null;
}
export interface EditraExtension {
	readonly id: string;
	readonly requires?: readonly string[];
	readonly nodes?: Readonly<Record<string, NodeSpec>>;
	readonly marks?: Readonly<Record<string, MarkSpec>>;
	readonly commands?: (schema: Schema) => Readonly<Record<string, Command>>;
	readonly plugins?: (schema: Schema) => readonly Plugin[];
	readonly shortcuts?: (schema: Schema) => Readonly<Record<string, Command>>;
	readonly nodeViews?: Readonly<Record<string, NodeViewConstructor>>;
	readonly toolbar?: readonly EditraToolbarItem[];
	readonly onCreate?: () => void;
	readonly onDestroy?: () => void;
	/** SSR-safe custom-node importer. Core supported tags and blocked subtrees take precedence. */
	readonly parseElement?: (element: EditraHtmlElement, schema: Schema) => Node | null;
}
export interface EditraHtmlElement {
	readonly tag: string;
	readonly attributes: Readonly<Record<string, string>>;
	readonly content: readonly Node[];
	readonly text: string;
}
export interface EditraChange {
	readonly html: string;
	readonly document: EditraDocument;
	readonly text: string;
}
export interface EditraCounts {
	readonly words: number;
	readonly characters: number;
}
export interface EditraTransactionState {
	readonly docChanged: boolean;
	readonly selectionChanged: boolean;
	readonly from: number;
	readonly to: number;
	readonly dirty: boolean;
}
