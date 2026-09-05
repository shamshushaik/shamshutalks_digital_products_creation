---
description: "Use when building, editing, or validating the complete modern HTML web page for product packages — shadcn/ui + Motion + KokonutUI + Bklit UI + Anime.js + Tailwind. Full-page interactive web experience with charts, animations, visuals, graphs, motion — the show-stopper companion to the PDF. Covers all HTML quality checks."
applyTo: "**/slides/**,**/presentation.html,**/index.html,**/print.css,**/*.html"
---

# HTML Modern Web Page Instructions — ST Product Package

Applies when creating or editing any HTML deliverable for a product package. The HTML is **NOT a slide deck or presentation** — it is a **complete, self-contained modern web page** that covers everything the product promises. It is the show-stopper: when the PDF isn't enough, the HTML delivers a pro-guru-level experience with motion, visuals, charts, graphs, interactive components, and deep content — all in one file.

## Core Philosophy

The HTML deliverable is a **full modern web page**, not a slideshow. Think of it as the product's own website — a single, self-contained HTML file that a buyer opens in any browser and gets a premium, interactive, visually rich experience. It must feel like a professionally built landing page meets documentation site meets interactive tutorial — all fused into one seamless experience.

**User's vision (verbatim):** "Our HTML is not just slides or PPT things. We need to create the HTML that has everything about the product package — with motions, visuals, graphs, bar, charts, etc. One main HTML that should have everything, pin to pin, not a single thing missing. When someone is not satisfied with our PDF, our HTML is the show-stopper that helps like a pro guru."

## Tech Stack (5 Repos — Non-Negotiable)

Every product HTML must use this stack. No exceptions. No substitutes. The final deliverable is a **single `.html` file** — no `package.json`, no `node_modules`, no build step. Opens directly in any browser.

**How the 5 repos are used:**
1. **Anime.js + Tailwind CSS** → Load via CDN `<script>`/`<link>` tags in `<head>`
2. **shadcn/ui + KokonutUI + Bklit UI + Motion** → These are React/component-library repos without CDN scripts, BUT they're all **open-source (MIT licensed)**. We **study their source code on GitHub** and **pull the exact HTML structure, Tailwind classes, CSS, and JS patterns** directly into our HTML. No React framework needed — just the raw HTML/CSS/JS output.

| # | Library | License | What to Extract from Source |
|---|---------|---------|---------------------------|
| 1 | **shadcn/ui** | MIT | Browse `github.com/shadcn-ui/ui` → `/apps/www/registry/default/ui/`. **Extract exact HTML structure + Tailwind classes** for cards, tabs, accordions, badges, alerts, navigation. Strip React JSX syntax, keep the classes. |
| 2 | **Motion** | MIT | Browse `github.com/motiondivision/motion`. **Extract animation API patterns** and translate to vanilla JS + CSS: scroll-linked effects, layout transitions, enter/exit → CSS `@keyframes` + Intersection Observer. |
| 3 | **KokonutUI** | MIT | Browse `github.com/kokonut-labs/kokonutui`. **Extract section layouts + HTML structure** for hero sections, feature grids, pricing tables, testimonials, FAQ accordions. Copy the HTML blocks, keep the Tailwind classes. |
| 4 | **Bklit UI** | MIT | Browse `github.com/bklit/bklit-ui`. **Extract chart rendering patterns** — SVG/Canvas markup for Bar, Line, Pie, Radar, Funnel charts. Extract animation approach. |
| 5 | **Anime.js** | MIT | Load via CDN — works directly in browser, no extraction needed. |

### Pattern Extraction Workflow
1. **Open the repo** on GitHub (e.g., `github.com/shadcn-ui/ui`)
2. **Browse the component source** (usually in `/registry/` or `/components/` folders)
3. **Study the HTML structure** — what divs, what classes, what hierarchy
4. **Copy the pattern** — extract the HTML + Tailwind classes (strip React/JSX syntax)
5. **Embed in our HTML** — paste the component structure directly into our single file
6. **Result**: Our HTML uses the exact same visual language as these libraries

### CDN Script Block (copy into every product HTML)
```html
<head>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: { primary: 'var(--color-primary)', accent: 'var(--color-accent)', dark: 'var(--color-dark)' },
          fontFamily: { sans: ['Inter', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] }
        }
      }
    }
  </script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <!-- Anime.js -->
  <script src="https://cdn.jsdelivr.net/npm/animejs/lib/anime.min.js"></script>
  <!-- Prism.js (syntax highlighting) -->
  <link href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-javascript.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-yaml.min.js"></script>
  <!-- Add more Prism language components as needed per product topic -->
</head>
```

**No npm. No build tools. One HTML file. Patterns pulled from open-source repos. Opens in any browser.**

## Gamma-Inspired Cohesive Visual System (All HTML Pages)

Every HTML page must use a **complete, cohesive visual system** — not random styling. Choose a design direction during research, then maintain it across ALL sections:

- **Theme:** Pick one design direction (dark-tech, cinematic-film, clean-professional, bold-colorful). Every visual element must serve this theme. The HTML should feel like a premium SaaS landing page or a developer documentation site — not a converted document.
- **Colors:** Define a 2–3 color palette (primary + accent + dark) with CSS custom properties (`--color-primary`, `--color-accent`, `--color-dark`). Apply consistently — section backgrounds, headings, card borders, chart colors, navigation, footer. No color should appear once and never again.
- **Fonts:** Modern sans-serif body (Inter/Roboto/SF Pro via Google Fonts or system stack) + distinct heading weight (700-900). Code in fixed-width (JetBrains Mono / Fira Code / Source Code Pro). Never default Times New Roman.
- **Components:** All UI components (cards, tabs, accordions, badges, navigation) must use shadcn/ui design language — consistent border-radius, shadows, hover states, focus rings.
- **Sections:** Each section must follow the same visual language — consistent heading style, consistent card treatment, consistent chart styling, consistent spacing rhythm.
- **First & Last Sections:** Hero/intro section and branding/closing section must be the **most visually striking** — they set the first impression and leave the lasting impression. Both must be designed assets, not plain text.
- **Alignment & Spacing:** Zero misalignment — consistent padding (multiples of 4/8px), aligned grid items, no overlapping, no orphaned text. Use Tailwind spacing scale.

## Page Structure (Full-Page Web Experience)

Every product HTML must be a complete, scrollable web page with these sections (adapt order/depth to topic):

### Mandatory Sections
1. **Hero Section** — Product name, value proposition, animated visual element (particle effect, gradient animation, or SVG illustration). First impression = premium.
2. **What You'll Learn** — Interactive cards/grid (KokonutUI pattern) with icons, hover effects, staggered entrance animations (Anime.js).
3. **What's Included** — File/folder inventory as an interactive tree or card grid with icons for each file type. Click-to-expand details.
4. **Architecture / Overview** — Visual diagram (SVG or chart via Bklit) showing how components fit together. Interactive — hover for details.
5. **Core Content Sections** — Each major chapter/topic from the PDF gets its own section with:
   - Animated section entrance (Motion scroll-linked or Anime.js stagger)
   - Code blocks with syntax highlighting (Prism.js or highlight.js) and copy button
   - Interactive diagrams (SVG with hover states and animations)
   - Callout boxes (tips, warnings, definitions) styled as shadcn/ui Alert components
   - Comparison tables with sorting/filtering where appropriate
6. **Charts & Data Visualization** — Bklit UI-inspired charts showing:
   - Performance metrics, comparison data, workflow statistics
   - Progress tracking, before/after comparisons
   - Architecture layers as visual diagrams
7. **Practice / Exercises** — Interactive exercise sections with:
   - Fill-in-the-blank code editors (textarea with monospace font)
   - Expandable solution sections (shadcn/ui Accordion pattern)
   - Progress tracking (checkboxes that persist in localStorage)
8. **Demo / Live Examples** — Embedded code playgrounds or link-out to demo projects with preview screenshots.
9. **Glossary** — Searchable/filterable glossary (shadcn/ui Command pattern or simple filter input).
10. **Troubleshooting** — Expandable FAQ-style accordions (shadcn/ui Accordion) with common issues and fixes.
11. **Branding / Footer** — @shamshutalks handle, social links, booking link, tagline — styled as a premium footer with dark background, accent elements, decorative shapes.

### Optional Sections (Based on Topic)
- **Interactive Playground** — For code-heavy products: a live code editor with run button
- **Comparison Tool** — For products comparing tools/approaches: side-by-side toggle or tabs
- **Timeline / Roadmap** — For process/workflow products: animated horizontal timeline
- **Pricing / Value Breakdown** — Visual cards showing what buyer got vs market value
- **Community / Resources** — Links, social proof, related products

## Animation & Motion System

### Entry Animations (Every Section)
- **Staggered card reveals:** Cards in grids animate in one-by-one with 50-100ms delay between each (Anime.js stagger or Motion `staggerChildren`)
- **Section fade-in:** Each major section fades in + slides up on scroll (Intersection Observer + Anime.js or Motion `useInView`)
- **Counter animations:** Numbers/counters animate from 0 to final value (Anime.js `targets` with `round` option)
- **Text typewriter:** Key headings use typing effect for emphasis (Anime.js timeline)

### Scroll-Linked Animations
- **Parallax backgrounds:** Subtle parallax on hero section background layers (CSS `transform: translateY` on scroll)
- **Progress indicator:** Horizontal progress bar at top showing scroll position (CSS + minimal JS)
- **Sticky navigation:** Navbar becomes compact/blur on scroll (CSS `backdrop-filter` + scroll listener)

### Micro-Interactions
- **Hover effects:** Cards lift with shadow on hover (CSS `transition` + `transform: translateY(-4px)`)
- **Button feedback:** Scale + color shift on click (CSS `:active` + transition)
- **Code block copy:** Click-to-copy with animated checkmark confirmation (Anime.js SVG path draw)
- **Accordion open/close:** Smooth height animation (CSS `max-height` transition or Motion `AnimatePresence`)
- **Chart hover:** Data point tooltips animate in (CSS transition + transform)

### SVG Animations
- **Diagram arrows:** SVG path drawing animation on scroll (Anime.js `strokeDashoffset`)
- **Icon animations:** Subtle rotation/pulse on hover (Anime.js or CSS keyframes)
- **Decorative elements:** Floating geometric shapes, gradient shifts, particle effects in hero (Anime.js + canvas or CSS)

### Performance Rules
- **GPU-accelerated properties only:** Use `transform` and `opacity` for animations — never animate `width`, `height`, `top`, `left`, `margin` directly
- **`will-change` hint:** Add `will-change: transform` to elements that will animate
- **Reduce motion:** Respect `prefers-reduced-motion` media query — disable non-essential animations
- **60fps minimum:** Every animation must maintain 60fps. Test with Chrome DevTools Performance tab.
- **No layout thrashing:** Batch DOM reads before writes. Use `requestAnimationFrame` for scroll handlers.

## Charts & Data Visualization (Bklit UI Patterns)

Every product HTML must include at least 2 charts/visualizations. Choose based on topic:

| Chart Type | When to Use | Implementation |
|-----------|-------------|----------------|
| **Bar Chart** | Comparing categories (tools, features, performance) | Canvas/SVG with Anime.js entrance animation |
| **Line Chart** | Trends over time, progress tracking | Canvas/SVG with animated path drawing |
| **Pie/Donut Chart** | Composition, breakdown (time allocation, resource split) | SVG with animated segment reveal |
| **Radar Chart** | Multi-dimensional comparison (skill levels, feature coverage) | SVG with animated polygon fill |
| **Area Chart** | Cumulative data, growth visualization | Canvas/SVG with gradient fill animation |
| **Funnel Chart** | Process stages with drop-off (testing pipeline, deployment flow) | SVG with animated width transitions |

### Chart Design Rules
- Match chart colors to the product's color palette (CSS variables)
- Include animated entrance (bars grow from 0, lines draw from left, segments expand from center)
- Tooltips on hover with formatted values
- Responsive: scales with container width
- Legend with interactive hover (highlight corresponding data)
- Grid lines at 4.5:1 contrast ratio minimum
- Labels in Inter/Roboto, values in JetBrains Mono

## Code Blocks (Premium Treatment)

- **Syntax highlighting:** Use Prism.js or highlight.js with a dark theme matching the palette
- **Copy button:** Every code block has a copy-to-clipboard button (top-right) with animated confirmation
- **Line numbers:** Optional, left side, lighter color
- **Language badge:** Top-left corner showing language (JS, Python, YAML, etc.)
- **Word wrap:** Long lines wrap — never horizontal scroll inside code blocks
- **Consistent spacing:** Single line height, no extra padding between lines
- **Tree blocks:** Use a Unicode-capable monospace font (JetBrains Mono / Fira Code) — must render ├└│─ correctly

## Responsive Design

- **Desktop-first** (1200px+): Full grid layouts, side-by-side comparisons, large charts
- **Tablet** (768px–1199px): Stacked grids, scaled-down charts, collapsible sidebar
- **Mobile** (below 768px): Single column, full-width cards, hamburger nav, touch-friendly tap targets (min 44px)
- **Breakpoints:** Use Tailwind default breakpoints (`sm:`, `md:`, `lg:`, `xl:`)

## Accessibility (WCAG 2.1 AA)

- **4.5:1 contrast** for all text (16px+ body, 14px+ large text)
- **3:1 contrast** for interactive elements, focus indicators
- **Keyboard navigation:** All interactive elements focusable and operable via keyboard
- **Screen reader:** Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`–`<h6>` hierarchy)
- **Alt text:** All images/charts have descriptive alt text or aria-labels
- **Reduced motion:** `prefers-reduced-motion: reduce` disables animations
- **Focus visible:** Clear focus ring on all interactive elements

## Dual-Mode Strategy

- **Interactive HTML Mode (default):** Full animations, scroll effects, hover states, chart interactions
- **Print/PDF Export Mode:** Flatten via `@media print` — disable animations, show all content, ensure no blank areas:
```css
@media print {
  html, body { -webkit-print-color-adjust: exact !important; print-background: true !important; color-adjust: exact !important; }
  *, *:before, *:after { animation-delay: 0s !important; animation-duration: 0s !important; animation-iteration-count: 1 !important; transition-duration: 0s !important; scroll-behavior: auto !important; }
  .no-print { display: none !important; }
}
```

## Inspiration Sources
- https://gamma.app/inspiration — storytelling patterns, layout innovation
- https://ui.shadcn.com — component design language
- https://ui.kokonutui.com — pre-built UI blocks
- https://bklit.com — chart component patterns
- https://animejs.com — animation patterns and timelines

## Hard Rules
- **HTML file name must match the PDF name** (e.g., `API_Contract_Testing.pdf` → `API_Contract_Testing.html`). HTML file is placed in the product root folder — not in a `slides/` subfolder.
- **Single self-contained file:** The HTML must work by opening directly in a browser — no local server required (CDN links for Tailwind, fonts, animation libs). External resources allowed via CDN; no localhost dependencies.
- **No placeholder content:** Every section must have real, substantive content from the product — not "Lorem ipsum" or "Coming soon"
- **No script content leakage:** Zero content from the script/caption text used to sell the product
- **No CTA, no price, no purchase links** inside the HTML
- **6-Stage Learning:** Every section must support Read → Study → Learn → Practice → Training → Create
- **Charts minimum:** At least 2 data visualizations per product HTML
- **Animation minimum:** Every section must have at least one animated element (entrance, hover, or scroll-linked)
- **Mobile functional:** Must be usable on mobile devices (responsive, touch targets, readable text)

## Quality Checklist (Self-QE Before Handoff)

- [ ] Tech stack: Tailwind CSS + shadcn/ui patterns + Anime.js animations + Bklit-inspired charts + Motion-style scroll effects
- [ ] Visual system: cohesive theme, consistent colors/fonts/spacing throughout
- [ ] Hero section: animated, visually striking, premium first impression
- [ ] All mandatory sections present with real content
- [ ] At least 2 charts/visualizations with animated entrance
- [ ] Code blocks: syntax highlighting + copy button + language badge
- [ ] Animations: section entrances, hover micro-interactions, scroll-linked effects
- [ ] Responsive: works on desktop, tablet, mobile
- [ ] Accessibility: 4.5:1 contrast, keyboard nav, semantic HTML, reduced motion support
- [ ] Print mode: `@media print` CSS for flat export
- [ ] No script content, no CTA, no pricing inside HTML
- [ ] HTML filename matches PDF name exactly
- [ ] 6-Stage Learning: every section supports Read→Study→Learn→Practice→Training→Create
- [ ] Single self-contained file — opens in any browser without server
