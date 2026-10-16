import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { EditraConfig } from '../core/public-api';
import { EditraContentDirective } from './content.directive';
import { provideEditra } from '../config/editra.config';

@Component({
	standalone: true,
	imports: [EditraContentDirective],
	template: '<article [editraContent]="html" [editraContentConfig]="config"></article>',
})
class ContentHostComponent {
	html: string | null = '<pre data-language="typescript"><code>one &lt; two</code></pre>';
	config: EditraConfig = {};
}

describe('EditraContentDirective', () => {
	it('uses application defaults with only the content binding across multiple instances', () => {
		TestBed.configureTestingModule({ providers: [provideEditra({ theme: 'dark' })] });
		TestBed.overrideComponent(ContentHostComponent, {
			set: {
				template:
					'<div [editraContent]="html"></div><article [editraContent]="html"></article>',
			},
		});
		const fixture = TestBed.createComponent(ContentHostComponent);
		fixture.detectChanges();
		const host = fixture.nativeElement as HTMLElement;
		expect(host.querySelectorAll('.editra-content.editra-dark').length).toBe(2);
		expect(host.querySelectorAll('button[aria-label="Copy code"]').length).toBe(2);
		fixture.destroy();
	});

	it('loads styles, validates HTML and copies code with a single directive import', async () => {
		const write = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
		const fixture = TestBed.createComponent(ContentHostComponent);
		fixture.componentInstance.html += '<script>alert(1)</script><p onclick="alert(1)">Text</p>';
		fixture.detectChanges();
		const host = fixture.nativeElement as HTMLElement;
		const content = host.querySelector('.editra-content') as HTMLElement;
		expect(getComputedStyle(content).display).toBe('flow-root');
		expect(host.querySelector('script, [onclick]')).toBeNull();
		const button = host.querySelector<HTMLButtonElement>('button[aria-label="Copy code"]');
		expect(button).not.toBeNull();
		button?.querySelector('svg')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await new Promise<void>((resolve) => setTimeout(resolve, 0));
		expect(write).toHaveBeenCalledOnceWith('one < two');
		expect(host.querySelector('[role="status"]')?.textContent).toBe('Copied!');
		fixture.destroy();
	});

	it('refreshes content, copy controls and themes and handles empty input', async () => {
		const fixture = TestBed.createComponent(ContentHostComponent);
		fixture.detectChanges();
		const host = fixture.nativeElement as HTMLElement;
		fixture.componentInstance.html = '<pre><code>Replacement</code></pre>';
		fixture.componentInstance.config = { theme: 'dark' };
		fixture.detectChanges();
		await new Promise<void>((resolve) => setTimeout(resolve, 0));
		expect(host.querySelector('.editra-content.editra-dark')).not.toBeNull();
		expect(host.querySelectorAll('button').length).toBe(1);
		expect(host.querySelector('code')?.textContent).toBe('Replacement');
		fixture.componentInstance.html = null;
		fixture.detectChanges();
		await new Promise<void>((resolve) => setTimeout(resolve, 0));
		expect(host.querySelector('button, code')).toBeNull();
		fixture.destroy();
	});
});
