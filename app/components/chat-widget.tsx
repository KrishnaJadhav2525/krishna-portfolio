'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scaleIn } from '@/lib/animations'

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
                        className="absolute bottom-14 right-0 w-[320px] sm:w-[380px] h-[460px] max-h-[80vh] flex flex-col bg-[var(--color-bg)] border border-[var(--color-border)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                            <div>
                                <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-fg)] flex items-center gap-2 select-none">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-fg)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
                                    AI ASSISTANT
                                </h3>
                                <p className="text-[10px] font-mono text-[var(--color-subtle)] select-none">KRISHNA'S RESUME & PORTFOLIO</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="font-mono text-[10px] text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors p-1 uppercase tracking-wider"
                                aria-label="Close chat"
                            >
                                [CLOSE]
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans">
                            {messages.map((msg, i) => (
                                <div key={i} className={"flex " + (msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    <div className={"max-w-[88%] p-3 text-xs leading-relaxed border " + (
                                        msg.role === 'user'
                                            ? 'bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)]'
                                            : 'bg-[var(--color-surface)] text-[var(--color-fg)] border-[var(--color-border)]'
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
                        <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 bg-transparent border border-[var(--color-border)] text-[var(--color-fg)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--color-fg)] transition-colors placeholder:text-[var(--color-subtle)]"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-[var(--color-fg)] text-[var(--color-bg)] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.15em] hover:opacity-90 disabled:opacity-50 transition-opacity"
                            >
                                SEND
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Inverted Toggle Button with Pulse Dot */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[var(--color-fg)] text-[var(--color-bg)] border border-[var(--color-border)] h-10 px-4 text-[10px] font-mono uppercase tracking-[0.15em] hover:bg-transparent hover:text-[var(--color-fg)] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 select-none"
                aria-label="Toggle chat"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-[pulse-dot_2s_ease-in-out_infinite]" />
                <span>{isOpen ? "CLOSE AI" : "ASK AI"}</span>
            </button>
        </motion.div>
    )
}
