'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[var(--background)]/80 backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600/10 p-2 rounded-full">
                                    <Bot className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-[var(--foreground)]">Krishna's AI</h3>
                                    <p className="text-xs text-[var(--muted)]">Ask about my resume</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-[var(--foreground)]/10 text-[var(--muted)] transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={"flex " + (msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    <div className={"max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed " + (
                                        msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-sm'
                                            : 'bg-[var(--foreground)]/5 text-[var(--foreground)] border border-[var(--border)] rounded-bl-sm'
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[var(--foreground)]/5 border border-[var(--border)] rounded-2xl rounded-bl-sm px-4 py-2.5 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-[var(--muted)]" />
                                        <span className="text-sm text-[var(--muted)]">Thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask a question..."
                                    className="w-full bg-[var(--foreground)]/5 border border-[var(--border)] text-[var(--foreground)] rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-[var(--muted)]"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                                    aria-label="Send message"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label="Toggle chat"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    )
}
