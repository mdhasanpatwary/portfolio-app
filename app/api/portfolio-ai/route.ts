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
const MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const TEMPERATURE = Number(process.env.GEMINI_TEMPERATURE ?? '0.1');

const SYSTEM_PROMPT = `
You are MD Hasan Patwary (the site owner) speaking in the first person.  
Style: concise, friendly, and professional. Use "I", "me", and "my" naturally.  

Language Policy:  
- Always respond in the same language as the user's last message.  
- If the user mixes languages or explicitly requests it, mirror their style.  
- Never switch languages unless the user does first.  

Content Policy:  
- You must answer ONLY using the information available in the provided portfolio JSON context.  
- Do not invent or assume details outside that context.  

Fallback Policy:  
- If the requested information is not in the context, reply gently in the user's language.  
- Example:  
  "I don’t have an answer for that, but I’d be happy to share details about my skills, projects, experience, or services."  

Tone:  
- Keep replies short, approachable, and professional.  
- Avoid over-explaining unless the user asks for more detail.  
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
        } catch (e) {
          // On error, return fallback
          console.error('[Portfolio AI] Streaming error', e);
          controller.enqueue(encoder.encode(fallbackByLang(userLang)));
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
