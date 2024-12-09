import { Flex, Text } from '@chakra-ui/react';

export default function InfoCard({
	CardData,
}: {
	CardData: {
		label: string;
		value: string;
	}[];
}) {
	return (
		<Flex flexDirection="column" gap={8} bg="#1A1A1A" p={4} py={10}>
			{CardData.map((item, index) => {
				return (
					<Flex
						key={index} // Always add a unique key for mapped elements
						alignItems="center"
						justifyContent="space-between"
						w="100%"
					>
						<Text
							variant="simple"
							color="white"
							fontSize={{ base: 'md', md: '2xl' }}
							w="50%"
						>
							{item.label}
						</Text>
						<Text
							variant="simple"
							fontSize={{ base: 'sm', md: 'xl' }}
							w="50%"
							textColor={item.label === 'Total Raise' ? '#FF0000' : '#ADADAD'}
							textAlign="left"
						>
							{item.value}
						</Text>
					</Flex>
				);
			})}
		</Flex>
	);
}
