# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Build & Development Commands

- `yarn dev` — Start 11ty + Vite dev server with hot reload
- `yarn build` — Production build to `_site/` (minified, cache-busted)

No test or lint CLI commands configured.

## Architecture

This is an **11ty (Eleventy) 3.x static site** with Vite for asset bundling. It compiles Nunjucks templates, plain CSS, and TypeScript into optimized static HTML/CSS/JS.

**Package manager**: Yarn (not npm)

### Key directories

- `src/` — 11ty input directory
  - `_data/` — Global data files (meta.json, navigation.json)
  - `_includes/layouts/` — Nunjucks page layouts (base.njk, page.njk, post.njk)
  - `_includes/partials/` — Reusable partials (header.njk, footer.njk, seo.njk)
  - `assets/css/` — CSS with `main.css` as entry point (tokens, typography, layout, components, animations, reset)
  - `assets/ts/` — TypeScript modules (main.ts, dark-mode.ts, scroll-reveal.ts, fonts.ts)
  - `assets/images/` — Static images
  - `blog/` — Markdown blog posts with frontmatter
  - Root `.njk` files → pages (index, about, contact, resume, blog)
- `eleventy.config.js` — 11ty configuration (ESM)
- `vite.config.ts` — Vite configuration
- `netlify.toml` — Netlify deploy configuration
- `_site/` — Build output (gitignored)

### How pages are generated

Each `.njk` file in `src/` becomes a page. Blog posts in `src/blog/*.md` use the `post.njk` layout. Collections are defined in `eleventy.config.js`.

### Nunjucks patterns

- Layouts via frontmatter: `layout: layouts/base.njk`
- Partials: `{% include "partials/header.njk" %}`
- Data: `{{ meta.title }}`, `{{ navigation }}`
- Filters: `{{ date | readableDate }}`
- Shortcodes: `{% year %}`

### Styling

- Plain CSS with CSS Custom Properties (all prefixed `--fp-*`)
- Design tokens in `tokens.css` with light/dark mode via `[data-theme]` attribute
- Variable font support via `font-variation-settings` (wght, wdth, opsz, GRAD)
- Fluid responsive typography using `clamp()`
- Three breakpoints: 600px, 900px, 1200px
- Fonts: Adobe TypeKit (CDN) for xanti-typewriter-variable, mokoko-variable, Amstelvar
- FontFaceObserver for async font loading with `.wf-active`/`.wf-inactive` CSS classes

### Dark mode

- Toggle in header, persists via `localStorage`
- Respects `prefers-color-scheme` system preference
- CSS tokens swap via `[data-theme="dark"]` selector
- TypeScript in `dark-mode.ts`

### Scroll animations

- Intersection Observer in `scroll-reveal.ts`
- Elements with `data-reveal` attribute fade in on scroll
- Respects `prefers-reduced-motion: reduce`

## Code Style

- 2-space indentation (enforced by .editorconfig)
- Semicolons required
- TypeScript strict mode
- ES modules throughout
