import type { StateCreator } from 'zustand';

import {} from '../engine/helper';
import type { AuthSliceType, UserDataSliceType } from '../types/auth';

export const initialAuthSliceState: UserDataSliceType = {
	token: undefined,
	permissions: {
		read: [],
		write: [],
	},
};

const AuthSlice: StateCreator<
	AuthSliceType,
	[['zustand/persist', unknown]],
	[['zustand/immer', unknown]],
	AuthSliceType
> = (set, get) => ({
	...initialAuthSliceState,
	setHydration: () => {
		set(() => {
			// const savedUser = getXAuthUser();

			// if (savedUser.token && savedUser.permissions) {
			// 	clearLocalStoreUser();

			// 	return { ...savedUser, _hydrated: true };
			// }
			// const previousUser = getLocalStoreUser();
			// if (previousUser.token && previousUser.permissions) {
			// 	clearLocalStoreUser();

			// 	return { ...previousUser, _hydrated: true };
			// }

			return {
				_hydrated: true,
			};
		});
	},

	setUser: () => {},

	getPermission: () => {
		return {
			read: false,
			write: false,
		};
	},
	login: async () => {
		return {
			success: false,
			message: '',
		};
	},
	isLoggedIn: () => {
		return true;
	},

	isReady: () => {
		return true;
	},
	isReadyAndLoggedIn: () => {
		return false;
	},
	getSideBar: () => {
		const { sidebarData: sidebarUrl } = get();
		if (!sidebarUrl) {
			return {
				opened: true,
				type: 'main',
				links: [],
				lists: [],
			};
		}

		return sidebarUrl;
	},
	logOut: () => {
		set(() => {
			return {
				token: undefined,
				permissions: undefined,
				sidebarData: undefined,
			};
		});
	},
});

export default AuthSlice;
