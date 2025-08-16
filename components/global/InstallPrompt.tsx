"use client";

import { useEffect, useState } from "react";

// Type definition for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('hideInstallPrompt') === '1') {
      return; // user dismissed previously
    }
    const handler = (e: Event) => {
      e.preventDefault();
      const beforeInstallPromptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(beforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hideInstallPrompt', '1');
    }
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 max-w-[96%] sm:max-w-sm">
        <h3 className="text-sm font-semibold mb-2">Install Portfolio App</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          MD Hasan Patwary
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          Install this portfolio app for quick access to my projects, skills,
          and contact information.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="bg-primary-500 hover:bg-primary-600 text-white text-xs px-3 py-1 rounded transition-colors">
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs px-3 py-1 rounded transition-colors">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
