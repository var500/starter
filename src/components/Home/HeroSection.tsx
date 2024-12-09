import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import ProjectCard from '../Projects/ProjectCard';

import Carousel from './Carousel';
import LogoRow from './LogoRow';

import { Assets, Home, ProjectCards } from '@/assets';
import styles from '@/styles/Home.module.scss';
import { ProjectCardData } from '@/utils/common';
import { formatNumber } from '@/utils/helpers';

export default function HeroSection() {
	return (
		<Flex flexDirection={'column'} backgroundPosition={'center'} alignItems={'center'}>
			{/* <Box
				position={'absolute'}
				top={0}
				w={'full'}
				zIndex={-1}
				sx={{
					display: { base: 'none', md: 'block' },
				}}
			>
				<Image src={Home.Grid} className="h-auto w-full " alt="ellipsePurple" />
			</Box> */}

			<Box
				position={'absolute'}
				sx={{
					display: { base: 'block', md: 'none' },
				}}
				h={'auto'}
				w={'full'}
				zIndex={-1}
			>
				<Image src={Home.Ellipse} className="h-[700px] w-full " alt="ellipsePurple" />
			</Box>

			<div className={styles.container}>
				<Flex
					alignItems={'center'}
					sx={{
						flexDirection: { base: 'column', md: 'row' },
						maxW: { base: '340px', md: '100%' },
					}}
				>
					<Flex
						flexDirection={'column'}
						sx={{
							alignItems: { base: 'center', md: 'flex-start' },
						}}
					>
						<Text
							textTransform={'none'}
							sx={{
								textAlign: { base: 'center', md: 'left' },
							}}
							variant={'title'}
							fontSize={18}
						>
							Some important notice
						</Text>

						<Text
							variant={'title'}
							textTransform={'none'}
							sx={{
								textAlign: { base: 'center', md: 'left' },
								fontSize: { base: '32px', md: '48px' },
							}}
						>
							<Text
								variant={'gradient'}
								as="span"
								sx={{
									fontSize: { base: '32px', md: '48px' },
								}}
							>
								Get early access
							</Text>{' '}
							to the ideas of tomorrow
						</Text>

						<Text
							variant={'simple'}
							sx={{
								textAlign: { base: 'center', md: 'left' },
								maxW: { md: '300px' },
							}}
						>
							Highly-vetted ideas and teams you can trust. Supported by
							industry-leading creators and funds.
						</Text>

						<Button variant={'solid'} width={'150px'} fontSize={10} mt={4}>
							See Upcoming Sales
						</Button>
					</Flex>

					<Image
						src={Home.LandingGraphic}
						className="h-[500px] max-h-[500px] max-w-[780px] w-full "
						alt="graphic"
					/>

					<Text
						sx={{
							display: { base: 'block', md: 'none' },
						}}
						variant={'simple'}
						color={'white'}
						textTransform={'capitalize'}
						maxW={'200px'}
						textAlign={'center'}
					>
						RAISE CAPITAL ACROSS ALL MAIN BLOCKCHAIN NETWORKS
					</Text>
				</Flex>
			</div>
			<Box>
				<Text
					sx={{
						display: { base: 'none', md: 'block' },
						mt: { base: '400px', md: '200px' },
					}}
					variant={'simple'}
					color={'white'}
					textTransform={'capitalize'}
					textAlign={'center'}
				>
					RAISE CAPITAL ACROSS ALL MAIN BLOCKCHAIN NETWORKS
				</Text>

				<LogoRow />
			</Box>

			<Box
				sx={{
					w: '100%',
					mt: { base: 0, md: '100px' },
					minH: { base: '50vh', md: '100vh' },
				}}
			>
				<Box
					position={'absolute'}
					top={0}
					h={'auto'}
					left={0}
					w={'full'}
					zIndex={-1}
					opacity={'50%'}
					sx={{
						display: { base: 'none', md: 'block' },
					}}
				>
					<Image src={Home.Horizon} className="h-auto w-full " alt="horizon" />
				</Box>
				<Box
					h={'50px'}
					position={'relative'}
					w={'100%'}
					zIndex={-1}
					mt={'56'}
					sx={{
						display: { base: 'block', md: 'none' },
					}}
				>
					<Image
						src={Home.MobileHorizon}
						className="h-[100%] w-full object-fill scale-[17] object-top "
						alt="MobileHorizon"
					/>
				</Box>

				<Flex
					flexDirection={'row'}
					wrap={'wrap'}
					display={{ base: 'none', lg: 'flex' }}
					justifyContent={'center'}
					rowGap={5}
					bg={'#0c0d0d'}
					pb={'150px'}
					px={8}
				>
					{ProjectCardData.map((item, index) => {
						return (
							<ProjectCard
								key={index}
								projectName={item.projectName}
								description={item.description}
								projectLogo={Assets.ProjectLogo}
								projectImage={ProjectCards.Project1}
								badgeType={item.badgeType} // Can be 'comingSoon', 'whitelisting', 'soldout', etc.
								badgeLabel={item.badgeLabel}
								tokenSymbol={item.tokenSymbol}
								tokenLogo={Assets.EthLogo}
								totalRaise={formatNumber(item.totalRaise)}
								personalAllocation={item.personalAllocation}
							/>
						);
					})}
				</Flex>

				<Carousel />
			</Box>

			{/* <LogoGrid /> */}
		</Flex>
	);
}
