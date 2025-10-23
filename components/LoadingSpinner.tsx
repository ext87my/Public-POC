
import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = "Generating..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-slate-800/50 rounded-lg">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      <p className="text-cyan-300 text-lg font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
