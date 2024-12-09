import type { NextApiRequest, NextApiResponse } from 'next';

import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';
import { hashPassword } from '@/lib/scripts/authHelpers';
import type { RegistrationRequestBody } from '@/lib/types/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const {
			name,
			email,
			password,
			provider,
			method,
			role,
			twitterId,
			nationality,
			phoneNumber,
			telegramId,
		} = req.body as RegistrationRequestBody;

		// Validate required fields
		if (!name || !email || !method || !role) {
			return res.status(400).json({ error: 'Name, email, method, and role are required.' });
		}

		// Validate the role
		if (!['investor', 'admin', 'project'].includes(role)) {
			return res
				.status(400)
				.json({ error: 'Invalid role. Role must be investor, admin, or project.' });
		}

		// Validate phone number if provided
		if (phoneNumber) {
			const { countryCode, number } = phoneNumber;
			if (!countryCode || !number) {
				return res
					.status(400)
					.json({ error: 'Both countryCode and number are required in phoneNumber.' });
			}
		}

		await dbConnect();

		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ error: 'User already exists.' });
		}

		// Determine the initial KYC status based on role
		const kycStatus = role === 'investor' ? 'not_started' : undefined;

		if (method === 'password') {
			// Handle traditional email/password registration
			if (!password) {
				return res.status(400).json({
					error: 'Password is required for email/password registration.',
				});
			}

			// Hash the password
			const { hash } = await hashPassword(password);

			// Create the user
			const user = new User({
				name,
				email,
				password: hash,
				isOAuthUser: false,
				role,
				twitterId,
				nationality,
				phoneNumber,
				telegramId,
				...(kycStatus && { kycStatus }), // Add kycStatus only if defined
			});
			await user.save();

			return res.status(201).json({
				message: 'User registered successfully.',
				user: {
					id: user._id.toString(),
					email: user.email,
					role: user.role,
				},
			});
		} else if (method === 'oauth') {
			// Handle OAuth registration
			if (!provider || !provider.providerName || !provider.providerId) {
				return res.status(400).json({
					error: 'Provider with providerName and providerId is required for OAuth registration.',
				});
			}

			// Create the user
			const user = new User({
				name,
				email,
				provider: provider.providerName,
				providerId: provider.providerId,
				isOAuthUser: true,
				role,
				twitterId,
				nationality,
				phoneNumber,
				telegramId,
				...(kycStatus && { kycStatus }), // Add kycStatus only if defined
			});
			await user.save();

			return res.status(201).json({
				message: 'OAuth user registered successfully.',
				user: {
					id: user._id.toString(),
					email: user.email,
					role: user.role,
				},
			});
		} else {
			return res.status(400).json({ error: 'Invalid registration method.' });
		}
	} catch (error) {
		console.error('Error during registration:', error);

		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
