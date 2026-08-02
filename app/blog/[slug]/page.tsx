import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import Link from "next/link"
import { ReadingProgress } from "@/app/components/reading-progress"

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
      <main className="pt-28 px-4 max-w-[680px] mx-auto">
        <h1 className="text-xl font-normal text-[var(--color-fg)]">
          Blog post not found
        </h1>
        <Link href="/blog" className="text-sm text-[var(--color-muted)] underline mt-4 inline-block">
          Return to blog index
        </Link>
      </main>
    )
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  const processedContent = await remark()
    .use(html)
    .process(content)

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen pt-28 pb-20 px-4 max-w-[680px] mx-auto">
        {/* BACK LINK */}
        <Link
          href="/blog"
          className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors mb-10 inline-block uppercase tracking-wider"
        >
          ← Back to Writing
        </Link>

        {/* HEADER */}
        <header className="mb-12">
          <div className="font-mono text-xs text-[var(--color-subtle)] mb-3">
            {formatDate(data.date)}
          </div>

          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[var(--color-fg)] mb-4 leading-tight">
            {data.title}
          </h1>

          {data.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {data.tags.map((tag: string) => (
                <span key={tag} className="font-mono text-[10px] text-[var(--color-subtle)] border border-[var(--color-border)] px-2 py-0.5 tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* ARTICLE CONTENT */}
        <article className="prose border-t border-[var(--color-border)] pt-8">
          <div
            dangerouslySetInnerHTML={{
              __html: processedContent.toString(),
            }}
          />
        </article>

        {/* FOOTER */}
        <div className="mt-16 border-t border-[var(--color-border)] pt-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--color-fg)] underline underline-offset-4 decoration-[var(--color-border-strong)] hover:opacity-80"
          >
            ← Read all articles
          </Link>
        </div>
      </main>
    </>
  )
}
