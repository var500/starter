import type { ReactNode } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Header from '../common/Header';

import { Home } from '@/assets';
import styles from '@/styles/Home.module.scss';

const Layout = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();

	return (
		<main className="relative overflow-hidden">
			{!pathname?.includes('/investor') && !pathname?.includes('/admin') ? (
				<Image src={Home.Grid} className="h-auto w-auto absolute z-[-1]" alt="grid" />
			) : null}

			<Flex
				display={{ base: 'none', sm: 'flex' }}
				alignItems={'center'}
				h={10}
				w={'100%'}
				justifyContent={'center'}
				opacity={0.7}
				bgGradient="linear(to-r,#000000, #220077)"
			>
				<Text variant={'simple'} color={'white'}>
					Always make sure the URL is noncestarter.com - bookmark it to be safe.
				</Text>
			</Flex>
			<div className={styles.container}>
				<Header />
			</div>
			{children}
		</main>
	);
};

export default Layout;
