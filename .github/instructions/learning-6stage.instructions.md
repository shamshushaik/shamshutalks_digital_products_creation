---
description: "Use when creating or validating ANY file in ST Product Package — PDF, HTML slides, demo/practice projects, README, companion files. Enforces Read → Study → Learn → Practice → Training → Create Own Things (6-stage) + what/how/where + free/open-source + step-by-step in all stages, all files, all conditions."
applyTo: "**"
---

# 6-Stage Learning + What/How/Where — Universal Gate

Applies to **every file, every stage, every condition** in the product package. No file may ship without passing this gate.

## 6-Stage Learning Path (Every File Must Support All 6)

| Stage | Question Answered | What Buyer Does | File Must Provide |
|-------|-------------------|-----------------|-------------------|
| **1. Read** | What is this? | Reads overview, cover, intro | Clear title, value statement, What You'll Learn, What's Included — jargon-free, analogy-first |
| **2. Study** | Why does it matter? How does it fit? | Studies deeply with aids | Diagrams, tables, architecture, comparisons — visual aids for every concept |
| **3. Learn** | What concept do I now understand? | Learns concept with explanation | Plain-language definitions, what/why/how/where for every term, glossary 15–25 terms, every term defined on first use |
| **4. Practice** | How do I do it myself? | Practices with templates/exercises | Fill-in-the-blank exercises, templates, copy-paste commands with what/why/expected output |
| **5. Training** | Can I train on a real system? | Trains on demo/practice lab | Runnable demo-app (every endpoint/selector exists), practice-lab (helpers + data-factory + exercises), 2-terminal workflow |
| **6. Create Own Things** | Can I create my own after this? | Creates own project | Step-by-step learning path, free/open-source stack, no vendor lock-in, reusable helpers to copy |

**Verification per file** (in `content-map.md`):
```
| File | Read | Study | Learn | Practice | Training | Create Own | Pass? |
|------|------|-------|-------|----------|----------|------------|-------|
| PDF Ch 3 | What You'll Learn p2 | Diagram p5 | Analogy + definition | Exercise p12 | Demo ref p15 | Template to copy | ✅/❌ |
| slides/index.html | Title slide | Architecture slide | Concept slide | Exercise slide | Demo link | Final create slide | ✅/❌ |
| demo-app/server.js | README overview | Endpoint table | Code comments | Run command | Live server | Fork & extend | ✅/❌ |
```
If any cell is ❌ → redesign file before delivery. **Every file must have all 6 columns ✅.**

## What / How / Where + Free/Open-Source + Step-by-Step (Every Instructional Section)

Every instructional section (any "How to...", "Setting up...", "Running...", "Using...", any section with commands/code/templates) must answer:

| Question | Must Specify | Example |
|----------|--------------|---------|
| **What to do** | One sentence: what this step achieves + why it matters | "This step installs Python — the language that runs the test generator" |
| **How to do** | Exact copy-paste commands, each on own line, explained inline (what/why/expected output) | `pip install -r requirements.txt` + "# Downloads tools this kit needs" + "You should see Successfully installed..." |
| **Where to do** | Exact location: folder, file, URL, terminal window — never vague | "Open `companion_files/ci_cd/pipeline.yml` in Notepad/VS Code" not "open the config file" |
| **What (is this)** | Plain-language definition + analogy-first for every technical term | "CI/CD (Continuous Integration/Deployment) — like an automated factory checkpoint" |
| **How (does it work)** | Mechanism + alternatives + why this approach chosen | "We use Playwright because... alternatives: Cypress (heavier), Selenium (slower)..." |
| **Where (does it fit)** | Where in overall system/project structure | Project tree diagram with exact paths |
| **Free / Open-Source** | Every tool/library must be free/open-source, with download link + why needed | `| Python 3.10+ | Programming language | Runs generator | python.org/downloads |` |
| **Step-by-Step** | One action = one step = one outcome; never bundle 5 commands in one step | Step 1: Install Python → verify → Step 2: Install Node → verify |
| **Learning Steps** | Full learning path: Read → Study → Learn → Practice → Training → Create | Numbered flow: "Step 1 → Read PDF Ch1, Step 2 → Study diagram, Step 3 → Practice exercise 1..." |

**Enforcement: 7-Part Flow** (from productPackage-STs.md Step 5B) — every instructional section MUST contain all 7:
1. What is this step? (purpose)
2. What you need before starting (prerequisites + where to get)
3. Where to do it (exact file path/folder/URL/terminal)
4. How to do it (copy-paste commands with what/why/expected output)
5. What you should see (expected success output/visual confirmation)
6. What if it doesn't work? (1–2 common errors + plain-language fix)
7. What's next? (bridge to next section)

Missing any part = BLOCKER. Review agent flags as CRITICAL.

## Additional Rules (All Files, All Conditions)

- **Before You Start checklist** before any hands-on section: ☐ Python version, ☐ terminal open, ☐ internet, ☐ files location, ☐ editor — with link back to pre-requisites if fails
- **Windows vs Mac vs Linux** variants where commands differ (e.g., `python` vs `python3`, `curl` vs `Invoke-WebRequest`)
- **Copy-Paste Ready**: every command ready to copy-paste; `[YOUR_VALUE_HERE]` with explanation + real example if customization needed
- **Every Command Explained**: what it does + why needed + expected output — even "obvious" commands, buyer may never have opened terminal
- **One Step at a Time**: never combine multiple actions in one step
- **No assumption of prior knowledge**: never "As you know, n8n is..." — instead define on first use with analogy
- **Free/Open-Source Stack Only**: no paid tools, no vendor lock-in; every dependency has free alternative documented

## QA Gate (product-qa-validator)

For every file, verify:
- [ ] All 6 stages supported (Read/Study/Learn/Practice/Training/Create)
- [ ] Every instructional section has 7-part flow
- [ ] Every technical term defined on first use (analogy-first)
- [ ] Every command has what/why/expected output + where to run + Windows/Mac/Linux variants
- [ ] Every tool is free/open-source with download link
- [ ] Project tree + What's Included + Pre-requisites + Start Here + Glossary all present
- [ ] Buyer with zero domain knowledge can go from Read → Create using ONLY package

Fail any = BLOCKER, fix before delivery.
