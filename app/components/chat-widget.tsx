'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scaleIn } from '@/lib/animations'
import { AIAssistantButton, EngineeringStarIcon } from './ai-assistant-button'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: "Hi! I'm Krishna's AI assistant. Ask me anything about their experience, skills, or projects!" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev)
        window.addEventListener('toggle-ai-assistant', handleToggle)
        return () => window.removeEventListener('toggle-ai-assistant', handleToggle)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = { role: 'user' as const, content: input.trim() }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] })
            })

            if (!response.ok) throw new Error('API Error')

            const data = await response.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Oops! Something went wrong communicating with the AI. Please try again later.' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-6 right-6 z-50"
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{ transformOrigin: "bottom right" }}
                        className="card-hover-glow absolute bottom-14 right-0 w-[320px] sm:w-[380px] h-[460px] max-h-[80vh] flex flex-col bg-[var(--color-surface)]/95 backdrop-blur-2xl border border-[var(--color-border)] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                    >
                        {/* Corner blueprint node crosses */}
                        <span className="blueprint-card-corner blueprint-corner-tl" aria-hidden="true">+</span>
                        <span className="blueprint-card-corner blueprint-corner-tr" aria-hidden="true">+</span>
                        <span className="blueprint-card-corner blueprint-corner-bl" aria-hidden="true">+</span>
                        <span className="blueprint-card-corner blueprint-corner-br" aria-hidden="true">+</span>

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-md">
                            <div className="flex items-center gap-2.5">
                                <EngineeringStarIcon className="w-3.5 h-3.5 text-[var(--color-fg)]" />
                                <div>
                                    <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg)] font-medium flex items-center gap-2 select-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-fg)] animate-pulse" />
                                        AI KERNEL ASSISTANT
                                    </h3>
                                    <p className="text-[9px] font-mono text-[var(--color-subtle)] select-none">SWISS OPERATING SYSTEM // V2.0</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="font-mono text-[10px] text-[var(--color-subtle)] hover:text-[var(--color-fg)] transition-colors p-1 uppercase tracking-wider"
                                aria-label="Close chat"
                            >
                                [CLOSE]
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
                            {messages.map((msg, i) => (
                                <div key={i} className={"flex " + (msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    <div className={"max-w-[88%] p-3 text-xs leading-relaxed border " + (
                                        msg.role === 'user'
                                            ? 'bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)] font-medium shadow'
                                            : 'bg-[var(--color-surface)] text-[var(--color-muted)] border-[var(--color-border)] backdrop-blur-md'
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 text-[11px] font-mono text-[var(--color-subtle)]">
                                        Thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--color-border-strong)] transition-colors placeholder:text-[var(--color-subtle)] font-mono"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-[var(--color-fg)] text-[var(--color-bg)] px-3.5 py-2 text-[10px] font-mono font-medium uppercase tracking-[0.15em] hover:opacity-90 disabled:opacity-40 transition-opacity"
                            >
                                SEND
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimalist Vector Node AI Assistant CTA Button */}
            <AIAssistantButton
                onClick={() => setIsOpen(!isOpen)}
                label={isOpen ? "Close AI" : "AI Assistant"}
                variant="floating"
            />
        </motion.div>
    )
}
