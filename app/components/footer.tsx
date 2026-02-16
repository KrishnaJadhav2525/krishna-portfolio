import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", icon: Github, label: "GitHub" },
  { href: "https://x.com/krlshn444", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", icon: Linkedin, label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* BRAND */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Krishna<span className="text-neutral-500">.</span>
            </Link>
            <p className="mt-6 text-neutral-400 text-sm leading-relaxed max-w-sm">
              Engineering sleek, high-performance web applications with a focus on AI integration and modern user experiences.
            </p>
          </div>

          {/* SITEMAP */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-white mb-6 uppercase">Sitemap</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link href="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors duration-300">Blog</Link></li>
              <li><Link href="/#projects" className="hover:text-white transition-colors duration-300">Projects</Link></li>
              <li><Link href="/rss" className="hover:text-white transition-colors duration-300">RSS</Link></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-white mb-6 uppercase">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-neutral-500 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/#contact"
                className="text-sm font-medium text-white border-b border-white pb-0.5 hover:opacity-70 transition-opacity"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Krishna Jadhav.
          </p>
          <p className="text-xs text-neutral-600 font-mono">
            Next.js • Tailwind • Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
