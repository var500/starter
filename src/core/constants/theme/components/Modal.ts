// theme/components/modal.js
import { defineStyleConfig } from '@chakra-ui/react';

const Modal = defineStyleConfig({
	baseStyle: {
		overlay: {
			bg: 'rgba(0, 0, 0, 0.6)', // Overlay background
		},
		dialog: {
			borderRadius: 'md', // Modal box styling
			bgGradient: 'linear(to-bl, #1E1E1E, #000000)',
			padding: 6,
		},
		header: {
			fontFamily: 'Roboto',
			fontWeight: '500',
			fontSize: '28px',
			textColor: '#FFFFFF',
			borderBottom: '1px solid #373737',
		},
		closeButton: {
			color: '#FFFFFF',
		},
		body: {
			fontFamily: 'Inter',
			fontSize: '18px',
			color: '#C7C7C7',
		},
		footer: {
			textAlign: 'right',
		},
	},
	variants: {
		subscription: {
			dialog: {
				border: '1px solid #743DFF',
				bgGradient: 'linear(to-bl, #1E1E1E, #000000)',
			},
		},
	},
	defaultProps: {
		variant: 'subscription',
	},
});

export default Modal;
