import type { Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { ITier } from '@/lib/types/models';

const TierSchema: Schema<ITier> = new Schema(
	{
		cost: {
			type: Number,
			required: true,
		},
		allocationPercentage: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true, // Adds `createdAt` and `updatedAt` fields
	}
);

const Tier: Model<ITier> = mongoose.models.Tier || mongoose.model<ITier>('Tier', TierSchema);

export default Tier;
