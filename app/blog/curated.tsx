import Link from "next/link"
import { BLOG_POSTS } from "./data"

export function CuratedBlogs() {
  const featured = BLOG_POSTS.filter(post => post.featured)

  return (
    <aside className="space-y-6">
      {/* HEADER */}
      <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-muted)]">
        Featured Writing
      </div>

      {/* CARDS */}
      <div className="divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]">
        {featured.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-4 hover:bg-[var(--color-surface)] px-2 transition-colors duration-150"
          >
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-[var(--color-subtle)] uppercase tracking-wider block">
                Featured
              </span>

              <h3 className="text-sm font-medium text-[var(--color-fg)] leading-snug group-hover:underline underline-offset-4 decoration-[var(--color-border-strong)]">
                {post.title}
              </h3>

              <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                {post.description}
              </p>

              <div className="pt-1 text-[11px] font-mono text-[var(--color-subtle)] flex items-center justify-between">
                <span>{post.date}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  Read →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
