'use client';

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
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
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/contact`, {
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
          message: result.message || 'Failed to send message. Please try again.' 
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
    <section className="bg-black text-neutral-200">
      {/* TOP SPACING FOR FIXED NAV */}
      <div className="pt-28 max-w-3xl mx-auto px-6">

        {/* BACK */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition mb-12"
        >
          ← Back
        </Link>

        {/* ABOUT */}
        <div id="about">
          <p className="text-sm tracking-widest text-neutral-500 mb-3">
            ABOUT
          </p>

          <h1 className="text-4xl font-semibold tracking-tight mb-8 text-white">
            Krishna Jadhav
          </h1>
        </div>

        {/* INTRO */}
        <div className="space-y-5 text-neutral-400 leading-relaxed">
          <p>
            I'm a Computer Science undergraduate based in Maharashtra, India,
            with a strong interest in software development, data analysis, and
            AI-driven systems. I focus on building solutions grounded in solid
            engineering fundamentals and practical problem-solving.
          </p>

          <p>
            I work with Python, MySQL, and C++, and I'm currently developing a
            real-time facial recognition system using OpenCV and the Qt C++
            framework, with an emphasis on accuracy, performance, and
            real-world usability.
          </p>

          <p>
            Alongside academics, I've gained experience across technical
            support, database operations, and client-facing roles, which has
            helped me develop strong communication skills and an
            ownership-driven mindset.
          </p>
        </div>

        {/* BLOG LINK — RESTORED */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-sm text-emerald-400 hover:underline"
          >
            Read my blog →
          </Link>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-24">
          <p className="text-sm tracking-widest text-neutral-500 mb-6">
            EXPERIENCE
          </p>

          <div className="space-y-10">
            <div className="border-l border-neutral-800 pl-6">
              <h3 className="text-lg font-medium text-white">
                Database Support & IT Support
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                Kohinoor Ropes Pvt. Ltd. · May 2025 – Aug 2025
              </p>
              <p className="text-neutral-400">
                Assisted with MySQL queries, database validation, and on-site IT
                support for systems, hardware, and basic networking.
              </p>
            </div>

            <div className="border-l border-neutral-800 pl-6">
              <h3 className="text-lg font-medium text-white">
                Business Development Executive
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                Conglomerate Magazine · Aug 2024 – Feb 2025
              </p>
              <p className="text-neutral-400">
                Managed client outreach, requirement gathering, follow-ups, and
                coordination with senior team members.
              </p>
            </div>
          </div>
        </div>

        {/* EDUCATION — FULLY RESTORED */}
        <div className="mt-24">
          <p className="text-sm tracking-widest text-neutral-500 mb-6">
            EDUCATION
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">
                B.Sc. Computer Science
              </h3>
              <p className="text-neutral-400">
                Rajarshi Shahu Mahavidyalaya, Latur · 2023 – 2026 · CGPA 7.53/10
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">
                Higher Secondary (XII) – Science
              </h3>
              <p className="text-neutral-400">
                Maharashtra State Board · 2023 · 66.83%
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">
                Secondary (X)
              </h3>
              <p className="text-neutral-400">
                Maharashtra State Board · 2020 · 87.60%
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div
          id="contact"
          className="mt-32 pt-24 border-t border-neutral-900"
        >
          <p className="text-sm text-neutral-500 mb-4 tracking-widest">
            GET IN TOUCH
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mb-12 text-white">
            Let's work together
          </h2>

          <div className="grid md:grid-cols-2 gap-14">
            {/* FORM */}
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

            {/* LINKS */}
            <div className="space-y-4">
              <a
                href="https://github.com/KrishnaJadhav2525"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
              >
                <Github size={18} /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/krishna-jadhav-a5122a316/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
              >
                <Linkedin size={18} /> LinkedIn
              </a>

              <a
                href="https://x.com/krlshn444"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
              >
                <Twitter size={18} /> Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}