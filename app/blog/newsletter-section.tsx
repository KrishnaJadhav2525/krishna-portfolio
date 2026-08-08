'use client';

import { useState } from 'react';

type Status = 'idle' | 'success' | 'error';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }

    const submittedEmail = email;
    setStatus('success');
    setMessage('Successfully subscribed to newsletter!');
    setEmail('');
    setName('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail, name: name || 'Anonymous' }),
      });

      const data = await response.json();

      if (!data.success) {
        setStatus('error');
        setMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setMessage('');
  };

  return (
    <div
      className="ticks grid grid-cols-1 gap-10 border p-8 lg:grid-cols-12 lg:gap-8 lg:p-12"
      style={{ borderColor: 'var(--line-2)' }}
    >
      <div className="lg:col-span-5">
        <div className="t-label mb-5">Newsletter</div>
        <h2 className="t-section text-[var(--fg)]">Technical updates</h2>
        <p className="t-body mt-5 max-w-[38ch]">
          Occasional notes on software engineering, AI systems and new project write-ups.
          No schedule, no filler.
        </p>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        {status === 'success' ? (
          <div className="flex h-full flex-col justify-center">
            <div className="t-label mb-4">Status · Subscribed</div>
            <h3 className="t-item text-[var(--fg)]">You&rsquo;re on the list</h3>
            <p className="t-body mt-3">{message}</p>
            <button onClick={resetForm} className="link-line t-mono mt-6 self-start uppercase">
              Subscribe another <span className="arrow">→</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nl-email" className="t-label mb-3 block">
                Email address
              </label>
              <input
                id="nl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="field"
              />
            </div>

            <div>
              <label htmlFor="nl-name" className="t-label mb-3 block">
                Name (optional)
              </label>
              <input
                id="nl-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="field"
              />
            </div>

            <button type="submit" className="btn-solid sheen-hover w-full sm:w-auto">
              Subscribe <span aria-hidden="true">→</span>
            </button>

            {status === 'error' && message && (
              <p className="t-mono uppercase text-red-500">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
