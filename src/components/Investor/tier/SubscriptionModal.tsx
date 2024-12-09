/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inline-styles/no-inline-styles */
'use client';
import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
	// useToast,
} from '@chakra-ui/react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { ethers } from 'ethers';
// import { useMutation } from '@tanstack/react-query';
// import type { AxiosError } from 'axios';
import Image from 'next/image';

// import { useSession } from 'next-auth/react';
import { Subscription } from '@/assets';
import { addUserSubscriptionPlan } from '@/core/service/api/subscriptionPlanApi';
import { addUserTier } from '@/core/service/api/tierApi';
import { getSubscriptionPlanData } from '@/lib/scripts/tierSubscriptionPoolContract';
import NETWORKS_DATA from '@/lib/setttings.json';
// import { captureOrder, createorder } from '@/core/service/api/paypalApi';

const SubscriptionData = [
	{
		title: '$75 for 1 project',
		decription: 'Extra Details here Time reference and Other Data Here will be Populated',
	},
	{
		title: '$125 for 2 project',
		decription: 'Extra Details here Time reference and Other Data Here will be Populated',
	},
	{
		title: '$200 for 3 project',
		decription: 'Extra Details here Time reference and Other Data Here will be Populated',
	},
	{
		title: '$500 for 5 project',
		decription: 'Extra Details here Time reference and Other Data Here will be Populated',
	},
	{
		title: '$1450 for 16 project',
		decription: 'Extra Details here Time reference and Other Data Here will be Populated',
	},
];

const getProvider = () => {
	if (typeof window.ethereum !== 'undefined') {
		// @ts-ignore
		return new ethers.providers.Web3Provider(window.ethereum);
	} else {
		throw new Error('MetaMask is not installed');
	}
};

const getSigner = async (provider: ethers.providers.Web3Provider) => {
	await provider.send('eth_requestAccounts', []);

	return provider.getSigner();
};

export default function SubscriptionModal({ id }: { id: number }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selected, setSelected] = useState<number | null>(0);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const approvalAmount = ethers.constants.MaxUint256; // Approve the maximum possible amount

	const { data: userDetails } = useQuery({
		queryFn: async () => getSubscriptionPlanData(),

		queryKey: ['getSubscriptionPlanData'],
	});

	const { mutate: addTier } = useMutation({
		mutationFn: addUserTier,
		onSuccess() {
			toast({
				title: 'Tier Saved',
				description: 'Your Teir has been saved successfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		},

		onError(error) {
			toast({
				title: 'Tier saving failed',
				description: ((error as AxiosError).response as { data: { error: string } })?.data
					.error,
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	const { mutate: addSubscription } = useMutation({
		mutationFn: addUserSubscriptionPlan,
		onSuccess() {
			toast({
				title: 'Subscription Saved',
				description: 'Your Subscription has been saved successfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		},

		onError(error) {
			toast({
				title: 'Subscription saving failed',
				description: ((error as AxiosError).response as { data: { error: string } })?.data
					.error,
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	useEffect(() => {
		const fetchContractData = async () => {
			try {
				const provider = getProvider();
				const signer = await getSigner(provider);
				const address = await signer.getAddress();
				const networkData = NETWORKS_DATA['sepolia' as keyof typeof NETWORKS_DATA];

				const { address: tokenAddress, abi: TokenAbi } = networkData.contract.usdt;
				const { address: tierSubsAddress, abi: tierSubsAbi } =
					networkData.contract.tierSubscriptionPool;
				// check usdt allowance
				const tokenContract = new ethers.Contract(tokenAddress, TokenAbi, provider);
				const allowance = await tokenContract.allowance(address, tierSubsAddress);
				setIsApproved(allowance.gte(ethers.utils.parseUnits('1', 18)));
			} catch (error) {
				console.error('Error fetching contract', error);
			}
		};
		fetchContractData();
	}, []);

	const handlePayNow = async ({
		tierId,
		subscriptionId,
	}: {
		tierId: number;
		subscriptionId: number;
	}) => {
		setError(null);
		setLoading(true);
		console.log(tierId, subscriptionId + 1);
		try {
			const provider = getProvider();
			const signer = await getSigner(provider);
			const networkData = NETWORKS_DATA['sepolia' as keyof typeof NETWORKS_DATA];

			const { address: tokenAddress, abi: TokenAbi } = networkData.contract.usdt;
			const { address: tierSubsAddress, abi: tierSubsAbi } =
				networkData.contract.tierSubscriptionPool;

			const tokenContract = new ethers.Contract(tokenAddress, TokenAbi, signer);

			// Check if approval is needed
			if (!isApproved) {
				// Step 1: Approve the token for staking
				const approvalTransaction = await tokenContract.approve(
					tierSubsAddress,
					approvalAmount
				);
				const tnxRecipt = await approvalTransaction.wait();
				setIsApproved(true); // Update state after successful approval
			}

			// Step 2: Automatically initiate payment after approval (or if already approved)
			const tierSubsContract = new ethers.Contract(tierSubsAddress, tierSubsAbi, signer);
			const tierSubsTransaction1 = await tierSubsContract.lockTier(tierId, tokenAddress);
			toast({
				title: 'Transaction in process',
				description: 'Token lock in progress',
				status: 'loading',
				duration: 5000,
				isClosable: true,
			});
			const txnRecipt = await tierSubsTransaction1.wait();
			console.log('tokenLock', txnRecipt);
			// 			{
			//     "to": "0xFfBE9d464af652f4cfc615B86e8Fdc09816Ba6E8",
			//     "from": "0x554AF58E06D07e01C98808d4cCe0044485060b3b",
			//     "contractAddress": null,
			//     "transactionIndex": 54,
			//     "gasUsed": {
			//         "type": "BigNumber",
			//         "hex": "0x010840"
			//     },
			//     "blockHash": "0x66bd24ab8bdbd1f267bfbac7faf38d60aa8ac181230b7e9a2a3a171e70eac5b4",
			//     "transactionHash": "0xfaf3b6b082d2feb28f16d3bc6b4afa4d8653f68183f609347f0288e5cc4ea6d5",
			//     "blockNumber": 7223339,
			//     "confirmations": 2,
			//     "status": 1,
			//     "type": 2,
			// }
			toast({
				title: 'Transaction Success',
				description: 'Token lock Successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			// Step 3: Automatically initiate 2nd payment after completing 1st payment
			const tierSubsTransaction2 = await tierSubsContract.purchaseSubscription(
				subscriptionId + 1,
				tokenAddress
			);
			toast({
				title: 'Transaction in process',
				description: 'Plan purchase progress',
				status: 'loading',
				duration: 5000,
				isClosable: true,
			});
			const tnxRecipt2 = await tierSubsTransaction2.wait();
			console.log('Plan recipt', tnxRecipt2);
			// 			{
			//     "to": "0xFfBE9d464af652f4cfc615B86e8Fdc09816Ba6E8",
			//     "from": "0x554AF58E06D07e01C98808d4cCe0044485060b3b",
			//     "contractAddress": null,
			//     "transactionIndex": 15,
			//     "gasUsed": {
			//         "type": "BigNumber",
			//         "hex": "0x013256"
			//     },
			//     "blockHash": "0x8367795306d3e0b3832938140a42418970ad5298fb2b22675a30fda05fe1f0bf",
			//     "transactionHash": "0xec21fbfd987c0240ef14442fe5fa3babeffe4d05c9a4fa896f74bcdc4742fff8",
			//     "blockNumber": 7223342,
			//     "confirmations": 1,
			//     "cumulativeGasUsed": {
			//         "type": "BigNumber",
			//         "hex": "0x17fb57"
			//     },
			//     "effectiveGasPrice": {
			//         "type": "BigNumber",
			//         "hex": "0x01c6157c75"
			//     },
			//     "status": 1,
			//     "type": 2,

			// }
			toast({
				title: 'Transaction Success',
				description: 'Plan purchased Successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			console.error('Error fetching contract', error);
		}
		setLoading(false);
		onClose();
	};

	// const { data } = useSession();

	const toast = useToast();
	// const { mutate: createOrderMutation, data: orderDetails } = useMutation({
	// 	mutationFn: createorder,
	// 	onSuccess() {
	// 		toast({
	// 			title: 'Payment Successful',
	// 			description: 'Welcome onboard. Yours subscription has been purchased',
	// 			status: 'success',
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 		onClose();
	// 	},

	// 	onError(error) {
	// 		toast({
	// 			title: 'Payment Error',
	// 			description: ((error as AxiosError).response as { data: { error: string } })?.data
	// 				.error,
	// 			status: 'error',
	// 			duration: 9000,
	// 			isClosable: true,
	// 		});
	// 	},
	// });

	// const { mutate: captureTransactionMutation } = useMutation({
	// 	mutationFn: captureOrder,
	// 	onSuccess() {
	// 		toast({
	// 			title: 'Payment Successful',
	// 			description: 'Welcome onboard. Yours subscription has been purchased',
	// 			status: 'success',
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 		onClose();
	// 	},

	// 	onError(error) {
	// 		toast({
	// 			title: 'Payment Error',
	// 			description: ((error as AxiosError).response as { data: { error: string } })?.data
	// 				.error,
	// 			status: 'error',
	// 			duration: 9000,
	// 			isClosable: true,
	// 		});
	// 	},
	// });
	// const provider = getProvider();
	// const signer = await getSigner(provider);
	// const networkData = NETWORKS_DATA['sepolia' as keyof typeof NETWORKS_DATA];
	// const address = await signer.getAddress();
	// const { address: tokenAddress } = networkData.contract.usdt;
	// const tokenContract = new ethers.Contract(tokenAddress, TokenAbi, provider);

	const handleCloseModal = () => {
		setSelected(null);
	};

	return (
		<>
			<Button
				onClick={onOpen}
				size={'lg'}
				variant={[2, 5, 8].includes(id) ? 'getStartedPurple' : 'getStartedGrey'}
				w={'100%'}
			>
				Get Started
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} variant={'subscription'} size={'xl'}>
				<ModalOverlay />
				<ModalContent
					border={'1px solid #743DFF'}
					bgGradient={'linear(to-bl, #1E1E1E, #000000)'}
					p={6}
				>
					<ModalHeader>Choose Subscription Plans </ModalHeader>
					<ModalCloseButton onClick={handleCloseModal} />
					<ModalBody>
						<Flex flexDirection={'column'} gap={2} w={'100%'}>
							{SubscriptionData.map((item, index) => {
								const isSelected = selected === index;

								return (
									<Flex
										key={index}
										justifyContent={'space-between'}
										py={2}
										borderBottom={'1px solid #373737'}
										cursor="pointer"
										onClick={() => setSelected(index)}
									>
										<Flex justifyContent={'center'} gap={5}>
											<Image
												src={
													isSelected
														? Subscription.CheckGreen
														: Subscription.CheckGrey
												}
												alt="check"
												height={30}
												width={30}
											/>
											<Box>
												<Text variant={'subscription'}>{item.title}</Text>
												<Text
													variant={'subscription'}
													textColor={'#848484'}
													fontSize={'16px'}
												>
													{item.decription}
												</Text>
											</Box>
										</Flex>
										<Image
											src={Subscription.Info}
											alt="info"
											height={30}
											width={30}
										/>
									</Flex>
								);
							})}
							<Button
								variant={'solid'}
								onClick={async () =>
									handlePayNow({ subscriptionId: selected!, tierId: id })
								}
								isLoading={loading}
								disabled={selected == null || loading}
							>
								{loading
									? isApproved
										? 'Buying...'
										: 'Approving...' // Show loading state
									: isApproved
									? 'Buy Now'
									: 'Approve'}{' '}
								{/* {`${isApproved ? 'Pay' : 'Approve'} via wallet`} */}
							</Button>
						</Flex>
					</ModalBody>

					<ModalFooter justifyContent={'center'}>
						{/* <PayPalScriptProvider
							options={{
								'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
								clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
								currency: 'USD',
								intent: 'capture',
							}}
						>
							<PayPalButtons
								disabled
								style={{
									color: 'gold',
									shape: 'rect',
									label: 'pay',
									height: 50,
								}}
								createOrder={async () => {
									// createOrderMutation({
									// 	order_price: 1000,
									// 	user_id: data?.user.id || '',
									// });
									// const order_id = orderDetails?.data.order.orderID || '';

									// return order_id;
									return '';
								}}
								onApprove={async (data) => {
									// captureTransactionMutation({
									// 	orderID: data.orderID,
									// });
								}}
							/>
						</PayPalScriptProvider> */}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
