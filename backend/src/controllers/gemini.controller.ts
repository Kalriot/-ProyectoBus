// geminiController.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';

// Validar API key al arrancar
if (!process.env.GEMINI_API_KEY) {
    throw new Error('Falta la variable de entorno GEMINI_API_KEY');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Llamada a Gemini con reintentos y backoff exponencial
 */
async function callGeminiWithRetry(
    prompt: string,
    systemInstruction: string,
    maxRetries = 3
): Promise<string> {
    const delays = [1000, 2000, 4000]; // ms

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const chat = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7,
                },
            });

            // 👇 AQUÍ volvemos a concatenar el systemInstruction
            const result = await chat.sendMessage(
                `${systemInstruction}\n\n${prompt}`
            );
            const response = await result.response;
            return response.text();
        } catch (err) {
            const error: any = err;
            console.error(`Intento ${attempt + 1} fallido:`, error);

            const errorMessage: string = error?.message || '';
            const statusCode: number = error?.status || error?.code || 0;
            const isLastAttempt = attempt === maxRetries - 1;

            if (isLastAttempt) {
                if (
                    statusCode === 429 ||
                    errorMessage.includes('429') ||
                    errorMessage.includes('Too Many Requests')
                ) {
                    throw new Error(
                        '⏳ Estamos recibiendo muchas consultas. Por favor, espera unos segundos e intenta nuevamente.'
                    );
                } else if (
                    statusCode === 403 ||
                    errorMessage.includes('403') ||
                    errorMessage.includes('PERMISSION_DENIED')
                ) {
                    throw new Error(
                        '🔒 No tenemos acceso a este servicio en este momento. Por favor, contacta al administrador.'
                    );
                } else if (
                    statusCode === 404 ||
                    errorMessage.includes('404') ||
                    errorMessage.includes('NOT_FOUND')
                ) {
                    throw new Error(
                        '❌ El servicio de IA no está disponible. Por favor, contacta al administrador.'
                    );
                } else {
                    throw new Error(
                        '😔 Lo siento, hubo un error. Por favor intenta de nuevo en unos momentos.'
                    );
                }
            }

            const delay = delays[attempt] ?? delays[delays.length - 1];
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw new Error('Error desconocido al llamar a Gemini.');
}

/**
 * Endpoint de chatbot general
 */
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

        const responseText = await callGeminiWithRetry(
            message,
            systemPrompt
        );

        return res.json({ response: responseText });
    } catch (error: any) {
        console.error('Error en chatbot:', error);
        const message =
            error instanceof Error
                ? error.message
                : 'Error interno en el servidor.';
        return res.status(500).json({ error: message });
    }
}

/**
 * Endpoint para planificador de itinerarios
 */
export async function generateItinerary(req: Request, res: Response) {
    try {
        const { destination, days, style } = req.body;

        const daysNumber = Number(days);

        if (!destination || !daysNumber || !style) {
            return res
                .status(400)
                .json({ error: 'Faltan parámetros: destination, days, style' });
        }

        const styleDescriptions: Record<string, string> = {
            aventura: 'aventura y trekking',
            relax: 'relax y confort',
            cultural: 'cultural e histórico',
            gastronomico: 'gastronómico',
            familiar: 'familiar con niños',
        };

        const prompt = `Crea un itinerario ESQUEMÁTICO y BREVE de ${daysNumber} días para ${destination} con enfoque ${styleDescriptions[style] || style
            }. 

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

        const itineraryText = await callGeminiWithRetry(
            prompt,
            systemPrompt
        );

        return res.json({ itinerary: itineraryText });
    } catch (error: any) {
        console.error('Error en generateItinerary:', error);
        const message =
            error instanceof Error
                ? error.message
                : 'Error interno en el servidor.';
        return res.status(500).json({ error: message });
    }
}
