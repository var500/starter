/* eslint-disable @typescript-eslint/no-explicit-any */

import { ethers } from 'ethers';

import { getPrivateKey } from './env';
// Define the type of keys for NETWORKS_DATA (e.g., "ethereum", "arbitrum")

// Function to get a contract instance for a given network, address, and ABI
export const getContract = (address: string, abi: any[], rpcUrl: string) => {
	const provider = new ethers.providers.JsonRpcProvider({
		skipFetchSetup: true,
		url: rpcUrl,
	});

	return new ethers.Contract(address, abi, provider);
};

export const postContract = (network: string, address: string, abi: any[], rpcUrl: string) => {
	const provider = new ethers.providers.JsonRpcProvider({
		skipFetchSetup: true,
		url: rpcUrl,
	});
	const wallet: ethers.Wallet = new ethers.Wallet(getPrivateKey(), provider);

	return new ethers.Contract(address, abi, wallet);
};

// Function to get the current block number for a given network
export const getCurrentBlock = async (network: string, rpcUrl: string): Promise<number> => {
	// to skip some settings when generating the rpc url in nextjs 14 server
	const provider = new ethers.providers.JsonRpcProvider({
		skipFetchSetup: true,
		url: rpcUrl,
	});

	try {
		const blockNumber = await provider.getBlockNumber();
		console.log(blockNumber);

		return blockNumber;
	} catch (error) {
		console.error(`Error fetching block number for network ${network}:`, error);
		throw new Error(`Could not fetch block number`);
	}
};
