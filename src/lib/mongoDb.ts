import mongoose from 'mongoose';

import { getMongoDbUrl } from '@/utils/env';

const MONGODB_URL = getMongoDbUrl();

if (!MONGODB_URL) {
	throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Extend global to include mongoose
interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	var mongoose: MongooseCache | undefined;
}

export default async function dbConnect() {
	global.mongoose = global.mongoose || { conn: null, promise: null };
	if (global?.mongoose?.conn) {
		console.log('Using existing database connection');

		return global.mongoose.conn;
	}

	if (!global?.mongoose?.promise) {
		try {
			console.log('Creating new database connection');
			global.mongoose.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
				console.log('Database connected');

				return mongoose;
			});
		} catch (error) {
			console.error('Database connection error:', error);
			throw error;
		}
	}

	global.mongoose.conn = await global.mongoose.promise;

	return global.mongoose.conn;
}
