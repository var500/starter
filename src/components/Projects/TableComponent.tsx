import { useState } from 'react';
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Assets } from '@/assets';
import { ProjectsList } from '@/utils/common';

export default function TableCompoent() {
	const [activeTab, setActiveTab] = useState('All');
	const tabs = ['All', 'Ethereum', 'Polygon', 'Avalanche'];
	const router = useRouter();
	//Filter Funcationality To be added
	const handleProjectDescription = (id: number) => {
		return router.push(`projects/${id}`);
	};

	return (
		<Flex flexDirection={'column'} gap={8} p={5}>
			<Flex flexDirection={'row'} overflow={'auto'} gap={4}>
				{tabs.map((tab) => (
					<Text
						variant={'subTitle'}
						key={tab}
						onClick={() => setActiveTab(tab)}
						sx={{
							cursor: 'pointer',
							px: 2,
							py: 1,
							textTransform: 'none',
							borderRadius: 'lg',
							color: activeTab === tab ? '#AE8DFF' : 'inherit',
						}}
					>
						{tab}
					</Text>
				))}
			</Flex>
			<Box overflow={'auto'}>
				<Table variant="simple" textTransform={'none'}>
					<Thead>
						<Tr backgroundColor={'#251F35'}>
							<Th>Project Name</Th>
							<Th>Participants</Th>
							<Th>Total Raised</Th>
							<Th>Current Price</Th>
							<Th>ATH Since IDO</Th>
							<Th>Ended in (UTC)</Th>
							<Th>Networks</Th>
						</Tr>
					</Thead>
					<Tbody bgColor={'#1A1A1A'}>
						{ProjectsList.map((project, index) => (
							<Tr key={index} className="border-b-[1px] border-[#292929]">
								<Td borderWidth={0}>
									<Flex
										gap={2}
										alignItems={'center'}
										onClick={() => handleProjectDescription(project.id)}
										className="hover:cursor-pointer"
									>
										<Image
											src={Assets.DefaultProject}
											height={32}
											width={32}
											alt="ProjectLogo"
										/>
										<Text fontWeight="bold">{project.name}</Text>
									</Flex>
								</Td>
								<Td borderWidth={0} textColor={'#B4B4B4'} fontWeight={600}>
									{project.participants}
								</Td>
								<Td borderWidth={0} textColor={'#B4B4B4'} fontWeight={600}>
									{project.totalRaised}
								</Td>
								<Td borderWidth={0} textColor={'#6B6B6B'} fontWeight={400}>
									{project.currentPrice}
								</Td>
								<Td borderWidth={0}>
									<p className="bg-[#85F26A] inline-block px-2 py-1 rounded-md text-[#6B6B6B] text-xs">
										{project.ath}
									</p>
								</Td>
								<Td borderWidth={0} textColor={'#C5C5C5'}>
									{project.endDate}
								</Td>
								<Td borderWidth={0}>
									<Image
										src={Assets.Binance}
										alt="binance"
										height={32}
										width={32}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Flex>
	);
}
