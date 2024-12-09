/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { NextApiResponse } from 'next';

// import { authenticateAndAuthorize } from '@/lib/middleware/authenticateAndAuthorize'; // Middleware to verify user authentication
import { multerInstance } from '@/lib/middleware/multerInstance';
import KYC from '@/lib/models/KYC';
import User from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';
// import { encrypt } from '@/lib/scripts/encryption'; // Utility for encryption
import { runMiddleware } from '@/lib/scripts/runMiddleware'; // Import the middleware wrapper
import { uploadToS3 } from '@/lib/scripts/s3Client'; // Use the reusable S3 upload function
// import type { IUser } from '@/lib/types/models';
import type { MulterRequest } from '@/lib/types/uploads';
import { getAwsS3Config } from '@/utils/env';

export const config = {
	api: {
		bodyParser: false,
		responseLimit: '200mb', // Set response limit to 200MB
	},
};

export default async function handler(req: MulterRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		console.log('Processing request...');

		// Connect to the database
		await dbConnect();

		// Process files using multer
		await runMiddleware(
			req,
			res,
			multerInstance.fields([
				{ name: 'aadhar', maxCount: 1 },
				{ name: 'pancard', maxCount: 1 },
				{ name: 'other', maxCount: 4 },
			])
		);

		const { id } = req.body;
		const files = req.files;

		if (!files || Object.keys(files).length === 0) {
			return res.status(400).json({ error: 'Files are required.' });
		}

		const uploadPromises: Promise<void>[] = [];

		['aadhar', 'pancard', 'other'].forEach((type) => {
			const fileGroup = files[type as keyof File[]];
			if (fileGroup && Array.isArray(fileGroup)) {
				fileGroup.forEach((file) => {
					const s3Key = `kyc-docs/${id}/${Date.now()}_${file.fieldname}`;

					// Upload to S3
					uploadPromises.push(
						uploadToS3(s3Key, file.buffer, file.mimetype).then(async () => {
							let kycRecord = await KYC.findOne({ userId: id });
							if (!kycRecord) {
								kycRecord = new KYC({
									userId: id,
									documents: [],
									status: 'pending',
								});
							}
							const { awsBucketName, awsRegion } = getAwsS3Config();
							const s3Path =
								`https://${awsBucketName}.s3.${awsRegion}.amazonaws.com/` + s3Key;
							kycRecord.documents.push({
								_id: id,
								documentType: file.fieldname,
								s3Path: s3Path,
							});
							kycRecord.status = 'pending';
							await kycRecord.save();
							await User.findByIdAndUpdate(id, { kycStatus: 'pending' });
						})
					);
				});
			}
		});

		await Promise.all(uploadPromises);

		return res.status(201).json({ message: 'Documents uploaded successfully.' });
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
