/** Position an owned browser popup near its anchor and scroll within available space. */
export function positionPopover(popup: HTMLElement, anchor: HTMLElement): void {
	const window = popup.ownerDocument.defaultView;
	if (!window) return;
	const viewport = window.visualViewport;
	const left = (viewport?.offsetLeft ?? 0) + 8;
	const top = (viewport?.offsetTop ?? 0) + 8;
	const right = left + (viewport?.width ?? window.innerWidth) - 16;
	const bottom = top + (viewport?.height ?? window.innerHeight) - 16;
	popup.style.maxWidth = `${Math.max(0, right - left)}px`;
	const bounds = anchor.getBoundingClientRect(),
		rect = popup.getBoundingClientRect();
	const below = bottom - bounds.bottom - 6,
		above = bounds.top - top - 6;
	const natural = Math.max(popup.scrollHeight + 2, rect.height);
	const useBelow = below >= natural || below >= above;
	const height = Math.min(bottom - top, Math.max(120, useBelow ? below : above));
	popup.style.maxHeight = `${height}px`;
	const rendered = popup.getBoundingClientRect();
	popup.style.left = `${Math.max(left, Math.min(bounds.left, right - rendered.width))}px`;
	const preferredTop = useBelow ? bounds.bottom + 6 : bounds.top - rendered.height - 6;
	popup.style.top = `${Math.max(top, Math.min(preferredTop, bottom - rendered.height))}px`;
}

/** Reposition after Angular renders popup contents and when their size changes. */
export function observePopover(popup: HTMLElement, anchor: HTMLElement, signal: AbortSignal): void {
	const window = popup.ownerDocument.defaultView;
	if (!window) return;
	const update = (): void => positionPopover(popup, anchor);
	const observer = new ResizeObserver(update);
	observer.observe(popup);
	window.addEventListener('resize', update, { signal });
	window.visualViewport?.addEventListener('resize', update, { signal });
	signal.addEventListener('abort', () => observer.disconnect(), { once: true });
	update();
}
