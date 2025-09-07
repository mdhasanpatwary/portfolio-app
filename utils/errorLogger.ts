/**
 * Error handling utilities for production-ready error logging
 */

type ErrorLevel = 'error' | 'warn' | 'info' | 'debug';

interface ErrorContext {
  component?: string;
  action?: string | undefined;
  userId?: string;
  metadata?: Record<string, unknown> | undefined;
}

class ErrorLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  /**
   * Log error with context information
   */
  log(error: Error | string, level: ErrorLevel = 'error', context?: ErrorContext): void {
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;

    const logData = {
      timestamp,
      level,
      message: errorMessage,
      stack,
      context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    };

    // In development, log to console
    if (this.isDevelopment) {
      switch (level) {
        case 'error':
          console.error('🚨 Error:', logData);
          break;
        case 'warn':
          console.warn('⚠️ Warning:', logData);
          break;
        case 'info':
          console.info('ℹ️ Info:', logData);
          break;
        case 'debug':
          console.debug('🐛 Debug:', logData);
          break;
      }
    }

    // In production, you would typically send to an error reporting service
    if (this.isProduction && level === 'error') {
      this.sendToErrorService(logData);
    }
  }

  /**
   * Log API errors with additional context
   */
  logApiError(error: Error | string, endpoint: string, method: string, statusCode?: number): void {
    this.log(error, 'error', {
      component: 'API',
      action: `${method} ${endpoint}`,
      metadata: { statusCode },
    });
  }

  /**
   * Log component errors
   */
  logComponentError(error: Error | string, componentName: string, action?: string): void {
    this.log(error, 'error', {
      component: componentName,
      action: action || undefined,
    });
  }

  /**
   * Log user action errors
   */
  logUserError(error: Error | string, action: string, metadata?: Record<string, unknown>): void {
    this.log(error, 'error', {
      component: 'User Action',
      action,
      metadata: metadata || undefined,
    });
  }

  /**
   * Send error data to external error reporting service
   * This is where you would integrate with services like:
   * - Sentry
   * - LogRocket
   * - Bugsnag
   * - DataDog
   * - Custom logging endpoint
   */
  private sendToErrorService(logData: Record<string, unknown>): void {
    // Example implementation for a custom error endpoint
    try {
      // Uncomment and configure for your error reporting service
      
      // For Sentry:
      // import * as Sentry from '@sentry/nextjs';
      // Sentry.captureException(logData);
      
      // For custom endpoint:
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logData),
      // }).catch(() => {
      //   // Silently fail if error reporting fails
      // });
      
      // For now, we'll store in localStorage as a fallback
      if (typeof window !== 'undefined') {
        const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
        errors.push(logData);
        // Keep only last 50 errors
        if (errors.length > 50) {
          errors.splice(0, errors.length - 50);
        }
        localStorage.setItem('error_logs', JSON.stringify(errors));
      }
    } catch {
      // Silently fail if error reporting fails
      // We don't want error reporting to break the app
    }
  }

  /**
   * Get stored error logs (useful for debugging)
   */
  getStoredErrors(): Record<string, unknown>[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('error_logs') || '[]');
    } catch {
      return [];
    }
  }

  /**
   * Clear stored error logs
   */
  clearStoredErrors(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('error_logs');
    }
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

// Helper functions for common error scenarios
export const logError = (error: Error | string, context?: ErrorContext) => {
  errorLogger.log(error, 'error', context);
};

export const logWarning = (message: string, context?: ErrorContext) => {
  errorLogger.log(message, 'warn', context);
};

export const logInfo = (message: string, context?: ErrorContext) => {
  errorLogger.log(message, 'info', context);
};

export const logApiError = (error: Error | string, endpoint: string, method: string, statusCode?: number) => {
  errorLogger.logApiError(error, endpoint, method, statusCode);
};

export const logComponentError = (error: Error | string, componentName: string, action?: string) => {
  errorLogger.logComponentError(error, componentName, action);
};

export const logUserError = (error: Error | string, action: string, metadata?: Record<string, unknown>) => {
  errorLogger.logUserError(error, action, metadata);
};

// Error boundary helper
export const handleErrorBoundary = (error: Error, errorInfo: React.ErrorInfo, componentName: string) => {
  errorLogger.log(error, 'error', {
    component: componentName,
    action: 'Component Error Boundary',
    metadata: {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    },
  });
};