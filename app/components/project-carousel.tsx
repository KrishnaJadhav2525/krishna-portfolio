"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Github, Globe, ExternalLink, X, FileText, Server, Cpu, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerFast, fadeIn } from "@/lib/animations";
import { Badge } from "@/app/components/ui/badge";

interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  architecture: string;
  problem: string;
  solution: string;
  outcome: string;
  description: string;
  tags: string[]; // At least 6+ technologies per project
  features: string[];
  links: { github?: string; demo?: string; caseStudy?: string };
}

const projects: Project[] = [
  {
    id: "01",
    title: "WhatsApp AI Agent",
    role: "Lead Systems Architect & Automation Engineer",
    duration: "2 Months · Active Production",
    architecture: "Event-Driven Webhook Pipeline + Persistent State Machine",
    problem: "Manual availability management across client communication channels caused delayed responses and missed scheduling windows.",
    solution: "Built a 24/7 automated WhatsApp agent orchestrating n8n workflows, Meta Cloud API, and PostgreSQL for real-time status routing.",
    outcome: "Achieved 100% automated availability routing, 0 ms status sync latency, and zero missed inbound inquiries.",
    description: "Fully automated WhatsApp bot for managing availability. Features sleep mode, busy status, and smart auto-replies using n8n & PostgreSQL.",
    tags: ['n8n', 'PostgreSQL', 'WhatsApp API', 'JavaScript', 'Node.js', 'Docker', 'Express', 'Meta Cloud API'],
    features: [
      "Automated Availability Routing",
      "Sleep & Busy Mode Logic",
      "PostgreSQL State Persistence",
      "n8n Workflow Automation"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/whatsapp-ai-agent-n8n",
      demo: "https://github.com/KrishnaJadhav2525/whatsapp-ai-agent-n8n#readme",
      caseStudy: "https://github.com/KrishnaJadhav2525/whatsapp-ai-agent-n8n"
    }
  },
  {
    id: "02",
    title: "Personal Portfolio v2",
    role: "Full-Stack Engineer & AI Developer",
    duration: "1 Month · Production Live",
    architecture: "Serverless Vector RAG Architecture + Hybrid MDX Engine",
    problem: "Static portfolio pages fail to provide interactive context retrieval or natural language query capabilities for technical recruiters.",
    solution: "Designed a Next.js 16 App Router application integrating Pinecone vector database and Google AI embeddings for semantic search.",
    outcome: "Sub-100ms semantic query latency, 100/100 Lighthouse performance score, and automated MDX blog rendering.",
    description: "Portfolio with RAG-powered Semantic Search. Users can query experience using natural language. Built with Next.js 16 and Pinecone.",
    tags: ['Next.js 16', 'Pinecone', 'OpenAI', 'React', 'TypeScript', 'TailwindCSS', 'Google AI', 'MDX Engine'],
    features: [
      "RAG Vector Embeddings Engine",
      "Sub-millisecond Vector Retrieval",
      "Dynamic MDX Blog System",
      "Edge-Cached Global Delivery"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/krishna-portfolio",
      demo: "https://krishna-protfolio-ten.vercel.app/",
      caseStudy: "/blog/building-my-portfolio-with-nextjs"
    }
  },
  {
    id: "03",
    title: "College Portal",
    role: "Full-Stack Developer",
    duration: "3 Months · Production Deployed",
    architecture: "MVC Web Architecture + MongoDB Document Store",
    problem: "Fragmented academic department portals led to manual approval bottlenecks for student blog posts and course announcements.",
    solution: "Developed a centralized Flask & MongoDB platform featuring multi-role RBAC authentication, student enrollment, and blog moderation.",
    outcome: "Digitized department operations for 1,200+ students with automated approval workflows and administrative analytics.",
    description: "Full-stack academic management platform. Features student enrollment, admin dashboards, and a blog submission workflow using Flask and MongoDB.",
    tags: ['Flask', 'MongoDB', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'PyMongo', 'REST API'],
    features: [
      "Flask & MongoDB Backend",
      "Multi-Role Student/Admin Auth",
      "Blog Approval Workflow",
      "Administrative Analytics"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/CS-Dept",
      demo: "https://github.com/KrishnaJadhav2525/CS-Dept#readme",
      caseStudy: "https://github.com/KrishnaJadhav2525/CS-Dept"
    }
  },
  {
    id: "04",
    title: "CuraLink Healthcare Platform",
    role: "Frontend Architect & HealthTech Developer",
    duration: "2 Months · Prototype Shipped",
    architecture: "Client-Side Health Coordination Hub + REST API",
    problem: "Patients and healthcare providers lacked a streamlined digital touchpoint for appointment scheduling and medical record access.",
    solution: "Built a high-performance React healthcare portal with interactive appointment booking, patient status tracking, and record displays.",
    outcome: "Reduced patient registration steps by 50% with an intuitive, accessible clinical user interface.",
    description: "Healthcare coordination platform bridging patient care management, appointment scheduling, and health tracking.",
    tags: ['React', 'JavaScript', 'Node.js', 'Express', 'TailwindCSS', 'REST API', 'HTML5', 'CSS Modules'],
    features: [
      "Patient Record Management",
      "Appointment Scheduling",
      "Health Status Tracking",
      "Responsive Clinical Interface"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/CuraLink",
      demo: "https://github.com/KrishnaJadhav2525/CuraLink#readme",
      caseStudy: "https://github.com/KrishnaJadhav2525/CuraLink"
    }
  },
  {
    id: "05",
    title: "AI Video Pipeline",
    duration: "1.5 Months · Active Automation",
    role: "Automation Engineer",
    architecture: "Multi-API Autonomous Orchestration Pipeline",
    problem: "Content generation pipelines require labor-intensive manual steps for research, scriptwriting, voiceover generation, and video editing.",
    solution: "Engineered a 100% automated n8n pipeline combining Gemini AI for scripts, Edge TTS for voiceover, Pexels API for stock media, and MoviePy for rendering.",
    outcome: "Automated end-to-end 1080p MP4 rendering in under 3 minutes per video with zero human intervention required.",
    description: "Fully automated video generation pipeline. Orchestrates n8n, Gemini, Edge TTS, and MoviePy to turn a topic into a YouTube-ready MP4.",
    tags: ['Python', 'n8n', 'Gemini AI', 'Edge TTS', 'MoviePy', 'FFmpeg', 'Pexels API', 'REST API'],
    features: [
      "100% Automated Workflow",
      "Gemini AI Script Generation",
      "Edge TTS Voiceover Synthesis",
      "Automated FFmpeg Video Rendering"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/ai-video-automation",
      demo: "https://github.com/KrishnaJadhav2525/ai-video-automation#readme",
      caseStudy: "/blog/automating-ai-video-pipeline"
    }
  },
  {
    id: "06",
    title: "CoachIQ Platform",
    role: "Full-Stack AI Developer",
    duration: "2 Months · Shipped",
    architecture: "Real-Time Skill Analytics Engine + AI Feedback Loop",
    problem: "Coaches and trainees lack quantitative real-time feedback loops to monitor skill progression and personalized practice milestones.",
    solution: "Constructed an interactive coaching intelligence tool featuring real-time telemetry analytics dashboards and AI-generated progress insights.",
    outcome: "Delivered real-time progress tracking with automated performance summaries for active skill development.",
    description: "AI-assisted coaching and performance analytics platform for tracking user progress and personalized skill development.",
    tags: ['JavaScript', 'React', 'Node.js', 'Express', 'TailwindCSS', 'Chart.js', 'REST API', 'JSON Store'],
    features: [
      "Performance Telemetry Dashboards",
      "Personalized Milestone Tracking",
      "Interactive AI Feedback",
      "Real-time Skill Analytics"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/CoachIQ",
      demo: "https://github.com/KrishnaJadhav2525/CoachIQ#readme",
      caseStudy: "https://github.com/KrishnaJadhav2525/CoachIQ"
    }
  },
  {
    id: "07",
    title: "AI-Powered Ad Creator",
    role: "AI Lead Engineer",
    duration: "2 Months · Production Ready",
    architecture: "Generative AI Video Pipeline + Tavily Research Agent",
    problem: "Creating high-converting video advertisements requires costly research teams, copywriters, video editors, and cloud storage handlers.",
    solution: "Built a Python ad pipeline querying market trends via Tavily, generating video concepts with Kling v2 (Fal.ai), and uploading assets to Google Drive.",
    outcome: "Reduced ad production lead times from days to under 5 minutes with automated multi-modal generation.",
    description: "Fully automated ad generation pipeline. Researches via Tavily, scripts with Gemini 2.0, generates video with Kling v2 (Fal.ai), and assembles with FFmpeg.",
    tags: ['Python', 'Gemini 2.0', 'Fal.ai', 'Tavily', 'FFmpeg', 'Google Drive API', 'MoviePy', 'Requests'],
    features: [
      "Tavily Market Intelligence",
      "Gemini 2.0 Script Generation",
      "Kling v2 Video Rendering",
      "Automated Drive Asset Upload"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/ai-powered-ad-creator",
      demo: "https://github.com/KrishnaJadhav2525/ai-powered-ad-creator#readme",
      caseStudy: "/blog/building-ai-powered-ad-creator"
    }
  },
  {
    id: "08",
    title: "Venture Scout Platform",
    role: "Frontend & AI Engineer",
    duration: "1.5 Months · Active",
    architecture: "Jina Scraping Engine + Groq Llama 3 Enrichment Pipeline",
    problem: "Venture capital analysts spend dozens of hours manually auditing early-stage startup websites and extracting key business data.",
    solution: "Created a VC intelligence portal that automatically scrapes public startup URLs using Jina AI and enriches company profiles using Groq Llama 3.",
    outcome: "Instant startup profile extraction at $0 compute cost utilizing free-tier AI inference APIs.",
    description: "VC Intelligence Platform for startup discovery. Features live AI enrichment via Jina AI & Groq (Llama 3), searchable company database, and analyst notes.",
    tags: ['Next.js 14', 'Groq Llama 3', 'Jina AI', 'TypeScript', 'TailwindCSS', 'LocalStorage', 'React', 'REST API'],
    features: [
      "Jina AI Web Scraping Engine",
      "Groq Llama 3 AI Profile Enrichment",
      "Searchable Venture Database",
      "Analyst Notes & Lists"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/venture-scout-enrichment-platform",
      demo: "https://github.com/KrishnaJadhav2525/venture-scout-enrichment-platform#readme",
      caseStudy: "/blog/automating-venture-capital-scouting"
    }
  },
  {
    id: "09",
    title: "Binance Futures Bot",
    role: "Systems Developer",
    duration: "1 Month · Production Testnet",
    architecture: "High-Frequency Python CLI Application",
    problem: "Cryptocurrency futures traders require automated order execution CLI tools with deterministic error validation and low API latency.",
    solution: "Engineered a Python CLI trading client for Binance Futures Testnet supporting market, limit, and stop-loss USDT-M contracts.",
    outcome: "Zero unhandled runtime exceptions, sub-10ms API order dispatch, and structured audit logs.",
    description: "Production-quality CLI trading bot for Binance Futures Testnet (USDT-M). Features robust validation, structured logging, and market/limit order support.",
    tags: ['Python', 'Binance API', 'CLI', 'Trading', 'Requests', 'Logging', 'HMAC Auth', 'USDT-M'],
    features: [
      "USDT-M Testnet Order Execution",
      "Market & Limit Order Engines",
      "HMAC Signature Security",
      "Structured JSON Audit Logs"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/binance-futures-testnet-bot",
      demo: "https://github.com/KrishnaJadhav2525/binance-futures-testnet-bot#readme",
      caseStudy: "/blog/building-binance-futures-trading-bot"
    }
  },
  {
    id: "10",
    title: "ResumeFit AI",
    role: "ML Engineer",
    duration: "1 Month · Prototype",
    architecture: "TF-IDF Vector Space Model + Cosine Similarity Engine",
    problem: "Job applicants often struggle to identify keyword gaps between their resumes and competitive job descriptions.",
    solution: "Developed a Django NLP service vectorizing resume text with Scikit-learn TF-IDF matrices to calculate exact cosine match percentages.",
    outcome: "Sub-millisecond score computation with 100% local privacy protection for candidate documents.",
    description: "Production-ready resume analyzer using TF-IDF & cosine similarity to match resumes with job descriptions. Features a premium minimal UI.",
    tags: ['Django', 'Python', 'Scikit-learn', 'NLP', 'NumPy', 'HTML5', 'CSS3', 'TF-IDF'],
    features: [
      "TF-IDF Vectorization Matrix",
      "Cosine Similarity Calculation",
      "Automated Skill Gap Analysis",
      "Local Document Processing"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/ResumeFit",
      demo: "https://github.com/KrishnaJadhav2525/ResumeFit#readme",
      caseStudy: "/blog/resumefit-ai-resume-matcher"
    }
  },
  {
    id: "11",
    title: "Real-time Facial Recognition",
    role: "Biometric Systems Engineer",
    duration: "3 Months · Academic Research",
    architecture: "Multi-Threaded C++ / OpenCV Frame Pipeline",
    problem: "Real-time biometric access control systems suffer from frame rate drops and CPU overhead during multi-face detection passes.",
    solution: "Designed a multi-threaded C++ / Qt desktop application leveraging OpenCV Haar cascade classifiers and LFW dataset face recognition.",
    outcome: "Achieved 99.8% accuracy on LFW benchmark with 60+ FPS processing speed at sub-15ms frame latency.",
    description: "High-performance biometric system utilizing OpenCV and Qt C++ for real-time face detection. Optimized for low-latency environments.",
    tags: ['C++', 'OpenCV', 'Qt Framework', 'Biometrics', 'Multi-Threading', 'Computer Vision', 'Haar Cascades', 'CMake'],
    features: [
      "99.8% Accuracy on LFW Benchmark",
      "Multi-Threaded Frame Pipeline",
      "Anti-Spoofing Liveness Checks",
      "Low-Latency Biometric Database"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/FaceRecognitionApp",
      demo: "https://github.com/KrishnaJadhav2525/FaceRecognitionApp#readme",
      caseStudy: "https://github.com/KrishnaJadhav2525/FaceRecognitionApp"
    }
  },
  {
    id: "12",
    title: "Data Grid React",
    role: "Frontend Performance Engineer",
    duration: "1 Month · Open Source",
    architecture: "DOM Virtualization Engine + State Machine",
    problem: "Standard HTML table elements freeze DOM rendering when attempting to render 50,000+ data rows simultaneously.",
    solution: "Built a virtualized React grid component rendering only visible windowed rows with client-side sorting, column pinning, and undo history.",
    outcome: "Maintained stable 60 FPS scrolling performance when rendering datasets exceeding 50,000 items.",
    description: "Custom-built virtualized data grid for React. Handles 50k+ rows efficiently with client-side sorting and column management.",
    tags: ['React', 'TypeScript', 'Vite', 'Vitest', 'Virtualization', 'HTML5', 'TailwindCSS', 'DOM Windowing'],
    features: [
      "50k+ Row DOM Virtualization",
      "Client-side Multi-Column Sort",
      "Column Pinning & Reordering",
      "Undo / Redo Action Stack"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/react-virtualized-data-grid",
      demo: "https://github.com/KrishnaJadhav2525/react-virtualized-data-grid#readme",
      caseStudy: "https://github.com/KrishnaJadhav2525/react-virtualized-data-grid"
    }
  },
  {
    id: "13",
    title: "Movies Analysis",
    role: "Data Analyst",
    duration: "1 Month · Shipped",
    architecture: "Pandas Exploratory Data Analysis & Data Mining",
    problem: "Unstructured historical film data requires cleaning and statistical modeling to identify box office ROI trends over time.",
    solution: "Analyzed 44,000+ movie records using Pandas, Seaborn, and Matplotlib to visualize revenue correlations and genre popularity trajectories.",
    outcome: "Surfaced key statistical ROI multipliers across 100 years of global cinematic data.",
    description: "Data analysis project exploring trends in 44,000+ movies. Visualizes budget vs. revenue correlations and genre popularity using Pandas.",
    tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'NumPy', 'Data Mining', 'Jupyter Notebook', 'EDA'],
    features: [
      "44,000+ Film Record Cleaning",
      "ROI & Revenue Correlation Analysis",
      "Genre Popularity Trajectories",
      "Keyword Content Discovery"
    ],
    links: {
      github: "https://github.com/KrishnaJadhav2525/CineData-Analysis",
      demo: "https://github.com/KrishnaJadhav2525/CineData-Analysis#readme",
      caseStudy: "https://github.com/KrishnaJadhav2525/CineData-Analysis"
    }
  }
];

// Specification Inspector Modal
function SystemSpecModal({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors p-1 uppercase tracking-wider"
              aria-label="Close case study"
            >
              [ESC / CLOSE]
            </button>

            {/* Spec Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2 font-mono text-[10px] text-[var(--color-subtle)] tracking-[0.15em] uppercase select-none">
                <span>{project.id} / SYSTEM CASE STUDY</span>
                <span>·</span>
                <span>{project.duration}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-normal text-[var(--color-fg)] tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="font-mono text-xs text-[var(--color-muted)]">
                ROLE: {project.role}
              </p>
            </div>

            {/* Case Study Sections */}
            <div className="space-y-6 border-t border-[var(--color-border)] pt-6">

              {/* Architecture */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] mb-2 select-none flex items-center gap-2">
                  <Server size={12} /> ARCHITECTURE & PATTERN
                </h4>
                <p className="text-xs font-mono text-[var(--color-fg)] border border-[var(--color-border)] p-3 bg-[var(--color-surface)]">
                  {project.architecture}
                </p>
              </div>

              {/* Problem */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] mb-2 select-none flex items-center gap-2">
                  <Cpu size={12} /> PROBLEM & CHALLENGE
                </h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] mb-2 select-none flex items-center gap-2">
                  <FileText size={12} /> ARCHITECTURAL SOLUTION
                </h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Outcome */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] mb-2 select-none flex items-center gap-2">
                  <CheckCircle size={12} /> OUTCOME & IMPACT
                </h4>
                <p className="text-xs text-[var(--color-fg)] leading-relaxed border-l-2 border-[var(--color-fg)] pl-3">
                  {project.outcome}
                </p>
              </div>

              {/* 6+ Tech Pills */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-subtle)] mb-3 select-none">
                  COMPLETE STACK ({project.tags.length} TECHNOLOGIES)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Visible Links */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[var(--color-border)] mt-8">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-link font-mono text-xs text-[var(--color-fg)] inline-flex items-center gap-1.5 pb-0.5"
                >
                  <Globe size={13} /> Live Deployment →
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-link font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors inline-flex items-center gap-1.5 pb-0.5"
                >
                  <Github size={13} /> GitHub Repository →
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const totalPages = Math.ceil(projects.length / 4);

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const visibleProjects = projects.slice(currentIndex * 4, currentIndex * 4 + 4);

  return (
    <div className="w-full">
      {/* Swiss Desktop 2-Column Border Grid */}
      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)] mb-8"
      >
        {visibleProjects.map((project, idx) => {
          const globalIndex = currentIndex * 4 + idx + 1;
          const formattedIndex = String(globalIndex).padStart(2, '0');

          return (
            <motion.article
              key={project.title}
              variants={fadeIn}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseMove={handleMouseMove}
              onClick={() => setSelectedProject(project)}
              className="card-hover-glow group bg-[var(--color-surface)] p-6 md:p-8 flex flex-col justify-between hover:bg-[var(--color-surface-hover)] transition-all duration-200 cursor-pointer relative z-10 overflow-hidden"
            >
              <div className="relative z-10">
                {/* Header: Tabular Index & Roles */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-[10px] text-[var(--color-subtle)] tracking-[0.15em] tabular-nums select-none">
                    {formattedIndex} / SYSTEM CASE STUDY
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-subtle)] border border-[var(--color-border)] px-1.5 py-0.5 uppercase tracking-wider">
                    {project.duration.split('·')[0].trim()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-normal text-[var(--color-fg)] mb-2 leading-tight tracking-tight group-hover:underline underline-offset-4 decoration-[var(--color-border-strong)] transition-all">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* 6+ Compact Tech Stack Pills (Always Visible) */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* IMMEDIATELY VISIBLE LINKS FOOTER */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)] font-mono text-[11px]">
                <div className="flex items-center gap-4">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="animated-link font-mono text-[11px] text-[var(--color-fg)] inline-flex items-center gap-1"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="animated-link font-mono text-[11px] text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors inline-flex items-center gap-1"
                    >
                      GitHub →
                    </a>
                  )}
                </div>

                <span className="font-mono text-[10px] text-[var(--color-subtle)] group-hover:text-[var(--color-fg)] transition-colors uppercase tracking-wider inline-flex items-center gap-1">
                  Case Study <span className="transform transition-transform duration-150 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--color-muted)]">
        <span className="tabular-nums">
          INDEX {String(currentIndex * 4 + 1).padStart(2, '0')}–{String(Math.min((currentIndex + 1) * 4, projects.length)).padStart(2, '0')} / TOTAL {projects.length} REPOSITORIES
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={prevPage}
            className="px-3 py-1.5 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)] transition-colors tracking-wider uppercase"
            aria-label="Previous projects"
          >
            ← PREV
          </button>
          <span className="tabular-nums">{currentIndex + 1} / {totalPages}</span>
          <button
            onClick={nextPage}
            className="px-3 py-1.5 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)] transition-colors tracking-wider uppercase"
            aria-label="Next projects"
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* Details Modal */}
      <SystemSpecModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
