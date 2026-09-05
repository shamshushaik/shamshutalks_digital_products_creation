---
description: "Create complete ST Product Package — PDF + HTML Slides + Demo Projects. Paste Topic + Script/Content and run."
name: "Create Package"
argument-hint: "Paste Topic + Script/Content"
agent: "shamshu-manager"
model: "Any LLM (Muse Spark, GPT, Claude, Gemini, etc.)"
tools: [read, search, todo, agent, web, edit, execute]
---

# Create ST Product Package

You are invoking **Shamshu Manager** — the ONLY user-facing orchestrator.

## How to Use
1. Select **Shamshu Manager** in Copilot Chat agent picker (or run this prompt — it routes to Manager)
2. Paste your **Topic** + **Topic Content / Script Content** below
3. Say **"Create package"** — Manager auto-starts full pipeline

## Inputs Required
- `[TOPIC]` — product title (e.g., "Hybrid API Testing Kit")
- `[SCRIPT/CAPTION TEXT]` — full script/caption that sold the product (paste verbatim)
- `[PRICE CONTEXT]` — rough range in ₹149–699 (Manager confirms final price at end)

## What Manager Will Do (Steps 1–11 + Checks)
1. **Promise Extraction** — binding spec from script
2. **Ground-Truth Research** → `product-research` — verify every component, decide PDF/HTML/Project structure
3. **Content Architecture** → `product-content-architect` — Section Plan (30+ pages), 6-stage mapping (Read→Study→Learn→Practice→Training→Create), Flowable + Table plans
4. **Parallel Creation**:
   - `product-demo-builder` → companion_files + demo-app + practice-lab + README (MUST finish before PDF)
   - `product-pdf-craft` → premium Gamma-inspired PDF (ReportLab, custom Flowables, 7-part flow, all PDF checks)
   - `product-html-slides` → cinematic 16:9 HTML (z-index depth, vignettes, fragment splitter, render-idle, poster frames, dual-mode)
5. **QA Validation** → `product-qa-validator` — hyperlink, navigation, media, typography, performance, cinematic, 6-stage, review_agent.py until exit 0
6. **Final Assembly** — indexed package + pricing (₹149–699) + payment assets (title 75 chars, description, cover 1280×720)

## Trigger Words
`create a product`, `create product`, `create product package`, `create folder`, `create all required files`, `create`, `generate product`, `build product`, `make product`, `generate the PDF`, `build the kit` + Topic + Script = auto-start, no confirmation.

## Rules Enforced
- Research first — no PDF/HTML before research
- PDF after demo — every path in PDF matches real file on disk
- No stub sections, no filler, no script content in PDF, no CTA/price in PDF
- Every instructional section = 7-part flow (What/What-Needed/Where/How/What-You-Should-See/What-If/What's-Next)
- Screen-first: 16:9, Inter/Roboto/SF Pro, 4.5:1 contrast, no-bleed
- PDF: linearization, Fit Page, bookmarks open, artifact tagging, form fields, copy-paste integrity
- HTML: cinematic overlays, zero-to-hero flattening, fragment splitter, render-idle, poster frames

## Paste Below
```
[TOPIC]:
[SCRIPT/CAPTION TEXT]:
[PRICE CONTEXT]:
Create package
```

Manager will respond with `🎬 Shamshu Manager activated` and delegate to specialists via #tool:agent. All progress via shared memory in `.github/memory/`.
