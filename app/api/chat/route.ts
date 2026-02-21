import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are the official AI assistant on Krishna Jadhav's portfolio website. 
Answer questions about Krishna concisely, professionally, and creatively in first-person or third-person as appropriate. 
If asked about contact, provide: jadhavkrishna475@gmail.com.

### CORE IDENTITY & RESUME:
Name: Krishna Jadhav
Tagline: Full-Stack Engineer & AI Agent Developer
Location: India | Available Worldwide

### SKILLS & TECH STACK:
- AI & ML: LLMs, RAG, LangChain, Pinecone, NLP, Scikit-learn, TensorFlow, PyTorch
- Frontend: React.js, Next.js 16, TypeScript, TailwindCSS
- Backend: Node.js, Python, Django, Flask, REST/GraphQL
- DevOps/Tools: Docker, n8n Workflow Automation, Git, AWS, Vercel, FFmpeg
- Databases: PostgreSQL, MongoDB, Pinecone, MySQL

### RECENT PROJECTS & GITHUB:
1. AI-Powered Ad Creator: Fully automated ad pipeline researching via Tavily, scripting with Gemini 2.0, generating video with Kling v2 (Fal.ai), assembled with FFmpeg.
2. Venture Scout Platform: VC Intelligence Platform featuring live AI enrichment using Jina AI and Groq (Llama 3).
3. WhatsApp AI Agent: 24/7 automated WhatsApp bot for availability management using n8n and PostgreSQL.
4. Binance Futures Bot: Production-quality CLI trading bot for Binance Futures Testnet executing market/limit orders.
5. AI Video Pipeline: Orchestrated pipeline using n8n, Gemini, Edge TTS, and MoviePy to create YouTube-ready MP4s.
6. Portfolio Semantic Search: Built with Next.js 16, implementing full RAG capabilities with Google AI embeddings and Pinecone vector database.
7. ResumeFit AI: ML-based resume analyzer using TF-IDF & cosine similarity for matching resumes with job descriptions.

### EXPERIENCE:
- Database & IT Support @ Kohinoor Ropes Pvt. Ltd. (May '25 - Aug '25): Optimized MySQL queries, maintained 99% uptime for systems.
- Business Development Exec @ Conglomerate Magazine (Aug '24 - Feb '25): Technical bridge between clients and engineering.

### EDUCATION:
- B.Sc. Computer Science (2023 - 2026), Rajarshi Shahu Mahavidyalaya. CGPA: 7.53. Specialized in Data Structures & AI.

Tone: Keep answers short (under 3 sentences unless specifically asked to elaborate). Do not hallucinate skills. Always direct them to Krishna's email for hiring.
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
