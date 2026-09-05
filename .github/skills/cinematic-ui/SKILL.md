---
name: cinematic-ui
description: "Design cinematic websites with film-inspired visual systems — director-driven art direction, storyboard-first layout, cinematic motion. Use when building cinematic HTML slides, movie-style presentations, or film-noir/sci-fi/thriller aesthetics. Source: https://github.com/akseolabs-seo/cinematic-ui"
user-invocable: true
argument-hint: "Topic + desired film/director vibe"
---

# Cinematic UI — Film-Inspired Web Design

Source: https://github.com/akseolabs-seo/cinematic-ui — reasoning-first cinematic design skill. Makes AI think like a film director: research a real film, extract visual language, translate into page narrative and composition. Not a style picker — a director's workflow.

## When to Use
- Building cinematic HTML slides for ST Product Package (HTML Slides agent)
- Need film-inspired visual system, director-driven art direction, storyboard-first layout
- Any cinematic/movie-style presentation request

## Core Mechanism
Pick a director + specific film → research visual language (cinematography, lighting, rhythm, material) → translate into web artifacts: `decisions.md`, `storyboard.md`, `compiled-spec.md` → implement HTML/CSS/JS. Film is research input, not spec sheet.

## Start Questionnaire (Every Invocation)
1. Ask how to start: `Screenshot` (reverse-engineer image/URL) / `Step-by-step` (choose genre/director/film) / `Surprise me` (fresh combo differing from prior work)
2. Ask whether design should include image placeholders
3. Ask for site's niche and page list before architecture
- Use structured questionnaire if available, else plain language
- If user pre-answers some, confirm and ask only missing
- Phase 1 starts only after all required items answered/inferred

## Demo Uniqueness Protocol (If User Has Prior Outputs)
- Inspect immediately previous outputs, record uniqueness audit in `decisions.md`
- Write `Previous-work audit` (recurring traits: left-copy right-object hero, stacked framed panels, rounded premium cards, pill metadata, dark luxury palette)
- Write `Shell-ban list` (forbidden layout traits for new project)
- Write `Primary composition family` (full-bleed stage, corridor, vertical tower, archive wall, panoramic slab, cutaway monolith) — must differ from most recent output unless intentional sequel
- New demo fails if wireframe still looks like previous after removing color/type/decoration

## Four Strict Phases

### Phase 1: Decisions → decisions.md
- Read `references/data/directors-200.md` (200+ directors with films/styles)
- Delegate film/niche/reference research as bounded sub-tasks if sub-agents available
- If prior sites exist, review for uniqueness audit
- If screenshot/live site, inspect and infer genre/director/film, ask confirmation
- When web access available, research chosen director + film (required): palette/lighting, cinematography/framing/rhythm, production design/material, director signatures, 2-3 premium sites in same niche — prefer primary sources, record sources + interpretation (not plot summaries)
- If no web access, state explicitly, continue best-effort, mark weaker pass
- If references provided, decompose via `references/reference-protocol.md` (rhythm, materiality, typography, framing, image treatment) — don't copy whole
- Record uniqueness audit, shell-ban list, primary composition family; write `decisions.md`

### Phase 2: Storyboard → storyboard.md
- Read `references/library-index.md`, `references/premium-calibration.md`, `references/anti-convergence.md`, `references/data/hero-archetypes.md`, `references/data/narrative-beats.md`, `references/data/section-functions.md`, `references/data/section-archetypes.md`
- Use `references/data/dna-index.tsv` to cast 2-3 compatible design DNA sources (mood, font, shape, motion, restraint, density, material); read `design-dna-db.txt` only when index points to promising source
- Define site-wide cinematic grammar BEFORE any page: page-shell logic, navigation posture, framing rules, density cadence, recurring material/atmospheric layers, composition families fitting chosen film — must not violate shell-ban list
- Build director brief: one-sentence visual thesis, 3 signature techniques + web translation, exact color tokens, typography direction, motion rules; run prestige calibration
- For every major page role, write independent scene thesis (standalone scene/poster first, then connect); assign distinct page roles to different agents only after grammar approved
- Define one page-level visual thesis per page (monumental type, sculptural light, editorial framing, void+glow, object-as-stage) — everything else supports it
- Hero dominance statement: why hero feels expensive/cinematic without generic gradients
- One irreplaceable signature composition per page before reusable primitives
- Map each page to narrative arc (not default Hero→Features→Stats→CTA); apply anti-convergence for hero/narrative/section archetypes
- Write `storyboard.md`; get user approval before Phase 3 if collaborative

### Phase 3: Compiled Spec → compiled-spec.md
- Read `references/implementation-guardrails.md` + specific entries for approved storyboard: `references/data/camera-shots-50.md`, `interaction-effects-50.md`, `compositions.md`, `visual-elements.md`, `background-techniques.md`, `typography-cinema.md`, `color-grades.md`, `font-moods.md`, `textures.md`
- Read `references/anti-garbage.md` before finalizing
- Lock each page's signature composition before deriving shared primitives; shared systems last (nav, footer, spacing, typography, tokens, utilities)
- Delegate disjoint page-spec extraction if sub-agents available, merge under lead review
- Interaction budget: max 1 heavy interaction per page, max 2 attention-seeking reveals per page, remaining motion subordinate to visual thesis; prefer fewer stronger gestures
- Translate premium cues into surfaces, spacing, type hierarchy, edge treatment, atmospheric layers — not just animation
- Grid/flex as invisible alignment infrastructure, visible composition must not collapse into default card matrix unless film supports it
- Entrance map per page: `fadeUp`/`opacity+translateY` at most 2 times per page, at least 4 distinct entrance types per page when enough sections, don't let adjacent sections reveal same way
- If interaction-effect id is JS-required per guardrails, full JS mandatory in spec
- Include `External Library Decision` block; run Phase 3 quality checklist before complete
- Don't invent interactions when library entry exists; for each page record selected library source ids (camera/reveal, interaction, composition, typography, atmospheric/background); every heavy interaction/reveal/hero atmosphere/signature composition must cite library entry id; if custom needed, mark `Custom`, explain why library insufficient, keep subordinate to film language
- Extract complete CSS for layout/entrances/interactions + complete JS when required; write `compiled-spec.md` as only source of truth

### Phase 4: Build and Verify → HTML/CSS/JS
- Read only: `compiled-spec.md`, `references/anti-garbage.md`, `references/implementation-guardrails.md`
- Build from spec without improvising new layout logic
- Add reduced-motion + responsive without breaking film language
- Verify against storyboard + compiled spec; use Screening Room + Post-Screening Adjustments rules from guardrails when refining after first build

## Hard Rules
- Preserve director/film language through color, type, spacing, composition, motion; keep director/film as primary feeling, premium calibration sharpens not overwrites
- Keep director names, film titles, chapter markers, calibration jargon inside working files, not user-facing UI (no `chapter`/`director`/`film`/`calibrated` labels in final interface unless meta/editorial requested)
- Vary section rhythm: mix spectacle, dense info, breathing room
- At least 4 distinct entrance patterns per page when enough sections; don't let adjacent sections reveal same way
- Hero needs at least 3 visual elements; most other sections at least 1-2
- Make each page legible around one big visual idea; don't let every section introduce new concept
- Define site-wide grammar first, then page scenes, then irreplaceable compositions, then shared system
- Force uniqueness at wireframe level if prior outputs exist; interior pages must feel like new scenes in same film, not simplified homepage; every major page needs one signature composition not replaceable by generic grid
- Style not valid until homepage + all major page roles express director through layout/pacing/hierarchy/composition, not only color/type/surface
- Treat grid as infrastructure, not composition; if section still works as generic 2×2 or 3-col grid, composition too weak
- Design interior pages as standalone scenes first; shared patterns support scenes, not flatten them
- Restraint as design tool: high-end work removes 20% of obvious moves rather than adding 20% more
- Prefer exact tokens/implementation notes over vague adjectives
- Never treat film as spec sheet/component inventory; research as cinema, then formalize web translation

## Anti-Patterns
- No generic gradient hero with centered copy unless film genuinely supports it
- No watermarking hero/nav with director/film/chapter labels as premium microcopy
- No reusing same hover/reveal/card pattern in every section
- No motion demo/effect sampler; no using references as layout template (borrow dimensions of quality, not full compositions)
- No letting shared containers/reusable cards erase page-specific scene identity
- No deciding shared component system before page compositions locked
- No reusing previous demo's hero posture/nav posture/section rhythm/dominant geometry unless continuity requested
- No reading entire library at once; no jumping from request directly to HTML without decisions.md/storyboard.md/compiled-spec.md

## File Guide
- `references/library-index.md` — which library to load per phase
- `references/output-templates.md` — deliverable structure
- `references/premium-calibration.md` — what makes page feel expensive
- `references/reference-protocol.md` — decompose visual references without copying
- `references/anti-garbage.md` — final filter before coding
- `references/data/` — 18 data libraries (directors-200, hero-archetypes, narrative-beats, section-functions/archetypes, dna-index, camera-shots-50, interaction-effects-50, compositions, visual-elements, background-techniques, typography-cinema, color-grades, font-moods, textures)

## Integration for ST Product Package
- HTML Slides agent uses this skill for cinematic direction when topic calls for film-inspired aesthetic
- Complements frontend-slides (structure) + design-system (brand) — this skill provides the cinematic art direction layer
- For ST packages, pick director/film that matches topic mood (e.g., sci-fi for AI/tech, noir for security, romance for lifestyle)
