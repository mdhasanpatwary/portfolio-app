import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  lines = 1,
  height = 'h-4'
}) => {
  if (lines === 1) {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${height} ${className}`} />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${height} ${className}`}
        />
      ))}
    </div>
  );
};

export default Skeleton;