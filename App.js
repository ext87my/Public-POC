import React from 'react';
import HomePage from './components/HomePage.js';

function App() {
  return (
    React.createElement('div', { className: "bg-white min-h-screen text-slate-800 font-sans" },
      React.createElement(HomePage, null)
    )
  );
}

export default App;