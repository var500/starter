import type { Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { IUser } from '@/lib/types/models';

const UserSchema: Schema<IUser> = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: function () {
				return !this.provider; // Password required only if not using OAuth
			},
			select: false, // Exclude password from queries by default
		},
		name: {
			type: String,
			default: null,
		},
		twitterId: {
			type: String,
			default: null,
		},
		kycStatus: {
			type: String,
			enum: ['not_started', 'pending', 'approved', 'rejected'],
			default: ['not_started'],
		},
		nationality: {
			type: String,
			default: null,
		},
		telegramId: {
			type: String,
			default: null,
		},
		phoneNumber: {
			countryCode: {
				type: String,
				default: null,
			},
			number: {
				type: String,
				default: null,
			},
		},
		image: {
			type: String,
			default: null,
		},
		provider: {
			type: String, // OAuth provider name, e.g., "google", "facebook"
			default: null,
		},
		providerId: {
			type: String, // Unique ID from the OAuth provider
			default: null,
		},
		isOAuthUser: {
			type: Boolean,
			required: true,
			default: false, // Default to false for traditional users
		},
		role: {
			type: String,
			enum: ['investor', 'admin', 'project'], // Restrict to predefined roles
			required: true,
		},
		userAddress: {
			type: String, // Ethereum address
			default: null,
		},
	},
	{
		timestamps: true, // Automatically adds `createdAt` and `updatedAt`
	}
);

// Use Mongoose's models cache to avoid recompiling during hot-reloads
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
