---
description: "Create freebie PDF resource (10-15 pages) — standalone downloadable PDF. Paste Topic + Script/Content and run."
name: "Create Freebie"
argument-hint: "Paste Topic + Script/Content + Format Signal"
agent: "shamshu-manager"
model: "Any LLM (Muse Spark, GPT, Claude, Gemini, etc.)"
tools: [read, search, todo, agent, web, edit, execute]
---

# Create Freebie PDF Resource

You are invoking **Shamshu Manager** — the ONLY user-facing orchestrator. This prompt routes to **Freebie Flow** (10-15 pages, PDF only).

## How to Use
1. Select **Shamshu Manager** in Copilot Chat agent picker (or run this prompt — it routes to Manager with freebie domain)
2. Paste your **Topic** + **Script/Caption Content** + **Format Signal** below
3. Say **"Create freebie"** — Manager auto-starts freebie pipeline

## Inputs Required
- `[TOPIC NAME]` — freebie title/topic
- `[SCRIPT/CAPTION TEXT]` — full script/caption that made the promise (paste verbatim)
- `[FORMAT SIGNAL]` — what topic inherently calls for: flowchart / diagram / report / graph or chart / repo link / template / checklist / question bank / other (infer from script if not stated)

## What Manager Will Do (Steps 1–9)
1. **Promise Extraction** — binding spec from script (section names, counts, claims, format cues)
2. **Independent Research** → `freebie-research` — verify every promised section, produce verification log, decide visual/format (which of 5 types genuinely needed)
3. **PDF Creation** → `freebie-pdf-craft` — premium 10-15 page PDF (ReportLab, cover, typography, color system, callouts, branding back page, topic-adaptive Flowables, no CTA/price/script content)
4. **QA Validation** → `freebie-qa-validator` — Step 5 content, Step 6 rendered-output, Step 7 diagram quality, Step 8 blank pages, 6-stage, review_agent.py until exit 0
5. **Final Assembly & Cleanup** — files gate, delete build files, present indexed package

## Trigger Words (Freebie Flow)
`create a freebie`, `create freebie`, `generate freebie`, `build freebie`, `make freebie`, `freebie pdf`, `lead magnet`, `create freebie pdf` + Topic + Script = auto-start, no confirmation.

**Routing:** If message contains `freebie` → Freebie Flow (this prompt). If `create product`/`create package` without freebie → Product Package Flow (`/create-product`).

## Rules Enforced
- Research first — no PDF before research
- 10-15 pages total — if doesn't fit, tighten writing, don't cut promised content
- No CTA/price/purchase link inside PDF — CTAs live in script/caption only
- No script content verbatim/near-verbatim in PDF — extraction only
- Every promised item present, fully built out, verified; every diagram from format decision present
- Premium design: cover, modern sans-serif, 2-3 color palette, callouts (KeepTogether), section dividers, page numbers + footer, branding back page (dark bg, @shamshutalks, socials, booking, tagline)
- Brand consistency across freebies (palette/fonts/header/footer consistent, internal layout varies)
- 6-stage learning where applicable + what/how/where + free/open-source + step-by-step

## Paste Below
```
[TOPIC NAME]:
[SCRIPT/CAPTION TEXT]:
[FORMAT SIGNAL]:
Create freebie
```

Manager will respond with `🎬 Shamshu Manager activated — Domain: Freebie` and delegate to `freebie-research` → `freebie-pdf-craft` → `freebie-qa-validator` via #tool:agent. All progress via shared memory in `.github/memory/` (template: `_template-session-freebie.md`).
