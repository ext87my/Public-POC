
import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import LoadingSpinner from './LoadingSpinner';
import { generateAgenda } from '../services/geminiService';
import type { AgendaItem } from '../types';

const EventAgendaPage: React.FC = () => {
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

    return (
        <PageWrapper title="Event Agenda">
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <LoadingSpinner text="Planning the fun..." />
                </div>
            ) : (
                <div className="bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
                    <ul className="space-y-6">
                        {agenda.map((item, index) => (
                            <li key={index} className="flex flex-col md:flex-row gap-4 border-l-4 border-cyan-500 pl-4 py-2">
                                <div className="md:w-1/4">
                                    <p className="font-bold text-lg text-cyan-400">{item.time}</p>
                                </div>
                                <div className="md:w-3/4">
                                    <h3 className="font-semibold text-xl text-slate-100">{item.activity}</h3>
                                    <p className="text-slate-300 mt-1">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </PageWrapper>
    );
};

export default EventAgendaPage;
