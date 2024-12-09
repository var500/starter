import type { Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { ITransactionData } from '@/lib/types/models';

const TransactionDataSchema: Schema<ITransactionData> = new Schema(
	{
		userTierId: {
			type: Schema.Types.ObjectId,
			ref: 'UserTier',
			required: true, // Link to the related UserTier document
		},
		network: {
			type: String,
			required: true, // Network name (e.g., Ethereum, Sepolia)
		},
		transactionHash: {
			type: String,
			required: true, // Transaction hash on the blockchain
			unique: true, // Ensure transaction hashes are unique
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const TransactionData: Model<ITransactionData> =
	mongoose.models.TransactionData ||
	mongoose.model<ITransactionData>('TransactionData', TransactionDataSchema);

export default TransactionData;
