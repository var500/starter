import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import OrderedList from '../OrderedList';

import { Assets } from '@/assets';

const items = [
	'SYN CITY is the first-ever Mafia Metaverse. Here you fight, loot, build, and govern through your own syndicate.',
	'$SYNR is the governance token for the metaverse and core of the Mafia-as-a-DAO system. Users stake $SYNR to generate votes to delegate to any syndicate leaders. A limited number of the highest voted leaders will be on the High Table to govern the earning pools of the metaverse.',
	// eslint-disable-next-line max-len
	'$8 million invested by Angels such as Justin Kan (Co-founder of Twitch), Do Kwon (Co-founder of Terra), Kieran Warwick (Co-founder of Illuvium), Santiago R Santos (Ex-Partner of Parafi Capital), leading VCs including Animoca Brands, Spartan Group, and HOF, and strategic partners including Overwolf, Merit Circle, YGG, GuildFi, and many more.',
];

const ProductItem = [
	// eslint-disable-next-line max-len
	'SYN CITY is the first-ever Mafia Metaverse. Here you fight, loot, build and lead. Here you join a syndicate and run businesses, tax your underlings and pay tribute to your bosses through blockchain-backed assets. With enough Ambition, Power, and Swagger you can sit at the head of a syndicate and help chart the course of the Mafia Metaverse.',

	// eslint-disable-next-line max-len
	'Displaying a stylized take on the degen and underworld, SYN CITY takes this concept a step further by making the game free to play where you can play and earn. Strategize to build a ruthless empire backed by a gritty syndicate of peers, friends, and enemies alike. The Mafia will allow #synners to grind their way up through daily missions, events, battles, trades, farms, and much more.',
];

export function Description() {
	return (
		<Flex flexDirection={'column'} gap={4} mt={10} mb={8}>
			<Text variant={'ProjectCategory'} fontSize={{ base: 'lg', md: '2xl' }}>
				HIGHLIGHTS
			</Text>
			<OrderedList items={items} />

			<Text variant={'ProjectCategory'} fontSize={{ base: 'lg', md: '2xl' }}>
				PRODUCT
			</Text>
			<Text
				variant={'solid'}
				color={'#C6BCDF'}
				fontSize={42}
				fontWeight={400}
				textTransform={'none'}
				lineHeight={'40px'}
				py={2}
			>
				Be the boss and take control of turfs, business, loot, and raid other syndicates to
				expand your empire.
			</Text>
			<OrderedList items={ProductItem} />

			<Image src={Assets.ProjectImage2} alt="ProjectImage" className="w-full h-[206px]" />
		</Flex>
	);
}
