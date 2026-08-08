'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AIAssistantButton, AssistantGlyph } from './ai-assistant-button'

const SUGGESTIONS = [
  'What does Krishna build?',
  'Which AI projects has he shipped?',
  'What is his stack?',
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Krishna's AI assistant. Ask me anything about their experience, skills, or projects!",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev)
    window.addEventListener('toggle-ai-assistant', handleToggle)
    return () => window.removeEventListener('toggle-ai-assistant', handleToggle)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    inputRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: text.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) throw new Error('API Error')

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Oops! Something went wrong communicating with the AI. Please try again later.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 14, scale: 0.97, clipPath: 'inset(0 0 12% 0)' }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: 10, scale: 0.98, clipPath: 'inset(0 0 12% 0)' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right', background: 'var(--glass)' }}
            className="ticks flex h-[min(520px,72vh)] w-[min(390px,calc(100vw-3rem))] flex-col border backdrop-blur-2xl"
            role="dialog"
            aria-label="AI assistant"
          >
            <span className="pointer-events-none absolute inset-0 border" style={{ borderColor: 'var(--line-2)' }} />

            {/* Header */}
            <div
              className="relative flex items-center justify-between border-b px-4 py-3"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="flex items-center gap-2.5">
                <AssistantGlyph className="h-4 w-4 text-[var(--fg)]" />
                <div className="leading-tight">
                  <div className="t-label flex items-center gap-2 text-[var(--fg)]">
                    <span className="status-dot" />
                    Assistant
                  </div>
                  <div className="t-mono mt-1 text-[var(--subtle)] uppercase">
                    Portfolio context · online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-line min-h-[30px] px-2.5 text-[0.625rem]"
                aria-label="Close assistant"
              >
                Esc
              </button>
            </div>

            {/* Messages */}
            <div className="relative flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className="max-w-[88%] border px-3 py-2.5 text-[13px] leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'var(--fg)',
                            color: 'var(--bg)',
                            borderColor: 'var(--fg)',
                          }
                        : {
                            background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
                            color: 'var(--muted)',
                            borderColor: 'var(--line)',
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="t-mono border px-3 py-2.5 uppercase text-[var(--subtle)]"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <motion.span
                      animate={{ opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      Retrieving
                    </motion.span>
                  </div>
                </div>
              )}

              {messages.length === 1 && !isLoading && (
                <div className="space-y-1.5 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="group block w-full border px-3 py-2.5 text-left text-[12px] text-[var(--muted)] transition-all duration-200 hover:-translate-y-px hover:text-[var(--fg)]"
                      style={{
                        borderColor: 'var(--line-2)',
                        background:
                          'linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 70%, transparent), color-mix(in srgb, var(--surface) 60%, transparent))',
                        boxShadow: 'inset 0 1px 0 var(--edge-light)',
                      }}
                    >
                      <span className="mr-2 opacity-40">→</span>
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="relative flex gap-2 border-t p-3"
              style={{ borderColor: 'var(--line)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="field t-mono flex-1 uppercase"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="btn-solid min-h-0 self-stretch px-4 disabled:pointer-events-none disabled:opacity-35"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AIAssistantButton
          onClick={() => setIsOpen(!isOpen)}
          label={isOpen ? 'Close assistant' : 'AI Assistant'}
          variant="floating"
          active={isOpen}
        />
      </motion.div>
    </div>
  )
}
