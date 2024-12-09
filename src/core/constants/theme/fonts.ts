/* eslint-disable object-curly-newline */
import { ALL_COLORS } from './colors';
import type { FontColorType, FontSizeColorType, FontType } from './types';

export const All_FONT_FAMILIES = {
	montserrat: 'Montserrat',
	poppins: 'Poppins',
	roboto: 'Roboto',
	raleway: 'Raleway',
} as const;

export const All_FONT_SIZES = {
	'12': 12,
	'13': 13,
	'14': 14,
	'15': 15,
	'16': 16,
	'17': 17,
	'18': 18,
	'20': 20,
	lg: 22,
	md: 16,
	sm: 11,
	xl: 24,
	xs: 10,
	xxl: 32,
	xxs: 9,
	xxxs: 7,
} as const;

export const All_FONT_WEIGHTS = {
	'300': '300',
	'400': '400',
	'500': '500',
	'600': '600',
	'700': '700',
	'800': '800',
} as const;

// @ts-ignore
export const Fonts: FontType = Object.entries(All_FONT_FAMILIES).reduce((acc, [key, value]) => {
	// @ts-ignore
	const array = Object.entries(All_FONT_WEIGHTS).reduce(
		(ac2, [key2, value2]) => ({
			...ac2,
			[`${key.toLowerCase()}-${key2.toLowerCase()}`]: {
				fontFamily: value,
				fontWeight: value2,
			},
		}),
		{}
	);

	return {
		...acc,
		...array,
	};
}, {});

//@ts-ignore
export const FontWithColors: FontColorType = Object.entries(All_FONT_FAMILIES).reduce(
	(acc, [key, value]) => {
		const array = Object.entries(All_FONT_WEIGHTS).reduce((ac2, [key2, value2]) => {
			const array2 = Object.entries(ALL_COLORS).reduce((ac3, [key3, value3]) => {
				return {
					...ac3,
					[`${key.toLowerCase()}-${key2.toLowerCase()}-${key3.toLowerCase()}`]: {
						color: `#${value3.toLowerCase()}`,
						fontFamily: value,
						fontStyle: 'normal',
						fontWeight: `${value2}`,
					},
				};
			}, {});

			return {
				...ac2,
				...array2,
			};
		}, {});

		return {
			...acc,
			...array,
		};
	},
	{}
);

//@ts-ignore
export const FontSizeWithColors: FontSizeColorType = Object.entries(All_FONT_FAMILIES).reduce(
	(acc, [key, value]) => {
		const array = Object.entries(All_FONT_WEIGHTS).reduce((ac2, [key2, value2]) => {
			const array2 = Object.entries(ALL_COLORS).reduce((ac3, [key3, value3]) => {
				const array3 = Object.entries(All_FONT_SIZES).reduce((ac4, [key4, value4]) => {
					return {
						...ac4,
						[`${key.toLowerCase()}-${key2.toLowerCase()}-${key4}-${key3.toLowerCase()}`]:
							{
								color: `#${value3.toLowerCase()}`,
								fontFamily: value,
								fontSize: value4,
								fontStyle: 'normal',
								fontWeight: `${value2}`,
							},
					};
				}, {});

				return {
					...ac3,
					...array3,
				};
			}, {});

			return {
				...ac2,
				...array2,
			};
		}, {});

		return {
			...acc,
			...array,
		};
	},
	{}
);
