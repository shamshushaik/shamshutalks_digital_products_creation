---
name: frontend-slides
description: "Create stunning zero-dependency HTML presentations — fixed 16:9 stage, visual style discovery, distinctive design. Use when building HTML slides, converting PPTX to web, or creating any presentation deck. Source: https://github.com/zarazhangrui/frontend-slides"
user-invocable: true
argument-hint: "Topic + content for slides"
---

# Frontend Slides — Zero-Dependency HTML Presentations

Source: https://github.com/zarazhangrui/frontend-slides (28.7k stars) — single HTML files with inline CSS/JS, no npm/build tools.

## When to Use
- Building any HTML presentation/slides for ST Product Package
- Converting existing PPTX to web
- Need distinctive, non-generic AI design (anti AI-slop)

## Core Principles
1. **Zero Dependencies** — single HTML file, inline CSS/JS, no build step
2. **Show Don't Tell** — generate 3 visual style previews, let user pick (don't ask abstract taste questions)
3. **Distinctive Design** — avoid generic purple-gradient-on-white, Inter/Roboto defaults; use distinctive fonts, committed palettes, strong atmospheric devices
4. **Progressive Disclosure** — read lightweight style indexes first, load full design.md only after user picks
5. **Fixed 16:9 Stage (NON-NEGOTIABLE)** — every deck is 1920×1080 stage scaled uniformly to viewport; letterbox/pillarbox, never reflow; no responsive breakpoints for slide content

## Fixed Stage Rules (Every Slide)
- Viewport wrapper fills browser window; stage is 1920×1080 scaled uniformly
- Slide visibility via `.active`/`.visible` with `visibility`/`opacity`/`pointer-events` from `viewport-base.css` — never `display:none/block` (overridden by layout classes)
- Use `clamp()` only for non-slide UI outside stage
- Include full `viewport-base.css` in every presentation
- Support `prefers-reduced-motion`; never negate CSS functions directly (`-clamp()` ignored) — use `calc(-1 * clamp(...))`

## Content Density Modes
Ask user: reading deck or speaking deck?
- **Low density / speaker-led** (talks, keynotes): one idea per slide, large type, generous negative space, 1-3 bullets max, more slides
- **High density / reading-first** (reports, handouts, async): self-contained slides, grids/tables/annotations, 4-8 bullets or 4-6 cards, tighter but intentional spacing
- Baseline: no scrolling, no overflow, no overlapping panels, no text below readable size; if exceeds, split into more slides

## Workflow

### Phase 1: Content Discovery
Ask ALL questions together:
1. **Purpose**: Pitch deck / Teaching-Tutorial / Conference talk / Internal presentation
2. **Length**: Short 5-10 / Medium 10-20 / Long 20+
3. **Content**: All ready / Rough notes / Topic only
4. **Density**: Low (speaker-led) / High (reading-first)

If images provided: scan, inspect each (USABLE/NOT USABLE + reason + dominant colors), co-design outline around both text + images (not plan then add images), confirm outline.

### Phase 2: Style Discovery — Generate 3 Previews
- Read `STYLE_PRESETS.md` (12 curated presets) + `bold-template-pack/selection-index.json` (34 bold templates from beautiful-html-templates)
- Generate 3 single-slide HTML previews: 1 safe preset + at least 1 bold template + 1 wildcard (custom or second bold)
- Wildcard: if brief has sharper opportunity than templates, design freely with distinctive typography, committed palette, recognizable layout, one strong atmospheric device
- Preview authenticity: must look like real first slide from user's deck — never render `preview`, `template`, `Option A/B/C`, file paths, or requirement notes on slide; use real deck chrome (title, date, author)
- Save to `.frontend-slides/slide-previews/` (style-a/b/c.html), open each for user
- Ask: Which style? Style A/B/C / Mix elements

**Mood → Preset mapping:**
- Impressed/Confident → Bold Signal, Electric Studio, Dark Botanical
- Excited/Energized → Creative Voltage, Neon Cyber, Split Pastel
- Calm/Focused → Notebook Tabs, Paper & Ink, Swiss Modern
- Inspired/Moved → Dark Botanical, Vintage Editorial, Pastel Geometry

### Phase 3: Generate Full Presentation
- If bold template selected: read that ONE template's full `design.md` — preserve fonts, palette, decorative vocabulary, spacing rhythm, component grammar; translate viewport-fluid values to 1920×1080 coordinates; single self-contained HTML file
- If custom wildcard: preserve its CSS/layout as design recipe, expand across full deck
- Before generating, read: `viewport-base.css` (mandatory, include full), `html-template.md` (HTML/JS features), `animation-patterns.md` (animation reference)
- Requirements: single HTML file inline CSS/JS, full viewport-base.css, Fontshare/Google Fonts (never system fonts), detailed `/* === SECTION NAME === */` comments
- Apply density choice throughout; verify no overflow/panel overlap via screenshots at 1280×720 + phone viewport

### Phase 4: PPT Conversion (if needed)
1. Extract: `python scripts/extract-pptx.py <input.pptx> <output_dir>` (pip install python-pptx)
2. Confirm extracted titles/content/images with user
3. Style selection → Phase 2
4. Generate HTML preserving text, images (assets/), order, notes (as HTML comments)

### Phase 5: Delivery
1. Clean up `.frontend-slides/slide-previews/`
2. Open HTML in browser
3. Summarize: file location, style name, slide count, navigation (arrows/space/swipe), customization (`:root` vars, font link, `.reveal` class), inline editing (hover top-left or press E, click text, Ctrl+S), offer revisions/export/share

### Phase 6: Share & Export (Optional)
- **Deploy to Vercel**: `bash scripts/deploy.sh <path>` — live URL works on any device; handles local images via src detection; prefer folder deploy if many assets
- **Export to PDF**: `bash scripts/export-pdf.sh <html> [output.pdf]` — Playwright screenshots each `.slide` at 1920×1080, combines to PDF; animations become final state; `--compact` flag renders 1280×720 for 50-70% smaller file

## Included Styles
- **Dark**: Bold Signal, Electric Studio, Creative Voltage, Dark Botanical
- **Light**: Notebook Tabs, Pastel Geometry, Split Pastel, Vintage Editorial
- **Specialty**: Neon Cyber, Terminal Green, Swiss Modern, Paper & Ink
- **Bold Pack (34)**: Neo-Grid Bold, Editorial Tri-Tone, Creative Mode, Broadside, Signal, Vellum, Soft Editorial, Editorial Forest, Pin & Paper, Sakura Chroma, Stencil & Tablet, Cobalt Grid, Emerald Editorial, Monochrome, People's Platform, Pink Script, 8-Bit Orbit, BlockFrame, Blue Professional, Bold Poster, Capsule, Cartesian, Coral, Daisy Days, Grove, Mat, Playful, Raw Grid, Retro Windows, Retro Zine, Scatterbrain, Studio, Biennale Yellow, Long Table + more

## Supporting Files
- `STYLE_PRESETS.md` — 12 curated presets (Phase 2)
- `bold-template-pack/selection-index.json` — compact bold metadata (Phase 2)
- `bold-template-pack/templates/*/preview.md` — lightweight style cards (Phase 2 after shortlist)
- `bold-template-pack/templates/*/design.md` — full design system for selected template only (Phase 3)
- `viewport-base.css` — mandatory fixed-stage CSS (Phase 3)
- `html-template.md` — HTML architecture + JS features (Phase 3)
- `animation-patterns.md` — CSS/JS animation snippets (Phase 3)
- `scripts/extract-pptx.py` — PPT extraction (Phase 4)
- `scripts/deploy.sh` — Vercel deploy (Phase 6)
- `scripts/export-pdf.sh` — PDF export via Playwright (Phase 6)

## Design Aesthetics — Anti AI-Slop
- Typography: distinctive fonts (not Arial/Inter/system); elevate aesthetics
- Color: cohesive, CSS variables, dominant + sharp accents, draw from IDE themes/cultural aesthetics
- Motion: CSS-only for HTML, Motion library for React; one well-orchestrated page load with staggered reveals > scattered micro-interactions
- Backgrounds: layered gradients, geometric patterns, contextual effects — not solid colors
- Avoid: overused fonts, purple gradients on white, predictable layouts, cookie-cutter cards

## Integration for ST Product Package
- HTML Slides agent MUST use this skill for every presentation
- Decide slide count from Section Plan (30+ page PDF → ~20-40 slides)
- Theme/style based on topic research (testing toolkit = code-heavy, resume = typography, marketing = bold headers)
- Ensure dual-mode: interactive HTML + PDF export via `@media print` diagnostic CSS (see html-cinematic instructions)
