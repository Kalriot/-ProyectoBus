import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const testSimple = async () => {
    console.log('🧪 Test simple de Gemini API\n');

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key presente:', apiKey ? 'Sí' : 'No');
    console.log('API Key (primeros 10 chars):', apiKey?.substring(0, 10));

    const genAI = new GoogleGenerativeAI(apiKey);

    // Probar con gemini-pro (el más básico)
    try {
        console.log('\n📡 Probando gemini-pro...');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent('Di hola en una palabra');
        const response = await result.response;
        console.log('✅ Respuesta:', response.text());
    } catch (error) {
        console.error('❌ Error con gemini-pro:', error.message);
        console.error('Status:', error.status);
        console.error('Error completo:', JSON.stringify(error, null, 2));
    }
};

testSimple();
