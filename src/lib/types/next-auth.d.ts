import type { DefaultJWT, DefaultSession, User as DefaultUser } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

import type { PhoneNumber, Role } from '@/lib/models';
import type { KycStatus } from '@/lib/types/common';

declare module 'next-auth' {
	interface User extends DefaultUser {
		id: string;
		email: string;
		isOAuthUser?: boolean;
		role: Role;
		name?: string;
		twitterId?: string;
		nationality?: string;
		phoneNumber?: PhoneNumber;
		telegramId?: string;
		image?: string;
		kycStatus?: KycStatus;
	}

	interface Session extends DefaultSession {
		user: {
			id: string;
			email: string;
			role: Role;
			kycStatus?: KycStatus;
			name?: string; // Optional for UI purposes
			image?: string; // Optional for displaying profile pictures
		} & DefaultSession['user'];
		accessToken: string;
	}

	interface JWT extends DefaultJWT {
		id: string;
		email: string;
		role: Role;
		kycStatus?: KycStatus;
	}
}
