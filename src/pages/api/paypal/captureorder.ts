import paypal from '@paypal/checkout-server-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

import client from '@/utils/paypal';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(404).json({ success: false, message: 'Not Found' });
	}

	const { orderID } = req.body;

	if (!orderID) {
		return res.status(400).json({ success: false, message: 'Please Provide Order ID' });
	}

	try {
		// Capture the PayPal order to complete the payment
		const PaypalClient = client();
		const request = new paypal.orders.OrdersCaptureRequest(orderID);
		// request.requestBody({});

		const response = await PaypalClient.execute(request);

		if (!response || response.statusCode !== 201) {
			return res.status(500).json({
				success: false,
				message: 'Failed to capture PayPal order. Please try again later.',
			});
		}

		// Log the response for debugging
		console.log('PayPal Capture Response:', response);

		// Extract relevant details from the response
		const capturedDetails = response.result.purchase_units[0].payments.captures[0];
		const amount = capturedDetails.amount.value;
		const transactionID = capturedDetails.id;

		// Update order status in database
		// Example:
		const order = {
			orderID,
			transactionID,
			status: 'COMPLETED',
			capturedAmount: amount,
			updatedAt: new Date(),
		};

		// Your custom code here to update the wallet or database with the transaction details
		// Example: Save transaction details to DB, update user wallet balance, etc.

		const wallet = {
			balance: 150, // Example updated wallet balance
			currency: 'USD',
		};

		res.status(200).json({
			success: true,
			message: 'Order captured successfully.',
			data: { wallet, order },
		});

		// 		PayPal Capture Response: {
		//   statusCode: 201,
		//   headers: {
		//     'content-type': 'application/json',
		//     'content-length': '1566',
		//     connection: 'close',
		//     date: 'Thu, 05 Dec 2024 15:04:23 GMT',
		//     'access-control-expose-headers': 'Server-Timing',
		//     application_id: 'APP-80W284485P519543T',
		//     'cache-control': 'max-age=0, no-cache, no-store, must-revalidate',
		//     caller_acct_num: 'PE4U4LWL7WDYG',
		//     'paypal-debug-id': '4e526ff78af4e',
		//     'server-timing': 'traceparent;desc="00-00000000000000000004e526ff78af4e-60b1f83a9499b52c-01"',
		//     traceparent: '00-00000000000000000004e526ff78af4e-5699630302fc9ca5-01',
		//     vary: 'Accept-Encoding',
		//     http_x_pp_az_locator: 'ccg18.slc',
		//     'strict-transport-security': 'max-age=31536000; includeSubDomains'
		//   },
		//   result: {
		//     id: '0L035749101776446',
		//     status: 'COMPLETED',
		//     payment_source: { paypal: [Object] },
		//     purchase_units: [ [Object] ],
		//     payer: {
		//       name: [Object],
		//       email_address: 'varun.chodha@nonceblox.com',
		//       payer_id: '99WYG6MDRLEGW',
		//       address: [Object]
		//     },
		//     links: [ [Object] ]
		//   }
		// }
		// wait  - compiling /api/auth/[...nextauth] (client and server)...
		// event - compiled successfully in 49 ms (203 modules)
		// wait  - compiling /api/paypal/createorder (client and server)...
		// event - compiled successfully in 66 ms (203 modules)
		// undefined
		// wait  - compiling /api/paypal/captureorder (client and server)...
		// event - compiled successfully in 58 ms (190 modules)
		// PayPal Capture Response: {
		//   statusCode: 201,
		//   headers: {
		//     'content-type': 'application/json',
		//     'content-length': '1551',
		//     connection: 'close',
		//     date: 'Thu, 05 Dec 2024 15:08:20 GMT',
		//     'access-control-expose-headers': 'Server-Timing',
		//     application_id: 'APP-80W284485P519543T',
		//     'cache-control': 'max-age=0, no-cache, no-store, must-revalidate',
		//     caller_acct_num: 'PE4U4LWL7WDYG',
		//     'paypal-debug-id': '40db1cc94f25c',
		//     'server-timing': 'traceparent;desc="00-000000000000000000040db1cc94f25c-be2f49f38a54368e-01"',
		//     traceparent: '00-000000000000000000040db1cc94f25c-55ab66f6969d78cf-01',
		//     vary: 'Accept-Encoding',
		//     http_x_pp_az_locator: 'ccg18.slc',
		//     'strict-transport-security': 'max-age=31536000; includeSubDomains'
		//   },
		//   result: {
		//     id: '49366902UR657034H',
		//     status: 'COMPLETED',
		//     payment_source: { paypal: [Object] },
		//     purchase_units: [ [Object] ],
		//     payer: {
		//       name: [Object],
		//       email_address: 'varun.chodha@nonceblox.com',
		//       payer_id: '99WYG6MDRLEGW',
		//       address: [Object]
		//     },
		//     links: [ [Object] ]
		//   }
		// }
	} catch (error) {
		console.error('PayPal Capture Error:', error);

		return res.status(500).json({
			success: false,
			message: 'An error occurred while capturing the payment.',
		});
	}
}
