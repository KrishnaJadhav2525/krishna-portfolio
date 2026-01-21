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
    <section className="pt-28 px-6">
      <article className="mx-auto max-w-2xl">
        {/* TITLE */}
        <h1 className="text-4xl font-semibold tracking-tight text-white mb-4">
          {data.title}
        </h1>

        {/* META — FIXED */}
        <p className="text-sm text-neutral-500 mb-10">
          {formatDate(data.date)}
        </p>

        {/* CONTENT */}
        <div
          className="prose prose-invert prose-neutral max-w-none"
          dangerouslySetInnerHTML={{
            __html: processedContent.toString(),
          }}
        />
      </article>
    </section>
  )
}
