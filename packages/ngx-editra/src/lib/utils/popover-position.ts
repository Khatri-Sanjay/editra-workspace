/** Position an owned browser popup near its anchor and scroll within available space. */
export function positionPopover(popup: HTMLElement, anchor: HTMLElement): void {
	const window = popup.ownerDocument.defaultView;
	if (!window) return;
	const bounds = anchor.getBoundingClientRect(),
		rect = popup.getBoundingClientRect();
	const below = window.innerHeight - bounds.bottom - 14,
		above = bounds.top - 14;
	const natural = Math.max(popup.scrollHeight + 2, rect.height);
	const useBelow = below >= natural || below >= above;
	const height = Math.min(window.innerHeight - 16, Math.max(120, useBelow ? below : above));
	popup.style.maxHeight = `${height}px`;
	popup.style.left = `${Math.max(8, Math.min(bounds.left - 34, window.innerWidth - rect.width - 8))}px`;
	popup.style.top = `${useBelow ? Math.max(8, bounds.bottom + 6) : Math.max(8, bounds.top - Math.min(natural, height) - 6)}px`;
}
