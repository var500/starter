import { ethers } from 'ethers';

import NETWORKS_DATA from '@/lib/setttings.json';

const getProvider = () => {
	if (typeof window.ethereum !== 'undefined') {
		//@ts-ignore
		return new ethers.providers.Web3Provider(window.ethereum);
	} else {
		throw new Error('MetaMask is not installed');
	}
};

const getSigner = async (provider: ethers.providers.Web3Provider) => {
	await provider.send('eth_requestAccounts', []);

	return provider.getSigner();
};

export async function payNow({
	tierId,
	subscriptionId,
}: {
	tierId: number;
	subscriptionId: number;
}) {
	const provider = getProvider();
	const signer = await getSigner(provider);
	const networkData = NETWORKS_DATA['sepolia' as keyof typeof NETWORKS_DATA];

	const { address: tokenAddress, abi: TokenAbi } = networkData.contract.usdt;
	const tokenContract = new ethers.Contract(tokenAddress, TokenAbi, signer);

	await tokenContract.lockTier(tierId, '0xb17765D884f48072725F87704ff4Cb3FFC733814');
	await tokenContract.purchaseSubscription(
		subscriptionId,
		'0xb17765D884f48072725F87704ff4Cb3FFC733814'
	);
}
