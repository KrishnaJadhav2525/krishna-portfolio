'use client';

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import ProjectCarousel from "@/app/components/project-carousel"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", icon: Github, label: "GitHub" },
  { href: "https://x.com/krlshn444", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", icon: Linkedin, label: "LinkedIn" },
]

// Hook for scroll-triggered animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only animate once
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

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  // Scroll animation refs
  const heroSection = useInView();
  const skillsSection = useInView(0.2);
  const contactSection = useInView(0.2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    // Store form data before clearing
    const submittedData = { ...formData };

    // Optimistic UI - show success immediately
    setStatus({
      type: 'success',
      message: 'Message sent successfully! I will get back to you soon.'
    });
    setFormData({ email: '', subject: '', message: '' });

    // API call in background
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submittedData),
      });

      const result = await response.json();

      // Only update if there was an error
      if (!result.success) {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
      console.error('Contact form error:', error);
    }
  };

  return (
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* AURORA BACKGROUND EFFECT */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Primary gradient blob */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-aurora-1" />
        {/* Secondary gradient blob */}
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-aurora-2" />
        {/* Accent blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-500/10 via-indigo-500/5 to-purple-500/10 rounded-full blur-3xl animate-aurora-3" />
      </div>

      {/* TOP BAR */}
      <div className="flex justify-between items-center pt-8 px-8">
        <span className="text-lg font-semibold text-neutral-100">
          Krishna<span className="text-indigo-400">.</span>
        </span>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/about"
            className="text-neutral-400 hover:text-white transition"
          >
            About
          </Link>

          <Link
            href="/blog"
            className="text-neutral-400 hover:text-white transition"
          >
            Blog
          </Link>
        </div>
      </div>

      {/* HERO - with entrance animation */}
      <div
        ref={heroSection.ref as React.RefObject<HTMLDivElement>}
        className={`min-h-[90vh] flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${heroSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div className="mb-8 relative inline-flex items-center justify-center">
          <span className="relative z-10 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 backdrop-blur-md">
            Available for new opportunities
          </span>
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
          Krishna Jadhav
        </h1>

        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
          Full Stack Developer & AI Engineer crafting <span className="text-white font-medium">high-performance</span> digital experiences.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-medium bg-white rounded-full text-black overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">Read My Blogs <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="#contact"
            className="group px-8 py-4 text-lg font-medium border border-white/10 bg-white/5 rounded-full text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all backdrop-blur-sm"
          >
            Let's connect
          </Link>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-6 mb-24">
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

        {/* SCROLL */}
        <a
          href="#projects"
          className="flex flex-col items-center gap-3 text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors duration-300 animate-bounce"
        >
          <span>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </div>

      {/* FEATURED PROJECTS - Carousel */}
      <section
        id="projects"
        className="py-36 px-8 scroll-mt-36 border-t border-neutral-900"
      >
        <p className="text-sm text-neutral-500 mb-4 tracking-widest">
          SELECTED WORK
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mb-14 text-neutral-100">
          Featured Projects
        </h2>

        <ProjectCarousel />
      </section>

      {/* SKILLS - with entrance animation */}
      <section
        id="skills"
        ref={skillsSection.ref as React.RefObject<HTMLElement>}
        className={`py-32 px-6 max-w-7xl mx-auto border-t border-white/5 transition-opacity duration-1000 ${skillsSection.isInView ? 'opacity-100' : 'opacity-0'
          }`}
      >
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
                transitionDelay: skillsSection.isInView ? `${sectionIndex * 100}ms` : '0ms'
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{section.icon}</span>
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  {section.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {section.items.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 text-sm font-medium rounded-full bg-white/5 text-neutral-400 border border-white/5
                               hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT - with entrance animation */}
      <section
        id="contact"
        ref={contactSection.ref as React.RefObject<HTMLElement>}
        className={`py-36 px-8 scroll-mt-36 border-t border-neutral-900 transition-all duration-700 ${contactSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <p className="text-sm text-neutral-500 mb-4 tracking-widest">
          GET IN TOUCH
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mb-14 text-neutral-100">
          Let's work together
        </h2>

        <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">

          {/* SUCCESS STATE - Animated celebration */}
          {status.type === 'success' ? (
            <div className="relative">
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-transparent p-10 animate-fade-in-up">

                {/* Animated paper plane icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20">
                  <svg
                    className="h-10 w-10 text-blue-400 animate-fly"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>

                {/* Floating dots animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-8 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float-1"></div>
                  <div className="absolute top-16 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-float-2"></div>
                  <div className="absolute top-12 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-float-3"></div>
                  <div className="absolute top-20 right-1/3 w-2 h-2 bg-indigo-300 rounded-full animate-float-4"></div>
                </div>

                <h3 className="text-2xl font-semibold text-blue-400 mb-3 text-center">
                  Message Sent! 🚀
                </h3>

                <p className="text-neutral-300 mb-2 text-center">
                  {status.message}
                </p>

                <p className="text-neutral-500 text-sm text-center">
                  I typically respond within 24-48 hours.
                </p>

                <button
                  onClick={() => setStatus({ type: '', message: '' })}
                  className="mt-8 w-full px-6 py-2 text-sm text-blue-400 border border-blue-500/30 rounded-md hover:bg-blue-500/10 transition-all"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your message..."
                required
                className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />

              <button
                type="submit"
                className="mt-6 w-full bg-neutral-100 text-black py-3 rounded-md text-base font-medium hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Send Message
              </button>

              {/* Error message */}
              {status.type === 'error' && status.message && (
                <div className="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-400 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {status.message}
                  </p>
                </div>
              )}
            </form>
          )}

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-neutral-100 mb-4">
                Krishna
              </h3>

              <ul className="space-y-2 text-base text-neutral-400">
                <li>
                  <Link href="/#skills" className="hover:text-white transition">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 mt-10">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 hover:scale-110 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}