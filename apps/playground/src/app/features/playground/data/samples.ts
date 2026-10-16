import { demoContent } from './demo-content';

export const samples = [
	{ id: 'complete', label: 'Complete feature tour', html: demoContent },
	{ id: 'blank', label: 'Blank document', html: '<p></p>' },
	{
		id: 'article',
		label: 'Article and formatting',
		html: '<h1>A fresh perspective</h1><p>Start with a clear idea. Add <strong>emphasis</strong>, <em>detail</em>, and your own voice.</p><blockquote><p>Make every word count.</p></blockquote><h2>Next steps</h2><ul><li><p>Write a draft</p></li><li><p>Review and share</p></li></ul>',
	},
	{
		id: 'table',
		label: 'Table and code',
		html: '<h1>Project notes</h1><table><tbody><tr><th><p>Task</p></th><th><p>Status</p></th></tr><tr><td><p>Review the draft</p></td><td><p>In progress</p></td></tr></tbody></table><p>Try selecting cells and changing their formatting.</p><pre data-language="typescript"><code>const message = "Hello, Editra";</code></pre>',
	},
] as const;
