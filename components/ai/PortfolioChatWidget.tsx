'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function PortfolioChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      // Seed a welcome message once when opened
      if (messages.length === 0) {
        setMessages([
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content:
              "Hi! I’m Hasan. Ask me anything about my skills, projects, experience, education, services, or how to contact me.",
          },
        ])
      }
    }
  }, [open, messages.length])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  async function sendMessage() {
    const question = input.trim()
    if (!question || loading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: question }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/portfolio-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          // send last 10 turns to give server conversation context
          history: messages.slice(-10).map(({ role, content }) => ({ role, content })),
        }),
      })
      if (!res.ok || !res.body) {
        // Attempt to parse an error message
        let fallback = "I couldn’t find that in my portfolio data. If you can share more specifics or ask about my skills, projects, experience, education, services, or contact details, I’ll do my best to help."
        try {
          const data = await res.json()
          if (data?.error) fallback = String(data.error)
        } catch {}
        const botMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: fallback }
        setMessages((prev) => [...prev, botMsg])
        return
      }

      // Stream handling
      const botId = crypto.randomUUID()
      const newBot: Message = { id: botId, role: 'assistant', content: '' }
      setMessages((prev) => [...prev, newBot])

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = value ? decoder.decode(value) : ''
        if (chunkValue) {
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, content: m.content + chunkValue } : m))
          )
        }
      }
    } catch {
      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I couldn’t find that in my portfolio data. If you can share more specifics or ask about my skills, projects, experience, education, services, or contact details, I’ll do my best to help.",
      }
      setMessages((prev) => [...prev, botMsg])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Open Portfolio AI Chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 h-14 w-14 flex items-center justify-center"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M8.25 9A.75.75 0 0 1 9 8.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 9ZM9 11.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5H9Z" />
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm9.75-8.25a8.25 8.25 0 1 0 6.61 13.298c.368-.45.64-1.026.64-1.673 0-.77-.36-1.402-.827-1.869C16.77 12.705 15.17 12 12 12c-3.665 0-5.25 2.04-5.25 3.375 0 .647.272 1.223.64 1.673A8.25 8.25 0 0 0 12 3.75Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 z-40 w-80 sm:w-96 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
            <h3 className="text-sm font-semibold">Portfolio AI Chat</h3>
            <button
              aria-label="Close chat"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="max-h-96 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={
                    'inline-block rounded-2xl px-3 py-2 text-sm ' +
                    (m.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100')
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block rounded-2xl px-3 py-2 text-sm bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, projects, experience..."
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm disabled:opacity-50 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
