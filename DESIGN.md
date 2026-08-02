# Portfolio Design System & Aesthetic Manifesto (DESIGN.md)

> Source of Truth for Design Architecture, Swiss Typography, Spatial Layouts, Motion Choreography, and Dual Light/Dark Environments.

---

## 1. Core Philosophy

The portfolio is designed as a **Swiss-Inspired Editorial Digital Product** that prioritizes clarity, structural precision, and subtle atmospheric depth over transient UI trends.

- **Typography as Architecture**: Text scale and tracking dictate layout hierarchy. Display headings serve as primary visual anchors.
- **Razor-Sharp Monochrome Contrast**: Color is restricted to functional monochrome tokens. Depth is created through surface elevation, borders, lighting, and texture rather than hue saturation.
- **Purposeful Motion**: Every animation guides user attention or signals interactive state. All transforms use GPU-composited properties (`opacity`, `transform`, `filter`, `clip-path`) with non-wobbling cubic-bezier easing.
- **Layered Spatial Canvas**: Backgrounds consist of multi-layered material depth (film grain, ambient light pools, subtle dot/line grids, flashlight cursor spotlights).

---

## 2. Independent Theme Architecture (`lib/theme/*`)

### Cinematic Dark Theme System (`lib/theme/dark/`)
- **Background (`--color-bg`)**: `#000000` (Pure Deep Black Canvas)
- **Foreground (`--color-fg`)**: `#EDEDED` (Pure Crisp White Headings)
- **Muted Text (`--color-muted`)**: `#A1A1AA` (Medium Neutral Gray Body Text)
- **Subtle Metadata (`--color-subtle`)**: `#71717A` (Light Neutral Gray Captions)
- **Border Hairline (`--color-border`)**: `#1F1F23` (Subtle Hairline Border)
- **Border Strong (`--color-border-strong`)**: `#27272A` (Active Border)
- **Surface / Card (`--color-surface`)**: `#0A0A0B` (Elevated Deep Black Surface)
- **Hover Surface (`--color-surface-hover`)**: `#121215` (Subtle Elevated Hover Surface)
- **Cursor Spotlight**: Windows 10 Spotlight / Fluent acrylic white shimmer (`rgba(255, 255, 255, 0.04)`).
- **Text Shimmer**: Brushed aluminum light reflection tracking mouse position over display headings (`Krishna`, `Jadhav`).

### Editorial Light Theme System (`lib/theme/light/`)
- **Background (`--color-bg`)**: `#F5F4F0` (Warm Editorial Paper Base Canvas)
- **Foreground (`--color-fg`)**: `#111111` (Near-Black Display Headings)
- **Muted Text (`--color-muted`)**: `#525252` (Medium Dark Gray Body Text)
- **Subtle Metadata (`--color-subtle`)**: `#71717A` (Light Neutral Gray Captions)
- **Border Hairline (`--color-border`)**: `#E4E4E7` (Soft Hairline Border)
- **Border Strong (`--color-border-strong`)**: `#D4D4D8` (Active Hairline Border)
- **Surface / Card (`--color-surface`)**: `#FFFFFF` (Elevated Warm White Surface)
- **Hover Surface (`--color-surface-hover`)**: `#EBE9E2` (Subtle Elevated Hover Surface)
- **Glass Header (`--glass-bg`)**: `rgba(245, 244, 240, 0.85)` with `backdrop-filter: blur(24px)`
- **Subtle Shadows**: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03)`
- **Floating Nav Shadow**: `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03)`

---

## 3. Typography & Rhythm

| Token | Size | Weight | Line Height | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `clamp(3.5rem, 10vw, 7.5rem)` | `400` | `0.88` | `-0.05em` | Hero Name & Page Anchors |
| **Section H2** | `clamp(1.75rem, 4vw, 2.75rem)` | `400` | `0.95` | `-0.04em` | Major Section Titles |
| **Card H3** | `1.25rem` | `500` | `1.1` | `-0.02em` | Project & Post Headers |
| **Body Lead** | `clamp(1rem, 1.8vw, 1.25rem)` | `400` | `1.7` | `-0.01em` | Descriptors & Intro Paragraphs |
| **Body Base** | `1rem (16px)` | `400` | `1.6` | `normal` | Article Text & Case Studies |
| **Mono Label**| `0.625rem (10px)` | `400` | `1.2` | `0.15em–0.2em` | Uppercase Tags, Index Numbers & Status Badges |

All mono text utilizes tabular numbers: `font-variant-numeric: tabular-nums`.

---

## 4. Reusable Background Engine (7 Layers)

1. **Layer 1: Base Canvas**: Dark `#0A0A0A` or Light `#F7F6F3`.
2. **Layer 2: Animated Film Grain**: Hardware-accelerated SVG noise overlay (`body::after`) with `0.5s` steps-jitter animation (`opacity: 0.035` dark / `0.028` light).
3. **Layer 3: Ambient Light Pools**: Radial gradient spotlight behind hero text (`.hero-glow-primary` with `10s` / `12s` breathing animation).
4. **Layer 4: Dot & Line Grid Patterns**: Attenuated 3.5% opacity grid pattern (`.bg-dot-grid` & `.bg-line-grid`) with scroll fade masks (`.bg-dot-grid-fade`).
5. **Layer 5: Cursor Flashlight Spotlight**: Global `600px` radial gradient spotlight tracking cursor movement (`app/components/cursor-spotlight.tsx`).
6. **Layer 6: Gradient Dividers**: Fading line section dividers (`.gradient-divider`).
7. **Layer 7: Interactive Card Edge Glow**: Dynamic mouse position tracking (`card-hover-glow`) providing custom radial highlights on hover.

---

## 5. Motion System & Easing

All motion variants in `lib/animations.ts` use standardized cubic-bezier timing:
- **Default Entry**: `ease: [0.25, 0.1, 0.25, 1]`, duration: `0.5s–0.6s`.
- **Editorial Slow Entry**: `ease: [0.16, 1, 0.3, 1]`, duration: `0.8s`.
- **Clip Mask Reveal**: `ease: [0.76, 0, 0.24, 1]`, duration: `0.7s`.
- **Hover Micro-Interactions**: `y: -2px`, duration: `0.2s easeOut`.
- **Reduced Motion Guard**: `@media (prefers-reduced-motion: reduce)` disables non-essential keyframes and instant-swaps opacity.

---

## 6. Component Specification Rules

- **Navbar (`app/components/nav.tsx`)**: Full-width fixed header (`h-14`), frosted glass (`blur(20px) saturate(180%)`), monogram `KJ`, active dot marker (`motion.span layoutId="activeNavDot"`), unicode mode toggle (`○ LIGHT` / `● DARK`).
- **Hero (`app/page.tsx`)**: Asymmetric 2-column desktop layout (`max-w-[1200px]`), status badge, coordinates, display name, value prop, metrics, CTA row, scroll indicator.
- **Projects (`app/components/project-carousel.tsx`)**: 2-column border grid, 5–8 technology pills per card, immediately visible **Live Demo →**, **GitHub →**, **Case Study →** links, modal specification inspector.
- **Skills (`app/components/skills.tsx`)**: Interactive category filter tabs (`[ALL]`, `[AI & AGENTS]`, `[FRONTEND]`, `[BACKEND]`, `[DATA & ML]`, `[DATABASES]`, `[DEVOPS]`, `[LANGUAGES]`) with marquee track.
- **Writing Engine (`app/blog/*`)**: 2-column magazine grid, RAG `SemanticSearch` input, top spring `<ReadingProgress />` bar on articles (`app/blog/[slug]/page.tsx`).
- **Contact Form (`app/components/contact-section.tsx`)**: Linear-grade sharp inputs (`border border-[var(--color-border)] focus:border-[var(--color-fg)]`), 10px uppercase mono labels, high-contrast submit button.
- **AI Assistant (`app/components/chat-widget.tsx`)**: Fixed floating toggle button with pulse dot and sharp monochrome dialog.
- **Footer (`app/components/footer.tsx`)**: Single row with metadata, sitemap links, and current year.
