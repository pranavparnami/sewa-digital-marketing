import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 transition-colors mb-8"
      >
        ← Back to Blog
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-800 font-medium">
          {post.category}
        </span>
        <span className="text-xs text-stone-400">{post.readTime}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 leading-tight mb-4">
        {post.title}
      </h1>

      <p className="text-stone-500 text-lg mb-8">{post.excerpt}</p>

      <div className="flex items-center gap-4 text-sm text-stone-400 mb-10 pb-8 border-b border-stone-200">
        <span>
          Published:{" "}
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span>|</span>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-stone prose-lg max-w-none">
        {post.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="text-2xl font-bold text-stone-900 mt-10 mb-4"
              >
                {line.replace("## ", "")}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3
                key={i}
                className="text-xl font-semibold text-stone-900 mt-8 mb-3"
              >
                {line.replace("### ", "")}
              </h3>
            );
          }
          if (line.startsWith("- **")) {
            const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
            if (match) {
              return (
                <div key={i} className="flex gap-2 text-base my-1 ml-4">
                  <span className="text-stone-400">—</span>
                  <span>
                    <strong>{match[1]}</strong> — {match[2]}
                  </span>
                </div>
              );
            }
            return (
              <li key={i} className="text-base text-stone-700 ml-4">
                {line.replace("- ", "")}
              </li>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <li key={i} className="text-base text-stone-700 ml-4">
                {line.replace("- ", "")}
              </li>
            );
          }
          if (line.startsWith("|")) {
            return (
              <span key={i} className="block font-mono text-xs text-stone-500">
                {line}
              </span>
            );
          }
          if (line.match(/^\d\./)) {
            return (
              <p key={i} className="text-base text-stone-700 ml-4">
                {line}
              </p>
            );
          }
          if (line.trim() === "") {
            return <div key={i} className="h-2" />;
          }
          return (
            <p key={i} className="text-base text-stone-700 leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>

      <div className="mt-16 pt-8 border-t border-stone-200">
        <h3 className="text-lg font-semibold text-stone-900 mb-4">
          Share this article
        </h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full border border-stone-200 text-sm text-stone-600 hover:border-amber-300 hover:text-amber-700 transition-colors">
            Twitter
          </button>
          <button className="px-4 py-2 rounded-full border border-stone-200 text-sm text-stone-600 hover:border-amber-300 hover:text-amber-700 transition-colors">
            Facebook
          </button>
          <button className="px-4 py-2 rounded-full border border-stone-200 text-sm text-stone-600 hover:border-amber-300 hover:text-amber-700 transition-colors">
            Copy Link
          </button>
        </div>
      </div>
    </article>
  );
}
