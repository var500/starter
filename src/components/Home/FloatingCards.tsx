import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { Assets } from '@/assets';

const floatingCardStyles = {
	width: '348px',
	height: '219px',
	bg: '#9B51E010', // Purple translucent background

	backdropFilter: 'blur(8px)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	px: 6,
};

const FloatingCardData = [
	{
		title: 'For Teams',
		description:
			'Permissionless listing Fair & decentralized fundraising Various token auction types Access to a suite of products under polystarter Marketing, advisory and technical support',
	},
	{
		title: 'For Communities',
		description:
			'Access to public token launches of polygon projects Low gas fee and fast transactions Support multiple currencies and stablecoin Lottery tiers that fit everyone',
	},
	{
		title: 'For VCs',
		description:
			'Access to well-vetted projects Secure & compliant Token vesting and distribution Token claim dashboard',
	},
];

// Main Component
const FloatingCard = () => (
	<Flex
		wrap={'wrap'}
		sx={{
			flexDirection: { base: 'column', lg: 'row' },
			display: { base: 'flex', xl: 'none' },
			gap: { base: '4px', xl: '' },
		}}
		pb={10}
		justifyContent="center"
		mt={10}
		zIndex={4}
	>
		{FloatingCardData.map((item, index) => (
			<Flex
				key={index}
				sx={{
					...floatingCardStyles,
					bg: '#9B51E010',
					borderLeftRadius: { base: 0, md: index === 0 ? 'lg' : 'none' },
					borderRightRadius: { base: 8, md: index === 2 ? 'lg' : 'none' },
				}}
			>
				{/* Card Content */}
				<Flex justifyContent={'space-between'} w={'100%'} h={'60px'}>
					<Text
						variant={'title'}
						textTransform={'none'}
						color="white"
						fontSize={18}
						placeContent={'end'}
					>
						{item.title}
					</Text>

					<Image src={Assets.CARDBADGE} className="h-[38px] w-[38px]" alt="CardBadge" />
				</Flex>
				<Text variant={'simple'}>{item.description}</Text>
			</Flex>
		))}
	</Flex>
);

export default FloatingCard;
