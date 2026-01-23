# Krishna Portfolio & Blog

A modern personal portfolio with a fully integrated blog system, built using **Next.js App Router** and designed to be **production-ready** with SEO, RSS, sitemap, and Vercel compatibility.

This project serves as both a personal website and a technical playground for building scalable, real-world web systems.

---

## ✨ Features

### Portfolio
- Clean, minimal UI
- Home and About pages
- Skills and experience sections
- Contact form UI
- Social links with icons

### Blog System
- Blog listing page
- Dynamic blog pages using `[slug]`
- Markdown-based content (`.md` files)
- Search and filtering on blog list
- Curated sidebar section

### SEO & Discoverability
- Automatic sitemap (`/sitemap.xml`)
- RSS feed (`/rss`)
- Robots.txt
- SEO-friendly routing
- Ready for Open Graph / meta extensions

---

## 🧱 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **Content:** Markdown
- **Build System:** Turbopack
- **Deployment:** Vercel

---

## 📁 Project Structure

app/
├─ blog/
│ ├─ content/ # Markdown blog posts
│ ├─ lib/
│ │ ├─ get-posts.ts # Reads & parses markdown
│ │ └─ site.ts # Shared base URL config
│ ├─ page.tsx # Blog listing page
│ └─ [slug]/page.tsx # Blog detail page
│
├─ rss/
│ └─ route.ts # RSS feed
│
├─ sitemap.ts # Sitemap generator
├─ robots.ts # Robots.txt
├─ layout.tsx # Root layout
├─ page.tsx # Home page
└─ about/page.tsx # About page
Important rules:

baseUrl lives only in this file

Never import from sitemap.ts, robots.ts, or route files

Route files are entry points, not shared modules

🧭 SEO Setup
Sitemap

File: app/sitemap.ts

Generates /sitemap.xml

Reads blog slugs directly from Markdown files

RSS Feed

File: app/rss/route.ts

Available at /rss

Sorted by publish date

Uses shared baseUrl

Robots

File: app/robots.ts

SEO-safe defaults

🚀 Getting Started
Install dependencies
pnpm install

Run locally
pnpm run dev

Production build
pnpm run build
pnpm run start

✅ Verified Build Output
/                (static)
/about           (static)
/blog            (static)
/blog/[slug]     (dynamic)
/rss             (dynamic)
/sitemap.xml     (static)
/robots.txt      (static)


Build passes successfully with pnpm + Turbopack.

🛠️ Development Status

✔ Portfolio UI — Complete
✔ Blog UI — Complete
✔ Markdown content system — Complete
✔ SEO (sitemap, RSS, robots) — Complete
✔ Build stability — Complete

⏳ Backend integration — Planned (next step)

🔜 Planned Backend Work

Connect MongoDB (Atlas)

Store:

Newsletter subscribers

Contact form messages

Blog metadata / analytics

API routes under app/api

Optional admin panel for blog management

Hybrid approach planned:

Markdown for public blog content

Database for dynamic data (forms, analytics, drafts)

🧠 Key Lessons & Rules

Never import from route files (sitemap.ts, robots.ts, rss/route.ts)

Keep filesystem paths exact (Linux-sensitive on Vercel)

Commit pnpm-lock.yaml after dependency changes

Use a shared config file for global constants

👤 Author

Krishna
Computer Science Undergraduate
Focused on full-stack engineering, AI systems, and production-grade web apps.
