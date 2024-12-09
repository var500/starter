import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';

import { getSaltRounds } from '@/utils/env';

/**
 * Hashes a password with a generated salt.
 * @returns {Object} salt and hash
 */
export const hashPassword = async (password: string): Promise<{ salt: string; hash: string }> => {
	const saltRoundsString: string = getSaltRounds();
	const saltRounds: number = Number(saltRoundsString);
	const salt = genSaltSync(saltRounds);
	const hash = hashSync(password, salt);

	return { salt, hash };
};

/**
 * Compares a plain text password with a hashed password.
 * @returns {boolean} true if password match, false otherwise
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
	return compareSync(password, hash);
};
