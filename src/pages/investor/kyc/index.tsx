import {
	Box,
	Button,
	Flex,
	Link,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Auth, KYC } from '@/assets';

export default function KycScreen() {
	const router = useRouter();

	return (
		<Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} pb={10}>
			<Flex justifyContent={'end'} px={'140px'} mb={4} w={'100%'} maxW={'1530px'}>
				<Button
					variant={'skipKyc'}
					size={'sm'}
					onClick={() => router.push('/investor/tier')}
				>
					Skip KYC For Now{' '}
				</Button>
			</Flex>
			<Flex
				justifyContent={'center'}
				px={4}
				gap={10}
				wrap={'wrap'}
				pb={10}
				position={'relative'}
			>
				<div className="hidden xl:block absolute bottom-44 w-56 h-56 bg-[#9B51E0] rounded-full blur-[50px] z-0 -left-0  mx-auto  opacity-50"></div>
				<div className="hidden xl:block absolute bottom-0 w-52 h-52 bg-[#9B51E0] rounded-full blur-[50px] z-0 right-0  mx-auto opacity-50 "></div>
				<Flex
					zIndex={10}
					maxW={390}
					w={'100%'}
					bgGradient="linear(to-b, #1C1C1C, #000000)"
					px={10}
					pt={14}
					pb={10}
					gap={4}
					flexDirection={'column'}
				>
					<Image
						src={KYC.Diagram}
						alt="kyc"
						height={193}
						width={274}
						className="w-full h-auto"
					/>
					<Text
						variant={'form'}
						color={'white'}
						fontSize={'20px'}
						fontWeight={400}
						textAlign={'center'}
					>
						Please Verify Your KYC before We Proceed with Operations{' '}
					</Text>
					<Text variant={'kyc'}>
						To ensure the highest level of security and compliance with regulatory
						requirements, we kindly request that you verify your Know Your Customer
						(KYC) information.
					</Text>

					<Button
						variant={'social'}
						size={'lg'}
						bgGradient={'linear(to-l, #8E61FF,#31078B)'}
						_hover={{
							bgGradient: 'linear(to-l, #8E61FF,#31078B)',
						}}
						onClick={() => router.push('kyc/upload')}
					>
						<Flex
							flexDirection={'row'}
							alignItems={'center'}
							gap={2}
							justifyContent={'center'}
							w={'100%'}
						>
							<Image
								src={KYC.Docs}
								alt="worldid"
								height={10}
								width={10}
								className="h-[30px] w-[30px]"
							/>
							Verify KYC with Docs
						</Flex>
					</Button>
					<Button
						variant={'social'}
						size={'lg'}
						bgGradient={'linear(to-l, #000000,#31078B)'}
						_hover={{
							bgGradient: 'linear(to-l, #000000,#31078B)',
						}}
						onClick={async () => signOut()}
					>
						<Flex
							flexDirection={'row'}
							alignItems={'center'}
							gap={2}
							justifyContent={'center'}
							w={'100%'}
						>
							<Image
								src={Auth.WorldIdAuth}
								alt="worldid"
								height={10}
								width={10}
								className="h-[30px] w-[30px]"
							/>
							Verify KYC with World Id
						</Flex>
					</Button>
					<Text variant={'kyc'}>
						This process is essential to protect your account and maintain the integrity
						of our services.
					</Text>
				</Flex>
				<Flex
					maxW={390}
					w={'100%'}
					bgGradient="linear(to-b, #1C1C1C, #000000)"
					px={10}
					pt={14}
					pb={10}
					gap={4}
					flexDirection={'column'}
					justifyContent={'space-between'}
				>
					<Box>
						<Text variant={'kyc'} fontSize={'20px'} textAlign={'left'} mb={4}>
							Steps to Verify Your KYC:
						</Text>
						<Text variant={'kyc'} fontSize={'14px'} textAlign={'left'} mb={2}>
							1. Log in: Access your account on our platform.
						</Text>
						<Text variant={'kyc'} fontSize={'14px'} textAlign={'left'} mb={2}>
							2. Navigate: Go to the &lsquo;KYC Verification&lsquo; section in your
							profile settings.
						</Text>{' '}
						<Text variant={'kyc'} fontSize={'14px'} textAlign={'left'} mb={2}>
							3. Upload Documents: Provide the required identification documents
							(e.g., Passport, Driver&lsquo;s License, or National ID).{' '}
						</Text>
						<Text variant={'kyc'} fontSize={'14px'} textAlign={'left'}>
							{' '}
							4. Submit: Complete the form and submit your documents for review.
						</Text>
					</Box>

					<Text variant={'kyc'} textAlign={'left'}>
						We assure you that your information will be handled with the utmost
						confidentiality and security. If you have any questions or need assistance,
						please do not hesitate to contact our support team at [Support Email/Phone
						Number]. Thank you for your cooperation.
					</Text>
				</Flex>
				<Flex
					zIndex={10}
					maxW={390}
					w={'100%'}
					bgGradient="linear(to-b, #1C1C1C, #000000)"
					px={10}
					pt={14}
					pb={10}
					gap={4}
					flexDirection={'column'}
				>
					<Text variant={'kyc'} fontSize={'20px'} textAlign={'left'} mb={4}>
						FAQ
					</Text>
					<Box>
						<Text
							variant={'kyc'}
							fontSize={'15px'}
							textAlign={'left'}
							color={'#B294FF'}
						>
							What is KYC Verification?
						</Text>
						<Text
							variant={'kyc'}
							fontSize={'11px'}
							textAlign={'left'}
							color={'#939393'}
						>
							KYC (Know Your Customer) is a process to verify the identity of our
							customers. It helps ensure the legitimacy of accounts and protects
							against fraud and money laundering.
						</Text>
					</Box>
					<Box>
						<Text
							variant={'kyc'}
							fontSize={'15px'}
							textAlign={'left'}
							color={'#B294FF'}
							mb={2}
						>
							Why is KYC Verification Necessary?
						</Text>
						<OrderedList
							variant={'kyc'}
							fontSize={'11px'}
							textAlign={'left'}
							fontFamily={'inter'}
							color={'#939393'}
						>
							<ListItem>
								Security: To protect your account from unauthorized access.
							</ListItem>
							<ListItem>
								Compliance: To meet legal and regulatory requirements
							</ListItem>
							<ListItem>
								Service Quality: To provide you with better and uninterrupted
								services.
							</ListItem>
						</OrderedList>
					</Box>
					<Box>
						<Text
							variant={'kyc'}
							fontSize={'15px'}
							textAlign={'left'}
							color={'#B294FF'}
							mb={2}
						>
							What Documents are Required for KYC Verification?
						</Text>

						<Text variant={'kyc'} fontSize={'11px'} textAlign={'left'}>
							The documents required may vary depending on your region, but typically
							include:
						</Text>
						<UnorderedList fontFamily={'inter'}>
							<ListItem fontSize={'11px'} color={'#939393'}>
								Proof of Identity: Passport, Driver&lsquo;s License, National ID
								card.
							</ListItem>
							<ListItem fontSize={'11px'} color={'#939393'}>
								Proof of Address: Utility bill, Bank statement, Lease agreement.
							</ListItem>
						</UnorderedList>
					</Box>
					<Box>
						<Text
							variant={'kyc'}
							fontSize={'15px'}
							textAlign={'left'}
							color={'#B294FF'}
							mb={2}
						>
							How Long Does the KYC Verification Process Take?
						</Text>
						<Text variant={'kyc'} fontSize={'11px'} textAlign={'left'}>
							The verification process typically takes 1-3 business days. You will
							receive a notification once your documents have been reviewed and
							approved.
						</Text>
					</Box>
				</Flex>
			</Flex>

			<Flex justifyContent={'space-between'} gap={4} fontFamily={'Roboto'} fontSize={'9px'}>
				<Link>Membership Agreement</Link>
				<Link>Electronic Communication Policy</Link>
				<Link>Privacy Policy </Link>
				<Link>Terms of Use </Link>
				<Link>Terms and Conditions</Link>
			</Flex>
		</Flex>
	);
}
