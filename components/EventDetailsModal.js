import React from 'react';

const EventDetailsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    React.createElement('div', { 
      className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300",
      onClick: onClose 
    },
      React.createElement('div', { 
        className: "bg-slate-800 rounded-lg shadow-2xl p-8 max-w-sm w-full mx-4 border border-slate-700 transform transition-all duration-300 scale-95 animate-fade-in",
        onClick: (e) => e.stopPropagation() 
      },
        React.createElement('h2', { className: "text-3xl font-bold text-cyan-400 mb-4" }, "Event Details"),
        React.createElement('div', { className: "space-y-3 text-lg text-slate-300" },
          React.createElement('p', null, React.createElement('span', { className: "font-semibold text-slate-100" }, "Date:"), " 1-Jan 2026"),
          React.createElement('p', null, React.createElement('span', { className: "font-semibold text-slate-100" }, "Time:"), " 6pm Registration"),
          React.createElement('p', null, React.createElement('span', { className: "font-semibold text-slate-100" }, "Venue:"), " KL Merdeka Tower")
        ),
        React.createElement('button', { 
          onClick: onClose,
          className: "mt-6 w-full bg-cyan-500 text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-800 rounded-md py-2 text-lg font-semibold transition-colors duration-200"
        }, "Close")
      )
    )
  );
};

export default EventDetailsModal;
