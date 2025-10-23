
import React from 'react';
import Header from './Header';

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header title={title} />
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageWrapper;
