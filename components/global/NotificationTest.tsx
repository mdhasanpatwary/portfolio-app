"use client";

import { useState } from "react";
import { sendNotification } from "@/app/actions";

export default function NotificationTest() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendNotification = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const result = await sendNotification(message);
      if (result.success) {
        alert("Notification sent successfully!");
        setMessage("");
      } else {
        alert("Failed to send notification: " + result.error);
      }
    } catch (error) {
      alert("Error sending notification: " + error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 max-w-sm">
        <h3 className="text-sm font-semibold mb-2">
          Test Portfolio Notifications
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          MD Hasan Patwary - Front-End Developer
        </p>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter notification message"
          className="w-full text-xs p-2 border border-gray-300 dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSendNotification}
          disabled={isSending || !message.trim()}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white text-xs px-3 py-1 rounded transition-colors">
          {isSending ? "Sending..." : "Send Test Notification"}
        </button>
      </div>
    </div>
  );
}
