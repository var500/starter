import { useState } from 'react';
import { Box, Divider, Flex, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';

// import { useRouter } from 'next/router';
import { Assets, Social } from '@/assets';
import FundRaising from '@/components/Projects/FundRaising';
import RenderBadges from '@/components/Projects/RenderBadges';
import { Description, Offerings, TokenSale, VestingSchedule } from '@/components/Projects/Tabs';
import styles from '@/styles/Home.module.scss';
const badgeData = [
	{ label: 'Whitelisting', bg: '#00948B', textColor: 'white' },
	{ label: 'Sold out', bg: '#E72E4F', textColor: 'white' },
	{ label: 'Open', bg: '#9B51E0', textColor: 'white' },
	{ label: 'Coming Soon', bg: '#F3BA2F', textColor: 'black' }, // Optional: black text for contrast
	{ label: 'Live', bg: '#85F26A', textColor: 'black' },
];

export default function Page() {
	// const router = useRouter();
	const [activeTab, setActiveTab] = useState<
		'Description' | 'Token Sale' | 'Offerings' | 'Vesting Schedule'
	>('Description');
	const tabs = ['Description', 'Token Sale', 'Offerings', 'Vesting Schedule'];

	// Content for each tab
	const content = {
		Description: <Description />,
		'Token Sale': <TokenSale />,
		Offerings: <Offerings />,
		'Vesting Schedule': <VestingSchedule />,
	};

	return (
		<div className={styles.container}>
			<Flex flexDirection={'column'} gap={8}>
				<Grid
					templateColumns="repeat(2, 1fr)"
					className="mb-20 "
					gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				>
					<GridItem>
						<Text variant={'title'} fontSize={{ base: 'xs', md: 'sm' }} opacity={'70%'}>
							Projects
						</Text>
						<Text variant={'solid'} fontSize={{ base: '3xl', md: '5xl' }}>
							SYN CITY
						</Text>
						<Text
							color={'#6F6F6F'}
							fontSize={{ base: 'xl', md: '3xl' }}
							variant={'simple'}
						>
							The Mafia Metaverse
						</Text>
						<Image
							src={Assets.ProjectImage}
							alt="ProjectImage"
							className="w-full max-h-[336px]"
						/>

						<Flex
							mt={4}
							gap={4}
							overflow={'auto'}
							justifyContent={'space-between'}
							w={'100%'}
						>
							{tabs.map((tab) => (
								// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
								<Text
									key={tab}
									onClick={() =>
										setActiveTab(
											tab as
												| 'Description'
												| 'Token Sale'
												| 'Offerings'
												| 'Vesting Schedule'
										)
									}
									sx={{
										cursor: 'pointer',
										fontSize: { base: 'sm', md: 'xl' }, // Responsive font size
										px: 2,
										py: 1,
										borderRadius: 'lg',
										color: activeTab === tab ? '#AE8DFF' : 'inherit', // Conditional color
									}}
								>
									{tab}
								</Text>
							))}
						</Flex>

						<Divider borderColor={'#272727'} />

						{content[activeTab]}
					</GridItem>
					<GridItem>
						<Flex width={'100%'} flexDirection={'column'}>
							<Flex
								flexDirection={'column'}
								gap={2}
								alignItems={'end'}
								placeContent={'end'}
							>
								<Image
									src={Assets.ProjectLogo}
									className="h-28 w-28 place-content-end"
									alt="logo"
								/>
								<Text
									variant={'title'}
									opacity={'70%'}
									fontSize={14}
									textTransform={'none'}
								>
									IDO ends on January 20th 2025, 8:00 PM UTC
								</Text>

								<RenderBadges badgeData={badgeData} />
								<Box w={'100%'} pl={{ base: 0, md: 60 }}>
									<FundRaising />

									<Flex flexDirection={'column'} mt={5} gap={4}>
										<Box className="space-y-2">
											<Text variant={'title'} opacity={'70%'} fontSize={14}>
												Website
											</Text>

											<Link
												fontSize={24}
												href="www.syn.city"
												textDecoration={'none'}
											>
												www.syn.city
											</Link>
										</Box>
										<Box className="space-y-2">
											<Text variant={'title'} opacity={'70%'} fontSize={14}>
												Social Media
											</Text>

											<Flex flexDirection={'row'} gap={1}>
												<Image
													src={Social.Instagram}
													alt="instagram"
													className="h-7 w-7 md:h-11 md:w-11"
												/>
												<Image
													src={Social.Twitter}
													alt="twitter"
													className="h-7 w-7 md:h-11 md:w-11"
												/>
												<Image
													src={Social.Facebook}
													alt="facebook"
													className="h-7 w-7 md:h-11 md:w-11"
												/>
											</Flex>
										</Box>
									</Flex>
								</Box>
							</Flex>
						</Flex>
					</GridItem>
				</Grid>
				<Flex justifyContent={'center'} alignItems={'flex-end'} pb={10}>
					<Image src={Assets.FooterLogo} className="h-9 w-auto" alt="FooterLogo" />
				</Flex>
			</Flex>
		</div>
	);
}
