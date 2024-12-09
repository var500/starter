import { PiIdentificationCardFill } from 'react-icons/pi';
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

// const documents = [
// 	{
// 		index: 1,
// 		documentName: 'Aadhar Card',
// 		date: '25 Dec 2025',
// 		status: 'Approved',
// 	},
// 	{
// 		index: 2,
// 		documentName: 'Pancard',
// 		date: '25 Dec 2025',
// 		status: 'Pending',
// 	},
// ];

export type documentType = {
	index: number;
	documentName: string;
	date: string;
}[];

export default function DocumentListTable({
	documents,
	loading,
}: {
	documents: documentType;
	loading: boolean;
}) {
	return (
		<TableContainer>
			<Table variant="kyc" border={'#DCDCDC'}>
				<Thead>
					<Tr>
						<Th>S. No</Th>
						<Th>Document</Th>
						<Th>Date</Th>
					</Tr>
				</Thead>
				<Tbody>
					{!loading &&
						documents.map((item) => {
							return (
								<Tr key={item.index}>
									<Td>{item.index}</Td>
									<Td placeItems={'center'}>
										<Flex
											w={'100px'}
											justifyContent={'center'}
											gap={1}
											alignItems={'center'}
										>
											<PiIdentificationCardFill size={20} />
											{item.documentName}
										</Flex>
									</Td>
									<Td>{item.date}</Td>
								</Tr>
							);
						})}
				</Tbody>
			</Table>
			{loading ? (
				<Flex py={10} justifyContent={'center'}>
					<Text variant={'simple'}>Loading... Please wait</Text>
				</Flex>
			) : null}
		</TableContainer>
	);
}
