# Session Memory — Freebie — {{TOPIC}} — {{DATE}}

> Copy this template to `session-{{YYYY-MM-DD}}-{{slug}}-freebie.md` at intake. All agents read/write here.

## Intake
- **Topic**: 
- **Script/Content**: (paste or link)
- **Format Signal**: flowchart / diagram / report / graph or chart / repo link / template / checklist / question bank / other (infer from script if not stated)
- **Freebie Folder**: `Freebie_Name/`
- **Trigger**: phrase that activated pipeline (must contain freebie)

## Step 1 — Promise Extraction (Binding Spec)
| # | Promise | Type | Count/Detail |
|---|---------|------|--------------|
| 1 | | | |

## Phase 1 — Research (freebie-research)
- **Status**: ⬜ Not started | 🔄 In progress | ✅ Done | ❌ Blocked
- **Report**: `freebie-research-report.md`
- **Visual Decision**: `freebie-visual-decision.md` (which of 5 types: flowchart, data diagram, table, graph, repo link)
- **Verification Log**: (source + confirmed detail per promised section)
- **Gaps Flagged**:

## Phase 2 — PDF Creation (freebie-pdf-craft)
- **Status**: ⬜ | 🔄 | ✅ | ❌
- **Prerequisite Gate**: research complete ✅/❌
- **Flowables Used**: CalloutBox, SectionDivider, ... (topic-adaptive)
- **Pages**: N (10-15 required)
- **Checks**: margins ✅, no overlap ✅, heading hierarchy ✅, no orphaned headers ✅, code blocks ✅, brand consistency ✅, cover ✅, back page ✅

## Phase 3 — QA Validation (freebie-qa-validator)
- **Status**: ⬜ | 🔄 | ✅ | ❌
- **Step 5 Content Gate**: every promise present, built out, verified; no script leak; every diagram present ✅/❌
- **Step 6 Rendered-Output QA**: callout splits ✅, orphaned headings ✅, near-empty pages ✅, duplicated headers ✅, code spacing ✅, table/diagram clipping ✅, diagram defects ✅
- **Step 7 Diagram Quality**: calculated positions ✅, filled arrowheads ✅, word wrap ✅, fits margins ✅
- **Step 8 Blank Pages**: no double PageBreak ✅, no SectionDivider+PageBreak ✅, KeepTogether ✅
- **6-Stage**: Read ✅ Study ✅ Learn ✅ Practice ✅ Training ✅ Create ✅ (where applicable)
- **Review Agent**: exit code 0 ✅ / 1 ❌, CRITICAL 0, WARNING N
- **Files Gate**: PDF 10-15 ✅, no build files ✅, README user-facing if present ✅
- **QA Report**: `freebie-qa-report.md`

## Phase 4 — Final Assembly & Cleanup (Manager) — Step 9
- **Files Gate**: PDF 10-15 ✅, no build files ✅ (user to verify after cleanup)
- **Step 9 File Cleanup (AFTER review agent exit 0 — CRITICAL ORDER):** presented user with files to clean up (generate_pdf.py, review_agent.py, planning files, master prompts — with reason) + files to remain (PDF, README user-facing, companion deliverables, supporting files) ✅/❌
- **Asked user to clean up — agent does NOT delete files; user cleans up** ✅/❌
- **Provided cleanup checklist**: no build files remain, generate_pdf.py must never ship ✅/❌
- **Final Package Index**: (hyperlinked file list)

## Decisions & Notes
- 

## Handoff Log
| Time | From | To | Context |
|------|------|----|---------|
| | Manager | Freebie Research | |
