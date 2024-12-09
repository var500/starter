import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import UpdateInvestorInfoModal from '../Investor/modal/AdditionalDetails';

const InvestorAuthLayout = ({ children }: { children: ReactNode }) => {
	const { status } = useSession();
	const router = useRouter();
	const publicRoutes = ['/investor/login', '/investor'];
	// Redirect to login if not authenticated and on a protected route

	if (status === 'unauthenticated' && !publicRoutes.includes(router.pathname)) {
		router.push('/investor/login');
	}

	// if (status === 'authenticated' && publicRoutes.includes(router.pathname)) {
	// 	if (data.user.kycStatus === 'approved') {
	// 		router.push('/investor/tier');
	// 	}
	// 	router.push('/investor/kyc');
	// }

	return (
		<div>
			<UpdateInvestorInfoModal />
			{children}
		</div>
	);
};

export default InvestorAuthLayout;
