import { Flex } from '@chakra-ui/react';
import Image from 'next/image';

import { Home } from '@/assets';

const LogoRow = () => {
	return (
		<>
			<Flex
				justifyContent={'space-between'}
				gap={6}
				mt={4}
				sx={{
					display: { base: 'none', lg: 'flex' },
				}}
			>
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
			</Flex>

			<Flex
				justifyContent={'space-between'}
				gap={6}
				my={4}
				px={2}
				sx={{
					display: { base: 'flex', lg: 'none' },
				}}
			>
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
				<Image src={Home.CapitalLogo} alt="capital" className="h-5 w-16" />
			</Flex>
		</>
	);
};

export default LogoRow;
