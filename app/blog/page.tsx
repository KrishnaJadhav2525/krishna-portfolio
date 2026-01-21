import { getAllPosts } from "./lib/get-posts"
import { BlogPosts } from "./posts"
import { CuratedBlogs } from "./curated"
import { Github, Twitter, Linkedin } from "lucide-react"

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

      {/* NEWSLETTER */}
      <div className="mt-40 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            📧
          </div>

          <h2 className="text-3xl font-semibold text-white mb-3">
            Subscribe to my newsletter
          </h2>

          <p className="text-neutral-400 mb-10">
            No spam, promise. I only send curated blogs that match your
            interests — the stuff you’d actually want to read.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              placeholder="your@email.com"
              className="flex-1 rounded-md border border-neutral-800 bg-black px-4 py-3 text-sm text-neutral-200"
            />

            <input
              placeholder="Your name (optional)"
              className="flex-1 rounded-md border border-neutral-800 bg-black px-4 py-3 text-sm text-neutral-200"
            />
          </div>

          <button className="mt-6 w-full rounded-md bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-black font-medium">
            Subscribe — it takes 5 seconds
          </button>

          <p className="mt-3 text-xs text-neutral-500">
            Unsubscribe anytime. Your email is safe with me.
          </p>
        </div>
      </div>

      {/* CONTACT — MATCHES HOME/ABOUT */}
      <div className="mt-40 border-t border-neutral-900 pt-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* LEFT: FORM */}
          <div>
            <p className="text-sm tracking-widest text-neutral-500 mb-4">
              GET IN TOUCH
            </p>

            <h2 className="text-3xl font-semibold tracking-tight mb-12 text-white">
              Let’s work together
            </h2>

            <div className="space-y-5">
              <input
                placeholder="your@email.com"
                className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200"
              />

              <input
                placeholder="Subject"
                className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200"
              />

              <textarea
                rows={4}
                placeholder="Your message..."
                className="w-full rounded-md border border-neutral-800 bg-black px-5 py-3 text-base text-neutral-200"
              />

              <button className="mt-6 w-full bg-neutral-100 text-black py-3 rounded-md font-medium">
                Send Message
              </button>
            </div>
          </div>

          {/* RIGHT: LINKS */}
          <div className="pt-20 md:pt-16">
            <h3 className="text-xl font-semibold text-white mb-6">
              Krishna
            </h3>

            <ul className="space-y-3 text-neutral-400">
              <li>
                <a href="/blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/skills" className="hover:text-white transition">
                  Skills
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
            </ul>

            {/* SOCIAL ICONS — SAME AS HOME PAGE */}
            <div className="mt-10 flex gap-4">
              <a
                href="https://github.com/KrishnaJadhav2525"
                target="_blank"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
              >
                <Github size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/krishna-jadhav-a5122a316/"
                target="_blank"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://x.com/krlshn444"
                target="_blank"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-600 transition"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
