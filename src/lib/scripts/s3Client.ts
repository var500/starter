import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { getAwsS3Config } from '@/utils/env';

// Get AWS configuration
const awsS3Config = getAwsS3Config();

// Initialize the S3 client
export const s3Client = new S3Client({
	credentials: {
		accessKeyId: awsS3Config.awsAccessKeyId,
		secretAccessKey: awsS3Config.awsSecretAccessKey,
	},
	region: awsS3Config.awsRegion,
});

// Upload a file to S3
export async function uploadToS3(key: string, body: Buffer | string, contentType: string) {
	try {
		const command = new PutObjectCommand({
			Bucket: awsS3Config.awsBucketName,
			Key: key,
			Body: body,
			ContentType: contentType,
		});

		const response = await s3Client.send(command);

		return response;
	} catch (error) {
		console.error('Error uploading to S3:', error);
		throw error;
	}
}
