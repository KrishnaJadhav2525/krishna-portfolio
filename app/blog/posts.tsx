"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { BlogPost } from "./lib/get-posts"
import { staggerFast, fadeIn } from "@/lib/animations"

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
      <div>
        <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-subtle)] mb-2 select-none">
          SEARCH WRITING
        </label>
        <input
          type="text"
          placeholder="Filter by title, tag, or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-fg)] transition-colors duration-150"
        />
      </div>

      {/* POSTS EDITORIAL LIST */}
      <motion.ul
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]"
      >
        {filteredPosts.map((post, idx) => {
          const indexLabel = String(idx + 1).padStart(2, '0');

          return (
            <motion.li key={post.slug} variants={fadeIn}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-start justify-between gap-4 py-5 md:py-6 px-2 hover:bg-[var(--color-surface)] transition-colors duration-150"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-[var(--color-subtle)] tabular-nums select-none">
                      {indexLabel}
                    </span>
                    <h3 className="text-base font-medium text-[var(--color-fg)] leading-snug group-hover:underline underline-offset-4 decoration-[var(--color-border-strong)] transition-all">
                      {post.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2 mb-3 max-w-[560px]">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-[var(--color-subtle)] border border-[var(--color-border)] px-2 py-0.5 tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3 font-mono text-[10px] text-[var(--color-subtle)] tracking-widest uppercase md:pt-1">
                  <span>{post.date}</span>
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 text-[var(--color-fg)]">
                    →
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>

      {filteredPosts.length === 0 && (
        <div className="py-12 text-center border border-[var(--color-border)] p-6">
          <p className="text-sm text-[var(--color-muted)] mb-3">
            No posts matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="font-mono text-xs text-[var(--color-fg)] underline underline-offset-4 uppercase tracking-wider"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
