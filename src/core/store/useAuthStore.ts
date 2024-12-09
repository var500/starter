/* eslint-disable no-console */
import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { AuthSliceType } from './types/auth';
import { zustandSessionStorage } from './engine';
import { AuthSlice } from './slices';

const useAuthStore = create<AuthSliceType>()(
	subscribeWithSelector(
		devtools(
			persist(
				immer((...a) => ({
					...AuthSlice(...a),
				})),
				{
					name: 'auth',
					getStorage: () => zustandSessionStorage,
					merge: (persistedState, currentState) =>
						mergeDeepLeft(persistedState as Object, currentState),
					onRehydrateStorage: () => {
						return (state, error: Error | undefined) => {
							if (error) {
								console.error(error.message);
							} else {
								if (!state?._hydrated) state?.setHydration();
							}
						};
					},
					partialize: (state) => ({
						token: state.token,
						permissions: state.permissions,
						_hydrated: state._hydrated,
						sidebarData: state.sidebarData,
					}),
				}
			)
		)
	)
);

export default useAuthStore;
