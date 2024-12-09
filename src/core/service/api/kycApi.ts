import axios from '../axios';

export type DocumentList = {
	documentType: string;
	s3Path: string;
	date: string;
};

export type kycDocumentListResponse = {
	userId: string;
	documents: DocumentList[];
	status: string;
	createdAt: string;
	updatedAt: string;
};

export const getKycDocumentsByUserId = async (params: { userId: string }) =>
	(await axios.get<kycDocumentListResponse>('/api/kyc/user/documents', { params })).data;

export const uploadDocuments = async (data: FormData) =>
	(await axios.post<{ message: string }>(`/api/kyc/upload`, data))?.data;
