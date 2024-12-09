// import type { BACKEND_URLS_TYPE, TOKEN_URLS_TYPE } from '@/core/constants/urls/backend';
// import { BACKEND_URLS, TOKEN_URLS } from '@/core/constants/urls/backend';

import type { AUTH_URLS_TYPE, URLS_TYPE } from '@/core/constants/common/urls';
import { AUTH_URLS, URLS } from '@/core/constants/common/urls';

export const isRegisteredURL = (url?: string): url is URLS_TYPE => {
	return Object.values(URLS).includes(url as URLS_TYPE);
};

export const isAuthURL = (url: URLS_TYPE): url is AUTH_URLS_TYPE => {
	return Object.values(AUTH_URLS).includes(url as AUTH_URLS_TYPE);
};
