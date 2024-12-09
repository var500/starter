import { ethers } from 'ethers';

import NETWORKS_DATA from '@/lib/setttings.json';
import type { RawSubscriptionPlan, RawTier } from '@/lib/types/models';
import { getContract } from '@/utils/ethers';

/**
 * Fetches tier data from the blockchain and returns it in a sanitized format.
 * @returns {Promise<RawTier[]>} Sanitized tier data ready for DB storage and frontend consumption.
 */
export const getTierData = async (): Promise<RawTier[]> => {
	try {
		const networkData = NETWORKS_DATA['sepolia' as keyof typeof NETWORKS_DATA];
		if (!networkData) {
			throw new Error('No network details found for the specified network.');
		}
		const { address, abi } = networkData.contract.tierSubscriptionPool;
		const rpcUrl = networkData.rpcUrl;
		if (!address || !abi || !rpcUrl) {
			throw new Error('Incomplete contract or RPC details in network data.');
		}
		// Initialize contract
		const tierSubscriptionPoolContract = getContract(address, abi, rpcUrl);
		// Fetch raw tier data from the blockchain
		const rawTiers: [ethers.BigNumber, ethers.BigNumber][] =
			await tierSubscriptionPoolContract.getAllTiers();
		// Sanitize raw tier data
		const sanitizedTiers: RawTier[] = rawTiers.map(([cost, allocationPercentage]) => ({
			cost: Number(ethers.utils.formatUnits(cost, 18)),
			allocationPercentage: allocationPercentage.toNumber() / 100, // Convert to percentage
		}));
		console.log('Sanitized tiers:', sanitizedTiers);

		return sanitizedTiers;
	} catch (error) {
		console.error('Error fetching Tiers from blockchain:', error);

		return [];
	}
};

/**
 * Fetches subscription plan data from the blockchain and returns it in a sanitized format.
 * @returns {Promise<RawSubscriptionPlan[]>} Sanitized subscription plan data ready for DB storage and frontend consumption.
 */
export const getSubscriptionPlanData = async (): Promise<RawSubscriptionPlan[]> => {
	try {
		const networkData = NETWORKS_DATA['sepolia' as keyof typeof NETWORKS_DATA];
		if (!networkData) {
			throw new Error('No network details found for the specified network.');
		}
		const { address, abi } = networkData.contract.tierSubscriptionPool;
		const rpcUrl = networkData.rpcUrl;
		if (!address || !abi || !rpcUrl) {
			throw new Error('Incomplete contract or RPC details in network data.');
		}
		// Initialize contract
		const tierSubscriptionPoolContract = getContract(address, abi, rpcUrl);
		// Fetch raw subscription plan data from the blockchain
		const subscriptionPlan: [ethers.BigNumber, ethers.BigNumber][] =
			await tierSubscriptionPoolContract.getAllSubscriptionPlans();
		// Sanitize raw subscription plan data
		const sanitizedSubscriptionPlan: RawSubscriptionPlan[] = subscriptionPlan.map(
			([cost, projectCount]) => ({
				cost: Number(ethers.utils.formatUnits(cost, 18)),
				projectCount: projectCount.toNumber(),
			})
		);
		console.log('Sanitized subscription plan:', sanitizedSubscriptionPlan);

		return sanitizedSubscriptionPlan;
	} catch (error) {
		console.error('Error fetching subscription plans from blockchain:', error);

		return [];
	}
};
