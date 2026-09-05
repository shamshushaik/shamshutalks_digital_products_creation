# ShamshuTalks — Product Package + Freebie Creation — Copilot Instructions

You are working inside **ShamshuTalks Reels — ST Product Package + Freebie Creation** workspace.
This workspace uses a **GitHub Copilot-native agentic orchestration framework** in VS Code with **two domain flows**.

## Core Principle
User pastes **Topic + Topic Content / Script Content** → **Shamshu Manager Agent** routes to correct domain → specialist agents → complete deliverable.

- **Product Package** (trigger: `create product` / `create package` / `generate product` / `build product` — without `freebie` keyword) → 30+ page PDF + Modern HTML Web Page + Demo/Practice Projects (Steps 1–11, `productPackage-STs.md`, pricing ₹149–699, payment assets)
- **Freebie** (trigger: `create freebie` / `generate freebie` / `build freebie` / `freebie pdf` / `lead magnet` — with `freebie` keyword) → 10-15 page PDF only + optional companion files (Steps 1–9, `freebiev3_new.md`, no pricing/payment, no HTML)

If ambiguous, Manager asks: "Is this a **Product Package** (30+ pages, PDF+HTML+Projects) or a **Freebie** (10-15 pages, PDF only)?"

## Product Package Goal
End user can **Read → Study → Learn → Practice → Training → Create Own Things** using ONLY the digital package. Every file must support all 6 stages.

## What a Complete Product Package Contains
1. **PDF** — unique, Gamma-inspired, screen-first, interactive, hyperlinked, enterprise-grade (30+ pages)
2. **Modern HTML Web Page** — a complete, self-contained modern web page (NOT slides/presentation) that serves as the show-stopper companion to the PDF. Built with shadcn/ui + Motion + KokonutUI + Bklit UI + Anime.js + Tailwind CSS. Features interactive charts, animations, motion, visuals, graphs, code blocks with syntax highlighting, scroll-linked effects, and deep content covering everything the product promises. **Naming: the HTML file name must match the PDF name** (e.g., `API_Contract_Testing.pdf` → `API_Contract_Testing.html`), placed in the product root folder — not in a `slides/` subfolder. PDF and HTML are generated **in parallel** during the creation phase — no sequential dependency.
3. **Demo / Automation Projects** — enterprise real-time, end-to-end, runnable frameworks with all required files

All three are decided **after AI research** based on topic/content — not pre-fixed templates.

## What a Complete Freebie Contains
1. **PDF** — premium, Gamma-inspired, screen-first, 10-15 pages as guideline (if content genuinely requires more pages, go ahead — content depth beats page count), lead-magnet / Gumroad freebie level, brand-consistent series. **This is the only deliverable that ships.**
2. **Optional companion files** — templates, checklists, configs (only if explicitly promised in script)
3. **README** — user-facing only if companion files exist

**Freebie cleanup rule:** After review agent confirms exit 0, **all build files and companion files are removed**. The only file that ships is the generated PDF. No companion files, no README, no scripts — just the PDF. Freebie = PDF-only deliverable.

## Agentic Framework Rules
- **Shamshu Manager** is the ONLY user-facing orchestrator. User selects `Shamshu Manager` in Copilot Chat agent picker and pastes topic/script. Manager routes to **Product** or **Freebie** flow based on trigger words (`freebie` keyword → freebie flow, else product flow).
- Manager delegates to specialists via `#tool:agent` — specialists never talk directly to user unless handed off.
- All agents share memory via `.github/memory/` and communicate via handoffs — every agent reads session memory + prior outputs at start, writes after phase, updates handoff log; no silos, everyone knows what everyone is doing.
- Every specialist has unique prompts, rules, duties, do/don't lists — no overlap. Each agent's file has `## Unique Duties (Only You Do This)` + `## Memory & Communication` + `## 6-Stage + What/How/Where` sections.
- **Product specialists** (6): `product-research`, `product-content-architect`, `product-pdf-generator` (dev+self-QE), `product-html-generator` (dev+self-QE, builds modern HTML web page with shadcn/ui+Motion+KokonutUI+Bklit UI+Anime.js), `product-demo-builder`, `product-review-agent` (end-to-end review, loops fixes until all okay) — Steps 1–11, 30+ pages, PDF+HTML+Projects
- **Freebie specialists** (3): `freebie-research`, `freebie-pdf-generator` (dev+self-QE), `freebie-review-agent` (end-to-end review, loops fixes until all okay) — Steps 1–9, 10-15 pages, PDF only
- No step from `productPackage-STs.md` (product) or `freebiev3_new.md` (freebie) may be skipped — manager enforces checklist per domain.

## Global Standards

### PDF Design System (Gamma-Inspired — Both Product and Freebie)
Every PDF must use a **complete, cohesive visual system** — not random styling. Choose a Gamma-inspired design direction during research, then maintain it across ALL pages. This includes:

- **Theme:** Pick one design direction per PDF (e.g., dark-tech for coding kits, clean-professional for career tools, bold-colorful for marketing). Every visual element must serve this theme.
- **Colors:** Define a 2–3 color palette (primary + accent + dark) and apply it consistently — headers, callout boxes, table headers, diagrams, code block backgrounds, branding pages. No color should appear once and never again.
- **Fonts:** Modern sans-serif body (Inter/Helvetica Neue) + distinct heading weight. Code in fixed-width (Courier/Consolas). **Tree blocks require a Unicode-capable monospace font (DejaVu Sans Mono / Noto Sans Mono)** — Courier does NOT support box-drawing characters (├└│─) and will render squares/tofu. Never default Times New Roman.
- **Tables:** Proportional column widths, colored headers matching palette, alternating row tints, consistent padding, word-wrapping — never overflow margins. Right edge ≤533pt (A4).
- **Diagrams & Visuals:** Calculated positions (not hardcoded pixels), filled arrowheads, wrapped text inside boxes, consistent shadow/rounded-corner treatment. Architecture, flow, sequence, and comparison diagrams all use the same visual language. **Minimum font size in diagrams: 7pt labels, 8pt body. All text must be word-wrapped inside boxes. Arrow labels offset 4pt above/below arrow lines — never rendered on the line. Every text-on-background pair must pass 4.5:1 contrast. No overlapping elements.**
- **Code Snippets/Blocks:** Dark background (#1E293B or palette dark), fixed-width font, single-line spacing, consistent padding. No stretched or loose code blocks. **Tree blocks inside code sections must use Unicode-capable monospace (DejaVu Sans Mono), not Courier.**
- **Callout Boxes:** Consistent style (accent-colored left border or filled background), KeepTogether (never split across pages), used for tips/warnings/info/definitions. **Text inside callouts must pass 4.5:1 contrast — no light-on-light or gray-on-gray.**
- **Icons & Graphics:** If icons are used, one style/weight throughout — never mix icon sets. Visual elements (shapes, lines, dots) reinforce the theme, not distract.
- **Alignment & Spacing:** Zero misalignment — generous consistent margins, aligned text baselines, tables flush to content width, diagrams centered, no overlapping elements anywhere. **Every diagram box has minimum 8pt padding on all sides. Box dimensions calculated from content, not hardcoded.**
- **First & Last Pages:** Cover page and branding/back page must be the most visually striking pages in the PDF — they set the first impression and leave the lasting impression. Both must be designed assets, not plain text.

### PDF Technical Requirements
- Screen-first design: A4 for PDF, responsive for HTML (desktop-first), Inter/Roboto/SF Pro + JetBrains Mono, 4.5:1 contrast, no-bleed layouts
- PDF: linearization, Fit Page, bookmarks open, artifact tagging, form fields, copy-paste integrity
- HTML: complete modern web page (NOT slides) — shadcn/ui components + Motion animations + KokonutUI blocks + Bklit UI charts + Anime.js micro-interactions + Tailwind CSS. Features hero section, interactive cards, scroll-linked animations, code blocks with syntax highlighting, data visualizations, responsive design, accessibility (WCAG 2.1 AA). Self-contained single file, opens in any browser.
- Projects: enterprise real-time, full file tree, README, setup steps, free/open-source stack, step-by-step learning path- **PDF Diagram Quality Gate (learned from Playwright PDF defects):** Tree blocks use Unicode-capable monospace font (DejaVu Sans Mono) — Courier renders boxes/tofu. All diagram text min 7pt, word-wrapped inside boxes, box height calculated from content. Arrow labels offset from lines. 4.5:1 contrast on all text. No overlapping elements. No table overflow past 533pt. Review agent must visually verify every diagram page.- **6-Stage Learning (every file, every condition)**: every file must support Read → Study → Learn → Practice → Training → Create Own Things — verified per file in content-map.md, any ❌ = BLOCKER
- **What/How/Where + Free/Open-Source + Step-by-Step (every instructional section)**: what to do, how to do, where to do, what/how/where, free/open-source tools with links, step-by-step (one action = one step), learning steps — enforced via 7-part flow (What/What-Needed/Where/How/What-You-Should-See/What-If/What's-Next), missing any = CRITICAL

## Workflow Enforcement
- **Product**: Research first → decide PDF/HTML/Project structure → Content architecture (Read→Create mapping) → **Parallel creation** (PDF+HTML+Projects generated simultaneously via product-pdf-generator + product-html-generator + product-demo-builder, each dev+self-QE — PDF and HTML have NO sequential dependency) → Review (product-review-agent: end-to-end PDF 5 checks + HTML 8 cinematic + 6-stage + Steps 1–11 + rendered-output + cross-reference + demo tests, loops fixes to specialist until all okay, exit 0) → **Final assembly & File Cleanup** (Step 9: AFTER exit 0, remove build files and HTML build companion files; keep only deliverables: PDF, HTML, companion_files, demo-app, practice-lab, README, requirements, .env.example — ask user to clean up remaining; verify no build files remain, README 10-point) + pricing (Step 7) + payment assets (Step 10 external only)
  - **HTML naming**: HTML file = `{Product_Name}.html` (matching PDF name) in product root — single self-contained file, no `slides/` subfolder. Build files (`generate_*.py`, `review_agent.py`, planning `.md` files) removed during cleanup.
  - **Deliverables only**: PDF + HTML (modern web page) + companion_files/ + demo-app/ + practice-lab/ + README + requirements.txt + .env.example
- **Freebie**: Research first → decide visual/format (which of 5 types) → PDF creation (freebie-pdf-generator dev+self-QE, 10-15 pages, more if content demands) → Review (freebie-review-agent: end-to-end content + rendered-output + diagram quality + blank pages + 6-stage + review_agent.py until exit 0, loops fixes until all okay) → **Final assembly & File Cleanup** (Step 9: AFTER exit 0, agent actively deletes ALL build files + companion files + planning files from disk — **only the generated PDF ships**. No companion files, no README, no scripts, no planning docs. Ask user to verify PDF-only delivery.)

## Copilot Chat Usage
- User: Select **Shamshu Manager** agent → paste Topic + Script → say "Create product" (product flow) or "Create freebie" (freebie flow)
- Manager routes: `freebie` keyword → Freebie flow (`freebie-research` → `freebie-pdf-generator` (dev+self-QE) → `freebie-review-agent` (end-to-end, loops fixes)); else → Product flow (`product-research` → `product-content-architect` → `product-pdf-generator`+`product-html-generator`+`product-demo-builder` (each dev+self-QE) → `product-review-agent` (end-to-end, loops fixes))
- Use `/create-product` for product, `/create-freebie` for freebie — both route to Manager
- If ambiguous, Manager asks: "Is this a **Product Package** (30+ pages, PDF+HTML+Projects) or a **Freebie** (10-15 pages, PDF only)?"

## Do Not
- Do not use raw master prompt — use agentic delegation
- Do not skip research phase
- Do not create static PDFs without interactivity checks
- Do not embed broken links or non-standard JS that breaks Acrobat/Preview
