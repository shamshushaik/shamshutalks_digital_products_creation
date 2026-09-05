---
name: freebie-creation
description: "Create freebie PDF resource (10-15 pages) — standalone downloadable PDF from script promise. Use when building any ShamshuTalks freebie, validating freebie quality, or running freebie pipeline. Triggers: create freebie, generate freebie, build freebie, freebie pdf, lead magnet."
user-invocable: true
argument-hint: "Topic + Script/Content + Format Signal"
---

# Freebie Creation Skill — 10-15 Page PDF Resource

Standalone downloadable freebie PDF that fully delivers on script promise — nothing less, nothing padded. Brand: @shamshutalks (Shamshu Shaik), Telugu-English QA career education.

## When to Use
- User pastes Topic + Script/Content and says create freebie / generate freebie / build freebie / freebie pdf / lead magnet
- Validating or fixing an existing freebie
- Any freebie PDF task

## Procedure

### 1. Intake (Manager)
- Extract Topic, Script, Format Signal (flowchart/diagram/report/graph/repo link/template/checklist/question bank/other — infer from script if not stated)
- Run Step 1 Promise Extraction — literal list of every specific thing promised (section names, counts like fifty questions, claims, format cues) as binding spec
- Create session memory from `.github/memory/_template-session-freebie.md`
- Create `Freebie_Name/` folder (sanitized)

### 2. Research First — BLOCKER (Freebie Research)
Delegate via `#tool:agent` to `freebie-research`:
- Independent research per promised section — real docs, real practices, real gotchas, not surface-level
- Verification log: source + confirmed detail per section; version numbers reflect actual check at generation time
- Cover what/why/how/where per section; depth over decoration (fifty good questions, not padded repetition)
- Visual/Format Decision (Step 3) — decide which of 5 types genuinely needed: flowcharts, data/architecture diagrams, tables/reports, graphs/charts (only if real data), repo/resource links (only if real working link); text-only topics stay text-only
- Load skills: `gamma-inspiration` (Gamma storytelling/layout for uniqueness), `design-system` (brand tokens) where applicable
- Outputs: `freebie-research-report.md`, `freebie-visual-decision.md`

### 3. PDF Creation (Freebie PDF Generator) — Dev + Self-QE
Delegate to `freebie-pdf-generator`:
- Build premium 10-15 page PDF via ReportLab (Steps 4/4A) — cover (title + hook + visual element), modern sans-serif + distinct heading, fixed 2-3 color palette, generous whitespace, section dividers, callout boxes (KeepTogether, never split), consistent iconography, page numbers + footer (brand handle, no CTA), branding back page (dark bg, @shamshutalks large, socials in rows, booking button-like, tagline) — dev + self-QE (check everything fine or not before handing to review agent)
- Every promised item present, fully built out, verified; no script content leaked; every diagram from format decision present
- Custom Flowables topic-adaptive: CalloutBox + SectionDivider always, CodeBlock if code/config, ArchitectureDiagram if 2+ layers, FlowDiagram if 3+ steps, draw_triangle helper via beginPath pattern
- Tables: proportional widths, word wrap, teal #007C8A header, alternating rows, font scaling, right edge ≤533pt
- Diagrams: calculated positions, filled triangular arrowheads, Spacer(1,12) before, KeepTogether, Unicode ├└│─ for trees
- No double PageBreak, no SectionDivider+PageBreak redundancy; topic-specific differentiation (layout varies, palette consistent)
- Output: `Freebie_Name.pdf` (10-15 pages) + `generate_pdf.py`

### 4. Review (Freebie Review Agent) — End-to-End, Loops Fixes Until All Okay
Delegate to `freebie-review-agent`:
- End-to-end review: Step 5 content + Step 6 rendered-output + Step 7 diagram quality + Step 8 blank pages + 6-stage + review_agent.py (freebie-tuned 10-15 pages, pixel 200 DPI) + file cleanup verification
- If any issue/missing/bug found → route back to freebie-pdf-generator for fixes → re-review → loop until all okay (exit 0, no CRITICAL, no missing, no bugs)
- Only when all okay → hand off to Manager for Final Assembly & Cleanup
- Output: `freebie-qa-report.md` with ✅/❌ per step + routing log + loop count

### 5. Final Assembly & Cleanup (Manager)
- Files gate: PDF 10-15 pages, no build files
- **Step 9 File Cleanup (AFTER review agent exit 0 — CRITICAL ORDER):** present user with files to clean up (generate_pdf.py, review_agent.py, planning files, master prompts — with reason) + files to remain (PDF, README user-facing, companion deliverables, supporting files); ask user to clean up — agent does NOT delete files; user cleans up; provide cleanup checklist (no build files remain, generate_pdf.py must never ship)
- Present indexed package

## References
- Master spec: `freebiev3_new.md` (Steps 1–9 + learned defects)
- Instructions: `.github/instructions/pdf-quality.instructions.md`, `learning-6stage.instructions.md` (applyTo: **)
- Agents: `freebie-research` + `freebie-pdf-generator` (dev+self-QE) + `freebie-review-agent` (end-to-end, loops fixes) — each has Unique Duties + Memory & Communication + 6-Stage sections
- Prompt: `.github/prompts/create-freebie.prompt.md` → routes to Manager (freebie flow)
- Memory: `.github/memory/_template-session-freebie.md` — shared, handoff log
- Skills: `gamma-inspiration`, `design-system` — loaded by freebie agents per topic

## Key Rules
- Research first, no PDF before research; 10-15 pages total — tighten writing, don't cut promised content
- No CTA/price/purchase link inside PDF; no script content verbatim/near-verbatim in PDF
- Every promised item present, fully built out, verified; every diagram from format decision present
- Premium design: cover, modern sans-serif, 2-3 palette, callouts (KeepTogether), dividers, page numbers + footer, branding back page
- Brand consistency across freebies (palette/fonts/header/footer consistent, internal layout varies)
- 6-stage where applicable + what/how/where + free/open-source + step-by-step
- File cleanup: delete build tools from disk after QA — never ship generate_pdf.py
