import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Page() {
  return (
    <section className="relative bg-black">
      {/* GLOBAL SOFT GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.10),transparent_70%)]" />

      {/* HERO */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12 text-neutral-50">
          Krishna
        </h1>

        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-lg font-medium border border-neutral-800 rounded-md text-neutral-200 hover:text-white hover:border-neutral-600 transition mb-14"
        >
          ⚡ Let’s connect
        </Link>

        <div className="flex gap-5 mb-20">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-11 h-11 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-neutral-200 hover:border-neutral-600 transition"
            >
              <Icon size={19} />
            </a>
          ))}
        </div>

        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-sm tracking-widest uppercase text-neutral-500 hover:text-neutral-300 transition animate-bounce"
        >
          <span>Scroll</span>
          <span>↓</span>
        </a>
      </div>

      {/* ABOUT */}
      <section
        id="about"
        className="py-36 scroll-mt-36 border-t border-neutral-900"
      >
        <h2 className="text-2xl font-semibold tracking-tight mb-8 text-neutral-100">
          About
        </h2>

        <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
          Computer science student focused on full-stack development and
          modern frameworks. Exploring data analysis, machine learning,
          and AI to understand how software and data-driven systems are built.
        </p>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="py-36 scroll-mt-36 border-t border-neutral-900"
      >
        <p className="text-sm text-neutral-500 mb-4 tracking-widest">
          WHAT I WORK WITH
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mb-12 text-neutral-100">
          Skills
        </h2>

        {[
          {
            title: "AI / ML",
            items: [
              "Machine Learning",
              "Deep Learning",
              "Data Science",
              "LLMs",
              "RAG",
              "NLP",
              "Agentic Workflows",
              "LangChain",
              "Vector Databases",
            ],
          },
          {
            title: "Frontend",
            items: [
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Tailwind CSS",
              "Astro",
            ],
          },
          {
            title: "Backend",
            items: [
              "Node.js",
              "Express",
              "Python",
              "REST APIs",
              "MongoDB",
              "PostgreSQL",
            ],
          },
          {
            title: "DevOps",
            items: ["Docker", "AWS", "Git", "Vercel", "CI/CD"],
          },
        ].map(section => (
          <div key={section.title} className="mb-14">
            <p className="text-sm text-neutral-500 mb-5 tracking-widest">
              {section.title.toUpperCase()}
            </p>
            <div className="flex flex-wrap gap-3.5">
              {section.items.map(skill => (
                <span
                  key={skill}
                  className="px-5 py-2 text-base rounded-full border border-neutral-800 text-neutral-300 hover:border-neutral-600 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-36 scroll-mt-36 border-t border-neutral-900"
      >
        <p className="text-sm text-neutral-500 mb-4 tracking-widest">
          GET IN TOUCH
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mb-12 text-neutral-100">
          Let’s work together
        </h2>

        <div className="grid md:grid-cols-2 gap-14">
          <div className="space-y-5">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />

            <textarea
              placeholder="Your message..."
              rows={4}
              className="w-full bg-black border border-neutral-800 rounded-md px-5 py-3 text-base text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />

            <button
              type="button"
              className="mt-6 w-full bg-neutral-100 text-black py-3 rounded-md text-base font-medium hover:bg-white transition"
            >
              Send Message
            </button>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium mb-5 text-neutral-100">
                Krishna
              </h3>
              <ul className="space-y-3 text-base text-neutral-400">
                <li><a href="#skills" className="hover:text-white">Skills</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
              </ul>
            </div>

            <div className="flex gap-5 mt-10 text-neutral-500">
              <Github size={18} />
              <Linkedin size={18} />
              <Twitter size={18} />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
