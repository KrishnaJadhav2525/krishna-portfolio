import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 bg-dot-grid bg-dot-grid-fade">
      <div className="max-w-[560px] w-full border border-[var(--color-border)] p-10 md:p-12 bg-[var(--color-bg)] relative z-10">
        <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-[var(--color-subtle)] uppercase tracking-[0.2em] mb-4 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-fg)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
          <span>STATUS 404 / RESOURCE UNRESOLVED</span>
        </div>

        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal tracking-[-0.04em] leading-[0.95] text-[var(--color-fg)] mb-4 select-none">
          Not Found
        </h1>

        <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[420px] mx-auto mb-8">
          The requested system specification or route URL does not exist on this portfolio environment.
        </p>

        <Link
          href="/"
          className="inline-block bg-[var(--color-fg)] text-[var(--color-bg)] px-6 py-3.5 text-xs font-mono tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-150"
        >
          Return to Primary Index →
        </Link>
      </div>
    </main>
  )
}
