// Test de modelos disponibles de Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const testGeminiModels = async () => {
    console.log('🧪 Probando diferentes modelos de Gemini...\n');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌ No hay API key configurada');
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Lista de modelos a probar
    const modelsToTest = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro',
        'gemini-1.5-flash-latest',
        'gemini-2.0-flash-exp'
    ];

    for (const modelName of modelsToTest) {
        try {
            console.log(`\n📡 Probando: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent("Di 'OK' en una palabra");
            const response = await result.response;
            const text = response.text();

            console.log(`✅ ${modelName} funciona! Respuesta:`, text.substring(0, 50));

        } catch (error) {
            console.log(`❌ ${modelName} falló:`, error.status || error.message);
        }
    }

    console.log('\n✅ Prueba completada');
};

testGeminiModels();
