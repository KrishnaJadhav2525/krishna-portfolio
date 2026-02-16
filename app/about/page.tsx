'use client';

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Container } from "@/app/components/ui/section"
import { FadeIn } from "@/app/components/ui/fade-in"

export default function AboutPage() {
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
    <section className="min-h-screen bg-black text-neutral-200 selection:bg-indigo-500/30">

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] opacity-50" />
      </div>

      {/* TOP SPACING FOR FIXED NAV */}
      <Container className="pt-32 relative z-10">

        <FadeIn>
          {/* BACK */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
          </Link>

          {/* HEADER */}
          <div id="about" className="mb-12">
            <p className="text-sm font-mono text-indigo-400 mb-4 tracking-widest uppercase">
              About Me
            </p>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6">
              Krishna Jadhav
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              Computer Science Undergraduate & AI Enthusiast.
            </p>
          </div>

          {/* INTRO CONTENT */}
          <div className="grid md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-8 space-y-6 text-lg text-neutral-300 leading-relaxed font-light">
              <p>
                I'm a Computer Science undergraduate based in Maharashtra, India,
                passionate about architecting <span className="text-white font-medium">intelligent software systems</span>.
                My journey involves a deep dive into full-stack development, data analysis, and the emerging world of Agentic AI.
              </p>

              <p>
                Currently, I'm focused on building high-performance applications using <span className="text-white font-medium">Next.js, Python, and C++</span>.
                I am also developing a real-time facial recognition system using OpenCV and Qt, pushing the boundaries of accuracy and speed.
              </p>

              <p>
                Beyond code, I bring experience from technical support and business development roles, which has refined my ability to
                communicate complex technical ideas and drive projects with an ownership mindset.
              </p>

              <div className="pt-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors border-b border-indigo-400/30 hover:border-indigo-400 pb-0.5"
                >
                  Read my technical blog <span className="text-xs">→</span>
                </Link>
              </div>
            </div>

            {/* SIDEBAR / STATS */}
            <div className="md:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {['AI Agents', 'Full Stack', 'Computer Vision', 'Data Analysis'].map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/5 rounded-full text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/KrishnaJadhav2525" target="_blank" className="text-neutral-400 hover:text-white transition-colors"><Github size={20} /></a>
                  <a href="https://x.com/krlshn444" target="_blank" className="text-neutral-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                  <a href="https://www.linkedin.com/in/krishna-jadhav-a5122a316/" target="_blank" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* EXPERIENCE & EDUCATION GRID */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-12 mb-32">

            {/* EXPERIENCE */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-500" /> Experience
              </h2>
              <div className="space-y-12 border-l border-white/10 ml-3 pl-8 relative">

                <div className="relative group">
                  <span className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-2 border-neutral-800 bg-black group-hover:border-indigo-500 transition-colors" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    Database & IT Support
                  </h3>
                  <p className="text-sm text-neutral-500 mb-2 font-mono">
                    Kohinoor Ropes Pvt. Ltd. • May '25 – Aug '25
                  </p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Optimized MySQL queries for data validation and provided on-site IT infrastructure support, ensuring 99% uptime for critical systems.
                  </p>
                </div>

                <div className="relative group">
                  <span className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-2 border-neutral-800 bg-black group-hover:border-indigo-500 transition-colors" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    Business Development Exec
                  </h3>
                  <p className="text-sm text-neutral-500 mb-2 font-mono">
                    Conglomerate Magazine • Aug '24 – Feb '25
                  </p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Led client requirements gathering and strategic outreach, acting as the technical bridge between clients and the engineering team.
                  </p>
                </div>

              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500" /> Education
              </h2>
              <div className="space-y-12 border-l border-white/10 ml-3 pl-8 relative">

                <div className="relative group">
                  <span className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-2 border-neutral-800 bg-black group-hover:border-purple-500 transition-colors" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                    B.Sc. Computer Science
                  </h3>
                  <p className="text-sm text-neutral-500 mb-2 font-mono">
                    Rajarshi Shahu Mahavidyalaya • 2023 – 2026
                  </p>
                  <p className="text-neutral-400 text-sm">
                    CGPA: 7.53/10 • Specialized in Data Structures & AI
                  </p>
                </div>

                <div className="relative group">
                  <span className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-2 border-neutral-800 bg-black group-hover:border-purple-500 transition-colors" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                    Higher Secondary (Science)
                  </h3>
                  <p className="text-sm text-neutral-500 mb-2 font-mono">
                    Maharashtra State Board • 2023
                  </p>
                </div>

              </div>
            </div>
          </div>
        </FadeIn>

        {/* CONTACT FORM */}
        <FadeIn delay={0.3}>
          <div id="contact" className="py-20 border-t border-white/5">
            <div className="max-w-xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Let's Start a Conversation</h2>
              <p className="text-neutral-400">Have a project in mind or just want to chat? I'm actively looking for new opportunities.</p>
            </div>

            <div className="max-w-xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">


              {/* Gradient glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

              {status.type === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-fadeInUp">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Sent!</h3>
                  <p className="text-neutral-400 mb-6">{status.message}</p>
                  <Button
                    variant="ghost"
                    onClick={() => setStatus({ type: '', message: '' })}
                    className="text-sm text-indigo-400 hover:text-white hover:bg-white/5"
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-neutral-500 ml-1 uppercase">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="hello@example.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-neutral-500 ml-1 uppercase">Subject</label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Inquiry"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-500 ml-1 uppercase">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Write your message here..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-base font-bold h-12 bg-white text-black hover:bg-neutral-200"
                  >
                    Send Message
                  </Button>

                  {status.type === 'error' && (
                    <div className="text-center text-red-400 text-xs mt-2">
                      {status.message}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}