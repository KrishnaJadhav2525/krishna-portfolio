import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function AboutPage() {
  return (
    <section className="bg-black text-neutral-200">
      {/* TOP SPACING FOR FIXED NAV */}
      <div className="pt-28 max-w-4xl mx-auto px-6">

        {/* BACK ARROW */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition mb-12"
        >
          ← Back
        </Link>

        {/* ABOUT */}
        <div id="about">
          <p className="text-sm tracking-widest text-neutral-500 mb-3">
            ABOUT
          </p>

          <h1 className="text-4xl font-semibold tracking-tight mb-8 text-white">
            Krishna Jadhav
          </h1>
        </div>

        <div className="space-y-5 text-neutral-400 leading-relaxed max-w-2xl">
          <p>
            I’m a Computer Science undergraduate based in Maharashtra, India,
            with a strong interest in software development, data analysis, and
            AI-driven systems. I focus on building solutions grounded in solid
            engineering fundamentals and practical problem-solving.
          </p>

          <p>
            I work with Python, MySQL, and C++, and I’m currently developing a
            real-time facial recognition system using OpenCV and the Qt C++
            framework, with an emphasis on accuracy, performance, and
            real-world usability. I’m also exploring AI application development,
            including LLM-powered systems, automation workflows, and scalable
            full-stack architectures.
          </p>

          <p>
            Alongside academics, I’ve gained experience across technical
            support, database operations, and client-facing roles, which has
            helped me develop strong communication skills and an
            ownership-driven mindset.
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-24">
          <p className="text-sm tracking-widest text-neutral-500 mb-6">
            EXPERIENCE
          </p>

          <div className="space-y-10">
            <div className="border-l border-neutral-800 pl-6">
              <h3 className="text-lg font-medium text-white">
                Database Support & IT Support
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                Kohinoor Ropes Pvt. Ltd. · May 2025 – Aug 2025
              </p>
              <p className="text-neutral-400">
                Assisted with MySQL queries, database validation, and on-site IT
                support for systems, hardware, and basic networking.
              </p>
            </div>

            <div className="border-l border-neutral-800 pl-6">
              <h3 className="text-lg font-medium text-white">
                Business Development Executive
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                Conglomerate Magazine · Aug 2024 – Feb 2025
              </p>
              <p className="text-neutral-400">
                Managed client outreach, requirement gathering, follow-ups, and
                coordination with senior team members.
              </p>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="mt-24">
          <p className="text-sm tracking-widest text-neutral-500 mb-6">
            EDUCATION
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">
                B.Sc. Computer Science
              </h3>
              <p className="text-neutral-400">
                Rajarshi Shahu Mahavidyalaya, Latur · 2023 – 2026 · CGPA 7.53/10
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">
                Higher Secondary (XII) – Science
              </h3>
              <p className="text-neutral-400">
                Maharashtra State Board · 2023 · 66.83%
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">
                Secondary (X)
              </h3>
              <p className="text-neutral-400">
                Maharashtra State Board · 2020 · 87.60%
              </p>
            </div>
          </div>
        </div>

        {/* CONNECT */}
        <div className="mt-24">
          <p className="text-sm tracking-widest text-neutral-500 mb-6">
            CONNECT
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/KrishnaJadhav2525"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-800 px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-neutral-600 transition"
            >
              <Github size={16} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/krishna-jadhav-a5122a316/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-800 px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-neutral-600 transition"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>

            <a
              href="https://x.com/krlshn444"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-800 px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 hover:border-neutral-600 transition"
            >
              <Twitter size={16} />
              Twitter
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div
          id="contact"
          className="mt-32 pt-24 border-t border-neutral-900"
        >
          <p className="text-sm text-neutral-500 mb-4 tracking-widest">
            GET IN TOUCH
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mb-12 text-white">
            Let’s work together
          </h2>

          <div className="grid md:grid-cols-2 gap-14">
            {/* FORM */}
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

            {/* RIGHT SIDE */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium mb-5 text-white">
                  Krishna
                </h3>

                <ul className="space-y-3 text-base text-neutral-400">
                  <li>
                    <Link href="/#skills" className="hover:text-white transition">
                      Skills
                    </Link>
                  </li>

                  <li>
                    <Link href="#about" className="hover:text-white transition">
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              { /* SOCIAL ICONS */}
              <div className="flex gap-4 mt-10">
  {[
    {
      href: "https://github.com/KrishnaJadhav2525",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://x.com/krlshn444",
      icon: Twitter,
      label: "Twitter",
    },
    {
      href: "https://www.linkedin.com/in/krishna-jadhav-a5122a316/",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ].map(({ href, icon: Icon, label }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-md border border-neutral-800 text-neutral-500 hover:text-white hover:bg-neutral-900 hover:border-neutral-600 transition"
    >
      <Icon size={18} />
    </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
