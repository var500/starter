import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, sepolia } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { getPublicTestnetCheck, getWalletConnectProjectId } from '@/utils/env';

const { chains, provider } = configureChains(
	[
		mainnet,
		polygon,
		optimism,
		arbitrum,
		...(getPublicTestnetCheck() === 'true' ? [sepolia] : []),
	],
	[publicProvider()]
);

const projectId = getWalletConnectProjectId();

const { connectors } = getDefaultWallets({
	appName: 'RainbowKit App',
	chains,
	projectId,
});

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export const wagmiChains = chains;
