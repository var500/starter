import { Button, Divider, Flex, Progress, Text } from '@chakra-ui/react';

import CountdownTimer from '../common/Timer';

export default function FundRaising() {
	const targetDate = new Date('2024-11-25').getTime(); // 2024-11-25T12:00:00Z

	return (
		<Flex
			flexDirection={'column'}
			gap={{ base: 1, md: 4 }}
			p={{ base: 4, md: 8 }}
			borderRadius={'md'}
			bg={'#1A1A1A'}
			mt={10}
			maxW={'400px'}
		>
			<Text variant={'simple'} className="font-normal text-lg text-[#6F6F6F]">
				Fundraise Goal
			</Text>
			<Text variant={'title'} fontWeight={'bold'} fontSize={{ base: '2xl', md: '5xl' }}>
				$5,00,000
			</Text>
			<Progress
				colorScheme="green"
				height={{ base: '12px', md: '28px' }}
				bg={'#272727'}
				sx={{
					'& > div': { backgroundColor: '#85F26A' },
				}}
				className="rounded-md"
				value={80}
			/>
			<Flex justifyContent={'space-between'} mt={4} fontSize={'xs'} alignItems={'baseline'}>
				<Text as={'span'} variant={'simple'} color={'#6F6F6F'}>
					Allocation
				</Text>
				<Flex
					flex={'1'}
					marginInline={'2'}
					borderBottom={'1px dotted #6F6F6F'}
					className="inline-block"
				/>
				<Text as={'span'} variant={'simple'} color={'#6F6F6F'}>
					$400 Max
				</Text>
			</Flex>
			<Flex justifyContent={'space-between'} mt={4} fontSize={'xs'} alignItems={'baseline'}>
				<Text as={'span'} variant={'simple'} color={'#6F6F6F'}>
					Price per token
				</Text>
				<Flex
					flex={'1'}
					marginInline={'2'}
					borderBottom={'1px dotted #6F6F6F'}
					className="inline-block"
				/>
				<Text as={'span'} variant={'simple'} color={'#6F6F6F'}>
					$0.02
				</Text>
			</Flex>

			<Button variant={'solid'} size={'lg'}>
				Apply Now
			</Button>

			<Divider opacity={0.2} mt={10} />

			<CountdownTimer targetDate={targetDate} />
		</Flex>
	);
}
