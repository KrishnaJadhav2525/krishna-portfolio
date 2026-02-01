'use client';

import { useState } from 'react';
import { Github, Twitter, Linkedin } from "lucide-react";

export function ContactSection() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      setFormMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setFormMessage('');

    try {
      // ✅ FIXED: Use Next.js API route instead of localhost:5000
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormMessage('✅ Message sent! I\'ll get back to you soon.');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setFormMessage('❌ ' + (data.error || data.message || 'Failed to send message'));
      }
    } catch (error) {
      console.error('Contact error:', error);
      setFormMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200 focus:outline-none focus:border-neutral-600"
              required
            />

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200 focus:outline-none focus:border-neutral-600"
              required
            />

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200 focus:outline-none focus:border-neutral-600"
              required
            />

            <button 
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-neutral-100 text-black py-3 rounded-md font-medium hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {formMessage && (
              <p className={`text-sm ${formMessage.includes('✅') ? 'text-emerald-400' : 'text-red-400'}`}>
                {formMessage}
              </p>
            )}
          </form>
        </div>

        {/* RIGHT: LINKS */}
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
              className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/krishna-jadhav-a5122a316/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="https://x.com/krlshn444"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}