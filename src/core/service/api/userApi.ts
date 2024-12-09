import axios from '../axios';

export type UserResponse = {
	_id: string;
	email: string;
	name: string;
	twitterId: string | null;
	nationality: string | null;
	telegramId: string | null;
	phoneNumber: {
		countryCode: string | null;
		number: number | null;
	};
	image: string;
	provider: string;
	providerId: string;
	isOAuthUser: boolean;
	role: string;
	createdAt: string;
	updatedAt: string;
	__v: 0;
	kycStatus: string;
};

export const getUserbyId = async (params: { id: string }) =>
	(await axios.get<UserResponse>('/api/user/details', { params })).data;

export const updateUserDetails = async (data: {
	id: string;
	nationality: string;
	phoneNumber: {
		countryCode: string;
		number: number;
	};
	telegramId: string;
	twitterId: string;
}) => (await axios.patch<UserResponse>('/api/user/details', { data })).data;
