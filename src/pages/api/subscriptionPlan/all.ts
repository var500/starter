/* eslint-disable no-loops/no-loops */

import type { NextApiRequest, NextApiResponse } from 'next';

import { authenticateAndAuthorize } from '@/lib/middleware/authenticateAndAuthorize';
import SubscriptionPlan from '@/lib/models/SubscriptionPlan';
import dbConnect from '@/lib/mongoDb';
import { getSubscriptionPlanData } from '@/lib/scripts/tierSubscriptionPoolContract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();
	if (req.method === 'GET') {
		try {
			// Verify user authentication
			// await authenticateAndAuthorize(req);
			// Fetch subscription plan data from the database
			let subscriptionPlanData = await SubscriptionPlan.find();
			if (!subscriptionPlanData || subscriptionPlanData.length === 0) {
				console.log(
					'No subscription plan data in the database. Fetching from the blockchain...'
				);
				// Fetch subscription plan data from the blockchain
				const fetchedSubscriptionPlanData = await getSubscriptionPlanData();
				if (fetchedSubscriptionPlanData.length === 0) {
					return res
						.status(404)
						.json({ error: 'No subscription plan data found on the blockchain.' });
				}
				// Save fetched tier data to the database
				subscriptionPlanData = await SubscriptionPlan.insertMany(
					fetchedSubscriptionPlanData
				);
				console.log('Fetched subscription plan data saved to the database.');
			}

			// Return tier data to the frontend
			return res.status(200).json({
				success: true,
				data: subscriptionPlanData,
			});
		} catch (error) {
			console.error('Error fetching subscription plan data:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else if (req.method === 'POST') {
		try {
			// Verify admin authentication
			await authenticateAndAuthorize(req, 'admin');
			const { subscriptionPlans } = req.body;
			// Validate the input
			if (!Array.isArray(subscriptionPlans) || subscriptionPlans.length === 0) {
				return res
					.status(400)
					.json({ error: '`subscription plans` must be a non-empty array.' });
			}
			for (const subscriptionPlan of subscriptionPlans) {
				if (
					typeof subscriptionPlan.cost !== 'number' ||
					typeof subscriptionPlan.projectCount !== 'number'
				) {
					return res.status(400).json({
						error: 'Each subscription plan must have valid `cost` and `project count` fields.',
					});
				}
			}
			// Save the new subscription plans to the database
			await SubscriptionPlan.deleteMany({});
			const savedSubscriptionPlans = await SubscriptionPlan.insertMany(subscriptionPlans);

			return res.status(201).json({
				success: true,
				message: 'Subscription plans updated successfully.',
				data: savedSubscriptionPlans,
			});
		} catch (error) {
			console.error('Error updating subscription plans:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		// Method not allowed
		return res.status(405).json({ error: 'Method not allowed' });
	}
}
