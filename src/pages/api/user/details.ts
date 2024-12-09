import type { NextApiRequest, NextApiResponse } from 'next';

import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		await dbConnect();
		const { id } = req.query;

		if (!id) {
			return res.status(400).json({ error: 'User ID is required' });
		}

		try {
			// Find the user by ID
			const user = await User.findById(id).lean();

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			// Respond with user details
			return res.status(200).json({
				id: user._id,
				email: user.email,
				name: user.name,
				kycStatus: user.kycStatus,
				nationality: user.nationality,
				phoneNumber: user.phoneNumber,
				twitterId: user.twitterId,
				telegramId: user.telegramId,
				image: user.image,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		} catch (error) {
			console.error('Error fetching user details:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else if (req.method === 'PATCH') {
		const { data } = req.body;
		if (!data.id || !data) {
			return res.status(400).json({ error: 'Missing user ID or data to update' });
		}

		try {
			// Find the user by ID and update their details
			await User.updateOne({ _id: data.id }, { $set: data });

			return res.status(200).json({ message: 'success' });
		} catch (error) {
			console.error('Error updating user details:', error);

			return res.status(500).json({ error: 'Internal server error' });
		}
	} else {
		return res.status(405).json({ error: 'Method not allowed' });
	}
}
