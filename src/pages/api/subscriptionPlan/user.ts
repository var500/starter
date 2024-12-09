import { ethers } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';

import TransactionData from '@/lib/models/TransactionData';
import UserSubscriptionPlan from '@/lib/models/UserSubscriptionPlan';
import dbConnect from '@/lib/mongoDb';
import NETWORKS_DATA from '@/lib/setttings.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();

	if (req.method === 'POST') {
		const {
			network,
			transactionHash,
			subscriptionPlanId,
			subscriptionPlanToken,
			subscriptionPlanAmount,
			remainingProjects,
			userId,
		} = req.body;

		// Validate required fields
		if (
			!network ||
			!transactionHash ||
			!subscriptionPlanId ||
			!subscriptionPlanToken ||
			!subscriptionPlanAmount ||
			remainingProjects === undefined ||
			!userId
		) {
			return res.status(400).json({ error: 'Missing required fields.' });
		}

		try {
			// Fetch network details
			const networkData = NETWORKS_DATA[network as keyof typeof NETWORKS_DATA];
			if (!networkData) {
				return res.status(400).json({ error: 'Invalid network specified.' });
			}
			const { rpcUrl } = networkData;

			// Validate transaction on-chain
			const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
			const tx = await provider.getTransaction(transactionHash);
			if (!tx) {
				return res.status(404).json({ error: 'Transaction not found.' });
			}

			// Prevent duplicate transactions
			const existingTransaction = await TransactionData.findOne({ transactionHash });
			if (existingTransaction) {
				return res.status(400).json({ error: 'Transaction already processed.' });
			}

			// Save UserSubscriptionPlan
			const subscriptionPlan = new UserSubscriptionPlan({
				userId: userId,
				subscriptionPlanToken: subscriptionPlanToken,
				subscriptionPlanId: subscriptionPlanId,
				subscriptionPlanAmount: subscriptionPlanAmount,
				remainingProjects: remainingProjects,
			});
			await subscriptionPlan.save();

			// Save TransactionData
			const transactionData = new TransactionData({
				userTierId: subscriptionPlan._id,
				network: network,
				transactionHash: transactionHash,
			});
			await transactionData.save();

			return res.status(201).json({
				success: true,
				message: 'Subscription purchased and transaction saved successfully.',
			});
		} catch (error) {
			console.error('Error processing transaction:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		return res.status(405).json({ error: 'Method not allowed.' });
	}
}
