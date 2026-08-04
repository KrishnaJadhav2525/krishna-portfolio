"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/app/components/ui/section";
import { inViewFadeUp, clipReveal, fadeIn } from "@/lib/animations";

const skillSections = [
  {
    category: "AI & AGENTS",
    title: "AI & Agent Systems",
    items: ["LangGraph", "LangChain", "n8n Workflows", "Groq (Llama 3.3 70B)", "RAG Architecture", "Pinecone Vector DB", "Google AI Embeddings", "ONNX Embeddings", "RRF Re-ranking", "OpenRouter LLMs", "Meta Cloud API", "TF-IDF / Cosine Similarity", "Gemini 2.0", "Edge TTS"]
  },
  {
    category: "FRONTEND",
    title: "Frontend Engineering",
    items: ["Next.js 16", "React 18", "Vue.js", "TypeScript", "TailwindCSS", "Framer Motion", "Shadcn UI", "MDX Engine", "DOM Virtualization"]
  },
  {
    category: "BACKEND",
    title: "Backend Development",
    items: ["Node.js", "Express.js", "Python", "FastAPI", "Flask", "Django", "REST APIs", "GraphQL", "SSE Streaming", "JWT & RBAC Auth"]
  },
  {
    category: "DATA & ML",
    title: "Data & Machine Learning",
    items: ["Scikit-learn", "OpenCV", "NLP", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Computer Vision", "TensorFlow"]
  },
  {
    category: "DATABASES",
    title: "Databases & Storage",
    items: ["MongoDB Atlas", "PostgreSQL", "GridFS Storage", "Pinecone Vector DB", "MySQL", "Redis", "Supabase"]
  },
  {
    category: "DEVOPS",
    title: "DevOps & Tooling",
    items: ["Docker", "Git & GitHub", "Vercel", "Linux", "FFmpeg / MoviePy", "Postman", "CI/CD Pipelines"]
  },
  {
    category: "LANGUAGES",
    title: "Programming Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "HTML5 / CSS3"]
  }
];

const categories = ["ALL", "AI & AGENTS", "FRONTEND", "BACKEND", "DATA & ML", "DATABASES", "DEVOPS", "LANGUAGES"];

const techKeywords = [
  "PYTHON", "TYPESCRIPT", "NEXT.JS 16", "LANGCHAIN", "PINECONE", "RAG", "DJANGO", "POSTGRESQL", "DOCKER", "FASTAPI", "TAILWINDCSS", "N8N", "TENSORFLOW", "SCIKIT-LEARN", "OPENAI", "GEMINI 2.0"
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredSections = activeCategory === "ALL"
    ? skillSections
    : skillSections.filter(section => section.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <Container variant="wide" className="relative z-10">
        <motion.div
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 border-b border-[var(--color-border)] pb-6"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-shimmer mb-2 font-medium">
            04 / TECHNICAL STACK & TOOLING
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-normal text-[var(--color-fg)]">
            Technologies & Frameworks
          </h2>
        </motion.div>

        {/* Interactive Category Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--color-border)] pb-6 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)] font-medium"
                  : "bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredSections.map((section, idx) => {
              const sectionNumber = String(idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={section.title}
                  layout
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                  className="card-hover-glow relative border border-[var(--divider-major)] p-6 bg-[var(--color-surface)] space-y-4 hover:border-[var(--divider-hover)] transition-colors duration-200"
                >
                  <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
                  <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
                  <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
                  <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

                  <div className="flex items-center justify-between pb-3 border-b border-[var(--divider-hairline)]">
                    <h3 className="text-sm font-medium text-[var(--color-fg)] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-subtle)]" />
                      <span>{section.title}</span>
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--color-subtle)] tabular-nums">
                      TECH_SPEC // {sectionNumber}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {section.items.map((skill) => (
                      <span
                        key={skill}
                        className="shimmer-hover font-mono text-[10px] text-[var(--color-muted)] px-2.5 py-1 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)] transition-colors duration-150 tracking-wider uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Marquee with Edge Fade Masks */}
        <div className="relative overflow-hidden mt-20 border-t border-b border-[var(--color-border)] py-4 select-none">
          {/* Left Fade Mask */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, var(--color-bg) 0%, transparent 100%)' }}
          />
          {/* Right Fade Mask */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, var(--color-bg) 0%, transparent 100%)' }}
          />

          {/* Scrolling Track */}
          <div
            className="animate-marquee flex gap-8 font-mono text-[10px] text-[var(--color-subtle)] tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ width: 'max-content' }}
          >
            {techKeywords.concat(techKeywords).map((keyword, index) => (
              <span key={index} className="flex items-center gap-8">
                <span>{keyword}</span>
                <span className="text-[var(--color-border-strong)]">·</span>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
