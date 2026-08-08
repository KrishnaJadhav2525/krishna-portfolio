# DESIGN.md — Portfolio Design System

> Internal specification for the visual system. Source of truth for tokens, type, grid,
> borders, motion, background architecture and component rules.
> **Version 3 — "Blueprint Editorial".**

---

## 0. Research references & extracted principles

Studied (design language, not copied): **Vercel / Geist**, **Linear**, **Raycast**,
**Resend**, **Stripe**, Swiss editorial print (Müller-Brockmann grid discipline,
Unimark technical signage), and engineering blueprint drafting conventions.

Principles extracted and applied here:

| Source | Principle taken |
| :-- | :-- |
| Vercel / Geist | Monochrome-only palette; hairline borders instead of shadows; sharp corners; mono metadata; extremely tight display tracking. |
| Linear | Motion as continuity — shared-layout indicators, short 150–250ms interaction curves, long 700–900ms entrance curves. |
| Raycast | Dense but calm information; every element sits on a rule or a grid line. |
| Resend | Generous negative space around very few, very confident type sizes. |
| Stripe | Layered depth built from geometry and light, never from color. |
| Swiss editorial | Asymmetric 12-column grid, full-bleed rules, numbered sections, uppercase mono labels. |

Anti-goals: SaaS landing pages, rounded card grids, neon/cyberpunk, gradient meshes,
emoji ornamentation, invented metrics.

---

## 1. Color tokens

Two independently designed themes. **Not** an inversion of one another: the dark theme
is built from *emitted light on near-black*, the light theme from *ink on warm paper*.

### Dark — "Studio at night"

| Token | Value | Use |
| :-- | :-- | :-- |
| `--bg` | `#08080A` | Page canvas (near-black, never `#000`) |
| `--bg-2` | `#0C0C0F` | Alternating section bands |
| `--surface` | `#111114` | Raised blocks |
| `--surface-2` | `#17171B` | Hover surface |
| `--fg` | `#EDEDEF` | Primary text |
| `--fg-dim` | `#C6C6CC` | Secondary headings |
| `--muted` | `#8B8B94` | Body text |
| `--subtle` | `#6E6E78` | Metadata, mono labels (≥4.5:1 on `--bg`) |
| `--line` | `rgba(255,255,255,.07)` | Hairline rules |
| `--line-2` | `rgba(255,255,255,.13)` | Block borders |
| `--line-3` | `rgba(255,255,255,.24)` | Hover / active borders |
| `--geo` | `rgba(255,255,255,.055)` | Background geometry stroke |
| `--geo-dim` | `rgba(255,255,255,.028)` | Deep geometry layer |
| `--glow` | `rgba(255,255,255,.06)` | Restrained bloom |

### Light — "Warm studio paper"

| Token | Value | Use |
| :-- | :-- | :-- |
| `--bg` | `#F7F7F5` | Warm neutral paper (never `#FFF`) |
| `--bg-2` | `#F2F2EE` | Alternating bands |
| `--surface` | `#FDFDFC` | Raised blocks |
| `--surface-2` | `#EFEFEA` | Hover surface |
| `--fg` | `#1A1A19` | Dark charcoal, not black |
| `--fg-dim` | `#3A3A37` | Secondary headings |
| `--muted` | `#63635D` | Body text |
| `--subtle` | `#6F6F68` | Metadata (≥4.5:1 on `--bg`) |
| `--line` | `rgba(26,26,25,.10)` | Hairline rules |
| `--line-2` | `rgba(26,26,25,.16)` | Block borders |
| `--line-3` | `rgba(26,26,25,.30)` | Hover / active |
| `--geo` | `rgba(26,26,25,.055)` | Background geometry |
| `--glow` | `rgba(26,26,25,.05)` | Restrained shadow bloom |

Light theme carries **soft shadows** (`0 1px 2px rgba(0,0,0,.04)`); dark theme carries
**inner light** (`inset 0 1px 0 rgba(255,255,255,.04)`). Neither uses the other's tool.

No hue is permitted anywhere in the interface chrome. Only semantic error text may use red.

---

## 2. Typography

Family: **Geist Sans** (UI/display) and **Geist Mono** (labels, data, coordinates),
loaded locally via `next/font` — no network font request.

| Role | Size | Weight | Tracking | Leading |
| :-- | :-- | :-- | :-- | :-- |
| Display (hero) | `clamp(3.2rem, 11.5vw, 11rem)` | 300 | `-0.055em` | `0.84` |
| Page title | `clamp(2.4rem, 6vw, 4.6rem)` | 300 | `-0.045em` | `0.92` |
| Section heading | `clamp(1.6rem, 3.4vw, 2.6rem)` | 350 | `-0.035em` | `1.05` |
| Item title | `clamp(1.15rem, 2vw, 1.6rem)` | 400 | `-0.02em` | `1.2` |
| Lead paragraph | `clamp(1rem, 1.4vw, 1.15rem)` | 400 | `-0.01em` | `1.65` |
| Body | `0.9375rem` | 400 | `0` | `1.7` |
| Mono label | `0.625rem` | 500 | `0.18em` | `1` |
| Mono data | `0.6875rem` | 400 | `0.06em` | `1.4` |

Mono is always **uppercase** and always tabular (`font-variant-numeric: tabular-nums`).
Mono is used for: section numbers, coordinates, dates, status, technology tags,
axis labels, and any figure.

---

## 3. Grid & spacing

- Page shell: `max-width: 1560px`, gutters `20px → 32px → 56px`.
- Grid: **12 columns**, `gap: 24px` desktop / `16px` tablet.
- Canonical splits: `7/5` (hero), `5/7` (editorial), `2/6/4` (project row), `3/9` (stack row).
- Vertical rhythm on a **4px** base; section padding `clamp(88px, 12vh, 168px)`.
- Section rules are **full-bleed** (edge to edge of viewport); content stays inside the shell.
- Two **construction rails** (vertical hairlines) sit at the shell edges on `lg+`.

Never center the whole desktop page in a narrow column. Desktop uses the viewport.

---

## 4. Border system

Sharp geometry only. `border-radius: 0` everywhere except the status dot and the
assistant launcher.

1. **Hairline rule** `--line` — separates content within a block.
2. **Section boundary** `--line` full-bleed `1px` horizontal.
3. **Construction line** `--line` vertical, runs through/past sections.
4. **Block frame** `--line-2` — only for genuinely enclosed content.
5. **Partial frame** — corner ticks (`12px` L-shaped marks) instead of a full box.
6. **Intersection node** — a `7px` mono `+` at grid crossings.
7. **Active border** `--line-3` on hover, transitioned over 240ms.

Borders express structure. They are never decoration and never wrap every element.

---

## 5. Background system

`app/components/background/site-background.tsx` — one fixed, global, `aria-hidden`
layer stack behind all content. Never per-card.

| Layer | Content | Motion |
| :-- | :-- | :-- |
| L0 | Base wash + two ambient light pools | 24s breathe |
| L1 | 72px hairline grid, radially masked | static |
| L2 | Deep geometry: oversized wireframe rectangles extending past the viewport, slight rotation | parallax `-6%` of scroll |
| L3 | Mid geometry: large circles, intersecting long axes, drawn-line animation on load | parallax `-14%` |
| L4 | Near geometry: small squares, `+` nodes, coordinate labels | parallax `-26%` |
| L5 | 18 drifting particles, CSS-only keyframes | 18–40s drift |
| L6 | Cursor light (radial, `--glow`) | rAF-throttled |

Rules: stroke opacity never exceeds `0.06`; nothing in the background may read as a card;
geometry must overlap section boundaries; all motion is `transform`/`opacity` only;
the entire stack collapses to static under `prefers-reduced-motion`.

---

## 6. Motion system

Curves:

- `--ease-out` `cubic-bezier(.22,1,.36,1)` — entrances, 700–900ms
- `--ease-io` `cubic-bezier(.65,0,.35,1)` — line draws / clip reveals, 700ms
- `--ease-ui` `cubic-bezier(.2,0,0,1)` — hover & state, 160–260ms
- spring `stiffness 420 / damping 38` — shared-layout nav indicator

Choreography:

- **Load** — nav (0ms) → hero eyebrow (120ms) → display line 1 (200ms) → line 2 (300ms)
  → right column (420ms) → bottom rail (560ms). Background geometry fades over 1.6s.
- **Scroll** — sections reveal once at `-15%` margin: `opacity 0→1`, `y 28→0`.
  Children stagger `60ms`. Rules draw with `scaleX 0→1`.
- **Hover** — text brightens `--muted → --fg` plus a 700ms sheen sweep; links draw an
  underline from the left and translate their arrow `+3px`; blocks illuminate their
  border, shift background one step, and lift `-2px`.

Reduced motion: all keyframes stop, all reveals become instant, parallax is zeroed.

---

## 7. Component rules

- **Nav** — full-bleed, `56px`, hairline bottom, backdrop blur. Items live in a bordered
  group; the active item is marked by a shared-layout (`layoutId`) sliding backdrop plus a
  bottom rule. Scroll position drives it via `IntersectionObserver`.
- **Project row** — full-width horizontal record: `index / status` | `title + description +
  5–7 real technologies` | `Live Demo · GitHub · Case Study`. Not a card grid.
- **Stack** — label/values rows on rules, no boxes.
- **Assistant** — bordered square launcher with a custom node glyph, rotating dashed ring,
  live status dot; panel opens with a clip + scale transition from the launcher corner.
- **Forms** — square inputs, hairline borders, mono labels above, focus moves the border
  to `--line-3`.

## 8. Content integrity

No metric appears in the UI unless it is present and verifiable in the project data.
Headline slots use factual descriptors — *Selected Projects*, *Core Technologies*,
*AI & Automation*, *Full-Stack Engineering*, *Open Source*, *Current Focus* — rather
than invented figures.

## 9. Responsive

| Breakpoint | Behaviour |
| :-- | :-- |
| `< 640px` | Single column; display type `clamp` floor `3.2rem`; project row stacks to index → title → description → tags → links; rails and edge labels hidden; background geometry count halved. |
| `640–1023px` | 2-column blocks; hero stacks but keeps the meta table; nav collapses to overlay. |
| `≥ 1024px` | Full asymmetric grid, construction rails, horizontal project records. |
| `≥ 1536px` | Shell caps at 1560px; gutters grow, type does not. |

`overflow-x` is clipped at `body`; no element may exceed `100vw`.

## 10. Performance

Animate `transform`/`opacity`/`clip-path` only. `will-change` is set on the six background
layers and nothing else. Particles are CSS keyframes (no canvas, no rAF loop). Scroll work
is `IntersectionObserver` plus one rAF-throttled pointer listener. Framer Motion handles
reveals with `viewport={{ once: true }}` so observers detach after firing.
