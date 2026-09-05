---
name: product-package-creation
description: "Create complete ST Product Package — PDF + HTML Slides + Demo Projects. Use when building any ShamshuTalks product package, validating product package quality, or running product pipeline. Triggers: create product, create package, generate product, build product, product package. For freebie (10-15 page PDF), use freebie-creation skill."
user-invocable: true
argument-hint: "Topic + Script/Content"
---

# ST Product Package Creation Skill

Complete digital product package: **PDF + HTML Slides + Demo/Automation Projects** — end user can **Read → Study → Learn → Practice → Training → Create Own Things** using ONLY the package.

## When to Use
- User pastes Topic + Script/Content and says create package / create product / generate product / build package
- Validating or fixing an existing product package
- Any ST Product Package Creation task

## Procedure

### 1. Intake (Manager)
- Extract Topic, Script, Price Context (₹149–699)
- Run Step 1 Promise Extraction — binding spec list
- Create session memory from `.github/memory/_template-session-product.md`
- Create `Product_Name/` folder (sanitized)

### 2. Research First — BLOCKER (Research Specialist)
Delegate via `#tool:agent` to `product-research`:
- Ground-truth research per promise — real docs, current syntax/version/API, what/why/how/where/which
- Verification log: source + confirmed detail per component
- Decide PDF/HTML/Project structure AFTER research
- Load skills: `gamma-inspiration` (Gamma storytelling/layout), `frontend-slides` (16:9 stage, style presets), `design-system` (brand tokens), `cinematic-ui` (film art direction), `animated-web-components` (animation primitives) — see `.github/skills/<skill>/SKILL.md` for each
- Outputs: `research-report.md`, `visual-decision.md`, `stack-decision.md`

### 3. Content Architecture (Content Architect)
Delegate to `product-content-architect`:
- Section Plan (Step 5C): 30+ pages, every section why + min depth + page allocation + Visual Checklist (Diagram|Callout|Code|Table|Divider|Unique per section)
- 6-Stage Mapping: every file → Read/Study/Learn/Practice/Training/Create
- Flowable Plan (Step 5D): topic-adaptive (always CalloutBox+SectionDivider, plus CodeBlock/ArchitectureDiagram/FlowDiagram as needed)
- Table Plan (Step 5E): 3+/5+/8+ tables, universal + topic-specific, depth minimums
- Outputs: `section-plan.md`, `content-map.md`, `flowable-plan.md`, `table-plan.md`

### 4. Parallel Creation (after Phase 3)
Delegate CONCURRENTLY:
- **Product Demo Builder** → `companion_files/` + `{slug}-demo-app/` + `{slug}-practice-lab/` + README (10-point) + requirements — MUST finish before PDF. Verify: demo starts, all templates pass, selectors match, no stale refs.
- **Product PDF Generator** → loads `gamma-inspiration` + `design-system` skills, then `generate_pdf.py` with custom Flowables, 7-part instructional flow, all PDF checks (hyperlink ≥24×24pt, navigation persistent, media form fields, typography 4.5:1 Inter/Roboto, performance linearization, visual density no 2 text-only pages) — dev + self-QE (check everything fine or not before handing to review agent)
- **Product HTML Generator** → loads `frontend-slides` (Phase 1→2→3: content discovery → 3 style previews → full deck with viewport-base.css) + `cinematic-ui` (director/film storyboard if cinematic) + `design-system` + `animated-web-components` + `gamma-inspiration`, then `slides/index.html` cinematic 16:9 (1920×1080), z-index depth, vignettes, fragment splitter, render-idle, poster frames, dual-mode with `@media print` diagnostic CSS — dev + self-QE

**Critical**: PDF starts ONLY after companion/demo/practice exist — every path in PDF matches real file.

### 5. Review (Product Review Agent) — End-to-End, Loops Fixes Until All Okay
Delegate to `product-review-agent`:
- End-to-end review: PDF 5 checks (hyperlink, navigation, media, typography, performance) + HTML 8 cinematic + 6-stage (every file) + Steps 1–11 (review_agent.py 32 checks, PyMuPDF, pixel 200 DPI) + rendered-output QA + cross-reference + demo tests
- If any issue/missing/bug found → route back to specialist that owns the file (product-pdf-generator for PDF, product-html-generator for HTML, product-demo-builder for demo/practice) → specialist fixes → re-review → loop until all okay (exit 0, no CRITICAL, no missing, no bugs)
- Only when all okay → hand off to Manager for Final Assembly & File Cleanup
- Output: `qa-report.md` with ✅/❌ per step + routing log + loop count

### 6. Final Assembly & File Cleanup (Manager) — Step 9
- Files gate: PDF 30+ pages, all companion files, README, requirements, no build files
- Pricing: single price ₹149–699 with reasoning (outside PDF)
- Payment assets (Step 10, outside PDF): title 75 chars, description 3–5 sentences, cover prompt 1280×720 16:9 @shamshutalks — external only, never shipped inside product
- **Step 9 File Cleanup (AFTER review agent exit 0 — CRITICAL ORDER):** present user with files to clean up (generate_pdf.py, review_agent.py, planning files, master prompts — with reason) + files to remain (PDF, README 10-point, companion files, demo-app, practice-lab, supporting files); ask user to clean up — agent does NOT delete files; user cleans up; provide cleanup checklist (no build files remain, generate_pdf.py must never ship, no stale folder names via grep -r old-name → 0); README 10-point beginner guide required
- Present indexed, hyperlinked package

## References
- Master spec: `productPackage-STs.md` (Steps 1–11 + all learned defects)
- Plan: `plan.md` (PDF + HTML checks, 6-stage, agentic framework)
- Instructions: `.github/instructions/pdf-quality.instructions.md`, `html-cinematic.instructions.md`, `project-enterprise.instructions.md`, `learning-6stage.instructions.md` (applyTo: ** — every file, every condition)
- Agents: `shamshu-manager` + `product-research` + `product-content-architect` + `product-pdf-generator` (dev+self-QE) + `product-html-generator` (dev+self-QE) + `product-demo-builder` + `product-review-agent` (end-to-end, loops fixes) — each has Unique Duties + Memory & Communication + 6-Stage sections, no overlap, all share `.github/memory/` and know what others are doing
- Prompt: `.github/prompts/create-product.prompt.md` → routes to Manager
- Memory: `.github/memory/_template-session-product.md` — shared, handoff log, all agents read/write
- Skills: `frontend-slides`, `design-system`, `cinematic-ui`, `animated-web-components`, `gamma-inspiration` — loaded by Research/HTML/PDF agents per topic

## Key Rules
- Research first, PDF after demo, no stub/filler, no script content in PDF, no CTA/price in PDF
- Every instructional section = 7-part flow (What/What-Needed/Where/How/What-You-Should-See/What-If/What's-Next)
- Screen-first 16:9, Inter/Roboto/SF Pro, 4.5:1, no-bleed; PDF linearization Fit Page bookmarks open; HTML dual-mode
- Cross-reference sync: every folder/file/endpoint/selector in PDF matches disk
- Demo: every template passes against demo before delivery
- **6-Stage (every file, every condition)**: Read → Study → Learn → Practice → Training → Create Own Things — verified per file in content-map.md, any ❌ = BLOCKER (see `learning-6stage.instructions.md`)
- **What/How/Where + Free/Open-Source + Step-by-Step (every instructional section)**: what to do, how to do, where to do, what/how/where, free/open-source with links, step-by-step (one action = one step), learning steps — missing any = CRITICAL
- **Memory & Communication**: all agents share `.github/memory/session-*.md`, read prior outputs at start, write after phase, update handoff log — no silos
- **Unique Duties**: every agent has `## Unique Duties (Only You Do This)` — no overlap, single responsibility per agent
