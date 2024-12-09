import type { NextApiRequest, NextApiResponse } from 'next';

import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';
import { hashPassword } from '@/lib/scripts/authHelpers';
import type { SetPasswordRequestBody } from '@/lib/types/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' }); // Only POST is allowed
	}

	try {
		const { email, password } = req.body as SetPasswordRequestBody;

		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required.' });
		}

		await dbConnect();

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		if (user.isOAuthUser) {
			// Check if the user already has a password set
			if (user.password) {
				return res.status(400).json({
					error: 'Password is already set for this user. Please log in with your password.',
				});
			}

			// Hash the new password
			const { hash } = await hashPassword(password);
			user.password = hash;

			await user.save();

			return res.status(200).json({
				message: 'Password set successfully.',
				user: {
					id: user._id.toString(),
					email: user.email,
					role: user.role, // Include the user's role in the response
				},
			});
		}

		return res.status(400).json({ error: 'Password setting is not allowed for this user.' });
	} catch (error) {
		console.error('Error setting password:', error);

		return res.status(500).json({ error: 'Internal server error.' });
	}
}
