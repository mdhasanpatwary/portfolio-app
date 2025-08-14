import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    // Proxy Dev.to RSS feed for the user to provide a stable RSS endpoint
    const devtoRss = await fetch(
      "https://dev.to/feed/mdhassanpatwary",
      { next: { revalidate } }
    );
    if (!devtoRss.ok) {
      return new NextResponse("", {
        status: 200,
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
      });
    }
    const rssText = await devtoRss.text();
    return new NextResponse(rssText, {
      status: 200,
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  } catch {
    return new NextResponse("", {
      status: 200,
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  }
}


