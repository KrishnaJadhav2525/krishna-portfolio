"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Activity, BarChart3, Database, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    title: string;
    description: string;
    tags: string[];
    features: string[];
    stats: { label: string; value: string; icon: React.ElementType }[];
    links: { github?: string; demo?: string };
    gradient: string;
    iconBg: string;
    iconBorder: string;
    iconColor: string;
    iconPath: React.ReactNode;
}

const projects: Project[] = [
    {
        title: "Real-time Facial Recognition",
        description: "High-performance biometric system utilizing OpenCV and Qt C++ for real-time face detection. Optimized for low-latency environments with custom threading.",
        features: [
            "99.8% Accuracy on LFW Dataset",
            "Multi-threaded Processing Pipeline",
            "Anti-spoofing Liveness Detection",
            "Secure Local Biometric Database"
        ],
        stats: [
            { label: "Accuracy", value: "99.8%", icon: Activity },
            { label: "Latency", value: "~15ms", icon: Activity },
            { label: "FPS", value: "60+", icon: Activity }
        ],
        links: { github: "#" },
        tags: ['C++', 'OpenCV', 'Qt', 'Biometrics'],
        gradient: "from-indigo-500/50 via-purple-500/30 to-transparent",
        iconBg: "bg-indigo-500/10",
        iconBorder: "border-indigo-500/20",
        iconColor: "text-indigo-400",
        iconPath: (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </>
        )
    },
    {
        title: "Personal Portfolio v2",
        description: "Next-gen portfolio with RAG-powered Semantic Search. Users can query my experience using natural language. Built with Next.js 16 and Pinecone.",
        features: [
            "RAG using OpenAI & Pinecone",
            "Sub-millisecond Vector Retrieval",
            "Dynamic MDX Blog System",
            "Edge-Cached Global Delivery"
        ],
        stats: [
            { label: "Query Time", value: "<100ms", icon: Activity },
            { label: "Vectors", value: "10k+", icon: Database },
            { label: "Lighthouse", value: "100", icon: Activity }
        ],
        links: { github: "#", demo: "#" },
        tags: ['Next.js 16', 'Pinecone', 'RAG', 'React'],
        gradient: "from-emerald-500/50 via-teal-500/30 to-transparent",
        iconBg: "bg-emerald-500/10",
        iconBorder: "border-emerald-500/20",
        iconColor: "text-emerald-400",
        iconPath: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        )
    },
    {
        title: "Fraud Detection System",
        description: "Enterprise-grade ML pipeline for anomalous transaction detection. Implements ensemble learning with Scikit-learn to minimize false positives.",
        features: [
            "Process over 10,000 TPS",
            "Ensemble: XGBoost + Random Forest",
            "Explainable AI (SHAP) Metrics",
            "Real-time Stream Processing"
        ],
        stats: [
            { label: "Throughput", value: "10k TPS", icon: Activity },
            { label: "Precision", value: "99.9%", icon: BarChart3 },
            { label: "False Pos", value: "<0.1%", icon: Activity }
        ],
        links: { github: "#" },
        tags: ['Python', 'Scikit-learn', 'ML', 'Pandas'],
        gradient: "from-red-500/50 via-orange-500/30 to-transparent",
        iconBg: "bg-red-500/10",
        iconBorder: "border-red-500/20",
        iconColor: "text-red-400",
        iconPath: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        )
    },
    {
        title: "Movies Analysis",
        description: "Data analytics platform visualizing cinematic trends. Leverages Pandas and Matplotlib for interactive heatmaps and correlation patterns.",
        features: [
            "Analysis of 50,000+ Films",
            "Interactive Box Office Heatmaps",
            "Seasonality & Trend Detection",
            "Director Impact Correlation"
        ],
        stats: [
            { label: "Dataset", value: "50k+", icon: Database },
            { label: "Range", value: "50 Yrs", icon: Activity },
            { label: "Charts", value: "20+", icon: BarChart3 }
        ],
        links: { github: "#" },
        tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
        gradient: "from-yellow-500/50 via-amber-500/30 to-transparent",
        iconBg: "bg-yellow-500/10",
        iconBorder: "border-yellow-500/20",
        iconColor: "text-yellow-400",
        iconPath: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        )
    },
    {
        title: "Data Grid React",
        description: "High-performance React data grid for large datasets (1M+ rows). Features virtualized scrolling, server-side pagination, and complex filtering.",
        features: [
            "Virtualized Scrolling (1M+ Rows)",
            "Server-side Pagination & Sort",
            "Multi-column Complex Filtering",
            "Export to CSV / Excel"
        ],
        stats: [
            { label: "Rows", value: "1M+", icon: Database },
            { label: "Scroll", value: "60 FPS", icon: Activity },
            { label: "Bundle", value: "<15kb", icon: Activity }
        ],
        links: { github: "#", demo: "#" },
        tags: ['React', 'TypeScript', 'MUI', 'Data Grid'],
        gradient: "from-cyan-500/50 via-blue-500/30 to-transparent",
        iconBg: "bg-cyan-500/10",
        iconBorder: "border-cyan-500/20",
        iconColor: "text-cyan-400",
        iconPath: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7-6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
        )
    },
    {
        title: "College Portal",
        description: "Full-stack academic management system. Features RBAC, real-time attendance, and module result processing using MongoDB aggregation pipelines.",
        features: [
            "Role-Based Access Control (RBAC)",
            "Real-time Chat (Socket.io)",
            "Automated Grade Processing",
            "Digital Resource Integration"
        ],
        stats: [
            { label: "Users", value: "500+", icon: Activity },
            { label: "Uptime", value: "99.9%", icon: Activity },
            { label: "Roles", value: "4", icon: Activity }
        ],
        links: { github: "#" },
        tags: ['Next.js', 'MongoDB', 'Express', 'AuthJS'],
        gradient: "from-violet-500/50 via-fuchsia-500/30 to-transparent",
        iconBg: "bg-violet-500/10",
        iconBorder: "border-violet-500/20",
        iconColor: "text-violet-400",
        iconPath: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        )
    }
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
    }),
};

export default function ProjectCarousel() {
    const [[page, direction], setPage] = useState([1, 0]);
    const [isHovered, setIsHovered] = useState(false);

    // Wrap index effectively
    const projectIndex = Math.abs(page % projects.length);
    const project = projects[projectIndex];

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
        setIsHovered(false); // Reset hover state on navigation
    }, [page]);

    return (
        <div className="relative w-full max-w-7xl mx-auto h-[700px] flex items-center justify-center">
            {/* Navigation Buttons */}
            <div className="absolute inset-x-4 md:inset-x-0 flex items-center justify-between z-20 pointer-events-none top-1/2 -translate-y-1/2">
                <button
                    className="pointer-events-auto p-4 rounded-full bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-300 backdrop-blur-sm"
                    onClick={() => paginate(-1)}
                    aria-label="Previous project"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    className="pointer-events-auto p-4 rounded-full bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-300 backdrop-blur-sm"
                    onClick={() => paginate(1)}
                    aria-label="Next project"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Card Container */}
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4 },
                            filter: { duration: 0.3 },
                        }}
                        className="absolute w-full flex justify-center items-center px-4"
                        style={{ zIndex: isHovered ? 50 : 1 }}
                    >
                        {/* The Intensified Expanding Card */}
                        <motion.div
                            layout
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => setIsHovered(!isHovered)}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className={`
                relative overflow-hidden
                rounded-3xl p-[1px]
                bg-gradient-to-br ${project.gradient}
                shadow-2xl shadow-black/80
                cursor-pointer
                ${isHovered ? 'w-full max-w-3xl md:max-w-4xl' : 'w-full max-w-lg'}
              `}
                            animate={{
                                scale: isHovered ? 1.02 : 1,
                            }}
                        >
                            {/* Card Background */}
                            <div className={`relative bg-neutral-950/95 backdrop-blur-3xl rounded-3xl p-8 md:p-12 flex flex-col items-center transition-all duration-500 h-full ${isHovered ? 'min-h-[600px]' : 'min-h-[500px]'}`}>

                                {/* Decorative Elements */}
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                                {/* Header Section: Icon + Title */}
                                <motion.div layout className="flex flex-col items-center z-10">
                                    <motion.div layout className={`relative w-20 h-20 rounded-2xl ${project.iconBg} border ${project.iconBorder} flex items-center justify-center shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] mb-6`}>
                                        <svg className={`w-10 h-10 ${project.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {project.iconPath}
                                        </svg>
                                    </motion.div>

                                    <motion.h3 layout className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center mb-2">
                                        {project.title}
                                    </motion.h3>
                                </motion.div>

                                {/* Content Container */}
                                <div className="w-full flex flex-col gap-6 mt-4">

                                    {/* Description */}
                                    <motion.p layout className="text-neutral-400 text-lg leading-relaxed text-center max-w-2xl mx-auto">
                                        {project.description}
                                    </motion.p>

                                    {/* Expanded Content Grid */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full"
                                            >
                                                {/* Features Column */}
                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mx-auto w-full">
                                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-200 mb-4 uppercase tracking-wider">
                                                        <Activity className="w-4 h-4 text-emerald-400" /> Key Features
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {project.features.map((feature, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.2 + (idx * 0.05) }}
                                                                className="flex items-start text-sm text-neutral-400"
                                                            >
                                                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full mr-3 ${project.iconBg.replace('bg-', 'bg-').split('/')[0]} flex-shrink-0`} />
                                                                {feature}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Stats & Actions Column */}
                                                <div className="flex flex-col gap-6">
                                                    {/* Stats */}
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {project.stats.map((stat, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.3 + (idx * 0.05) }}
                                                                className="bg-neutral-900/50 rounded-xl p-3 border border-white/5 text-center flex flex-col items-center justify-center"
                                                            >
                                                                <stat.icon className={`w-5 h-5 ${project.iconColor} mb-2`} />
                                                                <div className="text-lg font-bold text-white leading-none mb-1">{stat.value}</div>
                                                                <div className="text-[10px] text-neutral-500 uppercase tracking-wide">{stat.label}</div>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex gap-4 mt-auto">
                                                        {project.links.github && (
                                                            <motion.a
                                                                href={project.links.github}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.5 }}
                                                                className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
                                                            >
                                                                <Github size={20} /> View Code
                                                            </motion.a>
                                                        )}
                                                        {project.links.demo && (
                                                            <motion.a
                                                                href={project.links.demo}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.6 }}
                                                                className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 text-white py-3 rounded-xl font-semibold border border-neutral-700 hover:bg-neutral-700 transition-colors"
                                                            >
                                                                <Globe size={20} /> Live Demo
                                                            </motion.a>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Tags - Always Visible but pushed down on hover */}
                                    <motion.div layout className={`flex flex-wrap items-center justify-center gap-2 ${isHovered ? 'mt-8' : 'mt-auto'}`}>
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-[10px] font-medium tracking-wide uppercase rounded-full bg-white/5 border border-white/10 text-neutral-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>

                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setPage([idx, idx > projectIndex ? 1 : -1])}
                        className={`
              w-2 h-2 rounded-full transition-all duration-300 
              ${idx === projectIndex
                                ? 'w-8 bg-white'
                                : 'bg-neutral-800 hover:bg-neutral-600'}
            `}
                        aria-label={`Go to project ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
