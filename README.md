# Get Hyped

A bold, motion-rich marketing homepage for creative agencies—built with **Next.js**, **GSAP**, and **Lenis** smooth scrolling. Open source under the [MIT License](./LICENSE).

<p align="center">
  <strong>Get Hyped. Get Noticed. Get Results.</strong>
</p>

<p align="center">
  <code>MIT License</code>
  &nbsp;·&nbsp;
  <code>Next.js 16</code>
  &nbsp;·&nbsp;
  <code>TypeScript 5</code>
  &nbsp;·&nbsp;
  <code>GSAP 3</code>
</p>

---

## Overview

**Get Hyped** is a single-page agency landing experience with scroll-driven storytelling: hero stats and video cards, a pinned expertise stack, portfolio work tiles, brand marquee, and contact CTA. Content lives in typed data modules so you can rebrand without touching layout code.

|             |                                                     |
| ----------- | --------------------------------------------------- |
| **Stack**   | Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 |
| **Motion**  | GSAP (ScrollTrigger, `@gsap/react`) · Lenis         |
| **UI**      | shadcn/ui · Radix · Lucide                          |
| **Tooling** | Biome (lint & format)                               |

---

## Features

- **Hero** — Staggered headline reveal, symmetric stat/video card fan (desktop), hover lift via GSAP
- **Expertises** — Pinned section with scrubbed card transitions (01–04), reduced-motion fallback
- **Work** — Three video case-study cards with hover play and `matchMedia` layout
- **Brand marquee** — Infinite logo strip with motion-aware behavior
- **Smooth scroll** — Lenis + ScrollTrigger `scrollerProxy` for stable pin boundaries
- **Accessibility** — `prefers-reduced-motion` paths across major sections
- **SEO** — Metadata, JSON-LD, `sitemap.xml`, `robots.txt`

---

## Quick start

### Prerequisites

- **Node.js** 20+
- **npm** (or pnpm / yarn)

### Install & run

```bash
git clone https://github.com/Saidul00005/GetHyped_IW.git
cd GetHyped_IW
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Start development server |
| `npm run build`  | Production build         |
| `npm start`      | Serve production build   |
| `npm run lint`   | Run Biome checks         |
| `npm run format` | Format with Biome        |

---

## Configuration

### Environment

| Variable               | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and sitemap (see `.env.example`) |

### Content & branding

Edit these files to customize copy, links, and media:

| File                        | Purpose                                               |
| --------------------------- | ----------------------------------------------------- |
| `lib/data/homepage-data.ts` | Hero, statement, expertises, work, CTA, marquee       |
| `lib/data/site-data.ts`     | Nav, footer, contact, social icons, `siteUrl` default |
| `lib/seo/homepage-seo.ts`   | Page metadata and structured data                     |
| `public/images/`            | Static images                                         |

Videos in the demo use **Cloudinary** URLs; replace with your own MP4 sources or hosts.

---

## Project structure

```
├── app/
│   ├── layout.tsx          # Fonts, metadata shell, smooth scroll provider
│   ├── page.tsx            # Homepage composition
│   ├── globals.css         # Design tokens & section styles
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Homepage/sections/  # Hero, Statement, Expertises, Work, BrandMarquee, CTA
│   ├── layout/             # Navbar, Footer
│   ├── providers/          # Lenis + GSAP ScrollTrigger integration
│   └── ui/                 # shadcn primitives
└── lib/
    ├── data/               # Site content
    ├── gsap/               # Plugin registration & motion helpers
    └── seo/
```

---

## Motion architecture

- **`lib/gsap/register.ts`** — Central GSAP plugin registration
- **`lib/gsap/motion.ts`** — Reduced motion helpers, `revealElements`, Lenis-aware scroll
- **`SmoothScrollProvider`** — Lenis RAF on GSAP ticker, `scrollerProxy`, resize refresh
- Sections use **`useGSAP`** with React refs (not global class selectors) for scoped animations

### GSAP commercial use

GSAP is free for many sites under its [standard license](https://gsap.com/licensing/). If you use this template for a **commercial client** or **paid product**, confirm your use case meets GSAP’s current licensing terms.

---

## Deployment

Deploy like any Next.js app ([Vercel](https://vercel.com), Netlify, Docker, etc.). Set `NEXT_PUBLIC_SITE_URL` to your production domain before building.

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-idea`)
3. Commit your changes
4. Open a Pull Request

Please run `npm run lint` before submitting.

---

## Credits

- **Design** — Mohammad Sayadul Hoque
- **Brand concept** — Get Hyped agency homepage template
- **Icons** — [Lucide](https://lucide.dev) · [Simple Icons](https://simpleicons.org) (via jsDelivr)

---

## License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE).

You are free to use, modify, and distribute this code with attribution. Third-party assets (fonts, videos, logos in demo data) may have their own terms; replace them for production use.

---

<p align="center">
  <sub>Built with care for teams who want their site to feel as energetic as their work.</sub>
</p>
