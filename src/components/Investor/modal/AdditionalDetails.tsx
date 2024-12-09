import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	Box,
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

import type { UserResponse } from '@/core/service/api/userApi';
import { getUserbyId, updateUserDetails } from '@/core/service/api/userApi'; // Add the update API

type FormData = {
	twitterId: string;
	telegramId: string;
	phoneNumber: {
		countryCode: string;
		number: number;
	};
	nationality: string;
};

export default function UpdateInvestorInfoModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: sessionData } = useSession();
	const toast = useToast();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	const {
		data: userDetails,
		isFetching: loading,
		refetch,
	} = useQuery({
		queryFn: async () => getUserbyId({ id: sessionData?.user.id || '' }),
		enabled: !!sessionData?.user.id,
		queryKey: ['getUserbyId', sessionData?.user.id],
	});

	useEffect(() => {
		if (sessionData?.user.id) {
			refetch();
		}
	}, [sessionData?.user.id, refetch]);
	// Populate form fields with user details
	useEffect(() => {
		if (userDetails) {
			setValue('twitterId', userDetails.twitterId || '');
			setValue('telegramId', userDetails.telegramId || '');
			setValue('phoneNumber.countryCode', userDetails.phoneNumber?.countryCode || '');
			setValue('phoneNumber.number', userDetails.phoneNumber?.number || 888888);
			setValue('nationality', userDetails.nationality || '');
		}
	}, [userDetails, setValue]);

	useEffect(() => {
		if (userDetails) {
			const requiredFields: (keyof UserResponse)[] = [
				'twitterId',
				'telegramId',
				'phoneNumber',
				'nationality',
			];

			const hasMissingFields = requiredFields.some((field) => {
				const value = userDetails[field];
				if (field === 'phoneNumber') {
					// Type assertion for nested structure
					const phone = value as { number?: string; countryCode?: string };

					return !phone?.number || !phone?.countryCode;
				}

				return !value;
			});

			if (hasMissingFields) {
				onOpen();
			}
		}
	}, [userDetails, onOpen]);

	const { mutate } = useMutation({
		mutationFn: updateUserDetails,
		onSuccess() {
			toast({
				title: 'Details Saved',
				description: 'Your details have been saved.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			onClose();
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

	const onSubmit = (data: FormData) => {
		if (sessionData?.user.id) {
			mutate({
				id: sessionData?.user.id,
				nationality: data.nationality,
				phoneNumber: {
					countryCode: data.phoneNumber.countryCode,
					number: data.phoneNumber.number,
				},
				telegramId: data.telegramId,
				twitterId: data.twitterId,
			});
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} variant={'subscription'} size={'md'}>
			<ModalOverlay />
			<ModalContent
				border={'1px solid #743DFF'}
				bgGradient={'linear(to-bl, #1E1E1E, #000000)'}
				p={6}
			>
				<ModalHeader>Complete Your Details</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flex flexDirection={'column'} gap={4}>
							<Box>
								<Flex alignItems={'center'} gap={4}>
									<Text
										variant={'simple'}
										w={'188px'}
										textColor={'white'}
										textAlign={'center'}
										textTransform={'capitalize'}
									>
										Twitter Id
									</Text>
									<Input
										{...register('twitterId', {
											required: `twitter id is required`,
										})}
										variant={'unstyled'}
										px={6}
										py={4}
										bgGradient="linear(to-r, #3918804D, #0C083F4D)"
										placeholder={'@coolDude'}
									/>
								</Flex>
								{errors.twitterId && (
									<Text variant={'alert'} textAlign={'right'} mt={2} mr={4}>
										{errors.twitterId.message}
									</Text>
								)}
							</Box>
							<Box>
								<Flex alignItems={'center'} gap={4}>
									<Text
										variant={'simple'}
										w={'188px'}
										textColor={'white'}
										textAlign={'center'}
										textTransform={'capitalize'}
									>
										Telegram Id
									</Text>
									<Input
										{...register('telegramId', {
											required: `telegram id is required`,
										})}
										variant={'unstyled'}
										px={6}
										py={4}
										bgGradient="linear(to-r, #3918804D, #0C083F4D)"
										placeholder={'@coolDude'}
									/>
								</Flex>
								{errors.telegramId && (
									<Text variant={'alert'} textAlign={'right'} mt={2} mr={4}>
										{errors.telegramId.message}
									</Text>
								)}
							</Box>
							<Box>
								<Flex alignItems={'center'} gap={4}>
									<Text
										variant={'simple'}
										w={'188px'}
										textColor={'white'}
										textAlign={'center'}
										textTransform={'capitalize'}
									>
										Country code
									</Text>
									<Input
										{...register('phoneNumber.countryCode', {
											required: `Country Code id is required`,
										})}
										variant={'unstyled'}
										px={6}
										py={4}
										bgGradient="linear(to-r, #3918804D, #0C083F4D)"
										placeholder={'+91'}
									/>
								</Flex>
								{errors.phoneNumber?.countryCode && (
									<Text variant={'alert'} textAlign={'right'} mt={2} mr={4}>
										{errors.phoneNumber?.countryCode.message}
									</Text>
								)}
							</Box>
							<Box>
								<Flex alignItems={'center'} gap={4}>
									<Text
										variant={'simple'}
										w={'188px'}
										textColor={'white'}
										textAlign={'center'}
										textTransform={'capitalize'}
									>
										Phone Number
									</Text>
									<Input
										{...register('phoneNumber.number', {
											required: `Number id is required`,
										})}
										variant={'unstyled'}
										px={6}
										py={4}
										type="number"
										bgGradient="linear(to-r, #3918804D, #0C083F4D)"
										placeholder={'8888888888'}
									/>
								</Flex>
								{errors.phoneNumber?.number && (
									<Text variant={'alert'} textAlign={'right'} mt={2} mr={4}>
										{errors.phoneNumber.number.message}
									</Text>
								)}
							</Box>
							<Box>
								<Flex alignItems={'center'} gap={4}>
									<Text
										variant={'simple'}
										w={'188px'}
										textColor={'white'}
										textAlign={'center'}
										textTransform={'capitalize'}
									>
										Nationality
									</Text>
									<Input
										{...register('nationality', {
											required: `Nationality id is required`,
										})}
										variant={'unstyled'}
										px={6}
										py={4}
										bgGradient="linear(to-r, #3918804D, #0C083F4D)"
										placeholder={'Indian'}
									/>
								</Flex>
								{errors.nationality && (
									<Text variant={'alert'} textAlign={'right'} mt={2} mr={4}>
										{errors.nationality.message}
									</Text>
								)}
							</Box>
						</Flex>
						<Flex flexDirection={'column'} mt={6} gap={4} w="100%">
							<Button
								type="submit"
								variant={'solid'}
								isLoading={loading}
								// No need to add onClick, handleSubmit is already set on form
							>
								Submit
							</Button>
							<Button variant={'link'} onClick={onClose} size={'xs'}>
								Skip for now
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
