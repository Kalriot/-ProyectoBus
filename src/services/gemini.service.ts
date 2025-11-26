import api from './api';

export interface ChatResponse {
    response: string;
}

export interface ItineraryParams {
    destination: string;
    days: string;
    style: 'aventura' | 'relax' | 'cultural' | 'gastronomico' | 'familiar';
}

export interface ItineraryResponse {
    itinerary: string;
}

export const geminiService = {
    // POST /api/gemini/chat - Chatbot
    chat: async (message: string) => {
        const response = await api.post<ChatResponse>('/gemini/chat', { message });
        return response.data;
    },

    // POST /api/gemini/itinerary - Planificador de viajes
    generateItinerary: async (params: ItineraryParams) => {
        const response = await api.post<ItineraryResponse>('/gemini/itinerary', params);
        return response.data;
    },
};
