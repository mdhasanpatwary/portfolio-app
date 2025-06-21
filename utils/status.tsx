import React from "react";
import { FaCode, FaRocket, FaLightbulb } from "react-icons/fa";

export const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case "live":
      return <FaRocket className="text-green-600 dark:text-green-400" />;
    case "development":
      return <FaCode className="text-blue-600 dark:text-blue-400" />;
    case "concept":
      return <FaLightbulb className="text-yellow-600 dark:text-yellow-400" />;
    default:
      return <FaCode className="text-gray-600 dark:text-gray-400" />;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "live":
      return "bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-400";
    case "development":
      return "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-400";
    case "concept":
      return "bg-yellow-100 border-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-700/50 dark:text-yellow-400";
    default:
      return "bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-600/50 dark:text-gray-300";
  }
};
