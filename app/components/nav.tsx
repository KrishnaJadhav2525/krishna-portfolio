import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT: NAME */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Krishna.
        </Link>

        {/* RIGHT: LINKS (NO BLOG) */}
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <Link href="/#skills" className="hover:text-white transition">
            Skills
          </Link>

          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}
