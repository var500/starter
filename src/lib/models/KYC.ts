import type { Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { IKYC } from '@/lib/types/models';

const KYCSchema = new Schema<IKYC>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		// 3 sepearte document
		documents: [
			{
				documentType: { type: String, required: true },
				s3Path: { type: String, required: true },
				date: { type: Date, default: new Date() },
			},
		],
		status: {
			type: String,
			enum: ['not_started', 'pending', 'approved', 'rejected'],
		},
	},
	{
		timestamps: true,
	}
);

// Use Mongoose's models cache to avoid recompiling during hot-reloads
const KYC: Model<IKYC> = mongoose.models.KYC || mongoose.model<IKYC>('KYC', KYCSchema);

export default KYC;
