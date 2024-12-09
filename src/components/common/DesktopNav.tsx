import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CustomConnectButton } from './CustomConnectButton';

import { Assets } from '@/assets';
import { DESKTOP_MENU_ITEMS } from '@/core/constants/common/NavLinks';

export default function DesktopNav() {
	const router = useRouter();

	return (
		<Flex
			display={{ base: 'none', md: 'flex' }}
			alignItems={'center'}
			w={'100%'}
			justifyContent={'space-between'}
		>
			<Image
				src={Assets.LOGO}
				alt="logo"
				height={48}
				width={96}
				className=" cursor-pointer"
				onClick={async () => router.push('/')}
			/>
			<Flex gap={2} alignItems={'center'} p={2}>
				<Flex
					justifyContent={'flex-start'}
					gap={8}
					textAlign={'center'}
					fontWeight={'medium'}
				>
					{DESKTOP_MENU_ITEMS.map((link, index) => (
						<Link key={index} href={link.link} className="text-sm">
							{link.name}
						</Link>
					))}
				</Flex>
				<CustomConnectButton />
			</Flex>
		</Flex>
	);
}
