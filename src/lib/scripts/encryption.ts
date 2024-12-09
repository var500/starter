import crypto from 'crypto';

import { getEncryptionKey } from '@/utils/env';

const IV_LENGTH = 16; // Initialization vector length

const encryptionKeyHex = getEncryptionKey() ?? crypto.randomBytes(32).toString('hex');

const ENCRYPTION_KEY = Buffer.from(encryptionKeyHex, 'hex'); // Convert to Buffer

// Ensure the key is 32 bytes
if (ENCRYPTION_KEY.length !== 32) {
	throw new Error(
		`Encryption key length invalid: expected 32 bytes, got ${ENCRYPTION_KEY.length} bytes.`
	);
}

export function encrypt(buffer: Buffer): Buffer {
	const iv = crypto.randomBytes(IV_LENGTH); // Generate a random initialization vector
	const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
	const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

	return Buffer.concat([iv, encrypted]); // Prepend IV for decryption
}
