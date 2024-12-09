import axios from '../axios';

type tierResponse = {
	success: boolean;
	data: {
		_id: string;
		cost: number;
		allocationPercentage: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const getAllTiers = async () => (await axios.get<tierResponse>('/api/tier/all')).data;

export const addUserTier = async (body: {
	network: string;
	transactionHash: string;
	tierId: number;
	tierToken: string;
	lockedAmount: number;
	allocationPercentage: number;
	userId: string;
}) => (await axios.post<{ success: boolean; message: string }>('/api/tier/user', { body })).data;
