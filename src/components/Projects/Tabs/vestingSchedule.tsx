import { Box, Button, Flex, ListItem, OrderedList, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import Chart from './vesting/PieChart';
import StatsCard from './vesting/StatsCard';
import StatsGrid from './vesting/StatsGrid';

import { Assets } from '@/assets';

export function VestingSchedule() {
	return (
		<Flex flexDirection={'column'} gap={8}>
			<Text variant={'ProjectCategory'} fontSize={{ base: 'lg', md: '2xl' }} mt={10}>
				Vesting Schedule
			</Text>

			<div className="relative flex flex-col">
				<Chart percentClaimed={60} />
				<div className="absolute left-1/2 top-1/2 z-10 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-3.5 rounded-full bg-gradient-to-b from-[#1b1b1b] to-neutral-950 p-3 shadow-md shadow-black">
					<div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-3 rounded-full ">
						<div className="flex flex-col items-center justify-center gap-2.5 text-[#FFFFFF];">
							<span className="text-center text-sm font-thin">NIFTYADE Tokens</span>
							<div className="flex flex-row items-end">
								<Image
									alt="coin"
									src={Assets.AAVE}
									width={26}
									height={26}
									className="mb-1"
								/>
								<Text
									variant={'vesting'}
									className="ml-0.5 text-4xl font-medium"
									textColor={'#A77EFF'}
								>
									1231
								</Text>
								<Text
									variant={'vesting'}
									className="ml-0.5 text-lg font-medium mb-2"
									textColor={'#A77EFF'}
								>
									.211
								</Text>
							</div>
							<span className="text-center text-sm font-thin">
								/0.00 NIFTY Tokens
							</span>
						</div>
					</div>
				</div>
			</div>
			<StatsGrid />

			<OrderedList variant={'orderdList'} fontSize={'18px'} textAlign={'left'}>
				<ListItem>
					SYN CITY is the first-ever Mafia Metaverse. Here you fight, loot, build and
					lead. Here you join a syndicate and run businesses, tax your underlings and pay
					tribute to your bosses through blockchain-backed assets. With enough Ambition,
					Power, and Swagger you can sit at the head of a syndicate and help chart the
					course of the Mafia Metaverse.
				</ListItem>
				<ListItem>
					Displaying a stylized take on the degen and underworld, SYN CITY takes this
					concept a step further by making the game free to play where you can play and
					earn. Strategize to build a ruthless empire backed by a gritty syndicate of
					peers, friends, and enemies alike. The Mafia will allow #synners to grind their
					way up through daily missions, events, battles, trades, farms, and much more.
				</ListItem>
			</OrderedList>

			<Link href={'/'} className="text-2xl ml-4">
				www.example.com
			</Link>

			<Flex
				w={'100%'}
				mt={6}
				justifyContent={'space-between'}
				alignItems={'center'}
				bg={'#1E1E1E'}
				borderRadius={'lg'}
				p={4}
			>
				<Box w={'100%'}>
					<Text
						variant={'vesting'}
						textColor={'#9E98EB'}
						fontSize={'18px'}
						fontWeight={500}
					>
						Total Tokens
					</Text>
					<Text
						variant={'vesting'}
						textColor={'white'}
						fontSize={'36px'}
						fontWeight={500}
					>
						150, 445.00
					</Text>
				</Box>
				<Image src={Assets.NiftyLogo} height={22} width={36} alt="nifty-logo" />
			</Flex>
			<Button variant={'vesting'} size={'lg'}>
				Claim Tokens Now
			</Button>

			<StatsCard heading="Streamed: 0.00%" subheading="0.00 $NIFTY" />
			<StatsCard heading="Released: 0.00%" subheading="0.00 $NIFTY" />
		</Flex>
	);
}
