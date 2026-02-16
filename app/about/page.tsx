'use client';

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Container } from "@/app/components/ui/section"
import { FadeIn } from "@/app/components/ui/fade-in"
import { ContactSection } from "@/app/components/contact-section"

export default function AboutPage() {


  return (
    <section className="min-h-screen bg-black text-neutral-200 selection:bg-indigo-500/30">

      {/* Background Elements */}


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
        <ContactSection />
      </Container>
    </section>
  )
}