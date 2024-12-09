import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import type { NextApiRequest, NextApiResponse } from 'next';

import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';
import { verifyPassword } from '@/lib/scripts/authHelpers';
import type { LoginRequestBody } from '@/lib/types/auth';
import { getNextauthSecret } from '@/utils/env'; // Helper to get NEXTAUTH_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { email, password, provider, method } = req.body as LoginRequestBody;

		if (!email || !method) {
			return res.status(400).json({ error: 'Email and method are required.' });
		}

		await dbConnect();

		let user;
		if (method === 'password') {
			// Handle password login
			if (!password) {
				return res.status(400).json({
					error: 'Password is required for email/password authentication.',
				});
			}

			// Query user and include password
			user = await User.findOne({ email, isOAuthUser: false }).select('+password');
			if (!user || !(await verifyPassword(password, user.password!))) {
				return res.status(401).json({ error: 'Invalid email or password.' });
			}
		} else if (method === 'oauth') {
			// Handle OAuth login
			if (!provider || !provider.providerName || !provider.providerId) {
				return res.status(400).json({
					error: 'Provider with providerName and providerId is required for OAuth.',
				});
			}

			user = await User.findOne({ email });
			if (!user) {
				// Create new user for OAuth
				user = new User({
					email,
					provider: provider.providerName,
					providerId: provider.providerId,
					isOAuthUser: true,
					role: 'investor', // Default role for new OAuth users
				});
				await user.save();
			} else if (
				!user.isOAuthUser ||
				provider.providerName !== user.provider ||
				provider.providerId !== user.providerId
			) {
				return res.status(400).json({
					error: 'Invalid OAuth credentials.',
				});
			}
		} else {
			return res.status(400).json({ error: 'Invalid authentication method.' });
		}

		// Generate a JWT
		const secret = getNextauthSecret();
		const token = jwt.sign(
			{
				id: user._id.toString(),
				email: user.email,
				role: user.role,
			},
			secret,
			{ expiresIn: '7d' } // Set token expiration (e.g., 7 days)
		);

		return res.status(200).json({
			message: 'Login successful.',
			token, // Return the token
			user: {
				id: user._id.toString(),
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.error('Error during authentication:', error);

		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
