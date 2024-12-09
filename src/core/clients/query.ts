import { QueryCache, QueryClient } from '@tanstack/react-query';

export const QUERY_CLIENT = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
	queryCache: new QueryCache({
		onError: (_error, query) => {
			// 🎉 only show error toasts if we already have data in the cache
			// which indicates a failed background update
			if (query.state.data !== undefined) {
				// eslint-disable-next-line no-console
				console.log(_error);
			}
		},
	}),
});
