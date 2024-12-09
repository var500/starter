import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';

import { CHAKRA_THEME } from '@/core/constants/theme';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<ColorModeScript initialColorMode={CHAKRA_THEME.config.initialColorMode} />

				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
