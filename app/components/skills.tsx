"use client";

import { useRef, useState, useEffect } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Container } from "@/app/components/ui/section";

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
}

export default function Skills() {
    const { ref, isInView } = useInView(0.1);

    return (
        <section
            id="skills"
            ref={ref}
            className="py-32 relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} />

            <Container>
                <div className="mb-20 text-center md:text-left">
                    <p className="text-sm font-mono text-indigo-400 mb-4 tracking-widest uppercase">
                        Technical Arsenal
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Technologies & Tools
                    </h2>
                    <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
                        A curated stack of modern tools and frameworks used to build scalable, production-ready applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "AI / ML",
                            icon: "🤖",
                            items: ["LLMs", "RAG Systems", "Agentic Workflows", "LangChain", "LangGraph", "CrewAI", "Prompt Engineering", "Vector Databases", "Pinecone", "Embeddings", "NLP", "Machine Learning", "Deep Learning", "HuggingFace", "OpenAI API", "Gemini API"],
                            gradient: "from-indigo-500/10 to-blue-500/5"
                        },
                        {
                            title: "Frontend",
                            icon: "🎨",
                            items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn UI", "Framer Motion", "Zustand", "Astro"],
                            gradient: "from-emerald-500/10 to-teal-500/5"
                        },
                        {
                            title: "Backend",
                            icon: "⚡",
                            items: ["Node.js", "Express", "FastAPI", "Python", "Hono", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL", "Mongoose", "Prisma"],
                            gradient: "from-orange-500/10 to-red-500/5"
                        },
                        {
                            title: "DevOps & Tools",
                            icon: "☁️",
                            items: ["Docker", "AWS", "Git", "GitHub Actions", "Vercel", "Render", "CI/CD", "Linux"],
                            gradient: "from-blue-500/10 to-cyan-500/5"
                        },
                    ].map((section, sectionIndex) => (
                        <div
                            key={section.title}
                            className={`
                                group relative
                                flex flex-col items-start
                                p-6 rounded-2xl
                                glass
                                hover:bg-white/[0.05]
                                transition-all duration-300
                                hover:-translate-y-1
                            `}
                            style={{
                                transitionDelay: isInView ? `${sectionIndex * 50}ms` : '0ms',
                                opacity: isInView ? 1 : 0,
                                transform: isInView ? 'translateY(0)' : 'translateY(20px)'
                            }}
                        >
                            {/* Hover Gradient */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`} />

                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">{section.icon}</span>
                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    {section.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {section.items.map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        className="
                                            px-2.5 py-1 
                                            text-xs font-medium 
                                            bg-white/5 border-white/5 text-neutral-400 
                                            group-hover:text-white group-hover:bg-white/10 group-hover:border-white/10
                                            transition-all duration-300
                                            cursor-default
                                        "
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
