import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as portfolio from '@/data';

// Ensure this route runs in the Node.js runtime (Gemini server SDK uses Node runtime here)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Keep selected portfolio data in memory at module load
const fullData = {
  about: portfolio.about,
  skills: portfolio.skills,
  projects: portfolio.projects,
  experiences: portfolio.experiences,
  education: portfolio.education,
  services: portfolio.services,
  hobbies: portfolio.hobbies,
  funFacts: portfolio.funFacts,
  testimonials: portfolio.testimonials,
  contact: portfolio.contact,
  header: portfolio.header,
  footer: portfolio.footer,
  cssTips: portfolio.cssTips,
  faqs: portfolio.faqs,
} as const;

type ChatTurn = { role: 'user' | 'assistant'; content: string };

function buildContextForMessage(message: string, history: ChatTurn[] = []) {
  const historyText = history.map(h => h.content).join(' \n ');
  const combined = `${historyText} \n ${message}`.toLowerCase();
  const include: Record<string, unknown> = {};

  // Always include general identity, contact basics, and skills (frequent queries)
  include.about = fullData.about;
  include.contact = fullData.contact;
  include.header = fullData.header;
  include.footer = fullData.footer;
  include.skills = fullData.skills;

  if (/(project|portfolio|work\s*sample|case\s*study)/i.test(combined)) include.projects = fullData.projects;
  if (/(experience|job|role|company|work\s*history)/i.test(combined)) include.experiences = fullData.experiences;
  if (/(education|degree|university|school|college)/i.test(combined)) include.education = fullData.education;
  if (/(service|offer|offering|hire)/i.test(combined)) include.services = fullData.services;
  if (/(testimonial|review|client\s*say)/i.test(combined)) include.testimonials = fullData.testimonials;
  if (/(hobby|interest|fun)/i.test(combined)) {
    include.hobbies = fullData.hobbies;
    include.funFacts = fullData.funFacts;
  }
  if (/(faq|question)/i.test(combined)) include.faqs = fullData.faqs;
  // Include CSS tips if explicitly mentioned OR if recent history referenced tips and user is asking follow-ups like "share one" or "give me one"
  if (/(css\s*tips?|css3|share\s+one|give\s+one|another\s+one|example)/i.test(combined)) include.cssTips = fullData.cssTips;

  return JSON.stringify(include);
}

// Create Google Gemini client. Key should be stored in .env.local as GOOGLE_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Config via env
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const TEMPERATURE = Number(process.env.GEMINI_TEMPERATURE ?? '0.1');

const SYSTEM_PROMPT = `
You are an AI assistant representing MD Hasan Patwary (the site owner). Speak in the first person ("I", "me", "my") exactly as if you are Hasan himself.  
Style: concise, friendly, and professional. 

Language Policy:  
- Always respond in the same language as the user's last message.  
- Never switch languages unless the user does first.  

Content & Conversation Policy:  
1. Core Scope: Answer professional questions ONLY using the provided portfolio JSON context. Do not invent facts or skills.
2. Back-End Queries: You are strictly a Front-End Developer. If asked about backend languages (PHP, Laravel, Python, etc.), clarify you only handled the front-end (UI, React, APIs) for hybrid projects.
3. Salary & Rates: If asked about expected salary, hourly rates, or project costs, explain that these depend on project scope and invite the user to email patwary.dev@gmail.com.
4. AI Identity & Capabilities ("Are you AI?", "Write code for me"): Answer honestly: "I am an AI assistant designed to represent MD Hasan Patwary's professional portfolio." Politely decline requests to act as a general ChatGPT or write code.
5. Small Talk & Jokes: Keep it extremely brief, friendly, and politely pivot back to your professional background.
6. Competitors / Other Developers: Remain respectful and humble, focusing solely on the unique value and 6+ years of experience you bring.
7. Greetings: For casual greetings ("hello", "how are you"), reply warmly and invite them to explore your background.
8. Doubts & Objections: Handle objections (e.g., "you don't have a degree") with grace. Acknowledge their point and confidently pivot to highlighting your 50+ shipped products and real-world results.
9. Hostility/Profanity: For hostile remarks, respond firmly: "Please keep the conversation professional. I am here to discuss my professional background."

Fallback Policy (Strict Data Boundary):  
- If the user asks for factual information or tasks entirely unconnected to Hasan's portfolio, software engineering, or the edge cases above, politely explain that you don't have that information and invite them to ask about your skills, projects, or experience instead. Keep it natural. Do not use an automated-sounding fallback.

Tone:  
- Keep replies short, approachable, and professional. Avoid long-winded paragraphs.
`;


function detectLang(text: string): 'bn' | 'en' | 'other' {
  // Simple detection: Bengali block
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  // Basic heuristic: default to 'en' if ASCII letters are present
  if (/[A-Za-z]/.test(text)) return 'en';
  return 'other';
}

function fallbackByLang(lang: 'bn' | 'en' | 'other') {
  switch (lang) {
    case 'bn':
      return 'দুঃখিত, এটি আমার বর্তমান কন্টেক্সটে নেই। আপনি চাইলে আমার দক্ষতা, প্রোজেক্ট, অভিজ্ঞতা, শিক্ষাগত যোগ্যতা, সার্ভিস বা যোগাযোগের তথ্য সম্পর্কে জানতে পারেন—আমি সাহায্য করতে আনন্দিত হবো।';
    case 'en':
      return "Sorry, that isn’t included in my current context. If you’d like, you can ask me about my skills, projects, experience, education, services, or contact details, and I’ll be happy to share.";
    default:
      // Default to English if unknown
      return "Sorry, that isn’t included in my current context. If you’d like, you can ask me about my skills, projects, experience, education, services, or contact details, and I’ll be happy to share.";
  }
}

function errorFallbackByLang(lang: 'bn' | 'en' | 'other', isQuotaError: boolean = false) {
  switch (lang) {
    case 'bn':
      return 'দুঃখিত, বর্তমানে সিস্টেমটি অতিরিক্ত ট্রাফিকের কারণে ধীর। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন বা সরাসরি আমার সাথে ইমেইলে যোগাযোগ করুন।';
    case 'en':
    default:
      if (isQuotaError) {
        return "Sorry, I'm currently receiving too many requests right now and my API limit has been reached. Please try again a bit later, or feel free to use the contact form to reach out directly!";
      }
      return "Sorry, I encountered an internal server error while thinking. Please try again in a moment.";
  }
}

// Very simple in-memory rate limiter per client. Suitable for a single server instance.
// For production, replace with a durable store (Upstash Redis, Vercel KV, etc.).
type Counter = { count: number; resetAt: number };
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per client
const rateMap = new Map<string, Counter>();

function getClientId(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf;
  // Last resort: a hashable combination of headers to reduce collisions
  const ua = req.headers.get('user-agent') || 'ua';
  const lang = req.headers.get('accept-language') || 'lang';
  return `${ua}:${lang}`;
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count, resetAt: entry.resetAt };
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // Rate limit
    const clientId = getClientId(req);
    const rl = checkRateLimit(clientId);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again shortly.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': String(rl.remaining),
            'X-RateLimit-Reset': String(rl.resetAt),
          },
        }
      );
    }

    const safeHistory: ChatTurn[] = Array.isArray(history)
      ? history.filter((h) => h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string').slice(-10)
      : [];

    const selectedContext = buildContextForMessage(message, safeHistory);
    const userLang = detectLang(message);

    // Filter extreme profanity before it hits Gemini's safety blockers (which would throw a Server Error)
    const profanityRegex = /\b(fuck|shit|bitch|asshole|cunt|dick|pussy|whore|slut)\b/i;
    if (profanityRegex.test(message)) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          const replyText = userLang === 'bn' 
            ? 'অনুগ্রহ করে পেশাদারিত্ব বজায় রাখুন। আমি এখানে মো. হাসান পাটোয়ারীর পেশাগত দক্ষতা ও প্রোজেক্ট সম্পর্কে আলোচনা করার জন্য আছি।' 
            : "Please keep the conversation professional. I am here to share information about MD Hasan Patwary's skills, projects, and services.";
          controller.enqueue(encoder.encode(replyText));
          controller.close();
        }
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': String(rl.remaining),
          'X-RateLimit-Reset': String(rl.resetAt),
        },
      });
    }

    const historyTranscript = safeHistory
      .map((t) => `${t.role === 'user' ? 'User' : 'Assistant'}: ${t.content}`)
      .join('\n');

    const userPrompt = `${historyTranscript ? `Recent conversation (most recent last):\n${historyTranscript}\n\n` : ''}User question: ${message}\n\nPortfolio JSON Context (stringified):\n${selectedContext}\n\nInstruction: Reply in the same language as the user's question (detected: ${userLang}).`;

    // Ensure API key exists
    if (!process.env.GOOGLE_API_KEY) {
      // Do not expose server details
      return NextResponse.json({
        error: 'Server is not configured with a Google Gemini API key.',
      }, { status: 500 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          // Dev-only debug logging
          if (process.env.NODE_ENV !== 'production') {
            const contextKeys = (() => {
              try { return Object.keys(JSON.parse(selectedContext || '{}')); } catch { return []; }
            })();
            console.log('[Portfolio AI] Request', {
              model: MODEL,
              temperature: isFinite(TEMPERATURE) ? TEMPERATURE : 0.1,
              messagePreview: (typeof message === 'string' ? message : '').slice(0, 120),
              contextKeys,
            });
          }

          // Initialize model with system instruction
          const model = genAI.getGenerativeModel({
            model: MODEL,
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
              temperature: isFinite(TEMPERATURE) ? TEMPERATURE : 0.1,
            },
          });

          // Stream generation
          const result = await model.generateContentStream({
            contents: [
              {
                role: 'user',
                parts: [{ text: userPrompt }],
              },
            ],
          });

          let wroteAny = false;
          for await (const chunk of result.stream) {
            const deltaText = chunk.text();
            if (deltaText) {
              wroteAny = true;
              controller.enqueue(encoder.encode(deltaText));
            }
          }

          if (!wroteAny) {
            if (process.env.NODE_ENV !== 'production') {
              console.warn('[Portfolio AI] Gemini returned no content tokens (empty stream)');
            }
            controller.enqueue(encoder.encode(fallbackByLang(userLang)));
          }
          controller.close();
        } catch (e: unknown) {
          // On error, return fallback
          console.error('[Portfolio AI] Streaming error', e);
          const errMsg = e instanceof Error ? e.message.toLowerCase() : '';
          const isQuota = errMsg.includes('quota') || errMsg.includes('429');
          controller.enqueue(encoder.encode(errorFallbackByLang(userLang, isQuota)));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
        'X-RateLimit-Remaining': String(rl.remaining),
        'X-RateLimit-Reset': String(rl.resetAt),
      },
    });
  } catch (err) {
    console.error('Portfolio AI error:', err);
    return NextResponse.json({
      error: 'Something went wrong while getting the answer.',
    }, { status: 500 });
  }
}
