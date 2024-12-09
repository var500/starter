import { Divider, Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Assets } from '@/assets';
import Card from '@/components/Card';
import TableCompoent from '@/components/Projects/TableComponent';
import styles from '@/styles/Home.module.scss';
import Pagestyles from '@/styles/page/projects.module.scss';
const Project: NextPage = () => {
	return (
		<div className={styles.container}>
			<div className={Pagestyles.innerContainer}>
				<div className={Pagestyles.topSection}>
					<Text
						variant={'gradient'}
						fontWeight={700}
						className={Pagestyles.maxW398}
						textAlign={{ base: 'center', md: 'left' }}
					>
						We bring new technologies to our community
					</Text>
					<div className={Pagestyles.cardContainer}>
						<Card title="Funded Projects" numbers="99" />
						<Card title="Unique Participants" numbers="26,700" />
						<Card
							title="Funded Projects"
							numbers="$40,619,504
"
						/>
					</div>
				</div>

				<Flex>
					<input
						className={Pagestyles.searchInput}
						placeholder="Search by project name, token contract address or token symbol..."
					/>
					<div className={Pagestyles.searchIconFlex}>
						<Image src={Assets.Magnify} className={Pagestyles.size24} alt="magnify" />
					</div>
				</Flex>

				<TableCompoent />

				<Divider />

				<div className={Pagestyles.footerContainer}>
					<Image src={Assets.FooterLogo} className="h-9 w-auto" alt="FooterLogo" />
				</div>
			</div>
		</div>
	);
};
export default Project;
