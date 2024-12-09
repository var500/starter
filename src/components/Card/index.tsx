import { Text } from '@chakra-ui/react';
import Image from 'next/image';

import { Assets } from '@/assets';
import styles from '@/styles/components/card.module.scss';

export default function Card({ title, numbers }: { title: string; numbers: string }) {
	return (
		<div className={styles.rectangle}>
			{/* Background overlay with opacity */}
			<div className={styles.backgroundOverlay}></div>

			{/* Card content */}
			<div className={styles.content}>
				<div className={styles.topContainer}>
					<Image src={Assets.CARDBADGE} className={styles.badge} alt="CardBadge" />
					<Text textColor={'#977FD4'} fontSize={13} className={styles.title}>
						{title}
					</Text>
				</div>
				<div className={styles.number}>
					<Text variant={'title'} fontSize={'3xl'} fontWeight={700}>
						{numbers}
					</Text>
				</div>
			</div>
		</div>
	);
}
