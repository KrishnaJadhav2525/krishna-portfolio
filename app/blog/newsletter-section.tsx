'use client';

import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || 'Anonymous',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Successfully subscribed! Check your email.');
        setEmail('');
        setName('');
      } else {
        setMessage('❌ ' + (data.message || 'Subscription failed'));
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-40 text-center">
      <div className="mx-auto max-w-xl">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
          📧
        </div>

        <h2 className="text-3xl font-semibold text-white mb-3">
          Subscribe to my newsletter
        </h2>

        <p className="text-neutral-400 mb-10">
          No spam, promise. I only send curated blogs that match your
          interests — the stuff you'd actually want to read.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-md border border-neutral-800 bg-black px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-emerald-500"
              required
            />

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 rounded-md border border-neutral-800 bg-black px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-md bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-black font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Subscribing...' : 'Subscribe — it takes 5 seconds'}
          </button>

          {message && (
            <p className={`mt-4 text-sm ${message.includes('✅') ? 'text-emerald-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>

        <p className="mt-3 text-xs text-neutral-500">
          Unsubscribe anytime. Your email is safe with me.
        </p>
      </div>
    </div>
  );
}