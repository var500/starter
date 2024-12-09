import axios from '../axios';

type SubscriptionResponse = {
	success: boolean;
	data: {
		_id: string;
		cost: number;
		projectCount: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const getAllSubscriptionPlans = async () =>
	(await axios.get<SubscriptionResponse>('/api/subscriptionPlan/all')).data;

export const addUserSubscriptionPlan = async () =>
	(await axios.get<{ success: boolean; message: string }>('/api/subscriptionPlan/user')).data;
