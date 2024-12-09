import { useEffect, useState } from 'react';
import { BsExclamationOctagonFill } from 'react-icons/bs';
import { IoMdCloseCircleOutline, IoMdRefresh } from 'react-icons/io';
import { Badge, Box, Button, Checkbox, Flex, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

import type { documentType } from '@/components/Investor/KYC/DocumentListTable';
import DocumentListTable from '@/components/Investor/KYC/DocumentListTable';
import { getKycDocumentsByUserId, uploadDocuments } from '@/core/service/api/kycApi';

export default function UploadDocs() {
	const toast = useToast();
	const [documents, setDocuments] = useState<documentType>([]);
	const { data } = useSession();
	const [kycRows, setKycRows] = useState([{ id: Date.now(), fileName: 'aadhar', file: null }]);
	const [isChecked, setIsChecked] = useState(true);

	const {
		data: kycDocuments,
		refetch,
		isFetching: loading,
	} = useQuery({
		queryFn: async () => getKycDocumentsByUserId({ userId: data?.user.id || '' }),
		enabled: !!data?.user.id,
		queryKey: ['getKycDocumentsByUserId', data?.user.id],
	});

	const handleRefetch = () => {
		refetch();
	};

	const { mutate } = useMutation({
		mutationFn: uploadDocuments,
		onSuccess() {
			toast({
				title: 'Upload successful:',
				description: 'KYC document submitted. Please wait for Approval',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			refetch();
		},
		onMutate() {
			toast({
				title: 'File Upload in process',
				description: 'Please wait while files are Processed',
				status: 'loading',
				duration: 4000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: 'File Upload failer',
				description: ((error as AxiosError).response as { data: { error: string } })?.data
					.error,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		},
	});

	const removeRow = (index: number) => {
		if (kycRows.length > 1) {
			const updatedRows = [...kycRows];
			updatedRows.splice(index, 1);
			setKycRows(updatedRows);
		}
	};

	const addNewRow = () => {
		setKycRows([...kycRows, { id: Date.now(), fileName: '', file: null }]);
	};

	const handleFileChange = (index: number, file: File | null) => {
		const updatedRows = [...kycRows];
		//@ts-ignore
		updatedRows[index].file = file;
		setKycRows(updatedRows);
	};

	const handleSelectChange = (index: number, value: string) => {
		const updatedRows = [...kycRows];
		updatedRows[index].fileName = value;
		setKycRows(updatedRows);
	};

	const handleUploadFiles = async () => {
		const formData = new FormData();
		kycRows.forEach((row) => {
			if (row.file && row.fileName) {
				formData.append(row.fileName, row.file);
			}
		});

		if (data?.user.id) formData.append('id', data.user.id);

		mutate(formData);
	};

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
	};

	useEffect(() => {
		if (kycDocuments && kycDocuments.documents) {
			const fetchedData = kycDocuments.documents.map((doc, index) => ({
				index: index + 1,
				documentName: doc.documentType.charAt(0).toUpperCase() + doc.documentType.slice(1), // Capitalize type
				date: new Date(doc.date).toLocaleDateString(), // Format date
			}));
			setDocuments(fetchedData);
		}
	}, [kycDocuments]);

	console.log(kycDocuments, kycDocuments?.status?.toLowerCase());

	return (
		<Flex
			justifyContent={'center'}
			alignItems={'center'}
			flexDirection={'column'}
			fontSize={20}
		>
			<Flex
				justifyContent={'center'}
				px={4}
				wrap={'wrap'}
				pb={10}
				position={'relative'}
				gap={10}
				w={'100%'}
			>
				<Box>
					<Text
						textAlign={'start'}
						variant={'simple'}
						position={'absolute'}
						top={'-30px'}
					>
						Upload KYC Details
					</Text>
					<Flex
						zIndex={10}
						maxW={'570px'}
						h={'673px'}
						w={'100%'}
						bgGradient="linear(to-b, #1A1A1A, #000000)"
						px={10}
						pt={14}
						pb={10}
						gap={4}
						flexDirection={'column'}
					>
						{/* Dynamic Rows */}
						{kycRows.map((row, index) => (
							<Box key={row.id} mb={index === kycRows.length - 1 ? 20 : 0}>
								<Flex
									p={4}
									alignItems={'center'}
									border={'1px solid #8E61FF'}
									justifyContent={'space-between'}
									gap={10}
								>
									<select
										placeholder="Select Document Type"
										value={row.fileName}
										className="w-full bg-transparent border-none"
										onChange={(e) => handleSelectChange(index, e.target.value)}
									>
										<option className="bg-black border-none" value="aadhar">
											Aadhar
										</option>
										<option className="bg-black border-none" value="pancard">
											Pancard
										</option>
										<option className="bg-black border-none" value="other">
											Other
										</option>
									</select>

									<Box position={'relative'}>
										<input
											type="file"
											className="absolute opacity-0 z-10 cursor-pointer w-40"
											onChange={(e) =>
												handleFileChange(index, e.target.files?.[0] || null)
											}
										/>
										<Button
											variant={'solid'}
											size={'md'}
											borderRadius={'3xl'}
											fontSize={12}
											px={8}
											zIndex={0}
										>
											{row.file
												? (row.file as { name: string }).name.slice(0, 10)
												: 'Upload File'}
										</Button>
									</Box>
									{/* Cross Icon */}
									{kycRows.length > 1 && (
										<Button
											variant="unstyled"
											size="sm"
											onClick={() => removeRow(index)}
											color="red.500"
										>
											<IoMdCloseCircleOutline size={20} color="red" />
										</Button>
									)}
								</Flex>
							</Box>
						))}
						<Button
							variant={'unstyled'}
							size={'sm'}
							textColor={'#C7C7C7'}
							onClick={addNewRow}
						>
							+ Add More
						</Button>

						{!isChecked ? (
							<Box
								border={'1px solid #EFA5A2'}
								borderRadius={'xl'}
								bg={'#230506'}
								p={4}
							>
								<Flex gap={6} alignItems={'center'}>
									<BsExclamationOctagonFill size={35} color="#EA1515" />
									<Box>
										<Text
											variant={'simple'}
											textColor={'#F6F6F6'}
											fontSize={'18px'}
											fontWeight={500}
										>
											Consent Check needed
										</Text>
										<Text
											variant={'simple'}
											textColor={'#7C7C7C'}
											fontSize={'13px'}
											fontWeight={400}
										>
											Consent Checkbox must be switched to progress uploading
										</Text>
									</Box>
								</Flex>
							</Box>
						) : null}

						<Checkbox defaultChecked colorScheme="gray" onChange={handleCheckbox}>
							Consent Box for Permission to authorize storage of KYC Docs
						</Checkbox>

						<Button
							variant={'kyc'}
							size={'md'}
							w={'200px'}
							borderRadius={'none'}
							disabled={
								(kycDocuments?.documents?.length || 0) > 6 || !isChecked || false
							}
							onClick={handleUploadFiles}
						>
							Add KYC
						</Button>
					</Flex>
				</Box>
				<Flex
					zIndex={10}
					bgGradient="linear(to-b, #1A1A1A, #000000)"
					px={10}
					maxW={'630px'}
					h={'673px'}
					w={'100%'}
					pt={6}
					pb={10}
					gap={4}
					flexDirection={'column'}
				>
					<Flex justifyContent={'space-between'}>
						{kycDocuments && (
							<Badge
								variant={`${kycDocuments?.status?.toLowerCase() || 'no_started'}`}
							>
								STATUS: {kycDocuments?.status || 'not_started'}
							</Badge>
						)}
						<Flex
							justifyContent={'flex-end'}
							alignItems={'center'}
							gap={2}
							onClick={handleRefetch}
							cursor={'pointer'}
						>
							<Text variant={'simple'}>Refresh </Text>
							<IoMdRefresh size={20} />
						</Flex>
					</Flex>
					<DocumentListTable documents={documents} loading={loading} />
				</Flex>
			</Flex>
		</Flex>
	);
}
