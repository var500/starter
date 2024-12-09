import jwt from 'jsonwebtoken';
import type { NextApiRequest } from 'next';

import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';
import type { JwtPayload } from '@/lib/types/auth';
import { getNextauthSecret } from '@/utils/env';

/**
 * Verifies the user's authentication and optional role.
 * @param req - Next.js API request
 * @param requiredRole - Optional role to check (e.g., "admin")
 * @returns Authenticated user document
 * @throws Error if authentication or authorization fails
 */
export async function authenticateAndAuthorize(req: NextApiRequest, requiredRole?: string) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new Error('Authorization header missing or malformed');
	}

	const token = authHeader.split(' ')[1];
	if (!token) {
		throw new Error('Token missing from authorization header');
	}

	try {
		// Verify JWT
		const secret = getNextauthSecret() || '';
		const decoded = jwt.verify(token, secret) as JwtPayload;

		// Ensure database connection
		await dbConnect();

		// Fetch the user from the database
		const user = await User.findById(decoded.id);
		if (!user) {
			throw new Error('User not found');
		}

		// Check the role if required
		if (requiredRole && user.role !== requiredRole) {
			throw new Error('Insufficient permissions');
		}

		// Return the authenticated user
		return user;
	} catch (error) {
		console.error('Authentication error:', error);
		throw new Error('Authentication failed');
	}
}
