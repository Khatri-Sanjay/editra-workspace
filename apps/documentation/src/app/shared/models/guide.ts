export interface Guide {
	readonly slug: string;
	readonly title: string;
	readonly group: string;
	readonly source: string;
	readonly summary: string;
	readonly readingMinutes: number;
	readonly html: string;
	readonly blocks: readonly {
		readonly html: string;
		readonly id: string;
		readonly kind: 'content' | 'code' | 'table';
		readonly code?: string;
		readonly language?: string;
	}[];
	readonly search: string;
	readonly headings: readonly { readonly id: string; readonly label: string }[];
}

export type GuideNavigation = Pick<Guide, 'slug' | 'title' | 'group' | 'summary' | 'search'>;
