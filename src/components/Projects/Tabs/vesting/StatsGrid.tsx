import { Box, Flex, Text } from '@chakra-ui/react';

export default function StatsGrid() {
	return (
		<Box>
			<Flex justifyContent={'space-between'} borderBottom={'1px solid #5E5E5E'}>
				<Flex
					flexDirection={'column'}
					justifyContent={'center'}
					h={40}
					borderRight={'1px solid #5E5E5E'}
					w={'100%'}
				>
					<Text variant={'simple'} color={'white'} fontSize={{ base: 'md', md: '2xl' }}>
						Unlocks
					</Text>
					<Text
						variant={'simple'}
						fontSize={{ base: 'sm', md: 'xl' }}
						pr={{ base: 6, md: 16 }}
					>
						33% at TGE, 5 month cliff, then linear
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
							227K $KARATE
						</Text>
						<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
							Available For claim
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
						481K $KARATE
					</Text>
					<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
						Total Tokens
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
							159K $KARATE
						</Text>
						<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
							Claimed Before
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
						80%
					</Text>
					<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
						Unlocked
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
							$500.0
						</Text>
						<Text variant={'simple'} fontSize={{ base: 'sm', md: 'xl' }}>
							Allocation
						</Text>
					</Box>
				</Flex>
			</Flex>
		</Box>
	);
}
