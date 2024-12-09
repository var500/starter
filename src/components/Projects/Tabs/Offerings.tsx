import { Flex, ListItem, OrderedList, Text } from '@chakra-ui/react';

import InfoCard from './offerings/InfoCard';

const CardData2 = [
	{ label: 'Accepted Currency', value: 'USDT' },
	{ label: 'Swap Network', value: 'Binance Smart Chain' },
	{ label: 'Token Claim Network', value: 'Binance Smart Chain' },
	{ label: 'Vesting Schedule', value: '10% unlocked at TGE, vesting monthly in 9 months' },
];

const CardData1 = [
	{ label: 'Price Per Token', value: '0.2 USDT per ZIMA' },
	{ label: 'Swap Amount', value: '250,000 ZIMA' },
	{ label: 'Total Raise', value: '$50,000' },
	{ label: 'Claim Type', value: 'Claim on Red Kite' },
];

export function Offerings() {
	return (
		<Flex flexDirection={'column'} gap={8}>
			<Text variant={'ProjectCategory'} fontSize={{ base: 'lg', md: '2xl' }} mt={10}>
				Offerings
			</Text>

			<InfoCard CardData={CardData1} />
			<InfoCard CardData={CardData2} />

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
		</Flex>
	);
}
