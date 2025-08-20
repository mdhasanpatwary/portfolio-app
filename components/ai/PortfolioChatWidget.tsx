'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FiMessageSquare, FiX } from 'react-icons/fi'
import { RiArrowLeftUpLine } from 'react-icons/ri'

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
  // Resizable container state
  const [size, setSize] = useState({ width: 320, height: 480 })
  const resizingRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null)
  const MIN_W = 280
  const MIN_H = 320
  const MAX_W = 640
  const MAX_H = 720

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

  // Resize handlers (top-left handle)
  function onResizeStart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    resizingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    }
    window.addEventListener('mousemove', onResizing)
    window.addEventListener('mouseup', onResizeEnd)
  }

  function onResizing(e: MouseEvent) {
    const ctx = resizingRef.current
    if (!ctx) return
    const dx = e.clientX - ctx.startX
    const dy = e.clientY - ctx.startY
    // Top-left handle: moving mouse right/down decreases the shrink amount
    const viewportMaxW = Math.min(MAX_W, Math.floor(window.innerWidth * 0.95))
    const viewportMaxH = Math.min(MAX_H, Math.floor(window.innerHeight * 0.8))
    const newW = Math.min(viewportMaxW, Math.max(MIN_W, ctx.startW - dx))
    const newH = Math.min(viewportMaxH, Math.max(MIN_H, ctx.startH - dy))
    setSize({ width: newW, height: newH })
  }

  function onResizeEnd() {
    window.removeEventListener('mousemove', onResizing)
    window.removeEventListener('mouseup', onResizeEnd)
    resizingRef.current = null
  }

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
        let fallback = "Sorry, that isn’t included in my current context. If you’d like, you can ask me about my skills, projects, experience, education, services, or contact details, and I’ll be happy to share."
        try {
          const data = await res.json()
          if (data?.error) fallback = String(data.error)
        } catch { }
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
        content: "Sorry, that isn’t included in my current context. If you’d like, you can ask me about my skills, projects, experience, education, services, or contact details, and I’ll be happy to share.",
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
        className="fixed bottom-5 right-5 z-40 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 h-14 w-14 flex items-center justify-center cursor-pointer"
      >
        {open ? (
          <FiX className="h-6 w-6" />
        ) : (
          <FiMessageSquare className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-20 right-5 z-50 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl overflow-hidden flex flex-col text-xs"
          style={{ width: size.width, height: size.height, maxHeight: '80vh', maxWidth: '95vw' }}
        >
          {/* Top-left resize handle */}
          <div
            onMouseDown={onResizeStart}
            className="absolute top-[1px] left-[1px] h-5 w-5 cursor-nwse-resize text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
            title="Resize"
          >
            <RiArrowLeftUpLine className="h-3 w-3" />
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 className="text-base font-semibold">Hasan&apos;s Assistant</h3>
            <button
              aria-label="Close chat"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
              onClick={() => setOpen(false)}
              title="Close"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={
                    'inline-block rounded-2xl px-3 py-2 text-xs ' +
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
                <div className="inline-block rounded-2xl px-3 py-2 text-xs bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100">
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
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-xs placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-lg bg-blue-600 text-white px-3 py-2 text-xs disabled:opacity-50 hover:bg-blue-700 cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}

