import {
	Component,
	createComponent,
	DestroyRef,
	EnvironmentInjector,
	inject,
	Injectable,
	ViewEncapsulation,
} from '@angular/core';

/** Angular compiles and registers the shared Sass, including SSR and CSP nonce support. */
@Component({
	selector: 'editra-content-styles',
	standalone: true,
	template: '',
	styleUrl: '../../styles/content.scss',
	encapsulation: ViewEncapsulation.None,
})
class EditraContentStylesComponent {}

@Injectable({ providedIn: 'root' })
export class EditraContentStyles {
	constructor() {
		// Creating the renderer registers the styles; no element is attached to the page.
		const styles = createComponent(EditraContentStylesComponent, {
			environmentInjector: inject(EnvironmentInjector),
		});
		inject(DestroyRef).onDestroy(() => styles.destroy());
	}
}
