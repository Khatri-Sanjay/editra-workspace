import { TestBed } from '@angular/core/testing';
import { NgxEditraViewerComponent } from './ngx-editra-viewer.component';

describe('NgxEditraViewerComponent', () => {
	it('renders validated styles and players and updates when HTML changes', () => {
		const fixture = TestBed.createComponent(NgxEditraViewerComponent);
		fixture.componentRef.setInput(
			'html',
			'<p style="text-align:right"><code>inline</code></p><iframe src="https://youtu.be/dQw4w9WgXcQ"></iframe>',
		);
		fixture.detectChanges();
		const host = fixture.nativeElement as HTMLElement;
		expect(host.querySelector('p')?.style.textAlign).toBe('right');
		expect(host.querySelector('iframe')?.src).toContain('youtube-nocookie.com/embed/');
		expect(host.querySelector('[contenteditable]')).toBeNull();
		fixture.componentRef.setInput(
			'html',
			'<p onclick="alert(1)">Updated</p><script>alert(1)</script>',
		);
		fixture.detectChanges();
		expect(host.textContent).toBe('Updated');
		expect(host.querySelector('script, [onclick], iframe')).toBeNull();
		fixture.destroy();
	});
});
