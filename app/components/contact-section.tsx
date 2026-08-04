'use client';

import { useState } from "react"
import { motion } from "framer-motion"
import { inViewFadeUp, clipReveal } from "@/lib/animations"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", label: "GitHub" },
  { href: "https://x.com/krlshn444", label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", label: "LinkedIn" },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

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

    const submittedData = { ...formData };

    setStatus({
      type: 'success',
      message: 'Message sent successfully! I will get back to you soon.'
    });
    setFormData({ email: '', subject: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submittedData),
      });

      const result = await response.json();

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
    <section id="contact" className="py-24 max-w-[840px] mx-auto px-6 relative">
      <motion.div
        variants={clipReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12 border-b border-[var(--color-border)] pb-6"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-shimmer mb-3 font-medium">
          05 / INQUIRIES & COLLABORATION
        </p>
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-normal text-[var(--color-fg)]">
          Get In Touch
        </h2>
      </motion.div>

      <motion.div
        variants={inViewFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="card-hover-glow relative border border-[var(--color-border)] p-6 sm:p-10 bg-[var(--color-surface)]/90 backdrop-blur-md grid md:grid-cols-12 gap-10"
      >
        <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
        <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
        <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
        <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

        {/* Form Column */}
        <div className="md:col-span-7">
          {status.type === 'success' ? (
            <div className="p-8 border border-[var(--color-border)] text-center space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] block">
                STATUS / TRANSMITTED
              </span>
              <h3 className="text-base font-medium text-[var(--color-fg)]">Message Received</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {status.message}
              </p>
              <button
                onClick={() => setStatus({ type: '', message: '' })}
                className="font-mono text-xs text-[var(--color-fg)] underline underline-offset-4 tracking-wider uppercase pt-2"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-subtle)] mb-2 select-none">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-border-strong)] transition-all duration-150 font-mono"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-subtle)] mb-2 select-none">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-border-strong)] transition-all duration-150 font-mono"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-subtle)] mb-2 select-none">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message specifications..."
                  required
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-border-strong)] transition-all duration-150 resize-y font-mono"
                />
              </div>

              <button
                type="submit"
                className="shimmer-hover w-full bg-[var(--color-fg)] text-[var(--color-bg)] px-6 py-3 text-xs font-mono font-medium tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-150"
              >
                Send Message →
              </button>

              {status.type === 'error' && (
                <p className="text-xs font-mono text-red-500 mt-2">
                  {status.message}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-8 md:border-l border-[var(--color-border)] md:pl-8">
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-subtle)] mb-3 select-none">
              DIRECT EMAIL
            </h3>
            <a
              href="mailto:jadhavkrishna475@gmail.com"
              className="animated-link text-sm font-medium text-[var(--color-fg)] pb-0.5"
            >
              jadhavkrishna475@gmail.com
            </a>
            <p className="text-xs text-[var(--color-subtle)] font-mono mt-3">
              LOCATION: INDIA · AVAILABLE WORLDWIDE
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-subtle)] mb-3 select-none">
              NETWORKS
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors duration-150 uppercase tracking-widest"
                >
                  {label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
