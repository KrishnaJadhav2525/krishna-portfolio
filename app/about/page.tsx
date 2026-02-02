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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
            {/* FORM */}
            {status.type === 'success' ? (
              <div className="relative col-span-1">
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