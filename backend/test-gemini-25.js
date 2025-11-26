// Test de modelos Gemini 2.5
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const testGemini25 = async () => {
    console.log('🧪 Probando modelos Gemini 2.5...\n');

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key:', apiKey ? `${apiKey.substring(0, 15)}...` : 'No encontrada');

    if (!apiKey) {
        console.error('❌ No hay API key configurada');
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Modelos 2.5 a probar
    const modelsToTest = [
        'gemini-2.5-flash-preview-09-2025',
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'gemini-2.0-flash-exp',
        'gemini-exp-1206'
    ];

    for (const modelName of modelsToTest) {
        try {
            console.log(`\n📡 Probando: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent("Responde solo 'OK'");
            const response = await result.response;
            const text = response.text();

            console.log(`✅ ${modelName} FUNCIONA!`);
            console.log(`   Respuesta: ${text.substring(0, 100)}`);

        } catch (error) {
            console.log(`❌ ${modelName} falló: ${error.status || error.message}`);
        }
    }

    console.log('\n✅ Prueba completada');
};

testGemini25();
