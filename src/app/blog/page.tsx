import { blogPosts } from "@/lib/blog";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Blog
        </h1>
        <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
          Insights on fragrances, wellness, home decor, and e-commerce — from
          the SEWA team
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-800 font-medium">
                  {post.category}
                </span>
                <span className="text-xs text-stone-400">{post.readTime}</span>
              </div>
              <h2 className="font-semibold text-lg text-stone-900 mb-2 group-hover:text-amber-800 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-sm font-medium text-amber-700 group-hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-stone-500 text-sm">
          More articles coming soon. Follow us on{" "}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:underline font-medium"
          >
            Instagram
          </a>{" "}
          for updates.
        </p>
      </div>
    </div>
  );
}
