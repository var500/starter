import { FaAngleRight } from 'react-icons/fa';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

interface Props {
	projectName: string;
	description: string;
	projectLogo: StaticImageData;
	projectImage: StaticImageData;
	badgeType: string;
	badgeLabel: string;
	tokenSymbol: string;
	tokenLogo: StaticImageData;
	totalRaise: string;
	personalAllocation: number;
}

const ProjectCard = ({
	projectName,
	description,
	projectLogo,
	projectImage,
	badgeType,
	badgeLabel,
	tokenSymbol,
	tokenLogo,
	totalRaise,
	personalAllocation,
}: Props) => {
	return (
		<Flex
			flexDirection="column"
			border="1px solid #363636"
			overflow="hidden"
			borderRadius="md"
			maxW="382px"
			h="507px"
		>
			<Flex flexDirection="column" justifyContent="space-between" p={4} gap={4}>
				{/* Top Section */}
				<Box>
					<Image src={projectLogo} height={80} width={80} alt={`projectNamelogo`} />
					<Box position="relative">
						{badgeType && (
							<Badge
								size="sm"
								variant={badgeType}
								position="absolute"
								top={-5}
								right={0}
							>
								{badgeLabel}
							</Badge>
						)}
						<Image
							src={projectImage}
							className="h-[205px] w-full"
							alt="Project Image"
						/>
					</Box>
				</Box>

				{/* Middle Section */}
				<Flex
					flexDirection="row"
					justifyContent="space-between"
					w="100%"
					gap="20px"
					alignItems="center"
				>
					<Box gap={4}>
						<Text variant="title" fontWeight={700}>
							{projectName}
						</Text>
						<Text variant="simple" color="#828282">
							{description}
						</Text>
					</Box>
					<Flex flexDirection="column" gap={2} alignItems="center">
						<Image src={tokenLogo} alt={`${tokenSymbol} logo`} className="h-7 w-7" />
						<Text variant="solid" fontWeight={400} fontSize="13px">
							{tokenSymbol}
						</Text>
					</Flex>
				</Flex>

				{/* Allocation Section */}
				<Flex flexDirection="column" gap={2}>
					<Flex
						flexDirection="row"
						justifyContent="space-between"
						alignItems={'baseline'}
					>
						<Text>Total Raise</Text>
						<Flex
							flex={'1'}
							marginInline={'2'}
							borderBottom={'1px solid #070d63'}
							className="inline-block"
						/>
						<Text>${totalRaise.toLocaleString()}</Text>
					</Flex>
					<Flex
						flexDirection="row"
						justifyContent="space-between"
						alignItems={'baseline'}
					>
						<Text>Personal Allocation</Text>
						<Flex
							flex={'1'}
							marginInline={'2'}
							borderBottom={'1px solid #070d63'}
							className="inline-block"
						/>
						<Text>${personalAllocation} Max</Text>
					</Flex>
				</Flex>
			</Flex>

			{/* Footer Section */}
			<Flex borderTop="1px solid #343434" alignItems="center" h="10%">
				<Flex borderRight="1px solid #343434" h="100%" alignItems="center" w="80%">
					<Text variant="title" fontSize="14px" pl={4}>
						Learn More
					</Text>
				</Flex>
				<Flex justifyContent="center" w="20%">
					<FaAngleRight color="#9B51E0" size={24} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ProjectCard;
