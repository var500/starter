import { List, ListItem, Text } from '@chakra-ui/react';

const OrderedList = ({
	items = [''],
	fontSize = { base: 'xs', md: 'lg' },
	fontWeight = 'light',
	spacing = 2,
	pl = 5,
	ml = 5,
}) => {
	return (
		<List as="ol" styleType="decimal" spacing={spacing} pl={pl} ml={ml} mb={8}>
			{items.map((item, index) => (
				<ListItem key={index}>
					<Text fontSize={fontSize} fontWeight={fontWeight}>
						{item}
					</Text>
				</ListItem>
			))}
		</List>
	);
};

export default OrderedList;
