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
                <div className="fixed top-0 left-0 w-full h-full px-5 py-2.5 flex-col justify-start items-start gap-2.5 inline-flex bg-white z-20">
                    <div className="text-black text-xl font-bold font-['Lemonada']">
                        LaughTale
                    </div>
                    <div className="self-stretch h-[1046.51px] flex-col justify-center items-center gap-2.5 flex">
                        <h2 className="text-black text-3xl font-bold font-['Lemonada']">
                            There was an error with this listing.{' '}
                            <Link className="text-blue-900" to="/">
                                Click here
                            </Link>{' '}
                            to go back to the home page.
                        </h2>
                        ;
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
