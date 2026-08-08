import { getAllPosts } from "./lib/get-posts"
import { BlogPosts } from "./posts"
import { CuratedBlogs } from "./curated"
import { ContactSection } from "@/app/components/contact-section"
import { NewsletterSection } from "./newsletter-section"
import SemanticSearch from "@/app/components/semantic-search"
import { Shell, Section, SectionHeader, MonoLabel } from "@/app/components/ui/primitives"

export const metadata = {
  title: "Writing & Work",
  description: "Thoughts on engineering, AI, and what I build.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="relative z-10 w-full">
      {/* MASTHEAD */}
      <header className="pb-4 pt-32 sm:pt-40">
        <Shell>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <MonoLabel dot className="text-[var(--fg)]">
                Writing &amp; work
              </MonoLabel>
              <h1 className="t-page mt-8 select-none text-[var(--fg)]">
                Notes from the build
              </h1>
            </div>
            <div className="relative lg:col-span-5 lg:pl-10">
              <div
                className="absolute -left-px bottom-0 top-1 hidden w-px lg:block"
                style={{ background: "var(--line)" }}
              />
              <p className="t-lead max-w-[44ch]">
                Engineering write-ups on AI systems, vector search, automation pipelines and
                web performance — written while building the projects they describe.
              </p>
              <div className="t-label mt-8">
                {String(posts.length).padStart(2, "0")} articles
              </div>
            </div>
          </div>
        </Shell>
      </header>

      {/* SEMANTIC SEARCH */}
      <Section id="search">
        <SectionHeader
          index="01"
          label="Semantic search"
          title="Search by concept"
          meta="Vector retrieval"
          lead="Queries run through an embedding index, so related ideas surface even when the wording differs."
        />
        <SemanticSearch />
      </Section>

      {/* ARCHIVE */}
      <Section id="archive">
        <SectionHeader
          index="02"
          label="Archive"
          title="All articles"
          meta={`${posts.length} entries`}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <BlogPosts posts={posts} />
          </div>
          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-28">
              <CuratedBlogs />
            </div>
          </aside>
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Section id="newsletter">
        <NewsletterSection />
      </Section>

      <ContactSection />
    </div>
  )
}
