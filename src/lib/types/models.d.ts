import type { Document } from 'mongoose';

import type { KycStatus, PhoneNumber, Role } from '@/lib/types/common';

export type KycDocument = {
	_id: Types.ObjectId; // MongoDB ObjectId type
	documentType: string; // Name or type of the document (e.g., "passport")
	s3Path: string; // Path to the document in S3
};

export interface IUser extends Document {
	_id: Types.ObjectId; // MongoDB ObjectId type
	email: string;
	password?: string; // Optional for OAuth users
	name?: string | null; // Optional; provided by OAuth or manually entered
	image?: string | null; // Profile picture from OAuth providers
	provider?: string; // OAuth provider, e.g., "google", "facebook", "apple"
	providerId?: string; // Unique ID from the OAuth provider
	isOAuthUser: boolean; // Differentiate OAuth and password-based users
	role: Role; // User roles
	kycStatus?: KycStatus; // User KYC status
	twitterId?: string; // Optional Twitter ID
	nationality?: string; // Optional nationality
	telegramId?: string; // Optional Telegram ID
	phoneNumber?: PhoneNumber; // Optional phone number
	userAddress?: string; // Optional User's wallet address
	createdAt: Date;
	updatedAt: Date;
}

export interface IKYC extends Document {
	_id: Types.ObjectId; // MongoDB ObjectId type
	userId: ObjectId; // Reference to the User collection
	documents: KycDocument[]; // Array of document objects
	status: 'not_started' | 'pending' | 'approved' | 'rejected'; // KYC status
	createdAt: Date;
	updatedAt: Date;
}

export interface ITier extends Document {
	_id: Types.ObjectId; // MongoDB ObjectId type
	cost: number; // Cost in the smallest token units (e.g., USD cents)
	allocationPercentage: number; // Allocation percentage (e.g., 133 represents 1.33%)
}

export interface ISubscriptionPlan extends Document {
	_id: Types.ObjectId; // MongoDB ObjectId type
	cost: number; // Cost in the smallest token units (e.g., USD cents)
	projectCount: number; // Number of projects allowed in the subscription
}

export interface IUserTier extends Document {
	_id: Types.ObjectId; // MongoDB ObjectId type
	userId: ObjectId; // Reference to the User collection
	tierToken: string; // Token address for tier payment
	tierId: number; // ID of the tier the user is locked into
	tierLockedAmount: string; // Amount locked for the tier
	transactionData: ITransactionData;
	allocationPercentage: number;
}
interface ITransactionData extends Document {
	_id: Types.ObjectId; // MongoDB ObjectId type
	userTierId: Types.ObjectId; // Reference to the UserTier collection
	network: string; // Network name (e.g., Ethereum, Sepolia)
	transactionHash: string; // Transaction hash on the blockchain
}

export interface IUserSubscriptionPlan extends Document {
	_id: Types.ObjectId; // MongoDB ObjectId type
	userId: ObjectId; // Reference to the User collection
	subscriptionPlanToken: string; // Token address used for subscription payment
	subscriptionPlanId: number; // ID of the subscription plan purchased
	subscriptionPlanAmount: string; // Amount paid for the subscription
	remainingProjects: number; // Number of projects the user can participate in
	transactionData: ITransactionData;
}

// Define an interface for raw tier data
export interface RawTier {
	cost: number;
	allocationPercentage: number;
}

// Define an interface for raw subscription plan data
export interface RawSubscriptionPlan {
	cost: number;
	projectCount: number;
}

export interface IOrders extends Document {
	_id: string;
	amount: number;
	transactionId: string;
	createdAt: Date;
	updatedAt: Date;
}
