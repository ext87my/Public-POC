// This file now provides static content instead of calling the Gemini API.

export const generateBannerImage = async (): Promise<string> => {
    // A static, festive image that fits the "FUN PARTY TIME!" theme.
    return Promise.resolve("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1280&h=720&auto=format&fit=crop&ixlib=rb-4.0.3");
};

export const generateDirectionsImage = async (): Promise<string> => {
    // A static, stylized image representing a map or public transport directions.
    return Promise.resolve("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3");
};


export const generateAgenda = async () => {
    const staticAgenda = [
        { time: "6:00 PM - 6:30 PM", activity: "Welcome Reception", description: "Doors open! Grab a drink, mingle, and get ready for an unforgettable night." },
        { time: "6:30 PM - 6:45 PM", activity: "Opening Remarks", description: "A warm welcome from our CEO to kick off the celebration." },
        { time: "6:45 PM - 8:00 PM", activity: "Grand Dinner Buffet", description: "Indulge in a spectacular feast with a wide array of culinary delights." },
        { time: "8:00 PM - 8:30 PM", activity: "Awards & Recognition", description: "Celebrating the stars of our company who have gone above and beyond." },
        { time: "8:30 PM - 9:30 PM", activity: "Live Band Performance", description: "Get on your feet! Our live band is here to play your favorite hits." },
        { time: "9:30 PM - 9:45 PM", activity: "Lucky Draw Extravaganza", description: "Hold on to your tickets! Amazing prizes are up for grabs." },
        { time: "9:45 PM - 10:00 PM", activity: "Closing Speech & Toast", description: "A final thank you and a toast to many more successful years together." }
    ];
    return Promise.resolve(staticAgenda);
};

export const generateDressCode = async () => {
    const staticDressCode = [
        { 
            category: "For Him", 
            items: [
                "Smart trousers or chinos.",
                "A collared shirt (button-down or polo).",
                "A blazer or sports coat is a great addition.",
                "Loafers, dress shoes, or clean, stylish sneakers.",
                "Add a fun pocket square or festive socks!"
            ] 
        },
        { 
            category: "For Her", 
            items: [
                "A stylish cocktail dress.",
                "A chic jumpsuit or a coordinated top and skirt/trousers.",
                "Wedges, heels, or elegant flat shoes.",
                "Feel free to add some sparkle with your accessories.",
                "A festive-colored scarf or statement jewelry."
            ] 
        },
        {
            category: "Good to Know",
            items: [
                "The theme is 'Fun Party Time!', so don't be afraid to add a pop of color.",
                "Comfort is key for a night of fun and dancing!",
                "Avoid overly casual wear like shorts, t-shirts, or flip-flops."
            ]
        }
    ];
    return Promise.resolve(staticDressCode);
};
