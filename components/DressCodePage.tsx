
import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import LoadingSpinner from './LoadingSpinner';
import { generateDressCode } from '../services/geminiService';
import type { DressCodeSuggestion } from '../types';

const DressCodePage: React.FC = () => {
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

    return (
        <PageWrapper title="Dress Code Guide">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 md:p-8 text-center">
                 <p className="text-xl text-slate-300 mb-2">Theme: <span className="font-bold text-cyan-400">Fun Party Time!</span></p>
                 <p className="text-lg text-slate-400 mb-8">Smart casual with a festive twist. Be creative and comfortable!</p>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <LoadingSpinner text="Styling your look..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className="bg-slate-700/50 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4">{suggestion.category}</h3>
                                <ul className="space-y-2 text-left list-disc list-inside text-slate-300">
                                    {suggestion.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default DressCodePage;
