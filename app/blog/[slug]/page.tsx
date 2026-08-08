import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import Link from "next/link"
import { ReadingProgress } from "@/app/components/reading-progress"
import { Shell } from "@/app/components/ui/primitives"

function formatDate(date: string | Date | undefined) {
  if (!date) return ""
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ""
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

  const filePath = path.join(process.cwd(), "app/blog/content", `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return (
      <main className="relative z-10 pt-40">
        <Shell>
          <div className="t-label mb-5">Error · 404</div>
          <h1 className="t-page text-[var(--fg)]">Article not found</h1>
          <Link href="/blog" className="btn-line mt-8">
            Return to the archive <span className="arrow">→</span>
          </Link>
        </Shell>
      </main>
    )
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)
  const processedContent = await remark().use(html).process(content)

  const published = formatDate(data.publishedAt ?? data.date)

  return (
    <>
      <ReadingProgress />

      <div className="relative z-10 w-full">
        {/* MASTHEAD */}
        <header className="pb-10 pt-32 sm:pt-40">
          <Shell>
            <Link
              href="/blog"
              className="link-line t-mono mb-10 inline-flex uppercase text-[var(--muted)] hover:text-[var(--fg)]"
            >
              <span className="arrow inline-block rotate-180">→</span> Archive
            </Link>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.02] tracking-[-0.04em] text-[var(--fg)]">
                  {data.title}
                </h1>
              </div>

              <div className="relative lg:col-span-3 lg:col-start-10">
                <div
                  className="absolute -left-8 bottom-0 top-1 hidden w-px lg:block"
                  style={{ background: "var(--line)" }}
                />
                {published && (
                  <div className="mb-5">
                    <div className="t-label mb-2">Published</div>
                    <div className="t-mono uppercase text-[var(--fg-dim)]">{published}</div>
                  </div>
                )}
                {data.tags && (
                  <div>
                    <div className="t-label mb-3">Topics</div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.tags.map((tag: string) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Shell>
        </header>

        <div className="rule-x" />

        {/* ARTICLE */}
        <Shell className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <article
              className="prose lg:col-span-8 lg:col-start-3"
              dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
            />
          </div>

          <div
            className="mt-20 grid grid-cols-1 border-t pt-8 lg:grid-cols-12"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:col-span-8 lg:col-start-3">
              <Link href="/blog" className="link-line t-mono uppercase">
                <span className="arrow inline-block rotate-180">→</span> All articles
              </Link>
              <Link
                href="/#contact"
                className="link-line t-mono uppercase text-[var(--muted)] hover:text-[var(--fg)]"
              >
                Get in touch <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </Shell>
      </div>
    </>
  )
}
