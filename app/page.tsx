'use client';

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", icon: Github, label: "GitHub" },
  { href: "https://x.com/krlshn444", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", icon: Linkedin, label: "LinkedIn" },
]

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // ✅ FIXED: Use relative URL instead of localhost:5000
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ 
          type: 'success', 
          message: result.message || 'Message sent successfully! I will get back to you soon.' 
        });
        setFormData({ email: '', subject: '', message: '' });
      } else {
        setStatus({ 
          type: 'error', 
          message: result.error || result.message || 'Failed to send message. Please try again.' 
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
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

      {/* HERO */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-12 text-neutral-50">
          Krishna Jadhav
        </h1>

        {/* BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-lg font-medium bg-neutral-100 rounded-md text-black hover:bg-white transition"
          >
            <span className="text-xl">✦</span> Read My Blogs
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-lg font-medium border border-neutral-800 rounded-md text-neutral-200 hover:text-white hover:border-neutral-600 transition"
          >
            <span className="text-xl">⚡</span> Let's connect
          </Link>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 mb-20">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* SCROLL */}
        <a
          href="#skills"
          className="flex flex-col items-center gap-1 text-sm tracking-widest uppercase text-neutral-500 hover:text-neutral-300 transition"
        >
          <span>Scroll</span>
          <span>↓</span>
        </a>
      </div>

      {/* SKILLS */}
      <section id="skills" className="py-36 px-8 scroll-mt-36 border-t border-neutral-900">
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
        ].map(section => (
          <div key={section.title} className="mb-20">
            <p className="text-sm text-neutral-500 mb-5 tracking-widest">
              {section.title.toUpperCase()}
            </p>

            <div className="flex flex-wrap gap-3.5">
              {section.items.map(skill => (
                <span
                  key={skill}
                  className="px-5 py-2 text-base rounded-full border border-neutral-800 text-neutral-300 hover:border-neutral-600 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-36 px-8 scroll-mt-36 border-t border-neutral-900">
        <p className="text-sm text-neutral-500 mb-4 tracking-widest">
          GET IN TOUCH
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mb-14 text-neutral-100">
          Let's work together
        </h2>

        <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 disabled:opacity-50"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              disabled={loading}
              className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 disabled:opacity-50"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your message..."
              required
              disabled={loading}
              className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 disabled:opacity-50"
            />

            <button 
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-neutral-100 text-black py-3 rounded-md text-base font-medium hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {status.message && (
              <div className={`mt-4 p-3 rounded-md text-sm ${
                status.type === 'success' 
                  ? 'bg-green-900/20 text-green-400 border border-green-900' 
                  : 'bg-red-900/20 text-red-400 border border-red-900'
              }`}>
                {status.message}
              </div>
            )}
          </form>

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
                  className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
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