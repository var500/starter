import { Box, Flex, Text } from '@chakra-ui/react';

export function TokenSale() {
	return (
		<Flex flexDirection={'column'}>
			<Text variant={'ProjectCategory'} fontSize={{ base: 'lg', md: '2xl' }} mt={10} mb={8}>
				Token Sale
			</Text>
			<Flex justifyContent={'space-between'} borderBottom={'1px solid #5E5E5E'}>
				<Flex
					flexDirection={'column'}
					justifyContent={'center'}
					h={40}
					borderRight={'1px solid #5E5E5E'}
					w={'100%'}
				>
					<Text variant={'simple'} color={'white'} fontSize={{ base: 'md', md: '2xl' }}>
						IDO Type
					</Text>
					<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
						Refundable within 3 days of Sale
					</Text>
				</Flex>
				<Flex flexDirection={'column'} justifyContent={'center'} h={40} w={'100%'}>
					<Box pl={{ base: 10, md: 20 }}>
						<Text
							textAlign={'left'}
							variant={'simple'}
							color={'white'}
							fontSize={{ base: 'md', md: '2xl' }}
						>
							$FDV
						</Text>
						<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
							$90,000,000,000
						</Text>
					</Box>
				</Flex>
			</Flex>
			<Flex justifyContent={'space-between'} borderBottom={'1px solid #5E5E5E'}>
				<Flex
					flexDirection={'column'}
					justifyContent={'center'}
					h={40}
					borderRight={'1px solid #5E5E5E'}
					w={'100%'}
				>
					<Text variant={'simple'} color={'white'} fontSize={{ base: 'md', md: '2xl' }}>
						Total Raise
					</Text>
					<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
						500,000
					</Text>
				</Flex>
				<Flex flexDirection={'column'} justifyContent={'center'} h={40} w={'100%'}>
					<Box pl={{ base: 10, md: 20 }}>
						<Text
							textAlign={'left'}
							variant={'simple'}
							color={'white'}
							fontSize={{ base: 'md', md: '2xl' }}
						>
							Listing
						</Text>
						<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
							TBD
						</Text>
					</Box>
				</Flex>
			</Flex>
			<Flex justifyContent={'space-between'}>
				<Flex
					flexDirection={'column'}
					justifyContent={'center'}
					h={40}
					borderRight={'1px solid #5E5E5E'}
					w={'100%'}
				>
					<Text variant={'simple'} color={'white'} fontSize={{ base: 'md', md: '2xl' }}>
						PEG
					</Text>
					<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
						$0,023
					</Text>
				</Flex>
				<Flex flexDirection={'column'} justifyContent={'center'} h={40} w={'100%'}>
					<Box pl={{ base: 10, md: 20 }}>
						<Text
							textAlign={'left'}
							variant={'simple'}
							color={'white'}
							fontSize={{ base: 'md', md: '2xl' }}
						>
							Unlocks
						</Text>
						<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
							20% unlock at TGE, 4 month linear vesting
						</Text>
					</Box>
				</Flex>
			</Flex>
		</Flex>
	);
}
