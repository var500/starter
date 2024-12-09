import { defineStyleConfig } from '@chakra-ui/react';

const Text = defineStyleConfig({
	// The styles all button have in common
	baseStyle: {
		fontFamily: 'Roboto',
		fontWeight: 'normal',
		textTransform: 'uppercase',
		borderRadius: 'base', // <-- border radius is same for all variants and sizes
	},
	// Two variants: outline and solid
	variants: {
		title: {
			fontFamily: 'Rockwell',
			color: 'white',
		},
		alert: {
			fontFamily: 'Rockwell',
			color: 'red',
			textAlign: 'right',
			fontSize: '12px',
			textTransform: 'none',
		},
		form: {
			color: 'white',
			fontWeight: 800,
			fontSize: '36px',
			fontFamily: 'Inter',
			textTransform: 'none',
		},
		tier: {
			fontFamily: 'SpaceGrotesk',
			fontWeight: 400,
			fontSize: '20px',
			textTransform: 'none',
		},
		kyc: {
			fontFamily: 'Inter',
			textTransform: 'none',
			color: '#939393',
			textAlign: 'center',
			fontSize: '11px',
			fontWeight: 400,
		},
		subscription: {
			fontFamily: 'Inter',
			textTransform: 'none',
			color: 'white',
			fontSize: '28px',
			fontWeight: 400,
		},
		orderdList: {
			textTransform: 'none',
			textAlign: 'center',
			fontSize: '18px',
			color: '#fff',
			fontWeight: 300,
		},
		adminVerify: {
			fontFamily: 'Raleway',
			textTransform: 'none',
		},
		gradient: {
			fontFamily: 'Rockwell',
			fontWeight: 'bold',
			fontSize: ['2xl', '3xl', '4xl'], // Responsive sizes
			lineHeight: '1.2',
			textTransform: 'none',
			textAlign: 'left',
			bgGradient: 'linear(to-r, #AE8DFF, #9BC3FF50)',
			bgClip: 'text',
			textFillColor: 'transparent',
		},
		vesting: {
			fontFamily: 'Saira',
			textTransform: 'none',
		},
		LightGradient: {
			fontFamily: 'Rockwell',
			fontWeight: 'bold',
			fontSize: ['2xl', '3xl', '4xl'], // Responsive sizes
			lineHeight: '1.2',
			textTransform: 'none',
			textAlign: 'left',
			bgGradient: 'linear(to-r, #743DFF, #ffffff50)',
			bgClip: 'text',
			textFillColor: 'transparent',
		},
		solid: {
			color: '#8E61FF ',
			fontFamily: 'Rockwell',
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		simple: {
			color: '#B4B4B4',
			fontSize: '12px',
			textTransform: 'none',
		},
		ProjectCategory: {
			fontSize: '24px',
			lineHeight: '28.13px',
			letterSpacing: '0.62rem', // Equivalent to `letter-spacing: 0.62em`
			textAlign: 'left',
			textDecorationSkipInk: 'none',
			textUnderlinePosition: 'from-font',
		},
	},
	// The default size and variant values
	defaultProps: {
		size: 'md',
		variant: 'simple',
	},
});

export default Text;
