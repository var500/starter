// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	message?: string;
	data?: unknown;
	error?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const method = req.method || 'UNKNOWN'; // Handle undefined req.method

		switch (method) {
			case 'GET':
				// Handle GET request
				res.status(200).json({
					message: 'GET request successful',
					data: { name: 'John Doe' },
				});
				break;

			case 'POST':
				// Handle POST request
				const { name } = req.body;
				if (!name) {
					return res.status(400).json({ error: 'Name is required' });
				}
				res.status(201).json({ message: 'POST request successful', data: { name } });
				break;

			default:
				res.setHeader('Allow', ['GET', 'POST']);
				res.status(405).json({ error: `Method ${method} not allowed` });
				break;
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
