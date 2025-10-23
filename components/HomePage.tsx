import React, { useState, useEffect } from 'react';
import { generateBannerImage, generateDirectionsImage, generateAgenda, generateDressCode } from '../services/geminiService';
import type { AgendaItem, DressCodeSuggestion } from '../types';
import LoadingSpinner from './LoadingSpinner';
import EventDetailsModal from './EventDetailsModal';

// Generic Modal for other sections
const InfoModal: React.FC<{isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode}> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl max-w-3xl w-full border border-slate-700 max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-700 sticky top-0 bg-slate-800">
                    <h2 className="text-2xl font-bold text-cyan-400">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl font-light">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Content Components for Modals
const VenueContent: React.FC = () => {
    const [directionsImageUrl, setDirectionsImageUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Location: Merdeka 118</h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-slate-700">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.821327178303!2d101.6960113153443!3d3.141511997711466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c417277869%3A0x1d3f66826629a58c!2sMerdeka%20118!5e0!3m2!1sen!2smy!4v1678886478910!5m2!1sen!2smy"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Public Transport Guide</h2>
                <div className="flex justify-center items-center min-h-[200px]">
                    {isLoading ? <LoadingSpinner text="Generating transport guide..." /> : <img src={directionsImageUrl} alt="Public transport directions" className="rounded-lg max-w-full h-auto" />}
                </div>
            </div>
        </div>
    );
};

const AgendaContent: React.FC = () => {
    const [agenda, setAgenda] = useState<AgendaItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAgenda = async () => {
            setIsLoading(true);
            const data = await generateAgenda();
            setAgenda(data);
            setIsLoading(false);
        };
        fetchAgenda();
    }, []);

    if (isLoading) return <div className="flex justify-center items-center py-20"><LoadingSpinner text="Planning the fun..." /></div>;
    return (
        <ul className="space-y-6">
            {agenda.map((item, index) => (
                <li key={index} className="flex flex-col md:flex-row gap-4 border-l-4 border-cyan-500 pl-4 py-2">
                    <div className="md:w-1/4"><p className="font-bold text-lg text-cyan-400">{item.time}</p></div>
                    <div className="md:w-3/4">
                        <h3 className="font-semibold text-xl text-slate-100">{item.activity}</h3>
                        <p className="text-slate-300 mt-1">{item.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const DressCodeContent: React.FC = () => {
    const [suggestions, setSuggestions] = useState<DressCodeSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDressCode = async () => {
            setIsLoading(true);
            const data = await generateDressCode();
            setSuggestions(data);
            setIsLoading(false);
        };
        fetchDressCode();
    }, []);

    if (isLoading) return <div className="flex justify-center items-center py-20"><LoadingSpinner text="Styling your look..." /></div>;
    return (
        <div className="text-center">
             <p className="text-xl text-slate-300 mb-2">Theme: <span className="font-bold text-cyan-400">Fun Party Time!</span></p>
             <p className="text-lg text-slate-400 mb-8">Smart casual with a festive twist. Be creative and comfortable!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-slate-700/50 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">{suggestion.category}</h3>
                        <ul className="space-y-2 text-left list-disc list-inside text-slate-300">
                            {suggestion.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EmergencyContent: React.FC = () => (
    <div className="text-center">
        <div className="flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="text-2xl font-bold text-slate-300 mb-2">In case of emergency, please contact:</h2>
            <p className="text-5xl font-extrabold text-cyan-400 tracking-widest">999</p>
            <p className="text-slate-400 mt-4">Stay calm and follow the instructions of the event staff.</p>
        </div>
    </div>
);

const HomePage: React.FC = () => {
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
  
  const modalContent: Record<string, {title: string, content: React.ReactNode}> = {
    'venue': { title: 'Venue & Directions', content: <VenueContent /> },
    'agenda': { title: 'Event Agenda', content: <AgendaContent /> },
    'dress-code': { title: 'Dress Code Guide', content: <DressCodeContent /> },
    'emergency': { title: 'Emergency Contacts', content: <EmergencyContent /> },
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="relative h-96 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <LoadingSpinner text="Creating a fun banner..." />
          </div>
        ) : (
          <img src={bannerUrl} alt="Fun Party Time!" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
         <h1 className="absolute text-5xl md:text-7xl font-extrabold text-white tracking-wider text-center" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
          FUN PARTY TIME!
        </h1>
      </header>

      <main className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => setActiveModal('details')}
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8 rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex items-center">
              <span className="text-5xl mr-4">🎉</span>
              <div>
                <h2 className="text-3xl font-bold">Event Details</h2>
                <p className="text-blue-100 mt-1">1-Jan 2026, 6pm Registration, KL Merdeka Tower</p>
              </div>
            </div>
          </button>

          {navItems.map((item) => (
            <button
              key={item.modalId}
              onClick={() => setActiveModal(item.modalId)}
              className="bg-slate-800 p-6 rounded-xl shadow-lg hover:bg-slate-700 hover:shadow-slate-600/30 transform hover:-translate-y-1 transition-all duration-300 text-left"
            >
              <div className="flex items-center">
                <span className="text-4xl mr-4">{item.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{item.text}</h2>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <EventDetailsModal isOpen={activeModal === 'details'} onClose={() => setActiveModal(null)} />
      
      {activeModal && modalContent[activeModal] && (
         <InfoModal 
            isOpen={true} 
            onClose={() => setActiveModal(null)} 
            title={modalContent[activeModal].title}>
              {modalContent[activeModal].content}
        </InfoModal>
      )}
    </div>
  );
};

export default HomePage;