# Session Memory — {{TOPIC}} — {{DATE}}

> Copy this template to `session-{{YYYY-MM-DD}}-{{slug}}.md` at intake. All agents read/write here.

## Intake
- **Topic**: 
- **Script/Content**: (paste or link)
- **Price Context**: ₹ — ₹
- **Product Folder**: `Product_Name/`
- **Trigger**: phrase that activated pipeline

## Step 1 — Promise Extraction (Binding Spec)
| # | Promise | Type | Count/Detail |
|---|---------|------|--------------|
| 1 | | | |

## Phase 1 — Research (product-research)
- **Status**: ⬜ Not started | 🔄 In progress | ✅ Done | ❌ Blocked
- **Report**: `research-report.md`
- **Visual Decision**: `visual-decision.md`
- **Stack Decision**: `stack-decision.md`
- **Verification Log**: (source + confirmed detail per promise)
- **Gaps Flagged**:

## Phase 2 — Content Architecture (product-content-architect)
- **Status**: ⬜ | 🔄 | ✅ | ❌
- **Section Plan**: `section-plan.md` (30+ pages, page allocation, visual checklist)
- **Content Map**: `content-map.md` (6-stage per file)
- **Flowable Plan**: `flowable-plan.md`
- **Table Plan**: `table-plan.md`

## Phase 3 — Parallel Creation
### Demo Builder
- **Status**: ⬜ | 🔄 | ✅ | ❌
- **Companion Files**: list
- **Demo App**: `{slug}-demo-app/` — stack, run command, test results
- **Practice Lab**: `{slug}-practice-lab/` — structure, helpers
- **README**: 10-point spec ✅/❌
- **Verification**: demo started ✅, templates X/Y passed, selectors matched ✅, no stale refs ✅

### PDF Craft
- **Status**: ⬜ | 🔄 | ✅ | ❌ (BLOCKED until demo done)
- **Prerequisite Gate**: demo files exist ✅/❌
- **Flowables Used**: CalloutBox, SectionDivider, ...
- **Pages**: N (30+ required)
- **Checks**: hyperlink ✅, navigation ✅, media ✅, typography ✅, performance ✅, visual density ✅

### HTML Slides
- **Status**: ⬜ | 🔄 | ✅ | ❌
- **Slides**: N, theme, framework
- **Cinematic**: aspect 16:9 ✅, depth ✅, vignettes ✅, flattening ✅, fragment splitter ✅, render-idle ✅, poster ✅
- **Dual-Mode**: HTML ✅, PDF export ✅

## Phase 4 — QA Validation (product-qa-validator)
- **Status**: ⬜ | 🔄 | ✅ | ❌
- **PDF Checks**: hyperlink ✅, navigation ✅, media ✅, typography ✅, performance ✅
- **HTML Cinematic**: all 8 checks ✅/❌
- **6-Stage**: Read ✅ Study ✅ Learn ✅ Practice ✅ Training ✅ Create ✅
- **Steps 1–11 Gate**: | Step | Status |
- **Review Agent**: exit code 0 ✅ / 1 ❌, CRITICAL 0, WARNING N
- **Files Gate**: PDF 30+ ✅, companion files ✅, README ✅, requirements ✅, no build files ✅
- **QA Report**: `qa-report.md`

## Phase 5 — Final Assembly & File Cleanup (Manager) — Step 9
- **Pricing** (Step 7): ₹N — reasoning (outside PDF) ✅/❌
- **Payment Assets** (Step 10): title (75 chars) ✅, description (3-5 sentences) ✅, cover prompt 1280×720 ✅ — external only, never shipped ✅/❌
- **Step 9 File Cleanup (AFTER review agent exit 0 — CRITICAL ORDER):**
  - Presented user with files to clean up (generate_pdf.py, review_agent.py, planning files, master prompts — with reason) + files to remain (PDF, README, companion files, demo-app, practice-lab, supporting files) ✅/❌
  - Asked user to clean up — agent does NOT delete files; user cleans up ✅/❌
  - Provided cleanup checklist: no build files remain, generate_pdf.py must never ship, no stale folder names (grep → 0) ✅/❌
  - README 10-point beginner guide present ✅/❌
- **Final Package Index**: (hyperlinked file list)
- **Files Gate**: PDF 30+ ✅, companion files ✅, README ✅, requirements ✅, no build files ✅ (user to verify after cleanup)

## Cross-Reference Sync
- [ ] Folder names match everywhere (PDF, READMEs, demo, practice)
- [ ] File paths in PDF match disk
- [ ] Selectors in templates exist in HTML
- [ ] Endpoints in templates exist in demo
- [ ] No stale folder names (`grep -r "old-name"` → 0)

## Decisions & Notes
- 

## Handoff Log
| Time | From | To | Context |
|------|------|----|---------|
| | Manager | Research | |
