// Test directo de Gemini API
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const testGeminiDirect = async () => {
    console.log('🧪 Probando Gemini API directamente...\n');

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key presente:', apiKey ? `Sí (${apiKey.substring(0, 10)}...)` : 'No');

    if (!apiKey) {
        console.error('❌ No hay API key configurada');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Probar con gemini-pro
        console.log('\n📡 Probando modelo: gemini-pro');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = "Di 'Hola' en una palabra";
        console.log('Enviando prompt:', prompt);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('✅ Respuesta recibida:', text);
        console.log('\n✅ Gemini API funciona correctamente!');

    } catch (error) {
        console.error('❌ Error al conectar con Gemini:', error.message);
        console.error('Detalles:', error);
    }
};

testGeminiDirect();
