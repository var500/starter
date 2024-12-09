import type { Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { IOrders } from '@/lib/types/models';

const OrderSchema = new Schema<IOrders>(
	{
		transactionId: {
			type: String,
			required: true,
		},

		amount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Use Mongoose's models cache to avoid recompiling during hot-reloads
const ORDERS: Model<IOrders> =
	mongoose.models.ORDERS || mongoose.model<IOrders>('Orders', OrderSchema);

export default ORDERS;
