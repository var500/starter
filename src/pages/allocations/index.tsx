import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Assets } from '@/assets';

export default function Allocations() {
	const router = useRouter();

	return (
		<Flex
			flexDirection={'column'}
			gap={8}
			position={'relative'}
			maxW={'1400px'}
			justifyContent={'center'}
			alignItems={'center'}
			margin={'auto'}
		>
			<Text
				variant={'simple'}
				color={'white'}
				fontSize={'xs'}
				opacity={0.7}
				textAlign={'center'}
			>
				It can take up to 2 minutes after joining an IDO for the Allocations to appear.
			</Text>

			<Image src={Assets.Empty} className="max-h-[150px] w-auto px-4" alt="NoAllocations" />

			<Flex
				justifyContent={'center'}
				flexDirection={'column'}
				gap={4}
				alignItems={'center'}
				pb={20}
			>
				<Text
					variant={'gradient'}
					fontWeight={700}
					className="max-w-[469px]"
					textAlign={'center'}
				>
					You don’t have any allocations yet
				</Text>
				<Text variant={'title'} fontSize={20} textTransform={'none'} textAlign={'center'}>
					Allocations for all of the sales that you participated in will show up here.
				</Text>
				<Button
					variant={'solid'}
					color={'#632EE7'}
					textColor={'white'}
					fontSize={'xs'}
					onClick={async () => router.push('/projects')}
				>
					Go to Projects
				</Button>
			</Flex>

			<Divider opacity={0.2} />
			<Flex justifyContent={'center'} alignItems={'end'} pb={10}>
				<Image src={Assets.FooterLogo} className="h-9 w-auto" alt="FooterLogo" />
			</Flex>
		</Flex>
	);
}
