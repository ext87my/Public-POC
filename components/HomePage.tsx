import React, { useState, useEffect } from 'react';
import { generateBannerImage, generateDirectionsImage, generateAgenda, generateDressCode } from '../services/geminiService.js';
import LoadingSpinner from './LoadingSpinner.js';
import EventDetailsModal from './EventDetailsModal.js';

// Generic Modal for other sections
const InfoModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        React.createElement('div', { 
            className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in",
            onClick: onClose
        },
            React.createElement('div', { 
                className: "bg-slate-800 rounded-lg shadow-2xl max-w-3xl w-full border border-slate-700 max-h-[90vh] flex flex-col",
                onClick: (e) => e.stopPropagation()
            },
                React.createElement('div', { className: "flex justify-between items-center p-4 border-b border-slate-700 sticky top-0 bg-slate-800" },
                    React.createElement('h2', { className: "text-2xl font-bold text-cyan-400" }, title),
                    React.createElement('button', { onClick: onClose, className: "text-slate-400 hover:text-white text-3xl font-light" }, "×")
                ),
                React.createElement('div', { className: "p-6 overflow-y-auto" },
                    children
                )
            )
        )
    );
};

// Content Components for Modals
const VenueContent = () => {
    const [directionsImageUrl, setDirectionsImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            setIsLoading(true);
            const url = await generateDirectionsImage();
            setDirectionsImageUrl(url);
            setIsLoading(false);
        };
        fetchImage();
    }, []);

    return (
        React.createElement('div', { className: "space-y-8" },
            React.createElement('div', null,
                React.createElement('h2', { className: "text-2xl font-bold text-cyan-400 mb-4" }, "Location: Merdeka 118"),
                React.createElement('div', { className: "aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-slate-700" },
                    React.createElement('iframe', {
                        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.821327178303!2d101.6960113153443!3d3.141511997711466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c417277869%3A0x1d3f66826629a58c!2sMerdeka%20118!5e0!3m2!1sen!2smy!4v1678886478910!5m2!1sen!2smy",
                        width: "100%",
                        height: "450",
                        style: { border: 0 },
                        allowFullScreen: true,
                        loading: "lazy",
                        referrerPolicy: "no-referrer-when-downgrade"
                    })
                )
            ),
            React.createElement('div', null,
                React.createElement('h2', { className: "text-2xl font-bold text-cyan-400 mb-4" }, "Public Transport Guide"),
                React.createElement('div', { className: "flex justify-center items-center min-h-[200px]" },
                    isLoading ? React.createElement(LoadingSpinner, { text: "Generating transport guide..." }) : React.createElement('img', { src: directionsImageUrl, alt: "Public transport directions", className: "rounded-lg max-w-full h-auto" })
                )
            )
        )
    );
};

const AgendaContent = () => {
    const [agenda, setAgenda] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAgenda = async () => {
            setIsLoading(true);
            const data = await generateAgenda();
            setAgenda(data);
            setIsLoading(false);
        };
        fetchAgenda();
    }, []);

    if (isLoading) return React.createElement('div', { className: "flex justify-center items-center py-20" }, React.createElement(LoadingSpinner, { text: "Planning the fun..." }));
    
    return (
        React.createElement('ul', { className: "space-y-6" },
            agenda.map((item, index) => (
                React.createElement('li', { key: index, className: "flex flex-col md:flex-row gap-4 border-l-4 border-cyan-500 pl-4 py-2" },
                    React.createElement('div', { className: "md:w-1/4" }, React.createElement('p', { className: "font-bold text-lg text-cyan-400" }, item.time)),
                    React.createElement('div', { className: "md:w-3/4" },
                        React.createElement('h3', { className: "font-semibold text-xl text-slate-100" }, item.activity),
                        React.createElement('p', { className: "text-slate-300 mt-1" }, item.description)
                    )
                )
            ))
        )
    );
};

const DressCodeContent = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDressCode = async () => {
            setIsLoading(true);
            const data = await generateDressCode();
            setSuggestions(data);
            setIsLoading(false);
        };
        fetchDressCode();
    }, []);

    if (isLoading) return React.createElement('div', { className: "flex justify-center items-center py-20" }, React.createElement(LoadingSpinner, { text: "Styling your look..." }));

    return (
        React.createElement('div', { className: "text-center" },
            React.createElement('p', { className: "text-xl text-slate-300 mb-2" }, "Theme: ", React.createElement('span', { className: "font-bold text-cyan-400" }, "Fun Party Time!")),
            React.createElement('p', { className: "text-lg text-slate-400 mb-8" }, "Smart casual with a festive twist. Be creative and comfortable!"),
            React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
                suggestions.map((suggestion, index) => (
                    React.createElement('div', { key: index, className: "bg-slate-700/50 p-6 rounded-lg" },
                        React.createElement('h3', { className: "text-2xl font-bold text-cyan-400 mb-4" }, suggestion.category),
                        React.createElement('ul', { className: "space-y-2 text-left list-disc list-inside text-slate-300" },
                            suggestion.items.map((item, i) => React.createElement('li', { key: i }, item))
                        )
                    )
                ))
            )
        )
    );
};

const EmergencyContent = () => (
    React.createElement('div', { className: "text-center" },
        React.createElement('div', { className: "flex flex-col items-center justify-center" },
            React.createElement('div', { className: "text-6xl mb-4" }, "🚨"),
            React.createElement('h2', { className: "text-2xl font-bold text-slate-300 mb-2" }, "In case of emergency, please contact:"),
            React.createElement('p', { className: "text-5xl font-extrabold text-cyan-400 tracking-widest" }, "999"),
            React.createElement('p', { className: "text-slate-400 mt-4" }, "Stay calm and follow the instructions of the event staff.")
        )
    )
);

const HomePage = () => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      setIsLoading(true);
      const url = await generateBannerImage();
      setBannerUrl(url);
      setIsLoading(false);
    };
    fetchBanner();
  }, []);

  const navItems = [
    { text: "Venue Direction", modalId: "venue", icon: "🗺️" },
    { text: "Event Agenda", modalId: "agenda", icon: "🗓️" },
    { text: "Dress Code Guide", modalId: "dress-code", icon: "👔" },
    { text: "Emergency Contacts", modalId: "emergency", icon: "📞" },
  ];
  
  const modalContent = {
    'venue': { title: 'Venue & Directions', content: React.createElement(VenueContent, null) },
    'agenda': { title: 'Event Agenda', content: React.createElement(AgendaContent, null) },
    'dress-code': { title: 'Dress Code Guide', content: React.createElement(DressCodeContent, null) },
    'emergency': { title: 'Emergency Contacts', content: React.createElement(EmergencyContent, null) },
  };

  return (
    React.createElement('div', { className: "min-h-screen bg-slate-900" },
      React.createElement('header', { className: "relative h-96 flex items-center justify-center overflow-hidden" },
        isLoading ? (
          React.createElement('div', { className: "w-full h-full flex items-center justify-center bg-slate-800" },
            React.createElement(LoadingSpinner, { text: "Creating a fun banner..." })
          )
        ) : (
          React.createElement('img', { src: bannerUrl, alt: "Fun Party Time!", className: "w-full h-full object-cover" })
        ),
        React.createElement('div', { className: "absolute inset-0 bg-black bg-opacity-40" }),
        React.createElement('h1', { className: "absolute text-5xl md:text-7xl font-extrabold text-white tracking-wider text-center", style:{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'} },
          "FUN PARTY TIME!"
        )
      ),
      React.createElement('main', { className: "container mx-auto px-4 py-12 -mt-20 relative z-10" },
        React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
          React.createElement('button', {
            onClick: () => setActiveModal('details'),
            className: "col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8 rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300 text-left"
          },
            React.createElement('div', { className: "flex items-center" },
              React.createElement('span', { className: "text-5xl mr-4" }, "🎉"),
              React.createElement('div', null,
                React.createElement('h2', { className: "text-3xl font-bold" }, "Event Details"),
                React.createElement('p', { className: "text-blue-100 mt-1" }, "1-Jan 2026, 6pm Registration, KL Merdeka Tower")
              )
            )
          ),
          navItems.map((item) => (
            React.createElement('button', {
              key: item.modalId,
              onClick: () => setActiveModal(item.modalId),
              className: "bg-slate-800 p-6 rounded-xl shadow-lg hover:bg-slate-700 hover:shadow-slate-600/30 transform hover:-translate-y-1 transition-all duration-300 text-left"
            },
              React.createElement('div', { className: "flex items-center" },
                React.createElement('span', { className: "text-4xl mr-4" }, item.icon),
                React.createElement('div', null,
                  React.createElement('h2', { className: "text-xl font-bold text-slate-100" }, item.text)
                )
              )
            )
          ))
        )
      ),
      React.createElement(EventDetailsModal, { isOpen: activeModal === 'details', onClose: () => setActiveModal(null) }),
      activeModal && modalContent[activeModal] && (
         React.createElement(InfoModal, { 
            isOpen: true, 
            onClose: () => setActiveModal(null), 
            title: modalContent[activeModal].title
          },
            modalContent[activeModal].content
         )
      )
    )
  );
};

export default HomePage;