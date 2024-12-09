import type { StyleFunctionProps } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import Badge from './components/Badge';
import Button from './components/Buttons';
import Card from './components/Card';
import Input from './components/Input';
import Menu from './components/Menu';
import Modal from './components/Modal';
import Table from './components/Table';
import Text from './components/Text';

const CHAKRA_THEME = extendTheme({
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				fontFamily: 'body',
				color: mode('white', 'whiteAlpha.900')(props),
				bg: mode('#101010', 'white')(props),
				lineHeight: 'base',
			},
		}),
	},
	components: {
		Button,
		Card,
		Menu,
		Text,
		Table,
		Badge,
		Input,
		Modal,
	},
});

export default CHAKRA_THEME;
