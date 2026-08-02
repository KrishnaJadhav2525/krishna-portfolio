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

  if (status === 'success') {
    return (
      <div className="border border-[var(--color-border)] p-8 text-center max-w-[520px] mx-auto">
        <h3 className="text-lg font-medium text-[var(--color-fg)] mb-2">Subscribed</h3>
        <p className="text-sm text-[var(--color-muted)] mb-4">{message}</p>
        <button
          onClick={resetForm}
          className="font-mono text-xs text-[var(--color-fg)] underline underline-offset-4"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[var(--color-border)] p-8 max-w-[520px] mx-auto">
      <p className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-muted)] mb-2">
        Newsletter
      </p>
      <h2 className="text-xl font-medium text-[var(--color-fg)] mb-3">
        Subscribe to technical updates
      </h2>
      <p className="text-sm text-[var(--color-muted)] mb-6 leading-relaxed">
        Occasional updates on software engineering, AI systems, and new project write-ups.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-xs tracking-[0.1em] uppercase text-[var(--color-muted)] mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full bg-transparent border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-fg)] transition-colors duration-150"
          />
        </div>

        <div>
          <label className="block font-mono text-xs tracking-[0.1em] uppercase text-[var(--color-muted)] mb-2">
            Name (Optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-transparent border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-fg)] transition-colors duration-150"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-fg)] text-[var(--color-bg)] px-6 py-3 text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all duration-150"
        >
          Subscribe
        </button>

        {status === 'error' && message && (
          <p className="text-xs font-mono text-red-500 mt-2 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
