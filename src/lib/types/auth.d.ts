import type { PhoneNumber, Role } from '@/lib/types/common';

// Define allowed authentication methods
export type AuthMethod = 'password' | 'oauth';

// Define the type for the provider object
export interface Provider {
	providerName: string;
	providerId: string;
}

// Define the shape of the request body for login
export interface LoginRequestBody {
	email: string;
	password?: string; // Optional for OAuth
	provider?: Provider; // Required for OAuth
	method: AuthMethod;
	role: Role;
}

// Define the shape of the request body for registration
export interface RegistrationRequestBody {
	name: string;
	email: string;
	password?: string; // Optional for OAuth
	provider?: Provider; // Required for OAuth
	method: AuthMethod;
	role: Role;
	twitterId?: string;
	nationality?: string;
	phoneNumber?: PhoneNumber;
	telegramId?: string;
}

// Define the request body for setting a password
export interface SetPasswordRequestBody {
	email: string;
	password: string;
}

export interface JwtPayload {
	id: string;
	role: string;
}
