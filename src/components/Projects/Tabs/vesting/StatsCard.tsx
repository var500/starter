import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { Assets } from '@/assets';

export default function StatsCard({
	heading,
	subheading,
}: {
	heading: string;
	subheading: string;
}) {
	return (
		<Flex
			w={'100%'}
			justifyContent={'space-between'}
			alignItems={'center'}
			bg={'#1E1E1E'}
			borderRadius={'lg'}
			p={4}
		>
			<Box w={'100%'}>
				<Text variant={'vesting'} textColor={'#6A6A6A'} fontSize={'14px'} fontWeight={400}>
					{heading}
				</Text>
				<Text variant={'vesting'} textColor={'#CACACA'} fontSize={'24px'} fontWeight={500}>
					{subheading}
				</Text>
			</Box>
			<Image src={Assets.NiftyGrey} height={59} width={119} alt="nifty-logo" />
		</Flex>
	);
}
