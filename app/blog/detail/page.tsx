import PageTitle from "@/components/global/PageTitle";
import SectionTitle from "@/components/global/SectionTitle";
import { CustomImage } from "@/components/global";
import { FaPenNib, FaTags, FaFolderOpen, FaQuoteLeft } from "react-icons/fa";
import type { Metadata } from "next";
import Link from "next/link";
import blogData from "@/data/blog.json";

export const metadata: Metadata = {
  title: "Blog Details",
  description: "Read the full article with insights and best practices.",
};

export default function StaticBlogDetailPage() {
  type SidebarPost = (typeof blogData.posts)[number];
  const posts = (blogData.posts || []) as SidebarPost[];
  const latestPosts = posts.slice(0, 5);
  const normalizeTags = (tagList: unknown): string[] => {
    if (Array.isArray(tagList)) return tagList as string[];
    if (typeof tagList === "string")
      return tagList.split(",").map((t: string) => t.trim());
    return [];
  };
  const allTags = Array.from(
    new Set(posts.flatMap((p) => normalizeTags(p.tag_list)))
  );
  const categories = Array.from(
    new Set(posts.flatMap((p) => normalizeTags(p.tag_list)))
  ).slice(0, 6);

  // Static demo content modeled after the referenced article
  const title = "Restaurant Employer Read Clients’ Orders on His iPad";
  const subtitle =
    "A look at how thoughtful UX and simple tooling can streamline in-restaurant ordering experiences.";
  const coverImage = "/images/blog/blog-1.jpg";
  const author = "Adam Joseph Scott";
  const date = new Date("2025-01-15T10:00:00Z").toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readingTime = 8;
  const articleTags = ["ux", "case-study", "ios", "design", "process"];

  return (
    <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main: 9 columns */}
        <div className="lg:col-span-9">
          <SectionTitle
            title={title}
            className="text-left text-2xl md:text-3xl"></SectionTitle>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600 dark:text-gray-300 mb-8 -mt-3 sm:-mt-6">
            <span>{author}</span>
            <span>• {date}</span>
            <span>• {readingTime} min read</span>
          </div>

          {/* Main image with height limit */}
          <div className="mb-6 overflow-hidden rounded-lg shadow-md h-72 md:h-96">
            <CustomImage
              src={coverImage}
              alt={title}
              width={1200}
              height={630}
              className="w-full h-full object-cover"
              blurType="default"
              priority
            />
          </div>

          {/* Article content structured like the referenced demo */}
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed prose-p:my-5 prose-headings:mt-10 prose-headings:mb-4 prose-ul:my-5 prose-li:my-1">
            <p>
              It’s no secret that hospitality moves fast. Between front-of-house
              bustle and back-of-house coordination, the smallest friction can
              ripple through service. On a recent visit, I watched a restaurant
              employer seamlessly read and manage clients’ orders on his iPad —
              a surprisingly delightful experience that revealed how small UX
              decisions make a big impact.
            </p>

            <h2>Why Integrate Side Projects?</h2>
            <p>
              Balancing operations and innovation is hard. But investing in
              small, focused experiments helps teams prototype better flows,
              validate assumptions, and reduce long-term risk — especially when
              technology directly supports a customer experience.
            </p>

            <blockquote className="border-l-4 border-primary-400/60 pl-5 py-4 bg-primary-50/60 dark:bg-gray-800/60 rounded-md mb-4">
              <p className="italic text-gray-800 dark:text-gray-200">
                <FaQuoteLeft className="inline mr-2 text-primary-500" />
                People think focus means saying yes to the thing you’ve got to
                focus on. But it means saying no to the hundred other good
                ideas.
              </p>
            </blockquote>

            <h3>Observations From the Floor</h3>
            <ul>
              <li>
                <strong>Readable at a glance</strong>: large type, high
                contrast, clear grouping.
              </li>
              <li>
                <strong>Lightweight interactions</strong>: single-tap actions
                for status updates.
              </li>
              <li>
                <strong>Progressive disclosure</strong>: extra details hidden
                until needed.
              </li>
            </ul>

            <h3>Design Principles Applied</h3>
            <p>
              The interface prioritized clarity over customization. Orders were
              bucketed by state, timestamps were humanized, and critical actions
              were always visible. With predictable patterns, staff didn’t have
              to “learn” the tool — they could just use it.
            </p>

            <h2>Takeaways</h2>
            <p>
              Great service is equal parts people and process. When tools
              respect real-world constraints and context, they disappear —
              leaving room for hospitality to shine.
            </p>
          </div>

          {/* Related Posts */}
          <hr className="my-10 border-primary-100 dark:border-primary-800" />
          <SectionTitle
            title="Related Posts"
            className="mb-6 text-left text-xl"
            icon={
              <FaPenNib className="text-primary-600 dark:text-primary-400 text-lg" />
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.slice(0, 3).map((p) => (
              <Link key={p.id} href="/blog/detail" className="group">
                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                  {p.cover_image ? (
                    <CustomImage
                      src={p.cover_image}
                      alt={p.title}
                      width={400}
                      height={240}
                      className="w-full h-40 object-cover"
                      blurType="default"
                    />
                  ) : null}
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                      {p.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Comments */}
          <hr className="my-10 border-primary-100 dark:border-primary-800" />
          <SectionTitle
            title="Comments"
            className="mb-6 text-left text-xl"
            icon={
              <FaPenNib className="text-primary-600 dark:text-primary-400 text-lg" />
            }
          />
          <div className="space-y-6">
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                Jane Doe
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Great article! The Next.js 15 tips were spot on.
              </p>
              <div className="mt-3 pl-4 border-l-2 border-primary-200 dark:border-primary-800">
                <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                  Author reply
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Thanks Jane! Glad you found it helpful.
                </p>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                Mark Lee
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Could you expand on the performance section?
              </p>
            </div>
          </div>

          {/* Comment form at the bottom */}
          <hr className="my-10 border-primary-100 dark:border-primary-800" />
          <SectionTitle
            title="Leave a Reply"
            className="mb-6 text-left text-xl"
            icon={
              <FaPenNib className="text-primary-600 dark:text-primary-400 text-lg" />
            }
          />
          <form className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Comment
              </label>
              <textarea
                rows={5}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-5 py-2 bg-primary-700 text-white text-sm font-medium rounded hover:bg-primary-800 dark:hover:bg-primary-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500">
                Post Comment
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar: 3 columns */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <FaPenNib className="text-primary-600 dark:text-primary-400" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Latest Posts
              </h3>
            </div>
            <ul className="space-y-3">
              {latestPosts.map((p) => (
                <li key={p.id} className="text-sm">
                  <Link
                    href="/blog/detail"
                    className="flex items-center gap-3 group">
                    {p.cover_image ? (
                      <CustomImage
                        src={p.cover_image}
                        alt={p.title}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-md object-cover border border-gray-200 dark:border-gray-700"
                        blurType="default"
                      />
                    ) : null}
                    <span className="text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <FaTags className="text-primary-600 dark:text-primary-400" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 20).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <FaFolderOpen className="text-primary-600 dark:text-primary-400" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Categories
              </h3>
            </div>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li
                  key={c}
                  className="text-sm text-gray-800 dark:text-gray-200">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
