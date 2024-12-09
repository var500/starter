/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./node_modules/flowbite-react/**/*.js',
		'./src/pages/**/*.{ts,tsx}',
		'./src/components/**/*.{ts,tsx}',
		'./src/components/Base/**/*.{ts,tsx}',
		'./src/components/hoc/**/*.{ts,tsx}',
		'./public/**/*.html',
		'./src/**/*.tsx',
	],
	safelist: [
		'w-64',
		'w-1/2',
		'rounded-l-lg',
		'rounded-r-lg',
		'bg-gray-200',
		'grid-cols-4',
		'grid-cols-7',
		'h-6',
		'leading-6',
		'h-9',
		'leading-9',
		'shadow-lg',
	],
	theme: {
		extend: {
			colors: {
				primary: '#EB4817',
				facebook: '#3F7FCB',
				linkedIn: '#55A6D3',
				success: '#19954A',
			},
			fontFamily: {
				sans: ['Montserrat', 'Roboto', 'Poppins'],
				rockWell: ['RockWell'],
				inter: ['Inter'],
				saira: ['Saira'],
				spaceGrotesk: ['SpaceGrotesk'],
			},
			height: {
				'300px': '300px',
				'55rem': '55rem',
				'30rem': '30rem',
				'40rem': '40rem',
				'60rem': '60rem',
				'184px': '184px',
				'253px': '253px',
			},
			width: {
				'300px': '300px',
				'320px': '320px',
				'353px': '353px',
			},
			colors: {
				'#858fed': '#858fed',
				'#221949': '#221949',
				'#0B003A': '#0B003A',
				'purple-bg': 'rgba(155, 81, 224, 0.5)',
			},
			backdropBlur: {
				custom: '223px',
			},
			borderRadius: {
				custom: '0px 8px 8px 0px',
			},
			borderImage: {
				gradient: 'linear-gradient(180deg, #FFFFFF 0%, rgba(50, 50, 50, 0) 100%)',
			},
		},
	},
	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],
	theme: {},
};
