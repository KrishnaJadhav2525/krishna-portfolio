import { getAllPosts } from "./lib/get-posts"
import { BlogPosts } from "./posts"
import { CuratedBlogs } from "./curated"
import { ContactSection } from "./contact-section"
import { NewsletterSection } from "./newsletter-section"
import SemanticSearch from "@/app/components/semantic-search"

export const metadata = {
  title: "Blog",
  description: "Thoughts on engineering, AI, and what I build.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="min-h-screen bg-black text-neutral-200">

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto pt-32 px-6 relative z-10">

        {/* HEADER */}
        <div className="mb-16 text-center md:text-left">
          <p className="text-sm font-mono text-indigo-400 mb-4 tracking-widest uppercase">
            Engineering & Thoughts
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            The Blog
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed md:ml-0 mx-auto">
            Insights on Artificial Intelligence, Software Engineering, and the future of tech.
            Documenting my journey of building and breaking things.
          </p>
        </div>

        {/* AI-POWERED SEMANTIC SEARCH */}
        <div className="mb-20">
          <SemanticSearch />
        </div>

        {/* BLOG LIST + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-20">

          {/* Main Content */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
              <div className="h-px bg-white/10 flex-grow" />
            </div>
            <BlogPosts posts={posts} />
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-32 space-y-12 h-fit">
            <CuratedBlogs />

            {/* Minimal Newsletter in Sidebar */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-sm text-neutral-400 mb-6">Get the latest articles and AI insights delivered to your inbox.</p>
              <NewsletterSection />
            </div>
          </div>
        </div>

        {/* CONTACT - Client Component */}
        <div className="mt-32">
          <ContactSection />
        </div>
      </div>
    </section>
  )
}