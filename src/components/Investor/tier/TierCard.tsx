import { FaRegCircleCheck } from 'react-icons/fa6';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import SubscriptionModal from './SubscriptionModal';

import { Tier } from '@/assets';

export default function TierCard({
	id,
	name,
	label,
	amount,
	PlanDetails,
	selected,
	onSelect,
}: {
	id: number;
	name: string;
	label: string;
	amount: number;
	selected: boolean;
	onSelect: () => void;
	PlanDetails: string[];
}) {
	return (
		<Flex
			gap={6}
			w={'412px'}
			flexDirection={'column'}
			minH={'722px'}
			sx={{
				border: selected ? '1px solid #00FF00' : '1px solid #511FBA',
				borderImageSlice: 1,
				borderImageSource: 'linear(to-b, #511FBA, #8952FF, #743DFF)',
			}}
			bgGradient={
				selected
					? 'linear(to-b, #8952FF,#3535351F, #181029)'
					: [2, 5, 8].includes(id)
					? 'linear(to-bl, #3535351F, #201737, #181029)'
					: 'linear(to-bl, #000000, #1B1920, #120430)'
			}
			p={10}
			borderRadius={'32px'}
			onClick={onSelect}
			cursor={'pointer'}
		>
			<Flex justifyContent={'space-between'}>
				<Image
					src={
						selected
							? Tier.SelectedRadio
							: [2, 5, 8].includes(id)
							? Tier.AlternateRadio
							: Tier.Radio
					}
					alt="radio"
					height={40}
					width={40}
				/>
				{selected ? <Image src={Tier.Check} alt="check" height={40} width={40} /> : null}
			</Flex>
			<Box>
				<Text variant={'tier'} fontWeight={500}>
					{name}
				</Text>
				<Text variant={'tier'} fontSize={'14px'}>
					{label}
				</Text>
			</Box>

			<Text variant={'tier'} fontWeight={500} fontSize={'48px'}>
				${amount}
			</Text>

			{/* <Button
				size={'lg'}
				variant={[2, 5, 8].includes(id) ? 'getStartedPurple' : 'getStartedGrey'}
				w={'100%'}
			>
				Get Started
			</Button> */}

			<SubscriptionModal id={id} />

			<Divider borderColor={'#FFFFFF3D'} mt={6} />

			<Flex flexDirection={'column'} gap={4}>
				<Text variant={'tier'} fontWeight={500} fontSize={'16px'}>
					What you will get
				</Text>

				{PlanDetails.map((item, index) => {
					return (
						<Flex gap={2} alignItems={'center'} key={index}>
							<FaRegCircleCheck color="#FFFFFFCC" />
							<Text variant={'tier'} fontSize={'15px'} textColor={'#FFFFFFCC'}>
								{item}
							</Text>
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
}
