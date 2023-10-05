// import React, { Component } from 'react';

// interface ErrorBoundaryProps {
//     children: React.ReactNode;
// }

// interface ErrorBoundaryState {
//     error: Error | null;
// }

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//     state = {
//         error: null
//     };

//     static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//         return { error };
//     }

//     componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//         console.log(error, errorInfo);
//     }

//     render(): React.ReactNode {
//         if (this.state.error) {
//             return <div>An error occurred: {this.state.error.message}</div>;
//         }

//         return this.props.children;
//     }
// }

// export default ErrorBoundary;
