'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FiMessageSquare, FiX } from 'react-icons/fi'
import { RiArrowLeftUpLine } from 'react-icons/ri'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

// Language awareness helpers (moved outside component for stable references)
type Lang = 'bn' | 'en' | 'other'

function detectLang(text: string): Lang {
  if (/[\u0980-\u09FF]/.test(text)) return 'bn'
  if (/[A-Za-z]/.test(text)) return 'en'
  return 'other'
}

function fallbackByLang(lang: Lang) {
  switch (lang) {
    case 'bn':
      return 'দুঃখিত, এটি আমার বর্তমান কন্টেক্সটে নেই। আপনি চাইলে আমার দক্ষতা, প্রোজেক্ট, অভিজ্ঞতা, শিক্ষাগত যোগ্যতা, সার্ভিস বা যোগাযোগের তথ্য সম্পর্কে জানতে পারেন—আমি সাহায্য করতে আনন্দিত হবো।'
    case 'en':
      return "Sorry, that isn’t included in my current context. If you’d like, you can ask me about my skills, projects, experience, education, services, or contact details, and I’ll be happy to share."
    default:
      return "Sorry, that isn’t included in my current context. If you’d like, you can ask me about my skills, projects, experience, education, services, or contact details, and I’ll be happy to share."
  }
}

function welcomeByLang(lang: Lang) {
  switch (lang) {
    case 'bn':
      return 'হাই! আমি হাসান। আমার দক্ষতা, প্রোজেক্ট, অভিজ্ঞতা, শিক্ষা, সার্ভিস কিংবা যোগাযোগের তথ্য নিয়ে যেকোনো প্রশ্ন করুন।'
    case 'en':
      return "Hi! I’m Hasan. Ask me anything about my skills, projects, experience, education, services, or how to contact me."
    default:
      return "Hi! I’m Hasan. Ask me anything about my skills, projects, experience, education, services, or how to contact me."
  }
}

function placeholderByLang(lang: Lang) {
  switch (lang) {
    case 'bn':
      return 'দক্ষতা, প্রোজেক্ট, অভিজ্ঞতা সম্পর্কে জিজ্ঞেস করুন...'
    case 'en':
      return 'Ask about skills, projects, experience...'
    default:
      return 'Ask about skills, projects, experience...'
  }
}

export default function PortfolioChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const lastActiveRef = useRef<Element | null>(null)
  // Resizable container state
  const [size, setSize] = useState({ width: 320, height: 480 })
  const resizingRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null)
  const MIN_W = 280
  const MIN_H = 320
  const MAX_W = 640
  const MAX_H = 720
  // Track visual viewport height to handle mobile keyboards
  const [vvh, setVvh] = useState<number>(typeof window !== 'undefined' ? (window.visualViewport?.height ?? window.innerHeight) : 800)
  // Language awareness
  const [userLang, setUserLang] = useState<Lang>('en')

  useEffect(() => {
    // Detect browser language initially
    if (typeof navigator !== 'undefined') {
      const lang = navigator.language?.toLowerCase() || ''
      setUserLang(lang.startsWith('bn') ? 'bn' : lang ? 'en' : 'en')
    }
  }, [])

  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement
      // Seed a welcome message once when opened
      if (messages.length === 0) {
        setMessages([
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: welcomeByLang(userLang),
          },
        ])
      }
      // Focus input when opening
      setTimeout(() => inputRef.current?.focus(), 0)

      // Key handling: Escape to close, and focus trap with Tab
      const onKeyDown = (e: KeyboardEvent) => {
        if (!open) return
        if (e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
        }
      }
      document.addEventListener('keydown', onKeyDown)

      const trap = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return
        const root = chatRef.current
        if (!root) return
        const focusables = root.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (active === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
      const node = chatRef.current
      node?.addEventListener('keydown', trap)

      return () => {
        document.removeEventListener('keydown', onKeyDown)
        node?.removeEventListener('keydown', trap)
      }
    } else {
      // Restore focus to the toggle button when closing
      const last = toggleBtnRef.current ?? (lastActiveRef.current as HTMLElement | null)
      last?.focus?.()
    }
  }, [open, messages.length, userLang])

  // Listen to visual viewport changes (keyboard open/close) to keep widget in view
  useEffect(() => {
    function handleResize() {
      const next = window.visualViewport?.height ?? window.innerHeight
      setVvh(next)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Scroll latest message into view without reading layout metrics
    const container = scrollRef.current
    if (!container) return
    requestAnimationFrame(() => {
      const last = container.lastElementChild as HTMLElement | null
      last?.scrollIntoView({ block: 'end', behavior: 'smooth' })
    })
  }, [messages, open])

  // Resize handlers (top-left handle) using Pointer Events (mouse, touch, pen)
  function onResizeStart(e: React.PointerEvent) {
    e.preventDefault()
    e.stopPropagation()
    resizingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    }
    window.addEventListener('pointermove', onResizing)
    window.addEventListener('pointerup', onResizeEnd)
  }

  function onResizing(e: PointerEvent) {
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
    window.removeEventListener('pointermove', onResizing)
    window.removeEventListener('pointerup', onResizeEnd)
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
        let fallback = fallbackByLang(detectLang(question) || userLang)
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
        content: fallbackByLang(detectLang(question) || userLang),
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
        ref={toggleBtnRef}
        aria-expanded={open}
        aria-controls="ai-chat-dialog"
        className="fixed bottom-5 right-5 z-40 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 h-14 w-14 flex items-center justify-center cursor-pointer"
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
          ref={chatRef}
          id="ai-chat-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-title"
          className="fixed right-5 z-50 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl overflow-hidden flex flex-col text-xs"
          style={{
            // Keep above safe areas and keyboard: inline style overrides any class bottom-*
            bottom: 'calc(5rem + env(safe-area-inset-bottom))',
            width: size.width,
            // Cap height to 80% of the visual viewport (works with on-screen keyboards)
            height: Math.min(size.height, Math.min(MAX_H, Math.floor(vvh * 0.8))),
            maxWidth: '90vw',
          }}
        >
          {/* Top-left resize handle */}
          <div
            onPointerDown={onResizeStart}
            className="absolute top-[1px] left-[1px] h-5 w-5 cursor-nwse-resize text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 touch-none select-none"
            title="Resize"
          >
            <RiArrowLeftUpLine className="h-3 w-3" />
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h3 id="ai-chat-title" className="text-base font-semibold">Hasan&apos;s Assistant</h3>
            <button
              aria-label="Close chat"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 p-1 cursor-pointer"
              onClick={() => setOpen(false)}
              title="Close"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
            role="log"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={
                    'inline-block rounded-2xl px-3 py-2 text-xs ' +
                    (m.role === 'user'
                      ? 'bg-primary-600 text-white'
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
              placeholder={placeholderByLang(userLang)}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-xs placeholder:text-xs focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
              onFocus={() => {
                // Ensure latest messages are visible when keyboard opens without layout reads
                requestAnimationFrame(() => {
                  const container = scrollRef.current
                  const last = container?.lastElementChild as HTMLElement | null
                  last?.scrollIntoView({ block: 'end', behavior: 'smooth' })
                })
              }}
              ref={inputRef}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-lg bg-primary-600 text-white px-3 py-2 text-xs disabled:opacity-50 hover:bg-primary-700 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}

