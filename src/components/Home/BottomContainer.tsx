import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { Assets } from '@/assets';
import { FloatingCardData } from '@/utils/common';

// Define reusable style objects
const containerStyles = {
	position: 'relative',
	overflow: 'visible', // Allow elements to overflow the container
	_before: {
		content: '""',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		borderRadius: 'inherit',
		borderWidth: '1px 1px 0 0',
		borderStyle: 'solid',
		borderImageSource: 'linear-gradient(180deg, #252525 0%, rgba(187, 187, 187, 0) 100%)',
		borderImageSlice: 1,
		pointerEvents: 'none',
		zIndex: 1,
	},
};

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

// Main Component
const BottomContainer = () => (
	<Flex
		flexDirection="column"
		alignItems="center"
		height="400px"
		mb={20}
		borderRadius="md"
		pt={10}
		px={10}
		zIndex={2}
		bg="rgba(0, 0, 0, 0.2)" // Make background translucent
		sx={{ ...containerStyles, display: { base: 'none', xl: 'flex' } }}
	>
		{/* Content Section */}
		<Box maxW="800px" placeItems="center" zIndex={2} position="relative">
			<Text variant="simple" color="white" fontSize={18}>
				Funded Projects Already
			</Text>
			<Text textAlign="center" variant="gradient" fontSize={48}>
				Synergizing Noncestarter with Nonceblox Ecosystem
			</Text>
		</Box>

		{/* Cards Row */}
		<Flex
			sx={{
				flexDirection: { base: 'column', md: 'row' },
			}}
			justifyContent="center"
			mt={10}
			zIndex={4}
		>
			{FloatingCardData.map((item, index) => (
				<Flex
					key={index}
					sx={{
						...floatingCardStyles,
						borderLeftRadius: index === 0 ? 'lg' : 'none',
						borderRightRadius: index === 2 ? 'lg' : 'none',
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

						<Image
							src={Assets.CARDBADGE}
							className="h-[38px] w-[38px]"
							alt="CardBadge"
						/>
					</Flex>
					<Text variant={'simple'}>{item.description}</Text>
				</Flex>
			))}
		</Flex>
	</Flex>
);

export default BottomContainer;
