import type { ColorsType } from './types';

export const COLOR_PARAMS = {
	bg: 'backgroundColor',
	border: 'borderColor',
	shadow: 'shadowColor',
	text: 'color',
} as const;

const LIGHT_COLORS = {
	cbcbcb: 'CBCBCB',
	d1c8eb: 'D1C8EB',
	e3e3: 'E3E3E3',
	e7e7e7: 'E7E7E7',
	f5f5f5: 'F5F5F5',
	fafafa: 'FAFAFA',
	fbf6ef: 'FBF6EF',
	ffd9cc: 'ffd9cc',
	google: 'EDEDED',
	white: 'ffffff',
} as const;

const GREY_COLORS = {
	'535353': '535353',
	'616161': '616161',
	'6c6c6c': '6C6C6C',
	'797979': '797979',
	'858585': '858585',
	'868686': '868686',
	'8e8e8e': '8E8E8E',
	'6b6b6b': '6B6B6B',
	a7a7a7: 'A7A7A7',
	b6b6b6: 'B6B6B6',
} as const;

const DARK_COLORS = {
	'232323': '232323',
	'303030': '303030',
	'313131': '313131',
	'343434': '343434',
	'414141': '414141',
	'4a4a4a': '4A4A4A',
	'505050': '505050',
	b4b4b4: 'b4b4b4',
	black: '000000',
	c4c4c4: 'c4c4c4',
} as const;

const ORANGE_COLORS = {
	ca4545: 'CA4545',
	ff7800: 'FF7800',
	primary: 'EB4817',
} as const;

export const ALL_COLORS = {
	facebook: '3F7FCB',
	ff7E7E: 'FF7E7E',
	linkedin: '55A6D3',
	twitter: '00A3FF',
	sucess: '19954A',
	violet: '9900E1',
	e9fed9: 'E9FED9',
	...LIGHT_COLORS,
	...GREY_COLORS,
	...DARK_COLORS,
	...ORANGE_COLORS,
} as const;

export type UiLibColorsType = {
	[key in keyof typeof ALL_COLORS]: `#${Lowercase<(typeof ALL_COLORS)[key]>}`;
};

// @ts-ignore
export const UiLibColors: UiLibColorsType = Object.entries(ALL_COLORS).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: `#${value}`,
	}),
	{}
);

// @ts-ignore
const Colors1: ColorsType = Object.entries(ALL_COLORS).reduce((acc, [key, value]) => {
	const array = Object.entries(COLOR_PARAMS).reduce(
		(ac2, [key2, value2]) => ({
			...ac2,
			[`${key2.toLowerCase()}-${key.toLowerCase()}`]: {
				[value2]: `#${value}`,
			},
		}),
		{}
	);

	return {
		...acc,
		...array,
	};
}, {});

export const ShadowRBGAColors = {
	'bg-tranparent': {
		backgroundColor: 'tranparent',
	},
	'shadow-rgba(0, 0, 0, 0.02)': {
		shadowColor: 'rgba(0, 0, 0, 0.25)',
	},
	'shadow-rgba(0, 0, 0, 0.05)': {
		shadowColor: 'rgba(0, 0, 0, 0.5)',
	},
	'shadow-rgba(0, 0, 0, 0.1)': {
		shadowColor: 'rgba(0, 0, 0, 1)',
	},
	'shadow-rgba(201, 201, 201, 0.1)': {
		shadowColor: 'rgba(201, 201, 201, 0.1)',
	},
} as const;

export const Colors: ColorsType = { ...Colors1, ...ShadowRBGAColors };
