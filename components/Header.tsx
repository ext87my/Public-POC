
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="relative py-6 px-4 sm:px-6 lg:px-8 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
        <Link 
          to="/"
          className="bg-cyan-500 text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900 rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200"
        >
          Home
        </Link>
      </div>
    </header>
  );
};

export default Header;
