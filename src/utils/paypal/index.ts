import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

import { getPaypalProviderConfig } from '../env';

const configureEnvironment = function () {
	const { paypalClientId, paypalClientSecret } = getPaypalProviderConfig();

	// return process.env.NODE_ENV === 'production'
	// 	? new checkoutNodeJssdk.core.LiveEnvironment(paypalClientId, paypalClientSecret)
	// 	: new checkoutNodeJssdk.core.SandboxEnvironment(paypalClientId, paypalClientSecret);

	return new checkoutNodeJssdk.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
};

const client = function () {
	return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

export default client;
