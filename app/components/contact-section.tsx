'use client'

import { useState } from 'react'
import { Section, SectionHeader, Reveal, MetaRow } from '@/app/components/ui/primitives'

const socialLinks = [
  { href: 'https://github.com/KrishnaJadhav2525', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/krishna-jadhav-a5122a316/', label: 'LinkedIn' },
  { href: 'https://x.com/krlshn444', label: 'Twitter' },
]

export function ContactSection({ index = '06' }: { index?: string } = {}) {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields' })
      return
    }

    const submittedData = { ...formData }

    setStatus({
      type: 'success',
      message: 'Message sent successfully! I will get back to you soon.',
    })
    setFormData({ email: '', subject: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submittedData),
      })

      const result = await response.json()

      if (!result.success) {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      })
      console.error('Contact form error:', error)
    }
  }

  return (
    <Section id="contact" tone="raised" index={index} label="Contact" meta="Open to work & collaboration">
      <SectionHeader
        title="Start a conversation"
        lead="Send a note about a role, a build, or something you'd like to take apart together."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Form */}
        <Reveal className="lg:col-span-7">
          {status.type === 'success' ? (
            <div className="plate extrude p-8" style={{ borderColor: 'var(--line-2)' }}>
              <div className="t-label mb-4">Status · Sent</div>
              <h3 className="t-item text-[var(--fg)]">Message received</h3>
              <p className="t-body mt-3 max-w-[44ch]">{status.message}</p>
              <button
                onClick={() => setStatus({ type: '', message: '' })}
                className="btn-line mt-6"
              >
                Send another <span className="arrow">→</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="t-label mb-3 block">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  required
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="subject" className="t-label mb-3 block">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="message" className="t-label mb-3 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me a bit about it…"
                  required
                  className="field resize-y"
                />
              </div>

              <button type="submit" className="btn-solid sheen-hover w-full sm:w-auto">
                Send message <span aria-hidden="true">→</span>
              </button>

              {status.type === 'error' && (
                <p className="t-mono uppercase text-red-500">{status.message}</p>
              )}
            </form>
          )}
        </Reveal>

        {/* Details */}
        <Reveal delay={0.08} className="relative lg:col-span-4 lg:col-start-9">
          <div
            className="absolute -left-8 bottom-0 top-0 hidden w-px lg:block"
            style={{ background: 'var(--line)' }}
          />

          <div className="t-label mb-4">Direct</div>
          <a href="mailto:jadhavkrishna475@gmail.com" className="link-line text-[1rem]">
            jadhavkrishna475@gmail.com
          </a>

          <div className="mt-10">
            <MetaRow label="Location">Mumbai, India</MetaRow>
            <MetaRow label="Availability">Remote worldwide</MetaRow>
            <MetaRow label="Response">Usually within a day</MetaRow>
          </div>

          <div className="t-label mb-4 mt-10">Networks</div>
          <div className="flex flex-col gap-3">
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line t-mono uppercase text-[var(--muted)] hover:text-[var(--fg)]"
              >
                {label} <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
