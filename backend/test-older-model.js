import dotenv from 'dotenv';

dotenv.config();

const testOlderModel = async () => {
    console.log('🧪 Probando gemini-1.5-flash (modelo más antiguo pero disponible)\n');

    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = 'gemini-1.5-flash';

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: 'Recomienda un destino turístico en Perú en 15 palabras'
                    }]
                }]
            })
        });

        console.log('Status:', response.status, response.statusText);

        if (response.ok) {
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
            console.log('\n✅ ¡FUNCIONA! Respuesta:', text);
            console.log('\n📝 Respuesta completa:', JSON.stringify(data, null, 2));
        } else {
            const error = await response.text();
            console.log('\n❌ Error:', error);
        }

    } catch (error) {
        console.error('❌ Exception:', error.message);
    }
};

testOlderModel();
