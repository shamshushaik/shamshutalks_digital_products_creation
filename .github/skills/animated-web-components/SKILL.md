---
name: animated-web-components
description: "Add periodic animations via single-tag Web Components — bouncing-ball, floating-random, typing-element, progress-bar. Use when adding animations to HTML slides/presentations without verbose CSS/JS. Source: https://github.com/edvilme/animated-web-components"
user-invocable: true
argument-hint: "Which animation + content"
---

# Animated Web Components — Single-Tag Periodic Animations

Source: https://github.com/edvilme/animated-web-components — basic periodic animations using a single tag with Web Components. Still in development, more will be added.

## When to Use
- Adding animations to HTML slides for ST Product Package (HTML Slides agent)
- Need bouncing, floating, typing, progress animations without verbose CSS/JS
- Want declarative single-tag animation

## Installation

### Clone + NPM
```bash
git clone https://github.com/edvilme/animated-web-components.git
cd animated-web-components
npm install animated-web-components
```
Load in HTML:
```html
<script src="./node_modules/animated-web-components/index.js" type="module"></script>
```

### CDN (Unpkg)
```html
<script src="https://unpkg.com/animated-web-components/index.js" type="module"></script>
```
Important: script must be executed as `type="module"` regardless of installation.

## Usage

### Bouncing Ball — bounces forever
```html
<section>
  <bouncing-ball color="green" radius="20" animation-speed="0.1" animation-enabled="true">
    <div>Content inside</div>
  </bouncing-ball>
</section>
```
Attributes: `color`, `radius`, `animation-speed`, `animation-enabled`

### Floating Random Thing — floats around parent, duplicates on click
```html
<section>
  <floating-random-thing animation-range="20" animation-speed="100" duplicates="true" auto="true">
    <p>Hello</p>
  </floating-random-thing>
</section>
```
Attributes: `animation-range`, `animation-speed`, `duplicates`, `auto`

### Typing Element — text appears as if typed
```html
<section>
  <typing-element animation-speed="0.1" animation-enabled="true">
    <p>Hello World!</p>
  </typing-element>
</section>
```
Rich HTML also works (wrap children in single tag):
```html
<section>
  <typing-element animation-speed="0.1" animation-enabled="true">
    <div>
      <h1>Web Technologies</h1>
      <ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>
    </div>
  </typing-element>
</section>
```
Attributes: `animation-speed`, `animation-enabled`

### Progress Bar
See `progress-bar.js` — `variant` attribute (replaces `type`).

## Notes
- All children must be wrapped in a single tag inside the component
- Attributes control animation behavior declaratively
- GPL-3.0 license

## Integration for ST Product Package
- HTML Slides agent can use these components for slide animations (typing for code reveals, floating for decorative elements, bouncing for playful topics)
- For PDF export: ensure `@media print` diagnostic CSS freezes animations to final state (see html-cinematic instructions — Zero-to-Hero Flattening)
- Prefer CSS-only animations for HTML slides when possible; use these Web Components for quick declarative periodic animations
- Combine with frontend-slides (structure) + cinematic-ui (art direction) — this skill provides the animation primitives layer
