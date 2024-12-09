import type { ALL_COLORS, COLOR_PARAMS, ShadowRBGAColors } from './colors';
import type { All_FONT_FAMILIES, All_FONT_SIZES, All_FONT_WEIGHTS } from './fonts';

export type CreatLiteral<
	param extends string,
	params2 extends string
> = `${Lowercase<param>}-${Lowercase<params2>}`;

export type GetValue<T, P extends string> = T extends { [key in P]: infer K } ? K : never;

type ThemeColorType = typeof ALL_COLORS;
type ThemeFontSizeType = typeof All_FONT_SIZES;
type ColorParamType = typeof COLOR_PARAMS;

export type ThemeFontFamilyType = typeof All_FONT_FAMILIES;
export type ThemeFontWeightType = typeof All_FONT_WEIGHTS;

export type ThemeColorTypeKey = keyof ThemeColorType;
export type ThemeFontSizeTypeKey = keyof ThemeFontSizeType;
export type ColorKeyNameTypes = keyof ColorParamType;

export type TYPE_COLOR_NAME = `#${Lowercase<ThemeColorType[keyof ThemeColorType]>}`;

type ColorKeyNamesLiteral = CreatLiteral<ColorKeyNameTypes, keyof typeof ALL_COLORS>;

type ExtractColor<Part extends string> = Part extends `${infer Property}-${infer Code}`
	? {
			readonly [key in GetValue<ColorParamType, Property>]: `#${Lowercase<
				GetValue<ThemeColorType, Code>
			>}`;
	  }
	: never;

type CreateColor<param extends ColorKeyNamesLiteral> = {
	readonly [Property in param]: ExtractColor<Property>;
};

export type ColorsType = CreateColor<ColorKeyNamesLiteral> & typeof ShadowRBGAColors;

export type ThemeFontWeightVALType<P extends keyof typeof All_FONT_WEIGHTS> =
	(typeof All_FONT_WEIGHTS)[P];

export type FONT_FAMILY_TYPE = ThemeFontFamilyType[keyof typeof All_FONT_FAMILIES];

type FontKeyNamesLiteral = CreatLiteral<FONT_FAMILY_TYPE, keyof typeof All_FONT_WEIGHTS>;

type FontKeyNamesWithSizeLiteral = CreatLiteral<FontKeyNamesLiteral, ThemeFontSizeTypeKey>;

type FontKeyNamesWithColorLiteral = CreatLiteral<FontKeyNamesLiteral, keyof ThemeColorType>;

export type FontKeyNamesWithSizeColorLiteral = CreatLiteral<
	FontKeyNamesWithSizeLiteral,
	keyof ThemeColorType
>;

type ExtractFont<Part extends string> = Part extends `${infer FontFamily}-${infer FontWeight}`
	? {
			fontFamily: GetValue<ThemeFontFamilyType, FontFamily>;
			fontWeight: GetValue<ThemeFontWeightType, FontWeight>;
	  }
	: never;

type ExtractFontSize<Part extends string> =
	Part extends `${infer FontFamily}-${infer FontWeight}-${infer FontSize}`
		? {
				fontFamily: GetValue<ThemeFontFamilyType, FontFamily>;
				fontWeight: GetValue<ThemeFontWeightType, FontWeight>;
				fontSize: GetValue<ThemeFontSizeType, FontSize>;
				fontStyle: 'normal';
		  }
		: never;

type ExtractFontWidthColor<Part extends string> =
	Part extends `${infer FontFamily}-${infer FontWeight}-${infer FontColor}`
		? {
				fontFamily: GetValue<ThemeFontFamilyType, FontFamily>;
				fontWeight: GetValue<ThemeFontWeightType, FontWeight>;
				color: `#${Lowercase<GetValue<ThemeColorType, FontColor>>}`;
				fontStyle: 'normal';
		  }
		: never;

type ExtractFontSizeWidthColor<Part extends string> =
	Part extends `${infer FontFamily}-${infer FontWeight}-${infer FontSize}-${infer FontColor}`
		? {
				fontFamily: GetValue<ThemeFontFamilyType, FontFamily>;
				fontWeight: GetValue<ThemeFontWeightType, FontWeight>;
				color: `#${Lowercase<GetValue<ThemeColorType, FontColor>>}`;
				fontSize: GetValue<ThemeFontSizeType, FontSize>;
				fontStyle: 'normal';
		  }
		: never;

type CreateFont<param extends FontKeyNamesLiteral> = {
	[Property in param]: ExtractFont<Property>;
};

type CreateFontSizeWithColor<param extends FontKeyNamesWithSizeLiteral> = {
	[Property in param]: ExtractFontSize<Property>;
};

type CreateFontWithColor<param extends FontKeyNamesWithColorLiteral> = {
	[Property in param]: ExtractFontWidthColor<Property>;
};

type CreateFonSizetWithColor<param extends FontKeyNamesWithSizeColorLiteral> = {
	[Property in param]: ExtractFontSizeWidthColor<Property>;
};

export type FontType = CreateFont<FontKeyNamesLiteral>;
export type FontSizeType = CreateFontSizeWithColor<FontKeyNamesWithSizeLiteral>;
export type FontColorType = CreateFontWithColor<FontKeyNamesWithColorLiteral>;
export type FontSizeColorType = CreateFonSizetWithColor<FontKeyNamesWithSizeColorLiteral>;
