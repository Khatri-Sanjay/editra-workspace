interface ScrollLock {
	count: number;
	restore: () => void;
}
const locks = new WeakMap<Document, ScrollLock>();

/** Shared ownership keeps nested popups from unlocking a fullscreen editor. */
export function lockPageScroll(document: Document): () => void {
	let lock = locks.get(document);
	if (!lock) {
		const root = document.documentElement,
			body = document.body;
		const width = root.clientWidth;
		const saved = [root, body].flatMap((element) =>
			['overflow', 'overflow-x', 'overflow-y'].map((property) => ({
				element,
				property,
				value: element.style.getPropertyValue(property),
				priority: element.style.getPropertyPriority(property),
			})),
		);
		for (const [element, property] of [
			[root, 'scrollbar-gutter'],
			[body, 'padding-right'],
		] as const)
			saved.push({
				element,
				property,
				value: element.style.getPropertyValue(property),
				priority: element.style.getPropertyPriority(property),
			});
		const window = document.defaultView;
		if (
			window &&
			window.innerWidth > width &&
			!window.getComputedStyle(root).getPropertyValue('scrollbar-gutter').includes('stable')
		)
			root.style.setProperty('scrollbar-gutter', 'stable', 'important');
		const padding = window ? parseFloat(window.getComputedStyle(body).paddingRight) || 0 : 0;
		// Lock the viewport without turning body into a new scroll container:
		// doing so changes the containing block of the host page's sticky UI.
		root.style.setProperty('overflow', 'hidden', 'important');
		// Older browsers without stable gutters retain the same content width as well.
		const gap = root.clientWidth - width;
		if (
			gap > 0 &&
			!window?.getComputedStyle(root).getPropertyValue('scrollbar-gutter').includes('stable')
		)
			body.style.setProperty('padding-right', padding + gap + 'px', 'important');
		lock = {
			count: 0,
			restore: () => {
				for (const { element, property } of saved) element.style.removeProperty(property);
				for (const { element, property, value, priority } of saved)
					if (value) element.style.setProperty(property, value, priority);
			},
		};
		locks.set(document, lock);
	}
	lock.count++;
	let released = false;
	return () => {
		if (released) return;
		released = true;
		if (--lock.count === 0) {
			lock.restore();
			locks.delete(document);
		}
	};
}
