import { defaultToolbar } from 'ngx-editra';
import type { EditraToolbarConfig } from 'ngx-editra';

export function toolbarPreset(preset: string): EditraToolbarConfig {
	return preset === 'compact'
		? {
				items: defaultToolbar.filter((item) =>
					['undo', 'redo', 'bold', 'italic'].includes(item.id),
				),
				hiddenItems: [
					'image',
					'video',
					'table',
					'Cell background colour',
					'Table width percent',
					'Row height pixels',
					'Table border',
				],
			}
		: preset === 'grouped'
			? {
					groups: [
						{
							id: 'history',
							label: 'History',
							items: defaultToolbar.filter((item) =>
								['undo', 'redo'].includes(item.id),
							),
						},
						{
							id: 'format',
							label: 'Text formatting',
							items: defaultToolbar.filter(
								(item) => !['undo', 'redo'].includes(item.id),
							),
						},
					],
					overflow: 'scroll' as const,
					floating: true,
				}
			: {};
}
