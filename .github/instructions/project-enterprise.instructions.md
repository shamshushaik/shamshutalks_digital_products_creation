---
description: "Use when building, editing, or validating demo/practice enterprise projects — companion_files, demo-app, practice-lab, README, requirements. Covers stack decisions, file trees, and 6-stage learning mapping."
applyTo: "**/companion_files/**,**/*-demo-app/**,**/*-practice-lab/**,**/README.md,**/requirements.txt"
---

# Enterprise Project Instructions — ST Product Package

Applies when creating or editing any companion files, demo app, practice lab, README, or supporting files.

## Stack Decision (Topic-Driven, NOT Hardcoded)
| Topic | Demo Stack | Practice Stack |
|-------|------------|----------------|
| Playwright/Selenium/Cypress | Express.js + HTML (data-testid) | fixtures/ + exercises/ |
| Python testing | FastAPI/Flask + pytest | conftest.py + fixtures/ |
| CI/CD | workflow YAML + repo structure | pipeline-templates/ |
| n8n/Zapier | mock webhooks (Express/Python) | workflow-templates/ |
| API design | OpenAPI + mock server | schema-templates/ |
| Python automation | scripts + sample data | lib/ + exercises/ |
| Design/Resume | templates + sample JSON/CSV | templates/ + exercises/ |
| JS/Node | Express/Fastify | src/lib/ + exercises/ |

## Demo Project (`{product-slug}-demo-app/`)
- Unique name derived from product (e.g., `hybrid-demo-app`), never generic `demo-project`/`server`
- Main executable + dependency file + data files + README + single run command
- Every endpoint/resource/workflow/selector templates reference must exist
- Seed 3-5 records per entity + edge cases, validation (404/422/500), reset on restart, port via env var
- No database/Docker/external services unless topic demands, no hardcoded secrets
- README: how to run, endpoint/resource table, template-to-demo mapping, troubleshooting

## Practice Project (`{product-slug}-practice-lab/`)
- Unique name, never generic `practice`/`test-project`
- Structure: config + .env.example + helpers/fixtures/lib (helpers, data-factory, utils) + exercises/ (TODOs)
- Separation of concerns, reusable helpers, data-factory (unique timestamped), per-exercise run commands
- README with helper reference tables, must reference demo project

## README.md (10-Point Beginner Spec)
1. Product name + value statement
2. What's Included table (every file, purpose, matching PDF)
3. Start Here numbered flow
4. Pre-requisites with download links (Windows/Mac/Linux where differs)
5. Quick Start (3 commands to early win)
6. Try It Now (2-terminal: demo + tests)
7. Project tree (Unicode ├└│─, Courier, light gray bg, actual names)
8. Glossary 5-10 terms
9. Troubleshooting 5 issues (plain language)
10. Link to PDF + branding footer (@shamshutalks, DM CAREER)

Tone: friendly, zero jargon without explanation. Not developer docs.

## 6-Stage Learning (Every File Must Support)
Read → Study → Learn → Practice → Training → Create Own Things — verify per file in content-map.md

## Verification Before Handoff
- `grep -r "old-folder-name"` → 0 results
- Start demo → verify every endpoint/resource
- Run ALL templates against demo → all pass (fix until 0 failures)
- Every selector in templates exists in HTML (if applicable)
- Folder names match everywhere

## Hard Rules
- Never combine multiple actions in one step — one action = one outcome
- Every command explained: what/why/expected output, copy-paste ready, [YOUR_VALUE_HERE] with example
- Windows/Mac/Linux variants where commands differ
- Before You Start checklist: Python version, terminal open, internet, files location, editor
