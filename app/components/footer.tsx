import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

import { Container } from "@/app/components/ui/section"
import { Separator } from "@/app/components/ui/separator"
import { Button } from "@/app/components/ui/button"

const socialLinks = [
  { href: "https://github.com/KrishnaJadhav2525", icon: Github, label: "GitHub" },
  { href: "https://x.com/krlshn444", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/", icon: Linkedin, label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-transparent pt-20 pb-10">
      <Container>
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* BRAND */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Krishna<span className="text-muted-foreground">.</span>
            </Link>
            <p className="mt-6 text-muted-foreground text-sm leading-relaxed max-w-sm">
              Engineering sleek, high-performance web applications with a focus on AI integration and modern user experiences.
            </p>
          </div>

          {/* SITEMAP */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-foreground mb-6 uppercase">Sitemap</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/#projects" className="hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link href="/rss" className="hover:text-foreground transition-colors">RSS</Link></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-foreground mb-6 uppercase">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:bg-neutral-800"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                </Button>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild variant="link" className="px-0 text-foreground">
                <Link href="/#contact">Get in touch →</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 opacity-50" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Krishna Jadhav.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Next.js • Tailwind • Vercel
          </p>
        </div>
      </Container>
    </footer>
  )
}
