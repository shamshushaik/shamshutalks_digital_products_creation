# ShamshuTalks — Digital Product Creation workspace

A GitHub Copilot-native agentic orchestration framework for creating premium digital products — **Product Packages** (30+ page PDF + Modern HTML Web Page + Demo/Practice Projects) and **Freebies** (10-15 page PDF lead magnets).

## 📁 Folder Structure

```
ST Product Package Creation/
├── .github/                    # Agentic framework (agents, instructions, skills, memory)
│   ├── agents/                 # Specialist agent prompts (10 agents)
│   ├── instructions/           # Quality gates and standards
│   ├── skills/                 # Domain knowledge files
│   ├── memory/                 # Shared memory across sessions
│   └── prompts/                # User-facing prompts
├── products/                   # Complete product packages (PDF + HTML + Projects)
│   └── API_Contract_Testing_and_Mocking_Starter_Kit_for_SDETs/
├── freebies/                   # Freebie PDFs (lead magnets)
│   └── Playwright_Flaky_Test_Debugging_Kit/
├── planPrompts/                # Master prompts for product/freebie creation
│   ├── productPackage-STs.md   # 11-step product creation workflow
│   └── freebiev3_new.md        # 9-step freebie creation workflow
└── .gitignore
```

## 🚀 Product Package Contents

Each product package includes:
1. **PDF** — Gamma-inspired, screen-first, interactive, enterprise-grade (30+ pages)
2. **Modern HTML Web Page** — Self-contained single file with shadcn/ui + Motion + KokonutUI + Bklit UI + Anime.js + Tailwind CSS. Charts, animations, motion, visuals, graphs.
3. **Demo / Practice Projects** — Enterprise real-time, runnable frameworks

## 🎁 Freebie Contents

Each freebie includes:
1. **PDF only** — Premium 10-15 page lead magnet (the only deliverable that ships)

## 🤖 Agentic Framework

- **Shamshu Manager** — User-facing orchestrator that routes to Product or Freebie flow
- **6 Product Specialists** — Research, Content Architect, PDF Generator, HTML Generator, Demo Builder, Review Agent
- **3 Freebie Specialists** — Research, PDF Generator, Review Agent
- All agents share memory via `.github/memory/` and communicate via handoffs

## 📋 Tech Stack

### PDF Generation
- ReportLab 4.x (Python)
- Custom Flowable classes (CalloutBox, CodeBlock, SectionDivider, ArchitectureDiagram, FlowDiagram)
- A4 format, 36pt margins, Teal #0E9A8B primary

### HTML Generation (CDN + Open-Source Pattern Extraction)
- **Tailwind CSS** — CDN (`cdn.tailwindcss.com`)
- **Anime.js** — CDN (`cdn.jsdelivr.net/npm/animejs`)
- **shadcn/ui** — Pattern extraction from `github.com/shadcn-ui/ui` (MIT)
- **KokonutUI** — Pattern extraction from `github.com/kokonut-labs/kokonutui` (MIT)
- **Bklit UI** — Pattern extraction from `github.com/bklit/bklit-ui` (MIT)
- **Motion** — Pattern extraction from `github.com/motiondivision/motion` (MIT)

Single self-contained HTML file — no npm, no build step, opens in any browser.

## 📚 6-Stage Learning Path

Every file supports:
1. **Read** — What is this? (overview, cover, intro)
2. **Study** — Why does it matter? (diagrams, tables, architecture)
3. **Learn** — What concept do I understand? (definitions, glossary)
4. **Practice** — How do I do it myself? (exercises, templates)
5. **Training** — Can I train on a real system? (demo app, practice lab)
6. **Create Own Things** — Can I create my own after this? (step-by-step learning path)

## 🛠️ Usage

1. Select **Shamshu Manager** agent in Copilot Chat
2. Paste **Topic + Script/Content**
3. Say "Create product" (product flow) or "Create freebie" (freebie flow)
4. Manager routes to specialist agents → complete deliverable

## 📄 License

Private — ShamshuTalks Digital Products
