import { defineStyleConfig } from '@chakra-ui/react';

const Input = defineStyleConfig({
	// The styles all Input have in common
	baseStyle: {
		fontFamily: 'Roboto',
		fontSize: '24px',
		textColor: 'black',
	},
	// Two sizes: sm and md
	sizes: {
		sm: {
			fontSize: 'sm',
			px: 6,
			py: 5,
		},
		md: {
			fontSize: 'md',
			px: 8,
			py: 4,
		},
	},

	// Two variants: outline and solid
	variants: {
		outline: {
			border: '2px solid',
			borderColor: '#632EE7',
			color: '#632EE7',
			_hover: {
				borderColor: 'rgba(99, 46, 231, 0.8)',
			},
		},
		gradient: {
			fontWeight: '400',
		},
		solid: {
			bg: 'orange',
			_hover: {
				cursor: 'pointer',
				bg: 'transparent',
				borderColor: '#632EE7',
				border: '2px solid',
			},
			zIndex: 20,
			borderRadius: '3px',
			color: 'white',
		},
	},
	// Default size and variant values
	defaultProps: {
		size: 'md',
		variant: 'outline',
	},
});

export default Input;
