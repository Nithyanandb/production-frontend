import React from 'react';
import { toast } from 'react-hot-toast';
import Header from '../Header/Header';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    toast.error('Something went wrong. Please try again.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex p-8 flex-col items-center justify-center min-h-screen bg-[#f5f5f7]">
          <Header />
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Something Went Wrong</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[#0071e3] text-white rounded-full text-lg hover:bg-[#0066cc] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;