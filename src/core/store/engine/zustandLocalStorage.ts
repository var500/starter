import type { StateStorage } from 'zustand/middleware';

import { encryptStorageGetItem, encryptStorageRemoveItem, encryptStorageSetItem } from './helper';

const zustandLocalStorage: StateStorage = {
	setItem: (name, value) => {
		return encryptStorageSetItem(name, value, 'localStorage');
	},
	getItem: (name) => {
		return encryptStorageGetItem(name, 'localStorage');
	},
	removeItem: (name) => {
		encryptStorageRemoveItem(name, 'localStorage');
	},
};

export default zustandLocalStorage;
