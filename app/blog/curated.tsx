import Link from "next/link"
import { BLOG_POSTS } from "./data"

export function CuratedBlogs() {
  const featured = BLOG_POSTS.filter((post) => post.featured)

  if (featured.length === 0) return null

  return (
    <div>
      <div className="t-label mb-5">Featured</div>

      <div className="border-t" style={{ borderColor: "var(--line-2)" }}>
        {featured.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="riser group relative block border-b px-4 py-5"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="relative">
              <h3 className="hover-text is-title text-[0.95rem] leading-snug">{post.title}</h3>
              <p className="t-body mt-2 line-clamp-2 text-[0.8125rem]">{post.description}</p>
              <div className="t-label mt-3 flex items-center justify-between">
                <span>{post.date}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
