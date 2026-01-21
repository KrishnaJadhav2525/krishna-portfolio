"use client"

import { useState } from "react"
import Link from "next/link"
import type { BlogPost } from "./lib/get-posts" // ✅ FIXED PATH

type Props = {
  posts: BlogPost[]
}

export function BlogPosts({ posts }: Props) {
  const [query, setQuery] = useState("")

  const filteredPosts = posts.filter(post => {
    const q = query.toLowerCase()
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some(tag => tag.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-10">
      {/* SEARCH */}
      <div>
        <input
          placeholder="Search posts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition"
        />

        <p className="mt-2 text-xs text-neutral-500">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>

      {/* POSTS */}
      <div className="divide-y divide-neutral-900">
        {filteredPosts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-10"
          >
            <div className="relative">
              {/* TITLE + ARROW */}
              <div className="flex items-center justify-between gap-6">
                <h2 className="text-2xl font-medium text-white tracking-tight transition group-hover:text-emerald-400">
                  {post.title}
                </h2>

                <span className="text-neutral-600 transition-transform group-hover:text-emerald-400 group-hover:translate-x-1">
                  →
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-2 max-w-2xl text-sm text-neutral-400 leading-relaxed">
                {post.description}
              </p>

              {/* META */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                <span>{post.date}</span>

                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-800 px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GREEN HOVER LINE */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </div>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <p className="py-12 text-sm text-neutral-500">
            No posts match your search.
          </p>
        )}
      </div>
    </div>
  )
}
