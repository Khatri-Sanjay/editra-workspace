export interface ColourSwatch {
	readonly colour: string;
	readonly name: string;
}
const base: readonly [string, string][] = [
	['White', '#ffffff'],
	['Black', '#000000'],
	['Light grey', '#e7e6e6'],
	['Slate', '#44546a'],
	['Accent blue', '#4472c4'],
	['Accent orange', '#ed7d31'],
	['Grey', '#a5a5a5'],
	['Gold', '#ffc000'],
	['Light blue', '#5b9bd5'],
	['Accent green', '#70ad47'],
];
function blend(colour: string, ratio: number): string {
	return (
		'#' +
		[1, 3, 5]
			.map((offset) => {
				const channel = Number.parseInt(colour.slice(offset, offset + 2), 16);
				return Math.round(channel + ((ratio > 0 ? 255 : 0) - channel) * Math.abs(ratio))
					.toString(16)
					.padStart(2, '0');
			})
			.join('')
	);
}
export const themeColours: readonly ColourSwatch[] = [
	...base.map(([name, colour]) => ({ name, colour })),
	...[0.8, 0.6, 0.4, -0.25, -0.5].flatMap((ratio, row) =>
		base.map(([name, colour], column) => {
			const weight =
				column === 0
					? ([-0.05, -0.15, -0.25, -0.35, -0.5][row] ?? ratio)
					: column === 1
						? ([0.5, 0.35, 0.25, 0.15, 0.05][row] ?? ratio)
						: ratio;
			return {
				name: `${name}, ${weight > 0 ? 'lighter' : 'darker'} ${Math.round(Math.abs(weight) * 100)}%`,
				colour: blend(colour, weight),
			};
		}),
	),
];
export const standardColours: readonly ColourSwatch[] = [
	['Dark red', '#c00000'],
	['Red', '#ff0000'],
	['Orange', '#ffc000'],
	['Yellow', '#ffff00'],
	['Light green', '#92d050'],
	['Green', '#00b050'],
	['Cyan', '#00b0f0'],
	['Blue', '#0070c0'],
	['Dark blue', '#002060'],
	['Purple', '#7030a0'],
].map(([name, colour]) => ({ name: name ?? '', colour: colour ?? '#000000' }));
export const highlightColours: readonly ColourSwatch[] = [
	['Yellow', '#ffff00'],
	['Bright green', '#00ff00'],
	['Turquoise', '#00ffff'],
	['Pink', '#ff00ff'],
	['Blue', '#0000ff'],
	['Red', '#ff0000'],
	['Dark blue', '#000080'],
	['Teal', '#008080'],
	['Green', '#008000'],
	['Violet', '#800080'],
	['Dark red', '#800000'],
	['Dark yellow', '#808000'],
	['Grey', '#808080'],
	['Light grey', '#c0c0c0'],
	['Black', '#000000'],
	['White', '#ffffff'],
].map(([name, colour]) => ({ name: name ?? '', colour: colour ?? '#000000' }));
