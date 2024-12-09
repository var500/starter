type HeaderLinkType = {
	hasTitle?: boolean;
	links: unknown;
	opened?: boolean;
	headerTitle?: unknown;
};

export type SidebarUrlsType = {
	opened: true;
	type: 'main' | 'sub';
	links: unknown;
	lists: HeaderLinkType[];
};

export type UserDataSliceType = {
	_hydrated?: boolean;
	token?: string;
	permissions?: Record<'read' | 'write', unknown>;
	sidebarData?: SidebarUrlsType;
	role?: string;
};

export type LoginUserResponseType = UserDataSliceType & {
	username?: string;
	permissionConfig?: unknown;
};

type respose = {
	message: string;
	success: boolean;
};

type AuthSliceActions = {
	setUser: (user: LoginUserResponseType & { checked: boolean }) => void;
	setHydration: () => void;
	getPermission: (page: unknown) => Record<'read' | 'write', boolean>;
	login: (data: AuthLoginParamsType & { checked: boolean }) => Promise<respose>;
	isLoggedIn: () => boolean;
	isReady: () => boolean;
	isReadyAndLoggedIn: () => boolean;
	getSideBar: () => SidebarUrlsType;
	logOut: () => void;
};

export type AuthSliceType = UserDataSliceType & AuthSliceActions;

export type AuthLoginParamsType = Record<'email' | 'password', string>;

export type AuthLoginResponseType = {
	data: respose & {
		data?: LoginUserResponseType;
	};
};

export interface PreviousLocalStorageUser {
	success: boolean;
	message: string;
	data: PreviousLocalStorageUserData;
}

export interface PreviousLocalStorageUserData {
	firstName: string;
	lastName: string;
	token: string;
	_id: string;
	permissionConfig?: unknown;
	role: string;
	permissions?: Record<'read' | 'write', unknown>;
}
