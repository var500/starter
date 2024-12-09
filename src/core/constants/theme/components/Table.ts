// theme/components/table.js
import { defineStyleConfig } from '@chakra-ui/react';

const Table = defineStyleConfig({
	baseStyle: {
		fontFamily: 'Roboto', // Apply Roboto font family globally to the table
	},
	variants: {
		kyc: {
			th: {
				fontFamily: 'Inter',
				textTransform: 'none',
				color: '#C7C7C7',
				textAlign: 'center',
				fontSize: '15px',
				fontWeight: 400,
			},
			td: {
				fontFamily: 'Inter',
				textTransform: 'none',
				color: '#C7C7C7',
				textAlign: 'center',
				fontSize: '15px',
				fontWeight: 400,
			},
			tr: {
				borderBottom: '1px solid #3E3E3E',
			},
		},
		simple: {
			th: {
				fontFamily: 'Roboto', // Font family for table headers
				color: 'white',
				fontWeight: 'bold',
				textTransform: 'none',
				fontSize: 'sm',
			},
			td: {
				fontFamily: 'Roboto', // Font family for table data
				fontSize: 'sm',
				color: 'gray.600',
			},
			caption: {
				fontFamily: 'Roboto',
				color: 'gray.500',
			},
		},
	},
	defaultProps: {
		variant: 'simple',
	},
});

export default Table;
