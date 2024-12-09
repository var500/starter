import type { ReactNode } from 'react';
import { MdWindow } from 'react-icons/md';
import { Box, Flex, ListIcon, ListItem, UnorderedList } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { Assets } from '@/assets';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Flex minH={'100vh'} maxW={'1400px'} px={20} pb={20} gap={4}>
			{/* Left Navbar */}
			<Box w={'250px'} bg={'#181818'} p={4} borderRadius={'xl'}>
				<UnorderedList styleType={'none'} spacing={5}>
					<ListItem>
						<Image src={Assets.LOGO} className="h-14 w-auto mb-10" alt="logo" />
					</ListItem>
					<ListItem alignItems={'center'} display={'flex'}>
						<ListIcon as={MdWindow} color="white" boxSize={6} />
						<Link href="/admin/dashboard">Dashboard</Link>
					</ListItem>
					<ListItem>
						<Link href="/admin/dashboard/settings">Settings</Link>
					</ListItem>
					<ListItem>
						<Link href="/admin/dashboard/reports">Reports</Link>
					</ListItem>
				</UnorderedList>
			</Box>
			{/* Main Content */}
			<Flex className="flex-1 p-4 bg-white">{children}</Flex>
		</Flex>
	);
};

export default DashboardLayout;
