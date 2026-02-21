import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are an AI assistant on Krishna Jadhav's portfolio.
Answer questions about Krishna only. Be concise, friendly, and professional. 

[PLACEHOLDER: DROP YOUR RESUME DETAILS HERE]
E.g.:
Name: Krishna Jadhav
Role: Full Stack Developer & AI Engineer
Location: India, available worldwide
Email: jadhavkrishna475@gmail.com
GitHub: github.com/KrishnaJadhav2525
Skills: React, Next.js, TypeScript, Python, Django, Flask, LangChain, RAG, OpenAI API, PostgreSQL, Docker, AWS...
Projects: Venture Scout Platform (VC Intelligence with Groq Llama 3 + Jina AI)...
Open to: Full-time, freelance, contract roles
`;

const FREE_MODELS = [

    'nvidia/nemotron-3-nano-30b-a3b:free',
    'arcee-ai/trinity-mini:free',
    'nvidia/nemotron-nano-12b-v2-vl:free',

];

async function callOpenRouter(model: string, messages: any[]) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY,
            'HTTP-Referer': 'https://krishna-protfolio-ten.vercel.app/',
            'X-Title': 'Krishna Portfolio',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model,
            max_tokens: 1000,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages
            ],
        })
    });
    return response;
}

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        let lastError = '';

        for (const model of FREE_MODELS) {
            try {
                console.log('Trying model:', model);
                const response = await callOpenRouter(model, messages);

                if (response.ok) {
                    const data = await response.json();
                    return NextResponse.json({ reply: data.choices[0].message.content });
                }

                const errorText = await response.text();
                console.warn('Model ' + model + ' failed (' + response.status + '):', errorText);
                lastError = errorText;

                // Stop retrying if unauthorized
                if (response.status === 401) {
                    throw new Error('OpenRouter API error: Unauthorized');
                }

                // For other errors (like 404, 429, 5xx), try the next model
                continue;
            } catch (err: any) {
                if (err.message?.startsWith('OpenRouter API error: Unauthorized')) throw err;
                console.warn('Model ' + model + ' threw:', err.message);
                lastError = err.message;
                continue;
            }
        }

        // All models failed
        console.error('All models exhausted. Last error:', lastError);
        return NextResponse.json({ error: 'All AI models are currently busy. Please try again in a moment.' }, { status: 503 });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
    }
}
