import React from 'react';

const LoadingSpinner = ({ text = "Generating..." }) => {
  return (
    React.createElement('div', { className: "flex flex-col items-center justify-center space-y-4 p-8 bg-gray-100/50 rounded-lg" },
      React.createElement('div', { className: "w-12 h-12 border-4 border-dashed rounded-full animate-spin border-cyan-500" }),
      React.createElement('p', { className: "text-cyan-600 text-lg font-medium" }, text)
    )
  );
};

export default LoadingSpinner;