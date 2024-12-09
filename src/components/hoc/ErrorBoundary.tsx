/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from 'react';

class ErrorBoundary extends Component<
	{ fallback?: React.ReactNode; children: React.ReactNode },
	{
		hasError?: boolean;
		error?: Error;
	}
> {
	constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false, error: undefined };
	}
	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI

		return { hasError: true };
	}
	componentDidCatch(error: Error, errorInfo: unknown) {
		// You can use your own error logging service here
		this.setState({ ...this.state, error });
	}
	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			if (this.props.fallback) return this.props.fallback;

			return (
				<>
					<h4>Oops, there is an error!</h4>
					<p>{this.state.error?.message}</p>
				</>
			);
		}

		// Return children components in case of no error

		return this.props.children;
	}
}

export default ErrorBoundary;
