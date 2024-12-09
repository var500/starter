import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const AdminAuthLayout = ({ children }: { children: ReactNode }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		const publicRoutes = ['/admin/login', '/admin'];
		// Redirect to login if not authenticated and on a protected route

		if (status === 'unauthenticated' && !publicRoutes.includes(router.pathname)) {
			router.push('/admin/login');
		}

		if (status === 'authenticated' && session?.user.role !== 'admin') {
			router.push('/admin/login');
		}
	}, [status, router, session?.user.role]);

	if (status === 'authenticated' && session?.user.role === 'admin') {
		return <div>{children}</div>;
	}

	return null;
};

export default AdminAuthLayout;
