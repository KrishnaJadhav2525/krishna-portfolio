'use client';

import Link from "next/link"
import { Github, Twitter, Linkedin, Activity } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import ProjectCarousel from "@/app/components/project-carousel"
import Skills from "@/app/components/skills"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Container } from "@/app/components/ui/section"
import { FadeIn } from "@/app/components/ui/fade-in"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", icon: Github, label: "GitHub" },
  { href: "https://x.com/krlshn444", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", icon: Linkedin, label: "LinkedIn" },
]

// Hook for scroll-triggered animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  // Scroll animation refs
  const heroSection = useInView();
  const skillsSection = useInView(0.2);
  const contactSection = useInView(0.2);

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
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* AURORA BACKGROUND EFFECT */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Primary gradient blob */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-aurora-1" />
        {/* Secondary gradient blob */}
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-aurora-2" />
        {/* Accent blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-500/10 via-indigo-500/5 to-purple-500/10 rounded-full blur-3xl animate-aurora-3" />
      </div>



      {/* HERO - Replaced manual animation with FadeIn */}
      <FadeIn className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4" delay={0.1}>
        {/* AVAILABILITY BADGE */}
        <div className="mb-8 relative inline-flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
          <span className="relative z-10 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 backdrop-blur-md">
            Available for new opportunities
          </span>
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
        </div>

        {/* HEADLINE WITH GRADIENT & GLOW */}
        <div className="relative mb-8 max-w-4xl mx-auto">
          <div className="absolute inset-0 blur-[100px] bg-indigo-500/20 pointer-events-none" />
          <h1 className="relative z-10 text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-2xl">
            Krishna <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))]">Jadhav</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
          Full Stack Developer & AI Engineer crafting <span className="text-white font-medium">high-performance</span> digital experiences.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {/* Primary Button */}
          <div className="p-[1px] rounded-full bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--primary))] bg-[length:200%_auto] hover:animate-gradient-x transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]">
            <Link
              href="/blog"
              className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-medium bg-black rounded-full text-white overflow-hidden transition-all hover:bg-black/80"
            >
              <span className="relative z-10 flex items-center gap-2">Read My Blogs <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>
          </div>

          <Link
            href="#contact"
            className="group px-8 py-4 text-lg font-medium border border-white/10 bg-white/5 rounded-full text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all backdrop-blur-sm"
          >
            Let's connect
          </Link>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-6 mb-24">
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

        {/* SCROLL */}
        <a
          href="#projects"
          className="flex flex-col items-center gap-3 text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors duration-300 animate-bounce"
        >
          <span>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </a>
      </FadeIn>

      {/* FEATURED PROJECTS - Carousel */}
      <section
        id="projects"
        className="py-20 px-4 sm:px-8 scroll-mt-24 border-t border-neutral-900"
      >
        <FadeIn>
          <p className="text-sm text-neutral-500 mb-4 tracking-widest">
            SELECTED WORK
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-neutral-100">
            Featured Projects
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} fullWidth>
          <ProjectCarousel />
        </FadeIn>
      </section>

      {/* SKILLS */}
      <FadeIn>
        <Skills />
      </FadeIn>

      {/* CONTACT */}
      <FadeIn
        className="py-24 border-t border-white/5 bg-black/50 relative overflow-hidden"
        fullWidth
      >
        <section
          id="contact"
          className="relative"
        >
          {/* Abstract Background Elements */}


          <Container className="relative z-10">
            <div className="mb-16">
              <p className="text-sm font-mono text-indigo-400 mb-4 tracking-widest uppercase">
                Get In Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Let's create something <span className="text-neutral-500">extraordinary.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">

              {/* LEFT: FORM */}
              <div className="relative group">

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10">
                  {status.type === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeInUp">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                      <p className="text-neutral-400 max-w-xs mx-auto mb-8">
                        {status.message}
                      </p>
                      <Button
                        onClick={() => setStatus({ type: '', message: '' })}
                        variant="outline"
                        className="bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        Send another
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-neutral-400 ml-1">Email Address</label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-neutral-400 ml-1">Subject</label>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Project Inquiry"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-neutral-400 ml-1">Message</label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell me about your project..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full text-base font-bold h-14 rounded-full shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] group/btn"
                      >
                        Send Message
                        <span className="group-hover/btn:translate-x-1 transition-transform ml-2">→</span>
                      </Button>

                      {status.type === 'error' && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                          <Activity className="w-4 h-4" />
                          {status.message}
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>

              {/* RIGHT: INFO */}
              <div className="flex flex-col justify-between py-4">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-8 h-px bg-indigo-500"></span>
                      Contact Info
                    </h3>
                    <div className="space-y-4">
                      <a href="mailto:krishna@example.com" className="block text-2xl md:text-3xl font-light text-neutral-300 hover:text-white transition-colors">
                        krisn.jadhav@gmail.com
                      </a>
                      <p className="text-neutral-500">
                        Based in India • Available Worldwide
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-8 h-px bg-purple-500"></span>
                      Connect
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map(({ href, icon: Icon, label }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                          aria-label={label}
                        >
                          <Icon size={24} className="text-neutral-400 group-hover:text-white transition-colors" />
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black border border-white/10 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="text-neutral-600 text-sm max-w-xs leading-relaxed">
                    I'm currently opening to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                  </p>
                </div>
              </div>

            </div>
          </Container>
        </section>
      </FadeIn>
    </section>
  )
}
