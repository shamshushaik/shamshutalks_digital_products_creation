---
name: design-system
description: "Extract brand design from any reference (URL, screenshot, assets) and generate design-system.html + brand-book-a4.html→PDF. Use when creating design systems, brand books, or extracting colors/fonts/logos. Source: https://github.com/robonuggets/design-system"
user-invocable: true
argument-hint: "Brand reference URL/screenshot/description"
---

# Design System + Brand Book Generator

Source: https://github.com/robonuggets/design-system — give a brand reference, get a full design system page + 1-page A4 brand book PDF. Self-contained HTML (Google Fonts CDN + inline CSS + inline SVG, no build step).

## When to Use
- Creating or extracting design system for ST Product Package PDF/HTML
- Need brand colors, fonts, typography, components, icons, wordmarks
- Have a reference URL, screenshot, or brand description

## Workflow
1. **Get reference** — URL, screenshot, existing site, or brand description. If not provided, ask.
2. **Extract** — if URL → WebFetch HTML/CSS; if screenshot → visually identify. Pull: hex colors (primary/secondary/accents), fonts (link tags, font-family, visual), tagline/value prop, principles, logo/mark (inline SVG), theme (light/dark)
3. **Confirm extraction** — short message listing what was found; ask only for gaps
4. **Generate both files** into `design/` folder
5. **Render PDF** via headless Edge/Chrome
6. **Show user** — send PDF + design-system.html
7. **Iterate** on feedback

## What to Ask For (Only If Not Extractable)
- Brand name(s) — single or family (parent + product + studio)
- Tagline — one short line
- Principles — 4-6 design rules (if none published, skip section — don't invent)
- Team/product set (optional) — 4-8 items with color + role
- Any colors/fonts not visible in reference

**Never invent brand details.** Colors, fonts, names, taglines, logos, principles all come from user or reference. If no source, drop section — don't fill with fiction. Never redraw logos — use exact SVG.

## Output 1: design-system.html (Scrollable Reference)
Sections in order (drop any without source):
1. Header — brand lockup + tagline + version/date
2. Color Hierarchy — primary/secondary/tertiary with hex + usage note
3. Extended Palette — additional brand colors (status, category)
4. Typography — display/body/mono samples using brand's actual fonts; weight ladder
5. Principles — brand's documented principles
6. Components — buttons, cards, badges in brand language
7. Icons — brand's icon language (inline SVG, line/filled/pixel)
8. Wordmarks/Lockups — 2-3 name treatments from brand's mark
9. Footer — file path, version, cross-reference note

Match brand's surfaces (light vs dark), radius, border treatment, type hierarchy. If rounded/soft, don't default to sharp.

## Output 2: brand-book-a4.html → brand-book-a4.pdf (Single A4 Portrait 210×297mm)
Required print CSS:
```css
@page { size: A4; margin: 0; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; padding: 18mm 16mm 14mm; }
```
Layout top to bottom:
1. Head — brand lockup left, version + tagline right
2. Color Hierarchy — 3 swatch tiles (Primary/Secondary/Tertiary)
3. Two-column middle — Typography card + Principles card
4. Team/Product row (optional) — 6 small tiles if product family
5. Wordmarks · Lockups — 3 tiles
6. Footer — file path + cross-reference

Rendering:
- Windows (Edge): `"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="brand-book-a4.pdf" "file:///absolute/path/to/brand-book-a4.html"`
- macOS (Chrome): `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="brand-book-a4.pdf" "file://$PWD/brand-book-a4.html"`
- Linux (Chromium): `chromium --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="brand-book-a4.pdf" "file://$PWD/brand-book-a4.html"`

## Wordmark Patterns (3 Lockup Styles)
1. **Mark + wordmark** — icon next to brand name, weight/tracking matches brand's wordmark
2. **Split-weight lockup** — `PART1PART2` where one half heavy, other light (umbrella/group names)
3. **Accent lockup** — `PART1PART2` where one half colored with brand primary (studios/sub-brands)
Only include variants that make sense (single-word brand doesn't need split-weight).

## Skeleton Template
See `examples/template.html` — structural skeleton with `{{TOKENS}}` ({{PRIMARY}}, {{DISPLAY_FONT}}, etc). Copy, swap tokens with extraction values, add/drop sections to match brand.

## Rules
- Extract before asking — pre-fill from reference
- Never invent brand details; never redraw logos; drop unsourceable sections
- Match brand, don't impose style — template is structural, visual language from reference
- Fit on one A4 page — if overflows, tighten padding or drop section
- Self-contained HTML — Google Fonts CDN + inline CSS + inline SVG, no build step
- Render the PDF — don't just hand over HTML

## Integration for ST Product Package
- PDF Craft + HTML Slides agents use this skill to extract/define brand system before building
- Research Specialist can use it to capture Gamma inspiration palettes
- Ensures consistent brand across PDF + HTML + brand book
