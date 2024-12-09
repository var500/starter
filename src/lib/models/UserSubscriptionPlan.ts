import type { Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { IUserSubscriptionPlan } from '@/lib/types/models';
const UserSubscriptionPlanSchema: Schema<IUserSubscriptionPlan> = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		subscriptionPlanToken: {
			type: String,
			required: true, // Subscription token address is mandatory
		},
		subscriptionPlanId: {
			type: Number,
			required: true, // Subscription plan ID is mandatory
		},
		subscriptionPlanAmount: {
			type: String,
			required: true, // Subscription amount is mandatory
		},
		remainingProjects: {
			type: Number,
			default: 0, // Default to 0 remaining projects
		},
	},
	{
		timestamps: true, // Automatically adds `createdAt` and `updatedAt`
	}
);
const UserSubscriptionPlan: Model<IUserSubscriptionPlan> =
	mongoose.models.UserSubscriptionPlan ||
	mongoose.model<IUserSubscriptionPlan>('UserSubscriptionPlan', UserSubscriptionPlanSchema);
export default UserSubscriptionPlan;
