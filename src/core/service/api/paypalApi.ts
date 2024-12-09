import axios from '../axios';

export const createorder = async (data: { user_id: string; order_price: number }) =>
	(
		await axios.post<{
			status: string;
			data: {
				order: {
					orderID: string;
					userID: string;
					amount: number;
					status: string;
					createdAt: Date;
				};
			};
		}>(`/api/kyc/upload`, data)
	)?.data;

export const captureOrder = async (data: { orderID: string }) =>
	(await axios.post<{ message: string }>(`/api/paypal/captureorder`, data))?.data;
