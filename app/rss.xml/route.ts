import { NextResponse } from "next/server";
import blogData from "@/data/blog.json";
import { getGlobalMetadata } from "@/utils/metadata";

export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const globalConfig = getGlobalMetadata();
    const posts = blogData.posts;
    
    const rssItems = posts
      .map((post) => {
        const link = `${globalConfig.domain}/blog/${post.id}`;
        const description = post.content || post.description;
        const pubDate = new Date(post.published_at).toUTCString();
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="false">${post.id}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${globalConfig.author}</author>
    </item>`;
      })
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${globalConfig.author} - Blog</title>
    <link>${globalConfig.domain}/blog</link>
    <description>Latest blog posts by ${globalConfig.author}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
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


