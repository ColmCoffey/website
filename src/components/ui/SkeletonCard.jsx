import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="border rounded-lg shadow-sm animate-pulse">
      <div className="p-6">
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      </div>
      <div className="p-6 pt-0">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2 mt-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard; 