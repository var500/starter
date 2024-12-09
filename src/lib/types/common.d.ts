// Define allowed roles
export type Role = 'investor' | 'admin' | 'project';

// Define allowed KYC statuses
export type KycStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

// Define PhoneNumber structure
export type PhoneNumber = {
	countryCode: string; // Country code, e.g., "+1"
	number: string; // Phone number without the country code
};
