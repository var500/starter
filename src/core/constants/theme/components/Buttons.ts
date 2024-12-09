import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
	// The styles all button have in common
	baseStyle: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		borderRadius: 'base', // <-- border radius is same for all variants and sizes
	},
	// Two sizes: sm and md
	sizes: {
		sm: {
			fontSize: 'sm',
			px: 4, // <-- px is short for paddingLeft and paddingRight
			py: 3, // <-- py is short for paddingTop and paddingBottom
		},
		md: {
			fontSize: 'md',
			px: 6, // <-- these values are tokens from the design system
			py: 4, // <-- these values are tokens from the design system
		},
		lg: {
			fontSize: 'md',
			px: 8,
			py: 6,
		},
	},
	// Two variants: outline and solid
	variants: {
		outline: {
			border: '2px solid',
			borderColor: '#632EE7',
			color: '#632EE7',
		},
		solid: {
			bg: '#632EE7 ',
			_hover: {
				cursor: 'pointer',
				bg: 'transparent',
				borderColor: '#632EE7',
				border: '2px solid',
			},
			zIndex: '20',
			borderRadius: '3px',
			color: 'white',
		},
		vesting: {
			bg: '#6F4DCF',
			_hover: {
				cursor: 'pointer',
				bg: 'transparent',
				borderColor: '#6F4DCF',
				border: '2px solid',
			},
		},
		social: {
			w: '100%',
			textTransform: 'none',
			fontWeight: 700,
			fontSize: '12px',
			bgGradient: 'linear(to-b, #402874,#3B00B900)',
			_hover: {
				cursor: 'pointer',
				bgGradient: 'linear(to-r, #3B00B900, #402874)',
			},
		},
		investor: {
			textTransform: 'none',
			fontWeight: 700,
			boxShadow: '0px 4px 83px 0px #00000014',
			bgGradient: 'linear(to-b, #511FBA,#230562)',
			_hover: {
				cursor: 'pointer',
				bgGradient: 'linear(to-r, #230562,#511FBA)',
			},
		},
		skipKyc: {
			textTransform: 'none',
			fontWeight: 400,
			boxShadow: '0px 4px 83px 0px #00000014',
			bgGradient: 'linear(to-l, #8E61FF,#31078B)',
			_hover: {
				cursor: 'pointer',
			},
		},
		admin: {
			textTransform: 'none',
			fontWeight: 700,
			boxShadow: '0px 4px 83px 0px #00000014',
			bgGradient: 'linear(to-b, #511FBA,#230562)',
			_hover: {
				cursor: 'pointer',
				bgGradient: 'linear(to-r, #230562,#511FBA)',
			},
		},
		validateOtp: {
			borderRadius: '4px',
			fontFamily: 'Raleway',
			fontWeight: 600,
			textTransform: 'none',
			bgGradient: 'linear(to-r, #5019DC,#2B0D76)',
			_hover: {
				cursor: 'pointer',
				bgGradient: 'linear(to-b, #5019DC,#2B0D76)',
			},
		},
		getStartedGrey: {
			fontFamily: 'SpaceGrotesk',
			textTransform: 'none',
			fontWeight: 500,
			textColor: 'white',
			border: '1px solid #FFFFFF1A',
			rounded: 'xl',
			fontSize: '14px',
			bgGradient: 'linear(to-b, #FFFFFF14,#FFFFFF00)',
			_hover: {
				cursor: 'pointer',
				bgGradient: 'linear(to-r, #FFFFFF14,#FFFFFF00)',
			},
		},
		getStartedPurple: {
			fontFamily: 'SpaceGrotesk',
			textTransform: 'none',
			fontWeight: 700,
			textColor: 'black',
			rounded: 'xl',
			fontSize: '14px',
			bgGradient: 'linear(to-b, #743DFF,#743DFF)',
			_hover: {
				cursor: 'pointer',
				bgGradient: 'linear(to-r, #743DFFAC,#743DFF)',
			},
		},
		kyc: {
			textTransform: 'none',
			fontWeight: 600,
			fontSize: '24px',
			bgGradient: 'linear(to-l, #743DFF,#40139F)',
			_hover: {
				cursor: 'pointer',
				bgGradient: 'linear(to-r, #230562,#511FBA)',
			},
		},
	},
	// The default size and variant values
	defaultProps: {
		size: 'md',
		variant: 'outline',
	},
});

export default Button;
