import { Button, Flex } from '@chakra-ui/react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

export default function SocialButton({
	image,
	click,
	label,
}: {
	image: StaticImageData;
	click: () => void;
	label: string;
}) {
	return (
		<Button variant={'social'} size={'lg'} onClick={click}>
			<Flex
				flexDirection={'row'}
				alignItems={'center'}
				gap={2}
				justifyContent={'center'}
				w={'100%'}
			>
				<Image
					src={image}
					alt="worldid"
					height={10}
					width={10}
					className="h-[30px] w-[30px]"
				/>
				{label}
			</Flex>
		</Button>
	);
}
