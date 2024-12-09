/* eslint-disable no-loops/no-loops */

import type { NextApiRequest, NextApiResponse } from 'next';

import { authenticateAndAuthorize } from '@/lib/middleware/authenticateAndAuthorize';
import Tier from '@/lib/models/Tier';
import dbConnect from '@/lib/mongoDb';
import { getTierData } from '@/lib/scripts/tierSubscriptionPoolContract';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();
	if (req.method === 'GET') {
		try {
			// Verify user authentication
			// await authenticateAndAuthorize(req);
			// Fetch tier data from the database
			let tierData = await Tier.find();
			if (!tierData || tierData.length === 0) {
				console.log('No tier data in the database. Fetching from the blockchain...');
				// Fetch tier data from the blockchain
				const fetchedTierData = await getTierData();
				if (fetchedTierData.length === 0) {
					return res.status(404).json({ error: 'No tier data found on the blockchain.' });
				}
				// Save fetched tier data to the database
				tierData = await Tier.insertMany(fetchedTierData);
				console.log('Fetched tier data saved to the database.');
			}

			// Return tier data to the frontend
			return res.status(200).json({
				success: true,
				data: tierData,
			});
		} catch (error) {
			console.error('Error fetching tier data:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else if (req.method === 'POST') {
		try {
			// Verify admin authentication
			await authenticateAndAuthorize(req, 'admin');
			const { tiers } = req.body;
			// Validate the input
			if (!Array.isArray(tiers) || tiers.length === 0) {
				return res.status(400).json({ error: '`tiers` must be a non-empty array.' });
			}
			for (const tier of tiers) {
				if (
					typeof tier.cost !== 'number' ||
					typeof tier.allocationPercentage !== 'number'
				) {
					return res.status(400).json({
						error: 'Each tier must have valid `cost` and `allocationPercentage` fields.',
					});
				}
			}
			// Save the new tiers to the database
			await Tier.deleteMany({});
			const savedTiers = await Tier.insertMany(tiers);

			return res.status(201).json({
				success: true,
				message: 'Tiers updated successfully.',
				data: savedTiers,
			});
		} catch (error) {
			console.error('Error updating tiers:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		// Method not allowed
		return res.status(405).json({ error: 'Method not allowed' });
	}
}
