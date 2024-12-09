import type { NextApiRequest } from 'next';
//import type { Express } from 'express';

export interface MulterRequest extends NextApiRequest {
	file?: Express.Multer.File; // Use the built-in Multer file type
	files?: Express.Multer.File[]; // Use the built-in Multer file type
}
