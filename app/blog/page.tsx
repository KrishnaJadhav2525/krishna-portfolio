import { getAllPosts } from "./lib/get-posts"
import { BlogPosts } from "./posts"
import { CuratedBlogs } from "./curated"
import { ContactSection } from "@/app/components/contact-section"
import { NewsletterSection } from "./newsletter-section"
import SemanticSearch from "@/app/components/semantic-search"
import { Container } from "@/app/components/ui/section"

export const metadata = {
  title: "Blog",
  description: "Thoughts on engineering, AI, and what I build.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="w-full pt-28 pb-20">
      <Container variant="wide">

        {/* HEADER */}
        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-subtle)] mb-3 select-none">
            01 / WRITING & RESEARCH
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-normal text-[var(--color-fg)] mb-4 tracking-[-0.04em] leading-tight select-none">
            Blog & Articles
          </h1>
          <p className="text-base text-[var(--color-muted)] max-w-[600px] leading-relaxed">
            Notes on artificial intelligence, systems engineering, vector search, and web performance.
          </p>
        </div>

        {/* AI-POWERED SEMANTIC SEARCH */}
        <div className="mb-16">
          <SemanticSearch />
        </div>

        {/* BLOG LIST + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 mb-20">
          {/* Main Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--color-subtle)] select-none">
                02 / ALL POSTS
              </h2>
              <div className="h-px bg-[var(--color-border)] flex-grow" />
            </div>
            <BlogPosts posts={posts} />
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <CuratedBlogs />
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="my-20">
          <NewsletterSection />
        </div>

        {/* CONTACT */}
        <ContactSection />

      </Container>
    </main>
  )
}
