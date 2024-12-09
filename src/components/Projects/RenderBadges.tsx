import { Badge, Flex } from '@chakra-ui/react';

export default function RenderBadges({
	badgeData,
}: {
	badgeData: {
		label: string;
		bg: string;
		textColor: string;
	}[];
}) {
	return (
		<Flex gap={2} wrap={'wrap'}>
			{badgeData.map((badge, index) => (
				<Badge
					key={index}
					bg={badge.bg}
					textColor={badge.textColor}
					fontSize={10}
					fontWeight={400}
				>
					{badge.label}
				</Badge>
			))}
		</Flex>
	);
}
