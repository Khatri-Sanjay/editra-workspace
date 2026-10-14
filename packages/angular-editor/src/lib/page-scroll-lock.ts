interface ScrollLock {
	count: number;
	restore: () => void;
}
const locks = new WeakMap<Document, ScrollLock>();

/** Shared ownership keeps nested popups from unlocking a fullscreen editor. */
export function lockPageScroll(document: Document): () => void {
	let lock = locks.get(document);
	if (!lock) {
		const elements = [document.documentElement, document.body];
		const saved = elements.map((element) => ({
			element,
			value: element.style.getPropertyValue('overflow'),
			priority: element.style.getPropertyPriority('overflow'),
		}));
		for (const element of elements)
			element.style.setProperty('overflow', 'hidden', 'important');
		lock = {
			count: 0,
			restore: () => {
				for (const { element, value, priority } of saved) {
					if (value) element.style.setProperty('overflow', value, priority);
					else element.style.removeProperty('overflow');
				}
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
