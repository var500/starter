/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: (req: Request, res: Response, next: NextFunction) => void
): Promise<void> {
	return new Promise((resolve, reject) => {
		fn(req as unknown as Request, res as unknown as Response, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}
