const envConfig = {
	nextauthSecret: process.env.NEXTAUTH_SECRET,
	googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
	githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
	githuibClientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
	appleClientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
	appleClientSecret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET,
	worldIdClientId: process.env.NEXT_PUBLIC_WORLDID_CLIENT_ID,
	worldIdClientSecret: process.env.NEXT_PUBLIC_WORLDID_CLIENT_SECRET,
	walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
	infuraProjectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
	mongoDbUrl: process.env.NEXT_PUBLIC_MONGODB_URL,
	baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
	saltRounds: process.env.SALT_ROUNDS,
	privateKey: process.env.PRIVATE_KEY,
	testnet: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
	encryptionKey: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
	awsAccessKeyId: process.env.AWS_ACCESS_KEY,
	awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
	awsRegion: process.env.AWS_REGION,
	awsBucketName: process.env.AWS_S3_BUCKET_NAME,
	paypalClient: process.env.PAYPAL_CLIENT_ID,
	paypalSecret: process.env.PAYPAL_CLIENT_SECRET,
};

function getEnvVar(key: keyof typeof envConfig, required: boolean = true): string {
	const value = envConfig[key];
	if (value === undefined && required) {
		throw new Error(`Environment variable ${key} is missing`);
	}

	return value ?? '';
}

/**
 * Get Nextauth Secret
 * @returns {string} Nextauth Secret
 */
export const getNextauthSecret = () => getEnvVar('nextauthSecret');

/**
 * Get Check for Public Testnet
 * @returns {boolean} tesnet
 */
export const getPublicTestnetCheck = () => getEnvVar('testnet');

/**
 * Get Google Provider configuration
 * @returns {Object} Configuration object with Google Provider keys
 */
export const getGoogleProviderConfig = () => {
	return {
		googleClientId: getEnvVar('googleClientId'),
		googleClientSecret: getEnvVar('googleClientSecret'),
	};
};

/**
 * Get Paypal Provider configuration
 * @returns {Object} Configuration object with Paypal Provider keys
 */
export const getPaypalProviderConfig = () => {
	return {
		paypalClientId: getEnvVar('paypalClient'),
		paypalClientSecret: getEnvVar('paypalSecret'),
	};
};

/**
 * Get Github Provider configuration
 * @returns {Object} Configuration object with Github Provider keys
 */
export const getGithubProviderConfig = () => {
	return {
		githubClientId: getEnvVar('githubClientId'),
		githubClientSecret: getEnvVar('githuibClientSecret'),
	};
};

/**
 * Get Apple Provider configuration
 * @returns {Object} Configuration object with Apple Provider keys
 */
export const getAppleProviderConfig = () => {
	return {
		appleClientId: getEnvVar('appleClientId'),
		appleClientSecret: getEnvVar('appleClientSecret'),
	};
};

/**
 * Get WorldId Provider configuration
 * @returns {Object} Configuration object with WorldId Provider keys
 */
export const getWorldIdProviderConfig = () => {
	return {
		worldIdClientId: getEnvVar('worldIdClientId'),
		worldIdClientSecret: getEnvVar('worldIdClientSecret'),
	};
};

/**
 * Get Wallet Connect Project ID
 * @returns {string} Wallet Connect Project ID
 */
export const getWalletConnectProjectId = () => getEnvVar('walletConnectProjectId');

/**
 * Get Infura Project ID
 * @returns {string} Infura Project ID
 */
export const getInfuraProjectId = () => getEnvVar('infuraProjectId');

/**
 * Get MongoDB URL
 * @returns {string} MongoDB Connection URL
 */
export const getMongoDbUrl = () => getEnvVar('mongoDbUrl');

/**
 * Get Base URL
 * @returns {string} Base URL
 */
export const getBaseUrl = () => getEnvVar('baseUrl');

/**
 * Get Salt Rounds
 * @returns {String} Salt Rounds for bcrypt
 */
export const getSaltRounds = () => getEnvVar('saltRounds');

/**
 * Get Private Key
 * @returns {String} Private Key
 */
export const getPrivateKey = () => getEnvVar('privateKey');

/**
 * Get Encryption key
 * @returns {string} Encryption key
 */
export const getEncryptionKey = () => getEnvVar('encryptionKey');

/**
 * Get Aws S3 configuration
 * @returns {Object} Configuration object with Aws S3 keys
 */
export const getAwsS3Config = () => {
	return {
		awsAccessKeyId: getEnvVar('awsAccessKeyId'),
		awsSecretAccessKey: getEnvVar('awsSecretAccessKey'),
		awsRegion: getEnvVar('awsRegion'),
		awsBucketName: getEnvVar('awsBucketName'),
	};
};
