/* eslint-disable no-console */
import type { AxiosError, Canceler } from 'axios';
import axiosRequest from 'axios';
import isEmpty from 'lodash/isEmpty';

import { getHeaders } from './headers';
import { isAuthURL, isRegisteredURL } from './verify';

import { BASEURL } from '@/core/constants/common/urls';

export const CancelToken = axiosRequest.CancelToken;

export let cancel: Canceler = () => {};

function apiRequest() {
	const axiosClient = axiosRequest.create({
		baseURL: BASEURL,
		headers: {
			Accept: 'application/json',
			'content-type': 'application/json',
		},
	});

	axiosClient.interceptors.request.use(
		async function (request) {
			const url = request.url;

			if (!isRegisteredURL(url)) {
				throw new Error('Url not registered');
			}

			if (!isAuthURL(url)) {
				const headers = getHeaders();

				if (isEmpty(headers)) {
					throw new Error("Token doesn't exist");
				}

				request.headers = {
					...headers,
				};
				request.cancelToken = new CancelToken((c) => {
					cancel = c;
				});
			}

			return request;
		},
		async function (error: AxiosError) {
			console.error(error);

			if (axiosRequest.isCancel(error)) {
				console.error(error.message);
			} else {
				console.error(JSON.stringify(error, null, 4));

				return Promise.reject(error);
			}
		}
	);
	axiosClient.interceptors.response.use(
		async function (response) {
			return response;
		},
		async function (error: AxiosError) {
			console.error(error);

			// if (error.response?.status === 401) {
			// 	toast.error(error.message);

			// 	return;
			// }
			// if (error.response?.status === 400) {
			// 	toast.error(error.message);

			// 	return;
			// }
			console.error(error.message);

			return Promise.reject(error as Error);
		}
	);
	cancel('Request canceled.');

	return axiosClient;
}

const axios = apiRequest();

export const isAxiosError = (payload: unknown) => axiosRequest.isAxiosError(payload);

export default axios;
