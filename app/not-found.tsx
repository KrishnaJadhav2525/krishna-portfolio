import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-6">

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 mb-6">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-400 mb-10 text-lg">
          The page you are looking for has vanished into the digital void.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all hover:scale-105"
        >
          Return Home
        </Link>
      </div>
    </section>
  )
}
