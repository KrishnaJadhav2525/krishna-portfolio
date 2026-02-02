import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", icon: Github, label: "GitHub" },
  { href: "https://x.com/krlshn444", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", icon: Linkedin, label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* BRAND */}
          <div>
            <Link href="/" className="text-xl font-semibold text-white">
              Krishna<span className="text-indigo-400">.</span>
            </Link>
            <p className="mt-4 text-neutral-500 text-sm leading-relaxed">
              Building modern solutions with solid engineering fundamentals.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm tracking-widest text-neutral-500 mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/#projects" className="hover:text-white transition">Projects</Link></li>
              <li><Link href="/#skills" className="hover:text-white transition">Skills</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h4 className="text-sm tracking-widest text-neutral-500 mb-4">CONNECT</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-neutral-500 hover:text-white hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <Link
              href="/#contact"
              className="inline-block mt-6 px-5 py-2 text-sm rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 transition-all"
            >
              Let's work together →
            </Link>
          </div>
        </div>

        {/* DIVIDER & COPYRIGHT */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Krishna Jadhav. All rights reserved.
          </p>
          <p className="text-xs text-neutral-700">
            Built with Next.js, Tailwind CSS & ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
