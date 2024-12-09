import { GiHamburgerMenu } from 'react-icons/gi';
import { Flex } from '@chakra-ui/react';
import Image from 'next/image';

import { Assets } from '@/assets';

export default function MobileNav() {
	return (
		<Flex
			display={{ base: 'flex', md: 'none' }}
			justifyContent={'space-between'}
			alignItems={'center'}
			w={'100%'}
		>
			<Image src={Assets.LOGO} alt="logo" height={48} width={96} />
			<Flex gap={2}>
				<GiHamburgerMenu color="white" size={40} />
				<Flex
					flexDirection={'column'}
					gap={2}
					justifyContent={'center'}
					px={2}
					py={1}
					mt={1}
					borderRadius={'3px'}
					bg={'#743DFF'}
				>
					<Image src={Assets.AAVE} alt="Aave" />
					<Image src={Assets.POLYGON} alt="polygon" />
				</Flex>
			</Flex>
		</Flex>
	);
}
