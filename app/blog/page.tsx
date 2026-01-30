import { getAllPosts } from "./lib/get-posts"
import { BlogPosts } from "./posts"
import { CuratedBlogs } from "./curated"
import { ContactSection } from "./contact-section"
import { NewsletterSection } from "./newsletter-section"

export const metadata = {
  title: "Blog",
  description: "Thoughts on engineering, AI, and what I build.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="max-w-7xl mx-auto pt-28 px-6">
      <h1 className="text-4xl font-semibold text-white mb-3">
        Blogs
      </h1>

      <p className="text-neutral-400 mb-12 max-w-2xl">
        Thoughts on whatever I build, break, and learn in AI,
        engineering, and more.
      </p>

      {/* BLOG LIST + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">
        <BlogPosts posts={posts} />
        <CuratedBlogs />
      </div>

      {/* NEWSLETTER - Client Component */}
      <NewsletterSection />

      {/* CONTACT - Client Component */}
      <ContactSection />
    </section>
  )
}