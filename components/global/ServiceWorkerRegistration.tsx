"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const isDev = process.env.NODE_ENV === 'development' ||
                    window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';

      if (isDev) {
        // In development, just unregister service workers without clearing caches
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        });
        return;
      }

      // Register service worker for production offline caching
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {})
        .catch(() => {});
    }
  }, []);

  return null; // This component doesn't render anything
}
