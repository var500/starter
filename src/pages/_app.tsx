import '@/styles/globals.scss';
import '@rainbow-me/rainbowkit/styles.css';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { ChakraBaseProvider } from '@chakra-ui/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { WagmiConfig } from 'wagmi';

import InvestorAuthLayout from '@/components/hoc/AuthLayout';
import Layout from '@/components/hoc/Layout';
import { QUERY_CLIENT } from '@/core/clients/query';
import { wagmiChains, wagmiClient } from '@/core/clients/wagmi';
import { CHAKRA_THEME } from '@/core/constants/theme';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const router = useRouter();

	// Check if the route is part of the 'investor' section
	const isInvestorRoute = router.pathname.startsWith('/investor');

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={QUERY_CLIENT}>
				<Hydrate state={pageProps?.dehydratedState}>
					<WagmiConfig client={wagmiClient}>
						<ChakraBaseProvider theme={CHAKRA_THEME}>
							<RainbowKitProvider chains={wagmiChains}>
								<Layout>
									{isInvestorRoute ? (
										<InvestorAuthLayout>
											<Component {...pageProps} />
										</InvestorAuthLayout>
									) : (
										<Component {...pageProps} />
									)}
								</Layout>
							</RainbowKitProvider>
						</ChakraBaseProvider>
					</WagmiConfig>
				</Hydrate>
			</QueryClientProvider>
		</SessionProvider>
	);
}
