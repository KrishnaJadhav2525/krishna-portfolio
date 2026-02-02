'use client';

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useState, useEffect, useRef } from "react"

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
    <section className="relative bg-black min-h-screen">
      {/* SOFT BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.10),transparent_70%)]" />

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
        className={`min-h-[80vh] flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ${heroSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-12 text-neutral-50">
          Krishna Jadhav
        </h1>

        {/* BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-lg font-medium bg-neutral-100 rounded-md text-black hover:bg-white hover:scale-105 transition-all duration-200"
          >
            <span className="text-xl">✦</span> Read My Blogs
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-lg font-medium border border-neutral-800 rounded-md text-neutral-200 hover:text-white hover:border-neutral-600 hover:scale-105 transition-all duration-200"
          >
            <span className="text-xl">⚡</span> Let's connect
          </Link>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 mb-20">
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 hover:scale-110 transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* SCROLL */}
        <a
          href="#skills"
          className="flex flex-col items-center gap-1 text-sm tracking-widest uppercase text-neutral-500 hover:text-neutral-300 transition animate-bounce"
        >
          <span>Scroll</span>
          <span>↓</span>
        </a>
      </div>

      {/* SKILLS - with entrance animation */}
      <section
        id="skills"
        ref={skillsSection.ref as React.RefObject<HTMLElement>}
        className={`py-36 px-8 scroll-mt-36 border-t border-neutral-900 transition-all duration-700 ${skillsSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <p className="text-sm text-neutral-500 mb-4 tracking-widest">
          WHAT I WORK WITH
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mb-14 text-neutral-100">
          Skills
        </h2>

        {[
          {
            title: "AI / ML",
            items: [
              "Machine Learning",
              "Deep Learning",
              "Data Science",
              "LLMs",
              "RAG",
              "NLP",
              "Agentic Workflows",
              "LangChain",
              "Vector Databases",
            ],
          },
          {
            title: "Frontend",
            items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Astro"],
          },
          {
            title: "Backend",
            items: ["Node.js", "Express", "Python", "REST APIs", "MongoDB", "PostgreSQL"],
          },
          {
            title: "DevOps",
            items: ["Docker", "AWS", "Git", "Vercel", "CI/CD"],
          },
        ].map((section, sectionIndex) => (
          <div
            key={section.title}
            className="mb-20"
            style={{
              transitionDelay: skillsSection.isInView ? `${sectionIndex * 100}ms` : '0ms'
            }}
          >
            <p className="text-sm text-neutral-500 mb-5 tracking-widest">
              {section.title.toUpperCase()}
            </p>

            <div className="flex flex-wrap gap-3.5">
              {section.items.map((skill, index) => (
                <span
                  key={skill}
                  className="px-5 py-2 text-base rounded-full border border-neutral-800 text-neutral-300 
                             hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/5 hover:scale-105 
                             transition-all duration-200 cursor-default"
                  style={{
                    animationDelay: skillsSection.isInView ? `${(sectionIndex * 100) + (index * 50)}ms` : '0ms'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
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

              <style jsx>{`
                @keyframes fade-in-up {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fly {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  25% { transform: translateY(-6px) rotate(-5deg); }
                  75% { transform: translateY(-3px) rotate(5deg); }
                }
                @keyframes float {
                  0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
                  50% { opacity: 1; transform: translateY(-20px) scale(1); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
                .animate-fly { animation: fly 2s ease-in-out infinite; }
                .animate-float-1 { animation: float 2s ease-in-out 0.2s infinite; }
                .animate-float-2 { animation: float 2s ease-in-out 0.5s infinite; }
                .animate-float-3 { animation: float 2s ease-in-out 0.8s infinite; }
                .animate-float-4 { animation: float 2s ease-in-out 1.1s infinite; }
              `}</style>
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