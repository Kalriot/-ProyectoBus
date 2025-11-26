import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Función auxiliar para retry con backoff exponencial
async function callGeminiWithRetry(prompt: string, systemInstruction: string, maxRetries = 3) {
    const delays = [1000, 2000, 4000];

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const chat = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessage(`${systemInstruction}\n\n${prompt}`);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.error(`Intento ${attempt + 1} fallido:`, error.message);

            if (attempt === maxRetries) {
                throw new Error('No se pudo conectar con el asistente. Por favor intenta más tarde.');
            }

            await new Promise(resolve => setTimeout(resolve, delays[attempt]));
        }
    }
}

// Chatbot endpoint
export async function chatbot(req: Request, res: Response) {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Mensaje requerido' });
        }

        const systemPrompt = `Eres el asistente virtual de 'Turismo al Cielo', una agencia de turismo en Perú. 
Tu prioridad es ser BREVE y EXACTO. Tus respuestas no deben superar las 60 palabras a menos que sea estrictamente necesario.
Responde preguntas sobre destinos peruanos, clima, comida y actividades turísticas.
Si piden un itinerario o lista, usa bullet points simples. Ve directo al grano sin introducciones largas.
Usa emojis ocasionalmente para ser amigable.`;

        const response = await callGeminiWithRetry(message, systemPrompt);

        res.json({ response });
    } catch (error: any) {
        console.error('Error en chatbot:', error);
        res.status(500).json({ error: error.message });
    }
}

// Planificador de itinerarios
export async function generateItinerary(req: Request, res: Response) {
    try {
        const { destination, days, style } = req.body;

        if (!destination || !days || !style) {
            return res.status(400).json({ error: 'Faltan parámetros: destination, days, style' });
        }

        const styleDescriptions: Record<string, string> = {
            aventura: 'aventura y trekking',
            relax: 'relax y confort',
            cultural: 'cultural e histórico',
            gastronomico: 'gastronómico',
            familiar: 'familiar con niños'
        };

        const prompt = `Crea un itinerario ESQUEMÁTICO y BREVE de ${days} días para ${destination} con enfoque ${styleDescriptions[style] || style}. 

NO escribas párrafos largos. Usa solo listas con viñetas cortas.

Formato requerido para cada día:
**Día X: [Actividad Principal]**
- Mañana: [Actividad breve]
- Tarde: [Actividad breve]
- Comida sugerida: [Plato típico]

Sé directo y ve al grano. Máximo 40 palabras por día.`;

        const systemPrompt = `Eres un planificador de viajes experto y conciso para destinos en Perú. 
Tu objetivo es dar información útil sin rodeos. Evita el lenguaje florido. 
Máximo 50 palabras por día del itinerario. Usa formato markdown simple con negritas (**texto**).`;

        const response = await callGeminiWithRetry(prompt, systemPrompt);

        res.json({ itinerary: response });
    } catch (error: any) {
        console.error('Error en generateItinerary:', error);
        res.status(500).json({ error: error.message });
    }
}
