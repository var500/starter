import type { Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { ISubscriptionPlan } from '@/lib/types/models';

const SubscriptionPlanSchema: Schema<ISubscriptionPlan> = new Schema(
	{
		cost: {
			type: Number,
			required: true,
		},
		projectCount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true, // Adds `createdAt` and `updatedAt` fields
	}
);

const SubscriptionPlan: Model<ISubscriptionPlan> =
	mongoose.models.SubscriptionPlan ||
	mongoose.model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema);

export default SubscriptionPlan;
