import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as portfolio from '@/data';

// Ensure this route runs in the Node.js runtime (OpenAI SDK requires Node, not Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Keep the full dataset in memory at module load
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
  // cssTips is large; exclude unless explicitly asked
  cssTips: portfolio.cssTips,
  faqs: portfolio.faqs,
} as const;

function buildContextForMessage(message: string) {
  const m = message.toLowerCase();
  const include: Record<string, unknown> = {};

  // Always include general identity, contact basics, and skills (frequent queries)
  include.about = fullData.about;
  include.contact = fullData.contact;
  include.header = fullData.header;
  include.footer = fullData.footer;
  include.skills = fullData.skills;

  if (/(project|portfolio|work\s*sample|case\s*study)/i.test(m)) include.projects = fullData.projects;
  if (/(experience|job|role|company|work\s*history)/i.test(m)) include.experiences = fullData.experiences;
  if (/(education|degree|university|school|college)/i.test(m)) include.education = fullData.education;
  if (/(service|offer|offering|hire)/i.test(m)) include.services = fullData.services;
  if (/(testimonial|review|client\s*say)/i.test(m)) include.testimonials = fullData.testimonials;
  if (/(hobby|interest|fun)/i.test(m)) {
    include.hobbies = fullData.hobbies;
    include.funFacts = fullData.funFacts;
  }
  if (/(faq|question)/i.test(m)) include.faqs = fullData.faqs;
  if (/(css\s*tips?|css3)/i.test(m)) include.cssTips = fullData.cssTips; // opt-in heavy section

  return JSON.stringify(include);
}

// Create OpenAI client (reads from env). Key should be stored in .env.local as OPENAI_API_KEY
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Config via env
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const TEMPERATURE = Number(process.env.OPENAI_TEMPERATURE ?? '0.1');

const SYSTEM_PROMPT = `You are Portfolio AI Chat for MD Hasan Patwary's personal website.
You must answer ONLY using the information found in the provided portfolio JSON context.
If the answer cannot be found strictly in that context, reply exactly:
"Sorry, I don’t have that information in my portfolio."
Be concise and helpful.`;

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
    const { message } = await req.json();

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

    // Short-circuit: very basic guard to reduce hallucinations.
    // We still rely on system prompt to be strict.
    const selectedContext = buildContextForMessage(message);
    const userPrompt = `User question: ${message}\n\nPortfolio JSON Context (stringified):\n${selectedContext}`;

    // Ensure API key exists
    if (!process.env.OPENAI_API_KEY) {
      // Do not expose server details
      return NextResponse.json({
        error: 'Server is not configured with an OpenAI API key.',
      }, { status: 500 });
    }

    // Streaming response to client
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          if (!process.env.OPENAI_API_KEY) {
            console.error('[Portfolio AI] Missing OPENAI_API_KEY. Set it in .env.local and restart the dev server.');
            controller.enqueue(encoder.encode('Sorry, I don’t have that information in my portfolio.'));
            controller.close();
            return;
          }

          // Debug: log model/config and context keys
          try {
            const contextKeys = Object.keys(JSON.parse(selectedContext || '{}'));
            console.log('[Portfolio AI] Request', {
              model: MODEL,
              temperature: isFinite(TEMPERATURE) ? TEMPERATURE : 0.1,
              messagePreview: (typeof message === 'string' ? message : '').slice(0, 120),
              contextKeys,
            });
          } catch {
            console.warn('[Portfolio AI] Failed to parse selectedContext for logging');
          }

          const completion = await openai.chat.completions.create({
            model: MODEL,
            temperature: isFinite(TEMPERATURE) ? TEMPERATURE : 0.1,
            stream: true,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: userPrompt },
            ],
          });

          let wroteAny = false;
          for await (const chunk of completion) {
            const delta = chunk.choices?.[0]?.delta?.content || '';
            if (delta) {
              wroteAny = true;
              controller.enqueue(encoder.encode(delta));
            }
          }

          if (!wroteAny) {
            console.warn('[Portfolio AI] OpenAI returned no content tokens (empty stream)');
            controller.enqueue(encoder.encode('Sorry, I don’t have that information in my portfolio.'));
          }
          controller.close();
        } catch (e) {
          // On error, return fallback
          console.error('[Portfolio AI] Streaming error', e);
          controller.enqueue(encoder.encode('Sorry, I don’t have that information in my portfolio.'));
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
