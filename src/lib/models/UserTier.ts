import type { Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

import type { IUserTier } from '@/lib/types/models';

const UserTierSchema: Schema<IUserTier> = new Schema(
	{
		userId: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		tierToken: {
			type: String,
			required: true, // Tier token address is mandatory
		},
		tierId: {
			type: Number,
			required: true, // Tier ID is mandatory
		},
		tierLockedAmount: {
			type: String,
			required: true, // Locked amount is mandatory
		},
		allocationPercentage: {
			type: Number,
			required: true, // Tier ID is mandatory
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const UserTier: Model<IUserTier> =
	mongoose.models.UserTier || mongoose.model<IUserTier>('UserTier', UserTierSchema);

export default UserTier;
