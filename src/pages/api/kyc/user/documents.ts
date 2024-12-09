import type { NextApiRequest, NextApiResponse } from 'next';

import KYC from '@/lib/models/KYC'; // Assume KYC is your Mongoose model
import dbConnect from '@/lib/mongoDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		await dbConnect();
		const { userId } = req.query;

		if (!userId) {
			return res.status(400).json({ error: 'UserId is required' });
		}

		try {
			// Fetch the KYC documents for the specified userId
			const kyc = await KYC.findOne({ userId }).lean();

			if (!kyc) {
				return res.status(404).json({ error: 'KYC record not found for the given userId' });
			}

			// Respond with the documents array
			return res.status(200).json({
				userId: kyc.userId,
				documents: kyc.documents,
				status: kyc.status,
				createdAt: kyc.createdAt,
				updatedAt: kyc.updatedAt,
			});
		} catch (error) {
			console.error('Error fetching KYC documents:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		return res.status(405).json({ error: 'Method not allowed' });
	}
}
