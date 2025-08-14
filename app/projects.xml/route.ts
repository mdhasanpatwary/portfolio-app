import { NextResponse } from "next/server";
import { projects } from "@/data";

export const revalidate = 3600; // 1 hour

export async function GET() {
  const items = projects.items || [];
  const rssItems = items
    .map((p) => {
      const link = p.link || p.demo || `https://patwary.vercel.app/projects`;
      const description = p.longDescription || p.description;
      return `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${link}</link>
    <guid isPermaLink="false">${p.id}</guid>
    <description><![CDATA[${description}]]></description>
  </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MD Hasan Patwary - Projects</title>
    <link>https://patwary.vercel.app/projects</link>
    <description>Latest projects by MD Hasan Patwary</description>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}


