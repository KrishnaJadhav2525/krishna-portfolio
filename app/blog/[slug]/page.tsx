import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const filePath = path.join(
    process.cwd(),
    "app/blog/content",
    `${slug}.md`
  )

  if (!fs.existsSync(filePath)) {
    return (
      <section className="pt-28 px-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold text-white">
            Blog not found
          </h1>
        </div>
      </section>
    )
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  const processedContent = await remark()
    .use(html)
    .process(content)

  return (
    <section className="min-h-screen bg-black text-neutral-200 selection:bg-indigo-500/30">

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="relative z-10 pt-32 px-6 max-w-4xl mx-auto">

        {/* BACK LINK */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-12 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Blog
        </Link>

        {/* HEADER */}
        <header className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300">
              {formatDate(data.date)}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
            {data.title}
          </h1>

          {/* Tags if available in data */}
          {data.tags && (
            <div className="flex flex-wrap justify-center gap-2">
              {data.tags.map((tag: string) => (
                <span key={tag} className="text-sm text-neutral-500">#{tag}</span>
              ))}
            </div>
          )}
        </header>

        {/* CONTENT */}
        <article className="prose prose-invert prose-lg prose-neutral max-w-none bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div
            dangerouslySetInnerHTML={{
              __html: processedContent.toString(),
            }}
          />
        </article>

        {/* FOOTER */}
        <div className="mt-20 border-t border-white/5 pt-10 pb-20 text-center">
          <p className="text-neutral-500 mb-6">Enjoyed this article?</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
          >
            Read more articles
          </Link>
        </div>

      </div>
    </section>
  )
}
