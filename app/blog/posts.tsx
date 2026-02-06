"use client"

import { useState } from "react"
import Link from "next/link"
import type { BlogPost } from "./lib/get-posts"

type Props = {
  posts: BlogPost[]
}

export function BlogPosts({ posts }: Props) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase()
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-8">
      {/* LOCAL FILTER INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder="Filter posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </div>
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
          <div className="py-12 text-center">
            <p className="text-neutral-400">No posts found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
