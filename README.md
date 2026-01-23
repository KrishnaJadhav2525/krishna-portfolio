# Krishna Portfolio & Blog

A modern personal portfolio with a fully integrated blog system, built using **Next.js App Router**.  
This project is designed to be clean, scalable, SEO-friendly, and production-ready, while also serving as a foundation for future backend integration.

---

## ✨ Features

### Portfolio
- Minimal, modern UI
- Home and About pages
- Skills, experience, and education sections
- Contact form UI
- Social links with icon-based interactions

### Blog
- Blog listing page
- Dynamic blog pages using `[slug]`
- Markdown-based blog content
- Search and tag filtering
- Curated sidebar section
- Hover animations and interaction details

### SEO & Discoverability
- Automatic sitemap (`/sitemap.xml`)
- RSS feed (`/rss`)
- Robots.txt
- SEO-friendly routing
- Ready for Open Graph and meta extensions

---

## 🧱 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown (`.md`)
- **Package Manager:** pnpm
- **Build System:** Turbopack
- **Deployment:** Vercel

---

## 📁 Project Structure

```
app/
├─ blog/
│  ├─ content/
│  ├─ lib/
│  │  ├─ get-posts.ts
│  │  └─ site.ts
│  ├─ page.tsx
│  └─ [slug]/page.tsx
│
├─ rss/
│  └─ route.ts
│
├─ sitemap.ts
├─ robots.ts
├─ layout.tsx
├─ page.tsx
└─ about/page.tsx
```

---

## 🚀 Getting Started

```bash
pnpm install
pnpm run dev
```

---

## 🛠 Development Status

Frontend and blog system are complete.  
Backend integration is the next planned step.

---

## 👤 Author

**Krishna**  
Computer Science Undergraduate
