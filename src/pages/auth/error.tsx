import { useRouter } from 'next/router';

export default function ErrorPage() {
	const router = useRouter();
	const { error } = router.query;

	return (
		<div className="error-page">
			<h1>Error</h1>
			<p>{error}</p>
		</div>
	);
}
