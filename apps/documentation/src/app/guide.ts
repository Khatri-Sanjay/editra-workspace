export interface Guide {
	readonly slug: string;
	readonly title: string;
	readonly group: string;
	readonly source: string;
	readonly html: string;
	readonly blocks: readonly {
		readonly html: string;
		readonly id: string;
		readonly kind: 'content' | 'code' | 'table';
	}[];
	readonly search: string;
	readonly headings: readonly { readonly id: string; readonly label: string }[];
}
