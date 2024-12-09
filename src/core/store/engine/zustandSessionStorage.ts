import type { StateStorage } from 'zustand/middleware';

import { encryptStorageGetItem, encryptStorageRemoveItem, encryptStorageSetItem } from './helper';

type BaseStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const zustandSessionStorage: StateStorage = {
	setItem: (name, value) => {
		return encryptStorageSetItem(name, value, 'sessionStorage');
	},
	getItem: (name) => {
		return encryptStorageGetItem(name, 'sessionStorage');
	},
	removeItem: (name) => {
		encryptStorageRemoveItem(name, 'sessionStorage');
	},
};

export const SessionBaseStorage: BaseStorage = {
	setItem: (name, value) => {
		return encryptStorageSetItem(name, value, 'sessionStorage');
	},
	getItem: (name) => {
		return encryptStorageGetItem(name, 'sessionStorage');
	},
	removeItem: (name) => {
		encryptStorageRemoveItem(name, 'sessionStorage');
	},
};
export default zustandSessionStorage;
