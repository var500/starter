import multer from 'multer';

// Configure multer for file uploads
export const multerInstance = multer({
	storage: multer.memoryStorage(), // Store files in memory for further processing
	limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit
});
