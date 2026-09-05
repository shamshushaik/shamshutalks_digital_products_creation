---
description: "Use when building, editing, or validating premium PDFs — ReportLab, custom Flowables, tables, diagrams, hyperlink, navigation, media, typography, performance checks. Covers all PDF quality gates for ST Product Packages."
applyTo: "**/*generate_pdf.py,**/*review_agent.py,**/*.pdf,**/companion_files/**"
---

# PDF Quality Instructions — ST Product Package

Applies when creating or editing any PDF generation code, review agent, or deliverable PDF.

## Gamma-Inspired Cohesive Visual System (All PDFs)
Every PDF must use a **complete, cohesive visual system** — not random styling. Choose a design direction during research, then maintain it across ALL pages:

- **Theme:** Pick one design direction per PDF (dark-tech for coding kits, clean-professional for career tools, bold-colorful for marketing). Every visual element must serve this theme.
- **Colors:** Define a 2–3 color palette (primary + accent + dark) with hex codes. Apply consistently — headers, callout boxes, table headers, diagrams, code block backgrounds, branding pages. No color should appear once and never again.
- **Fonts:** Modern sans-serif body (Inter/Helvetica Neue/Lato) + distinct heading weight. Code in fixed-width (Courier/Consolas). Never default Times New Roman.
- **Tables:** Proportional column widths, colored headers matching palette, alternating row tints, consistent padding, word-wrapping — never overflow margins.
- **Diagrams & Visuals:** Calculated positions (not hardcoded pixels), filled arrowheads, wrapped text inside boxes, consistent shadow/rounded-corner treatment. All diagrams use the same visual language.
- **Code Blocks:** Dark background (#1E293B or palette dark), fixed-width font, single-line spacing, consistent padding. No stretched or loose code blocks.
- **Callout Boxes:** Consistent style (accent-colored left border or filled background), KeepTogether (never split across pages), used for tips/warnings/info/definitions.
- **Icons & Graphics:** One style/weight throughout — never mix icon sets. Visual elements reinforce the theme, not distract.
- **Alignment & Spacing:** Zero misalignment — generous consistent margins, aligned text baselines, tables flush to content width, diagrams centered, no overlapping elements anywhere.
- **First & Last Pages:** Cover page and branding/back page must be the **most visually striking pages** in the PDF — they set the first impression and leave the lasting impression. Both must be designed assets, not plain text.

## Custom Flowables (Topic-Adaptive)
- **Always**: CalloutBox (rounded rect, accent bar, KeepTogether, never split) + SectionDivider (brand color 60-80pt, no PageBreak after)
- **If code/config**: CodeBlock (dark #1E1E2E, monospace, syntax highlight, word wrap, single line spacing)
- **If 2+ layers**: ArchitectureDiagram (calculated x from content width, filled triangles via draw_triangle)
- **If 3+ steps**: FlowDiagram (box_w = (content_width - gaps)/num_steps, numbered circles, filled arrows, 2-row wrap if >5)
- **Helper**: `draw_triangle(canvas, points, fill_color)` via `p=canvas.beginPath(); p.moveTo/lineTo/close; canvas.drawPath(p)` — NEVER `canvas.moveTo` directly

## Tables
- Proportional widths: `col_width = (max_chars_in_col / total_max_chars) * available_width`, min 25 chars
- Word wrap in cells: `max_chars = col_width / (font_size * 0.48)`, split at spaces
- Font scaling: 1-6 cols 7pt/7.5pt header, 7-9 cols 6pt/6.5pt, 10-14 cols 5pt/5.5pt, 15+ cols 4.5pt/5pt
- Teal #007C8A header white text, alternating white/light-gray rows, right edge ≤533pt (A4, 62.36pt margins)
- Pixel check 200 DPI: dark pixels 3-10px past right edge >5% = overflow

## Diagrams
- Never hardcoded pixels — calculate from content width
- Filled triangular arrowheads via draw_triangle, not V lines
- Spacer(1,12) before every diagram, KeepTogether with title
- **Tree rendering:** Unicode ├└│─ in a **Unicode-capable monospace font** (DejaVu Sans Mono, Noto Sans Mono, or embedded TTF registered via `pdfmetrics.registerFont()`) — **Courier does NOT support box-drawing characters** and will render squares/tofu. Light gray bg, never ASCII I+|-. Register the font before use: `pdfmetrics.registerFont(TTFont('DejaVuMono', 'DejaVuSansMono.ttf'))`
- Verify: no overlap, no clipped text, arrows connect correct elements, fits margins

## Diagram Text Visibility (All Diagrams — BLOCKER if violated)
These rules prevent unreadable diagrams — the #1 quality failure observed in past PDFs.
- **Minimum font size:** 7pt for diagram labels, 8pt for box body text. Anything smaller is unreadable on screen.
- **All text inside boxes MUST be word-wrapped** — no single-line overflow. Calculate `max_chars = box_inner_width / (font_size * 0.48)`, split at word boundaries.
- **Box height calculated from content BEFORE drawing:** `box_h = max(num_lines * line_height + 2 * padding, min_height)`. Never hardcode box height.
- **Arrow labels offset minimum 4pt above/below arrow line** — labels must never be rendered directly on the arrow stroke. Use `canvas.drawString(x, y + 4, label)` above or `canvas.drawString(x, y - label_height - 4, label)` below.
- **Contrast check:** every text-on-background pair must pass 4.5:1 contrast ratio. White text on dark backgrounds (#1E293B, #1E293B) — yes. Gray text on light gray backgrounds — NO.
- **Every diagram must pass the 'squint test'** — step back and verify all text is readable at 100% zoom. If any text is blurry, too small, or overlapping, fix before delivering.

## Diagram Box Padding & Sizing (All Diagrams)
- **Every diagram box:** minimum 8pt padding on ALL sides (top, bottom, left, right). Text rendered at exact box edge = unreadable.
- **Box dimensions calculated from content:** `box_w` and `box_h` derived from actual text measurements (stringWidth), not hardcoded pixel values.
- **No element may overlap another:** after calculating all box positions, verify bounding-box collision. Two boxes with overlapping rectangles = FAIL.
- **Diagram fits within margins:** total diagram width must be ≤ 523pt (A4 content width at 36pt margins). Total diagram height must fit on one page or be explicitly split.

## Table Cell Enforcement
- **Every table cell MUST word-wrap** — long strings that overflow column boundaries are a BLOCKER.
- **Right edge pixel-check:** after rendering each table, verify no content extends past 533pt (A4 right margin). Use ReportLab's `ImageReader` or visual inspection at 200 DPI — dark pixels 3-10px past right edge >5% = overflow = FAIL.
- **Column width proportional AND content-aware:** start with proportional calculation, then verify the widest cell content actually fits. If not, reduce font size or add a line break.

## PDF Checks (All Mandatory)
- **Hyperlink**: hit areas ≥24×24pt, ping external URLs (no 404), internal anchors valid, hover Normal/Hover/Down
- **Navigation**: persistent sidebar/header identical every page + active tab, Next/Prev/Top every page except cover, Initial View Fit Page + bookmarks open
- **Media & Code**: true Form Fields with tab order if worksheets, copy-paste integrity (no hidden chars), map toggles or browser hyperlinks
- **Typography**: 4.5:1 contrast, Inter/Roboto/SF Pro/Open Sans only, no-bleed 16:9/A4 screen-optimized
- **Performance**: strip non-standard JS/CSS/frames (Acrobat compliance), Linearization (Fast Web View), backgrounds as Artifacts
- **Visual Density**: no 2+ consecutive text-only pages — every page needs visual element
- **Tree rendering**: Unicode ├└│─ must render correctly (not as squares/tofu) — if using Courier, FAIL. Must use DejaVu Sans Mono or draw lines manually. Verify by opening PDF and checking every tree block.
- **Diagram readability**: every diagram element (boxes, labels, arrows, text) must be clearly readable at 100% zoom — no overlapping text, no clipped content, no tiny unreadable labels. If any element is hard to read, the diagram FAILS.
- **Blank pages**: no page should contain only a header/footer with no body content. Scroll every page after generation — any blank gap = layout bug to fix.

## Hard Rules
- No double PageBreak, no SectionDivider+PageBreak redundancy
- NumberedCanvas: `page_num = idx+1` via `enumerate(self._saved_page_states)` — NOT len()
- No script content, no CTA/price/purchase link inside PDF
- Every instructional section = 7-part flow (What/What-Needed/Where/How/What-You-Should-See/What-If/What's-Next)
- Cover: product name once, value statement, visual element, brand handle once — **most visually striking page in the PDF, must signal premium quality instantly using the chosen theme palette**
- Back page: dark bg, @shamshutalks 24-30pt, socials white-on-dark (Instagram @shamshutalks + DM "CAREER" CTA, YouTube @shamshutalks, LinkedIn linkedin.com/in/shamshushaik, Booking https://superprofile.bio/bookings/shamshushaik), tagline "AI-Native Testing • Genuine Content • Real Results", booking accent bar, Spacer(1,20-30) between groups — **second most visually striking page, must be a designed asset not a wall of contact text**
- TOC: chapters Helvetica-Bold, non-chapters Helvetica, leader dots regular
