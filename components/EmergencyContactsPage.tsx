
import React from 'react';
import PageWrapper from './PageWrapper';

const EmergencyContactsPage: React.FC = () => {
    return (
        <PageWrapper title="Emergency Contacts">
            <div className="bg-slate-800 rounded-lg shadow-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-6xl mb-4">🚨</div>
                    <h2 className="text-2xl font-bold text-slate-300 mb-2">In case of emergency, please contact:</h2>
                    <p className="text-5xl font-extrabold text-cyan-400 tracking-widest">999</p>
                    <p className="text-slate-400 mt-4">Stay calm and follow the instructions of the event staff.</p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default EmergencyContactsPage;
