import { defineStyleConfig } from '@chakra-ui/react';

const Badge = defineStyleConfig({
	// Base styles for all badges
	baseStyle: {
		fontWeight: 'bold',
		textTransform: 'none',
		fontFamily: 'Rockwell',
		color: 'white', // default text color
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	// Sizes
	sizes: {
		sm: {
			fontSize: 'sm',
			px: 2,
			py: 1,
		},
		md: {
			fontSize: 'md',
			px: 6,
			py: 3,
		},
	},
	// Variants for each badge type
	variants: {
		comingSoon: {
			bg: '#632EE7',
		},
		whitelisting: {
			bg: '#61A0FF',
		},
		soldOut: {
			bg: '#E72E4F',
		},
		rejected: {
			bg: '#E72E4F',
			fontFamily: 'Inter',
			borderRadius: '2xl',
			fontWeight: 400,
			px: 6,
			textColor: 'white',
			fontSize: '15px',
		},
		approved: {
			fontFamily: 'Inter',
			borderRadius: '2xl',
			fontWeight: 400,
			bg: '#DCFFE2',
			px: 6,
			textColor: '#303030',
			fontSize: '15px',
		},
		not_started: {
			fontFamily: 'Inter',
			borderRadius: '2xl',
			px: 6,
			fontWeight: 400,
			bg: '#FFF',
			textColor: '#303030',
			fontSize: '15px',
		},
		pending: {
			fontFamily: 'Inter',
			borderRadius: '2xl',
			px: 6,
			fontWeight: 400,
			bg: '#FFF1DC',
			textColor: '#303030',
			fontSize: '15px',
		},
	},

	defaultProps: {
		size: 'sm',
		variant: 'comingSoon',
	},
});

export default Badge;
