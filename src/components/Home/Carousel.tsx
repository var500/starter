import { FaAngleRight } from 'react-icons/fa';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Assets, ProjectCards } from '@/assets';
import { ProjectCardData } from '@/utils/common';
import { formatNumber } from '@/utils/helpers';

export default function Carousel() {
	return (
		<Flex
			flexDirection={'column'}
			gap={4}
			bg={'#0c0d0d'}
			alignItems={'center'}
			py={10}
			px={4}
			display={{ base: 'flex', lg: 'none' }}
		>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={50}
				slidesPerView={1}
				className=" max-w-[400px] w-full"
				pagination={{ clickable: true }}
			>
				{ProjectCardData.map((item, index) => {
					return (
						<SwiperSlide key={index}>
							<Flex
								flexDirection="column"
								border="1px solid #363636"
								overflow="hidden"
								borderRadius="md"
								maxW="382px"
								h="507px"
							>
								<Flex
									flexDirection="column"
									justifyContent="space-between"
									p={4}
									gap={4}
									h="90%"
								>
									{/* Top Section */}
									<Box>
										<Image
											src={Assets.ProjectLogo}
											className="h-20 w-20"
											alt={`projectNamelogo`}
										/>
										<Box position="relative">
											{item.badgeType && (
												<Badge
													size="sm"
													variant={item.badgeType}
													position="absolute"
													top={-5}
													right={0}
												>
													{item.badgeLabel}
												</Badge>
											)}
											<Image
												src={ProjectCards.Project1}
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
												{item.projectName}
											</Text>
											<Text variant="simple" color="#828282">
												{item.description}
											</Text>
										</Box>
										<Flex flexDirection="column" gap={2} alignItems="center">
											<Image
												src={Assets.EthLogo}
												alt={`${item.tokenSymbol} logo`}
												className="h-7 w-7"
											/>
											<Text variant="solid" fontWeight={400} fontSize="13px">
												{item.tokenSymbol}
											</Text>
										</Flex>
									</Flex>

									{/* Allocation Section */}
									<Flex flexDirection="column" gap={2}>
										<Flex flexDirection="row" justifyContent="space-between">
											<Text>Total Raise</Text>
											<Text>
												${formatNumber(item.totalRaise).toLocaleString()}
											</Text>
										</Flex>
										<Flex flexDirection="row" justifyContent="space-between">
											<Text>Personal Allocation</Text>
											<Text>${item.personalAllocation} Max</Text>
										</Flex>
									</Flex>
								</Flex>

								{/* Footer Section */}
								<Flex borderTop="1px solid #343434" alignItems="center" h="10%">
									<Flex
										borderRight="1px solid #343434"
										h="100%"
										alignItems="center"
										w="80%"
									>
										<Text variant="title" fontSize="14px" pl={4}>
											Learn More
										</Text>
									</Flex>
									<Flex justifyContent="center" w="20%">
										<FaAngleRight color="#9B51E0" size={24} />
									</Flex>
								</Flex>
							</Flex>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Flex>
	);
}
