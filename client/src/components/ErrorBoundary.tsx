import React, { ErrorInfo, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    PropsWithChildren<{}>,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error('ErrorBoundary caught an error', error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <h2>
                    There was an error with this listing.{' '}
                    <Link to="/">Click here</Link> to go back to the home page.
                </h2>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
