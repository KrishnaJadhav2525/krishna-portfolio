'use client';

import { useState } from 'react';
import { Github, Twitter, Linkedin } from "lucide-react";

type Status = 'idle' | 'success' | 'error';

export function ContactSection() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      setStatus('error');
      setFormMessage('Please fill in all fields');
      return;
    }

    // Store form data before clearing
    const formData = { email, subject, message };

    // Optimistic UI - show success immediately
    setStatus('success');
    setFormMessage("Message sent! I'll get back to you soon.");
    setEmail('');
    setSubject('');
    setMessage('');

    // API call in background
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Only update if there was an error
      if (!data.success) {
        setStatus('error');
        setFormMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact error:', error);
      setStatus('error');
      setFormMessage('Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormMessage('');
  };

  // Success state - animated celebration
  if (status === 'success') {
    return (
      <div className="mt-40 border-t border-neutral-900 pt-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* LEFT: SUCCESS MESSAGE */}
          <div className="relative">
            <div className="animate-fade-in-up rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-transparent p-10">

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

              <h3 className="text-2xl font-semibold text-blue-400 mb-3 animate-fade-in">
                Message Sent! 🚀
              </h3>

              <p className="text-neutral-300 mb-2 animate-fade-in-delayed">
                {formMessage}
              </p>

              <p className="text-neutral-500 text-sm animate-fade-in-delayed-2">
                I typically respond within 24-48 hours.
              </p>

              <button
                onClick={resetForm}
                className="mt-8 px-6 py-2 text-sm text-blue-400 border border-blue-500/30 rounded-md hover:bg-blue-500/10 transition-all"
              >
                Send another message
              </button>
            </div>
          </div>

          {/* RIGHT: LINKS */}
          <RightSection />
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
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
          .animate-fly { animation: fly 2s ease-in-out infinite; }
          .animate-float-1 { animation: float 2s ease-in-out 0.2s infinite; }
          .animate-float-2 { animation: float 2s ease-in-out 0.5s infinite; }
          .animate-float-3 { animation: float 2s ease-in-out 0.8s infinite; }
          .animate-float-4 { animation: float 2s ease-in-out 1.1s infinite; }
          .animate-fade-in { animation: fade-in 0.5s ease-out 0.3s both; }
          .animate-fade-in-delayed { animation: fade-in 0.5s ease-out 0.5s both; }
          .animate-fade-in-delayed-2 { animation: fade-in 0.5s ease-out 0.7s both; }
        `}</style>
      </div>
    );
  }

  // Default form state
  return (
    <div className="mt-40 border-t border-neutral-900 pt-32">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

        {/* LEFT: FORM */}
        <div>
          <p className="text-sm tracking-widest text-neutral-500 mb-4">
            GET IN TOUCH
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mb-12 text-white">
            Let's work together
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              required
            />

            <button
              type="submit"
              className="mt-6 w-full bg-neutral-100 text-black py-3 rounded-md font-medium hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Send Message
            </button>

            {/* Error message with animation */}
            {status === 'error' && formMessage && (
              <div className="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/30 animate-shake">
                <p className="text-sm text-red-400 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formMessage}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT: LINKS */}
        <RightSection />
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}

// Extracted right section to avoid duplication
function RightSection() {
  return (
    <div className="pt-20 md:pt-16">
      <h3 className="text-xl font-semibold text-white mb-6">
        Krishna
      </h3>

      <ul className="space-y-3 text-neutral-400">
        <li>
          <a href="/blog" className="hover:text-white transition">
            Blog
          </a>
        </li>
        <li>
          <a href="/skills" className="hover:text-white transition">
            Skills
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-white transition">
            About
          </a>
        </li>
      </ul>

      {/* SOCIAL ICONS */}
      <div className="mt-10 flex gap-4">
        <a
          href="https://github.com/KrishnaJadhav2525"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 hover:scale-110 transition-all"
        >
          <Github size={18} />
        </a>

        <a
          href="https://www.linkedin.com/in/krishna-jadhav-a5122a316/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 hover:scale-110 transition-all"
        >
          <Linkedin size={18} />
        </a>

        <a
          href="https://x.com/krlshn444"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 hover:scale-110 transition-all"
        >
          <Twitter size={18} />
        </a>
      </div>
    </div>
  );
}