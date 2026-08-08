"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { BlogPost } from "./lib/get-posts"
import { Tag } from "@/app/components/ui/primitives"
import { VIEWPORT } from "@/lib/animations"

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
    <div>
      {/* Local filter */}
      <div className="mb-10">
        <label htmlFor="post-filter" className="t-label mb-3 block">
          Filter archive
        </label>
        <input
          id="post-filter"
          type="text"
          placeholder="Title, tag or topic…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="field"
        />
      </div>

      <ul className="border-t" style={{ borderColor: "var(--line-2)" }}>
        {filteredPosts.map((post, idx) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{
              duration: 0.6,
              delay: Math.min(idx, 6) * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group border-b"
            style={{ borderColor: "var(--line)" }}
          >
            <Link href={`/blog/${post.slug}`} className="riser relative block px-4 py-7">
              <span
                className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                style={{ background: "var(--line-3)" }}
              />

              <div className="relative grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
                <div className="t-label md:col-span-2">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="md:col-span-7">
                  <h3 className="hover-text is-title text-[1.05rem] leading-snug transition-transform duration-500 group-hover:translate-x-1">
                    {post.title}
                  </h3>
                  <p className="t-body mt-2 line-clamp-2 max-w-[58ch] text-[0.875rem]">
                    {post.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                <div className="t-mono flex items-start gap-3 uppercase text-[var(--subtle)] md:col-span-3 md:justify-end">
                  <span>{post.date}</span>
                  <span className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[var(--fg)]">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {filteredPosts.length === 0 && (
        <div className="plate extrude p-10 text-center" style={{ borderColor: "var(--line-2)" }}>
          <div className="t-label mb-4">No results</div>
          <p className="t-body">
            Nothing in the archive matches &ldquo;{searchQuery}&rdquo;.
          </p>
          <button onClick={() => setSearchQuery("")} className="btn-line mt-6">
            Clear filter <span className="arrow">→</span>
          </button>
        </div>
      )}
    </div>
  )
}
