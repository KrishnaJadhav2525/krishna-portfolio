import Link from 'next/link'
import { Shell } from '@/app/components/ui/primitives'

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[80vh] items-center">
      <Shell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="t-label mb-8">Status 404 · Route unresolved</div>
            <h1 className="t-page text-[var(--fg)]">Not found</h1>
          </div>

          <div className="relative lg:col-span-5 lg:pl-10">
            <div
              className="absolute -left-px bottom-0 top-1 hidden w-px lg:block"
              style={{ background: 'var(--line)' }}
            />
            <p className="t-lead max-w-[40ch]">
              This route doesn&rsquo;t exist. It may have been renamed, or the link that brought
              you here may be out of date.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/" className="link-line t-mono uppercase">
                Return to index <span className="arrow">→</span>
              </Link>
              <Link
                href="/blog"
                className="link-line t-mono uppercase text-[var(--muted)] hover:text-[var(--fg)]"
              >
                Writing &amp; work <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Shell>
    </main>
  )
}
