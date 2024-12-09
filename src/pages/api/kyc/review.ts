import type { NextApiRequest, NextApiResponse } from 'next';

import { authenticateAndAuthorize } from '@/lib/middleware/authenticateAndAuthorize'; // Middleware to verify admin privileges
import KYC from '@/lib/models/KYC';
import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';
import type { IKYC } from '@/lib/types/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();

	if (req.method === 'GET') {
		try {
			// Verify admin authentication
			// await authenticateAndAuthorize(req, 'admin');

			// Pagination parameters
			const { page = 1, limit = 10 } = req.query;
			const pageNumber = Math.max(1, parseInt(page as string, 10));
			const limitNumber = Math.max(1, parseInt(limit as string, 10));

			// Aggregation pipeline to group KYC submissions by user
			const kycs: IKYC[] = await KYC.aggregate([
				{
					$group: {
						_id: '$userId', // Group by userId
						filesCount: { $sum: { $size: '$documents' } }, // Count all documents uploaded by the user
						lastSubmissionDate: { $max: '$updatedAt' }, // Get the most recent update date
						status: { $last: '$status' }, // Use the status of the last submission
					},
				},
				{
					$lookup: {
						from: 'users', // Lookup the User collection
						localField: '_id', // Match with userId
						foreignField: '_id',
						as: 'userDetails',
					},
				},
				{
					$unwind: '$userDetails', // Unwind the array to simplify
				},
				{
					$project: {
						_id: 0,
						id: '$_id', // Rename _id to id for clarity
						name: '$userDetails.name',
						filesCount: 1, // Files count is aggregated
						date: '$lastSubmissionDate',
						status: 1,
					},
				},
				{ $sort: { date: -1 } }, // Sort by most recent update date
				{ $skip: (pageNumber - 1) * limitNumber }, // Apply pagination
				{ $limit: limitNumber },
			]);

			// Total count for pagination
			const totalCount = await KYC.aggregate([
				{ $group: { _id: '$userId' } },
				{ $count: 'total' },
			]);

			return res.status(200).json({
				data: kycs,
				pagination: {
					totalCount: totalCount[0]?.total || 0,
					currentPage: pageNumber,
					totalPages: Math.ceil((totalCount[0]?.total || 0) / limitNumber),
				},
			});
		} catch (error) {
			console.error('Error fetching KYC submissions:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else if (req.method === 'POST') {
		try {
			// Verify admin authentication
			await authenticateAndAuthorize(req, 'admin');

			const { userId, status } = req.body;

			// Validate the input
			if (!userId || !['approved', 'rejected'].includes(status)) {
				return res.status(400).json({
					error: 'Invalid input. `userId` and valid `status` (approved or rejected) are required.',
				});
			}

			// Update the KYC status
			const kycRecord = await KYC.findOneAndUpdate(
				{ userId },
				{ status },
				{ new: true } // Return the updated record
			);

			if (!kycRecord) {
				return res.status(404).json({ error: 'KYC record not found.' });
			}

			await User.findByIdAndUpdate(userId, { kycStatus: status });

			return res.status(200).json({ message: 'KYC status updated successfully.', kycRecord });
		} catch (error) {
			console.error('Error updating KYC status:', error);

			return res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		return res.status(405).json({ error: 'Method not allowed' });
	}
}
