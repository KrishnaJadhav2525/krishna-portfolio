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
    const { ref, isInView } = useInView(0.2);

    return (
        <section
            id="skills"
            ref={ref}
            className={`py-32 border-t border-white/5 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
        >
            <Container>
                <div className="mb-20">
                    <p className="text-sm font-mono text-indigo-400 mb-4 tracking-widest uppercase">
                        Technical Arsenal
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Technologies & Tools
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "AI & Machine Learning",
                            icon: "🤖",
                            items: [
                                "Machine Learning",
                                "Deep Learning",
                                "Large Language Models (LLMs)",
                                "RAG Systems",
                                "Natural Language Processing",
                                "Agentic Workflows",
                                "LangChain",
                                "Vector Search",
                            ],
                        },
                        {
                            title: "Frontend Engineering",
                            icon: "🎨",
                            items: ["React.js", "Next.js 14+", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Astro", "WebGL"],
                        },
                        {
                            title: "Backend Systems",
                            icon: "⚡",
                            items: ["Node.js", "Python (FastAPI/Django)", "PostgreSQL", "MongoDB", "Redis", "REST & GraphQL APIs"],
                        },
                        {
                            title: "DevOps & Cloud",
                            icon: "☁️",
                            items: ["Docker & Kubernetes", "AWS Components", "CI/CD Pipelines", "Vercel Edge Functions", "GitOps"],
                        },
                    ].map((section, sectionIndex) => (
                        <div
                            key={section.title}
                            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 group"
                            style={{
                                transitionDelay: isInView ? `${sectionIndex * 100}ms` : '0ms'
                            }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{section.icon}</span>
                                <h3 className="text-xl font-semibold text-white tracking-tight">
                                    {section.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {section.items.map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="glass"
                                        className="px-3.5 py-1.5 text-sm font-medium border-white/5 hover:border-white/20 transition-all duration-300 cursor-default"
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
