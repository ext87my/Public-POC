import React from 'react';
import HomePage from './components/HomePage.js';

function App() {
  return (
    React.createElement('div', { className: "bg-slate-900 min-h-screen text-slate-100 font-sans" },
      React.createElement(HomePage, null)
    )
  );
}

export default App;
