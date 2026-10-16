import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EditraHtmlPipe } from './html.pipe';
import { EditraCodeCopyDirective } from '../directives/code-copy.directive';

@Component({
	standalone: true,
	imports: [EditraHtmlPipe, EditraCodeCopyDirective],
	template: '<div class="editra-content" editraCodeCopy [innerHTML]="html | editraHtml"></div>',
})
class HtmlHostComponent {
	html =
		'<pre data-language="typescript"><code>if (x &lt; 2) {\n  run();\n}</code></pre><blockquote><p>Quote</p></blockquote><iframe src="https://youtu.be/dQw4w9WgXcQ"></iframe><script>alert(1)</script>';
}

@Component({
	standalone: true,
	imports: [EditraHtmlPipe],
	template: '<div [innerHTML]="html | editraHtml"></div>',
})
class SimpleHtmlHostComponent {
	html = '<h2>Title</h2><p>Content</p><script>alert(1)</script>';
}

describe('EditraHtmlPipe', () => {
	it('styles a pipe-only binding without a viewer, directive or global Sass import', () => {
		const fixture = TestBed.createComponent(SimpleHtmlHostComponent);
		fixture.detectChanges();
		const host = fixture.nativeElement as HTMLElement;
		const content = host.querySelector('.editra-content') as HTMLElement;
		expect(content.querySelector('h2')?.textContent).toBe('Title');
		expect(content.querySelector('script')).toBeNull();
		expect(getComputedStyle(content).display).toBe('flow-root');
		fixture.componentInstance.html = '<p>Updated</p>';
		fixture.detectChanges();
		expect(host.querySelectorAll('.editra-content').length).toBe(1);
		expect(host.textContent).toBe('Updated');
		fixture.destroy();
	});
	it('copies code only, refreshes controls on replacement and reports clipboard failure', async () => {
		const write = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
		const fixture = TestBed.createComponent(HtmlHostComponent);
		fixture.componentInstance.html =
			'<pre data-language="java"><code>one &lt; two\n  next();</code></pre>';
		fixture.detectChanges();
		const host = fixture.nativeElement as HTMLElement;
		const button = host.querySelector<HTMLButtonElement>('button[aria-label="Copy code"]');
		expect(button?.querySelector('svg')).not.toBeNull();
		button?.click();
		await new Promise<void>((resolve) => setTimeout(resolve, 0));
		expect(write).toHaveBeenCalledOnceWith('one < two\n  next();');
		expect(host.querySelector('[role="status"]')?.textContent).toBe('Copied!');
		fixture.componentInstance.html = '<pre><code>replacement</code></pre>';
		fixture.detectChanges();
		await new Promise<void>((resolve) => setTimeout(resolve, 0));
		expect(host.querySelectorAll('.editra-rendered-code').length).toBe(1);
		expect(host.querySelectorAll('button').length).toBe(1);
		write.and.rejectWith(new Error('Denied'));
		host.querySelector<HTMLButtonElement>('button')?.click();
		await new Promise<void>((resolve) => setTimeout(resolve, 0));
		expect(host.querySelector('[role="status"]')?.textContent).toContain('Unable to copy');
		fixture.destroy();
	});
	it('preserves code styling, whitespace and approved media in an innerHTML binding', () => {
		const fixture = TestBed.createComponent(HtmlHostComponent);
		fixture.detectChanges();
		const host = fixture.nativeElement as HTMLElement;
		expect(host.querySelector('pre')?.style.whiteSpace).toBe('pre');
		expect(host.querySelector('pre')?.style.overflowX).toBe('auto');
		expect(host.querySelector('code')?.textContent).toBe('if (x < 2) {\n  run();\n}');
		expect(host.querySelector('blockquote')?.style.padding).toBe('10px 16px');
		expect(host.querySelector('iframe')?.src).toContain('youtube-nocookie.com/embed/');
		expect(host.querySelector('script')).toBeNull();
		fixture.componentInstance.html = '<p onclick="alert(1)">Updated <code>code</code></p>';
		fixture.detectChanges();
		expect(host.textContent).toBe('Updated code');
		expect(host.querySelector('[onclick], iframe')).toBeNull();
		fixture.destroy();
	});
});
