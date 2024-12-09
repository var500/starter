import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import TierCard from '@/components/Investor/tier/TierCard';
import { getTierData } from '@/lib/scripts/tierSubscriptionPoolContract';

const AvailableTiers = [
	{
		id: 1,
		name: 'Bronze Tier',
		label: 'The Bronze Tier is the perfect starting point for new investors looking to participate in early-stage crypto projects. Gain early access and guaranteed token allocation with a minimal investment.',
		amount: 250,
		PlanDetails: [
			'Guaranteed token allocation (1.33% of total allocation)',
			'Early access to promising projects',
			'Access to community discussions and updates',
			'A great way to start your crypto investment journey',
		],
	},
	{
		id: 2,
		name: 'Silver Tier',
		label: 'The Silver Tier offers increased benefits for those ready to take their crypto investments to the next level. With higher allocations and deeper insights, this tier ensures you stay ahead in the crypto game',
		amount: 500,
		PlanDetails: [
			'Guaranteed token allocation (2.66% of total allocation)',
			'Early access to projects with higher allocation compared to Bronze Tier',
			'Priority access to community events and updates',
			'Perfect for investors looking for moderate entry points into new crypto projects',
		],
	},
	{
		id: 3,
		name: 'Gold Tier',
		label: 'Step up your investment game with the Gold Tier. Designed for serious investors, this tier offers a higher share of allocations and exclusive perks to help you secure significant returns',
		amount: 1000,
		PlanDetails: [
			'Guaranteed token allocation (5.33% of total allocation)',
			'Exclusive access to early project insights and market trends',
			'Higher token allocation compared to Silver and Bronze Tiers',
			'Increased participation in project AMAs and community events',
		],
	},
	{
		id: 4,
		name: ' Platinum Tier',
		label: ' The Platinum Tier is for investors aiming for substantial early-stage allocations. Enjoy increased privileges and access to premium insights and networking opportunities within the crypto space.',
		amount: 2000,
		PlanDetails: [
			'Guaranteed token allocation (10.67% of total allocation)',
			'Priority access to exclusive investor-only events',
			'Personalized support for investment strategies',
			'Ideal for investors looking for higher stakes and bigger returns.',
		],
	},
	{
		id: 5,
		name: 'Diamond Tier',
		label: 'The Diamond Tier is designed for seasoned investors seeking high-value opportunities. With significant token allocations and premium benefits, this tier ensures you’re always in the lead',
		amount: 5000,
		PlanDetails: [
			'Guaranteed token allocation (26.67% of total allocation)',
			'VIP access to premium crypto projects and early-stage funding rounds',
			'Direct access to project founders and early investor groups',
			'Premium networking opportunities with top-tier investors',
		],
	},
	{
		id: 6,
		name: 'Elite Tier',
		label: 'The Elite Tier is the ultimate level for high-net-worth investors looking to dominate early-stage crypto investments. Gain the largest share of allocations, unrivaled access to exclusive projects, and top-tier networking opportunities',
		amount: 10000,
		PlanDetails: [
			'Guaranteed token allocation (53.34% of total allocation)',
			'First access to all upcoming projects and private sales',
			'Dedicated investment support and priority communication with project teams',
			'Invitation to exclusive high-net-worth investor summits and events',
			'Exclusive airdrop eligibility',
		],
	},
];

export default function TierScreen() {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: userDetails } = useQuery({
		queryFn: async () => getTierData(),
		queryKey: ['getTierData'],
	});

	return (
		<Flex
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			px={20}
			pb={20}
		>
			<Flex wrap={'wrap'} gap={4} justifyContent={'center'}>
				{AvailableTiers.map((item) => (
					<TierCard
						id={item.id}
						name={item.name}
						amount={item.amount}
						key={item.id}
						label={item.label}
						PlanDetails={item.PlanDetails}
						selected={item.id === selectedCard}
						onSelect={() => setSelectedCard(item.id)}
					/>
				))}
			</Flex>
		</Flex>
	);
}
