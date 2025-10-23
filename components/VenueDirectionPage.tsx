
import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import LoadingSpinner from './LoadingSpinner';
import { generateDirectionsImage } from '../services/geminiService';

const VenueDirectionPage: React.FC = () => {
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
        <PageWrapper title="Venue & Directions">
            <div className="space-y-8">
                <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
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

                <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">Public Transport Guide</h2>
                    <div className="flex justify-center items-center min-h-[300px]">
                        {isLoading ? (
                            <LoadingSpinner text="Generating transport guide..." />
                        ) : (
                            <img src={directionsImageUrl} alt="Public transport directions to Merdeka 118" className="rounded-lg max-w-full h-auto" />
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default VenueDirectionPage;
