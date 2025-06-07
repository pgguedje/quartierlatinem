import React from 'react';

const SectionDivider = () => {
  return (
    <div className="h-1 bg-gradient-to-r from-amber-200 via-orange-300 to-red-200 dark:from-amber-700 dark:via-orange-600 dark:to-red-700">
      <div className="h-full bg-gradient-to-r from-transparent via-amber-100/50 to-transparent dark:via-amber-800/50"></div>
    </div>
  );
};

export default SectionDivider;