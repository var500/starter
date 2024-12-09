import type { AxiosHeaders, RawAxiosRequestHeaders } from 'axios';

import { useAuthStore } from '@/core/store';

export function getHeaders(): RawAxiosRequestHeaders | AxiosHeaders {
	try {
		const token = useAuthStore.getState().token;

		if (!token) {
			throw new Error('');
		}

		return {
			'x-auth-token': token,
		};
	} catch {
		return {
			Authorization: `Bearer `,
		};
	}
}
