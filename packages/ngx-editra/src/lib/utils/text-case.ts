import { Fragment } from 'prosemirror-model';
import type { Mark, Schema } from 'prosemirror-model';

export interface TextPiece {
	from: number;
	to: number;
	text: string;
	marks: readonly Mark[];
}
export type TextCase =
	| 'upper'
	| 'lower'
	| 'title'
	| 'sentence'
	| 'camel'
	| 'pascal'
	| 'snake'
	| 'kebab'
	| 'toggle';

/** Track each output character back to its original formatting. */
export function changeTextCase(
	pieces: readonly TextPiece[],
	mode: TextCase,
	schema: Schema,
): Fragment {
	const text = pieces.map((piece) => piece.text).join('');
	const output: { text: string; index: number }[] = [];
	if (['camel', 'pascal', 'snake', 'kebab'].includes(mode)) {
		const words = [
			...text.matchAll(
				/\p{Lu}+(?=\p{Lu}\p{Ll})|\p{Lu}?\p{Ll}+|\p{Lu}+|\p{N}+|[\p{Lo}\p{Lt}\p{Lm}]+/gu,
			),
		];
		words.forEach((word, order) => {
			const index = word.index ?? 0;
			if (order && (mode === 'snake' || mode === 'kebab'))
				output.push({ text: mode === 'snake' ? '_' : '-', index });
			let offset = 0;
			for (const char of word[0]) {
				const capital =
					offset === 0 && (mode === 'pascal' || (mode === 'camel' && order > 0));
				output.push({
					text: capital ? char.toUpperCase() : char.toLowerCase(),
					index: index + offset,
				});
				offset += char.length;
			}
		});
	} else {
		let wordStart = true,
			sentenceStart = true,
			index = 0;
		for (const char of text) {
			const letter = /\p{L}/u.test(char);
			const next =
				mode === 'upper'
					? char.toUpperCase()
					: mode === 'lower'
						? char.toLowerCase()
						: mode === 'toggle'
							? char === char.toUpperCase()
								? char.toLowerCase()
								: char.toUpperCase()
							: (mode === 'title' ? wordStart : sentenceStart) && letter
								? char.toUpperCase()
								: char.toLowerCase();
			output.push({ text: next, index });
			if (letter) sentenceStart = false;
			if (/[.!?]/u.test(char)) sentenceStart = true;
			wordStart = !/[\p{L}\p{N}'’]/u.test(char);
			index += char.length;
		}
	}
	let offset = 0,
		pieceIndex = 0;
	return Fragment.fromArray(
		output.map((char) => {
			while (
				pieceIndex < pieces.length - 1 &&
				char.index >= offset + pieces[pieceIndex]!.text.length
			)
				offset += pieces[pieceIndex++]!.text.length;
			return schema.text(char.text, pieces[pieceIndex]!.marks);
		}),
	);
}
