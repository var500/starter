import CryptoJS from 'crypto-js';

const STORAGE_NAMES = ['localStorage', 'sessionStorage'] as const;

type STORAGE_TYPE = (typeof STORAGE_NAMES)[number];

export const encryptData = (message: string, salt: string) =>
	CryptoJS.AES.encrypt(message, salt).toString();

export const decryptData = (ciphertext: string, salt: string) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
	try {
		return bytes.toString(CryptoJS.enc.Utf8);
	} catch (err) {
		return undefined;
	}
};

export const encryptStorageSetItem = (
	name: string,
	value: string,
	storageType: STORAGE_TYPE
): void => {
	try {
		const salt = process.env.REACT_APP_Token || '';
		const encryptMessage = encryptData(value, salt);
		window[storageType].setItem(name, encryptMessage);
	} catch {
		// console.error('error while encrypt the data');
	}
};

export const encryptStorageGetItem = (name: string, storageType: STORAGE_TYPE): string => {
	try {
		const salt = process.env.REACT_APP_Token || '';
		const message = window[storageType].getItem(name) || '';

		return decryptData(message, salt) || '';
	} catch {
		// console.error('error while decrypt the data');

		return '';
	}
};

export const encryptStorageRemoveItem = (name: string, storageType: STORAGE_TYPE): void => {
	try {
		window[storageType].removeItem(name);
	} catch {
		// console.error('error while removing the data');
	}
};
