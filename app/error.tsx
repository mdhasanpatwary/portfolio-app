'use client';

import { useEffect } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import Btn from '@/components/global/Btn';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Next.js caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-6">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
        </div>

        <div className="space-y-4">
          <Btn
            variant="primary"
            className="w-full"
            onClick={() => reset()}
          >
            <FaRedo className="text-sm" />
            Try Again
          </Btn>

          <Btn
            variant="secondary"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Btn>
        </div>
      </div>
    </div>
  );
}
