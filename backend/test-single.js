import dotenv from 'dotenv';

dotenv.config();

const testSingleModel = async () => {
    console.log('🧪 Probando un solo modelo: gemini-1.5-flash-002\n');

    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = 'gemini-1.5-flash-002';

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
                        text: 'Recomienda un destino turístico en Perú en 10 palabras'
                    }]
                }]
            })
        });

        console.log('Status:', response.status, response.statusText);

        if (response.ok) {
            const data = await response.json();
            console.log('\n✅ Respuesta completa:', JSON.stringify(data, null, 2));
        } else {
            const error = await response.text();
            console.log('\n❌ Error:', error);
        }

    } catch (error) {
        console.error('❌ Exception:', error.message);
    }
};

testSingleModel();
