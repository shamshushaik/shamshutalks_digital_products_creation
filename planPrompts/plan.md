C:\Users\DELL\Documents\AI Tester Projects\ShamshuTalks - Reels\ST Product Package Creation\productPackage-STs.md

-- this is my product package creation, 

the is i observed is that master prompt so much big so that agents are at one point missing information or else loosing memory or context 

so that 

I am planning to create ai agentic orchestraction framework, like shamshu one main managers agent will assign the tasks, to the specialist agents to get the done the work.  all agents will have memory connections and all agents can communicated each other on their works. so that we take have mulitple specialist agents to do their works and delivery the product outside.. 

-- to manager agent.. user will share or give or request his topic and topic content or scirpt content okay and C:\Users\DELL\Documents\AI Tester Projects\ShamshuTalks - Reels\ST Product Package Creation\productPackage-STs.md these all things should have proper ai agentic framework 

--- we are creating complete product package items, for the future products okay 

-- now along with pdf, we are going to create the html slides or presentation as well in the digtial packages okay 
-- for creating the html slides sharing some skills 
- https://github.com/zarazhangrui/frontend-slides.git
https://github.com/robonuggets/design-system.git
https://github.com/akseolabs-seo/cinematic-ui.git
https://github.com/edvilme/animated-web-components.git

use these skills we are going to create html more visual animated slides and presentation that one yet created and it is should be unique one and same goes with pdf 

-- search online get the necesary design, page ui, animated, visuals, daigrams, tables, content, graphics, themes, styles skills to create the pdf 

--- pdf and html things will be decide based on the topic and content after the ai did they research 

-- based on the research and demo and automaton projects should be created as enterprise real time project level frameworks and things.. end to end.. should include all requried files 

-- our product package main goal, end user can read, study, learn, practice, myself learning and he do practice and lastly he can create his own things after going through only digtial product package. 

-- combinue pdf unqiue idea thing you can refer gamma app inspriations website to get some unqiue idea 

==========================================================
more checks for pdf 
 Hyperlink & Interactive Target Checks
 
 - **Active Hit Areas:** Ensure interactive hit areas (clickable zones for buttons and links) are large enough for comfortable clicking—ideally a minimum of **24 × 24 points**.
 - **Link Validation:** Automatically ping all external URLs (`http://` or `https://`) inside the document before generation to ensure no broken or `404` links are embedded.
 - **Internal Anchor Mapping:** Verify that every link in the Table of Contents, sidebar, or index exactly references a valid, existing target page or destination ID within the document.
 - **Visual Hover States:** Since this is screen-first, configure buttons to use distinct "Normal", "Hover", and "Down/Clicked" color states supported by advanced PDF viewers.
 
 🧭 Navigation & UI Frame Checks
 
 - **Persistent Sidebar/Header Navigation:** If your design features a master menu or tab bar on the side/top, verify it renders identically on every single page and that the "active" tab color dynamically updates to reflect the current section.
 - **Global Navigation Actions:** Ensure every page (except the cover) has functional "Next Page", "Previous Page", and "Return to Top / Home" actions mapped to header/footer icons.
 - **Initial View Setup:** Force the PDF's internal metadata to open in **"Fit Page" or "Single Page View"** with the bookmarks panel open by default. This prevents the document from opening at a giant, unreadable 300% zoom.
 
 🖼️ High-Fidelity Media & Code Block Rendering
 
 - **True Form Fields:** If the document requires user input (e.g., worksheets, setup guides), ensure fields are true interactive PDF Form objects (text fields, checkboxes, radio buttons) with explicit tab orders so a user can press `Tab` to jump to the next field.
 - **Code Block Copy-Paste Integrity:** Verify that when a user copies text or snippets from a code block, hidden characters (like line numbers or auto-generated formatting spaces) are not copied along with the raw code.
 - **Map and Diagram Interactivity:** Since standard PDFs do not support dynamic panning and zooming layers like Google Maps, ensure complex map diagrams leverage hidden/visible layer toggles or hyperlink directly to open coordinates in the browser.
 
 🎨 Screen-Optimized Typography (`fone`) & Color
 
 - **Pixel-Perfect Contrast:** Enforce a strict dark-mode or crisp light-mode styling targeting screen pixels (**minimum 4.5:1 ratio**).
 - **Screen-First Fonts:** Restrict typography to modern Sans-Serif options optimized for back-lit digital displays (e.g., **Inter, Roboto, SF Pro, or Open Sans**). Avoid heavily serifed fonts designed for physical ink.
 - **No-Bleed Layouts:** Ensure content snaps perfectly to exact screen layout dimensions (typically standard **16:9 widescreen presentation formats** or standard A4/Letter optimized for standard desktop screens).
 
 ⚙️ Technical, Performance, & Compatibility Pre-Flights
 
 - **Acrobat Standard Compliance:** Ensure the rendering engine strips out non-standard web elements (like raw Javascript sliders, CSS animations, or embedded HTML frames) that will break or freeze inside basic PDF readers like Adobe Acrobat Reader or Apple Preview.
 - **Fast Web View (Linearization):** Enable "Linearization" (web optimization) during the save process. This allows the PDF to stream page-by-page over a browser connection so the user can interact with page 1 instantly without waiting for a massive file to download entirely.
 - **Layer and Artifact Tagging:** Ensure background colors, borders, and decorative visuals are explicitly tagged as "Artifacts" in the PDF tree structure, ensuring they don't block assistive screen readers or intercept mouse clicks
 ==================================================

 html check for reference - you can include more 
 To transform HTML slides or presentations into a cinematic, highly stylized, and animated screen experience, the agent must bridge two completely different worlds: smooth web-based motion and the static nature of a PDF document.
 Because a PDF cannot play true web animations, CSS transitions, or video files natively, your agent must handle this by using a Dual-Mode Strategy:
 
 1. Interactive HTML Presentation Mode: The code must execute stunning cinematic effects, smooth transitions, and animated models.
 2. Exported Interactive PDF Mode: The agent must run complex pipeline checks to "flatten" these cinematic assets perfectly into a multi-page, hyper-linked document without losing visual fidelity, clipping layouts, or leaving blank screens.
 
 Here are the master checks your agent must run to bridge cinematic animations with interactive PDF exports:
 
 ---
 
 ## 🎬 Cinematic Styling & Layout Checks
 
 - Aspect Ratio Padding: Lock the container strictly to a cinematic 16:9 widescreen (1920×1080) layout. Force a black or custom-themed matte border around the viewport if executed on odd-shaped screens to keep the theatrical framing intact.
 - Cinematic Overlays & Depth: If using parallax backgrounds, floating particles, or complex CSS drop-shadows, ensure they render across separate CSS `z-index` layers. The agent must verify that the foreground text always stays cleanly on top of ambient video backgrounds or particle streams.
 - Vignettes & Color Grading: Check that global color correction (CSS filters like `contrast()`, `brightness()`, or vignette gradients) applies uniformly across all slide templates to maintain a cohesive cinematic mood.
 
 ## 🔄 Animation Frame & State Checks
 
 - The "Zero-to-Hero" Flattening Lock: When printing to PDF, the agent *must* automatically inject a print utility class that disables CSS animations (`animation: none !important; transition: none !important;`) and forces all elements to jump instantly to their final, fully-animated state. This prevents the PDF from capturing a half-faded, half-blurry slide.
 - Fragment-to-Page Splitter: If a slide uses click-to-animate sequences (fragments where text or charts build up step-by-step), the agent must have a configuration toggle to either:
 
 - Option A (Flattened): Print only the final, complete layout on a single PDF page.
 - Option B (Sequential): Generate a unique PDF page for *every single progressive stage* of the animation, creating a "flipbook" effect when scrolling through the screen PDF.
 - Scroll-Trigger Defusing: Ensure that any element triggered by scrolling down a page is automatically forced into view for the PDF layout engine.
 
 ## 🧊 Animated Modules & 3D Web Graphics (WebGL / Three.js)
 
 - Render-Idle Detection: If your slides contain interactive 3D elements, animated canvas charts, or moving particles, the agent must listen for a custom `window.renderComplete` JavaScript event. It must pause the rendering loop and freeze the animation at a visually perfect frame before capturing the slide.
 - Vector-Texture Fallbacks: For complex 3D modules that cannot be printed as vectors, ensure the system takes a high-definition snapshot (supersampled to 2x canvas pixel density) to insert into the PDF layout so the module remains crisp on high-resolution displays.
 - 3D Target Click Hyperlinking: If the 3D module or animated diagram is an interactive node graph, overlay invisible HTML hyperlink elements directly over the coordinate bounds so they remain clickable hot-zones in the final PDF.
 
 ## 📹 Video Backgrounds & Cinematic Motion Fallbacks
 
 - Poster Frame Checks: For slides using ambient background video loops, ensure a high-quality static `poster="..."` attribute image is explicitly configured in the HTML5 video tag. When printing to PDF, the rendering engine will gracefully fallback to this cinematic snapshot instead of printing a blank black box.
 - Media Element Hiding: Strip out or hide HTML5 native video player controls (play buttons, progress bars, volume toggles) using strict `@media print` rules, leaving only the raw visual content.
 
 ---
 
 ## 🛠️ The Agent's Automation Pre-Flight Script
 To implement these checks programmatically, your agent can inject this diagnostic CSS block into the presentation before running its headless browser print pipeline:
 
 ```
 @media print {
   /* 1. Force the cinematic background to show up in the PDF export */
   html, body {
     -webkit-print-color-adjust: exact !important;
     print-background: true !important;
     color-adjust: exact !important;
   }
 
   /* 2. Fast-forward and freeze all cinematic animations to their final states */
   *, *:before, *:after {
     animation-delay: 0s !important;
     animation-duration: 0s !important;
     animation-iteration-count: 1 !important;
     transition-duration: 0s !important;
     scroll-behavior: auto !important;
     transform: none !important; /* Prevents 3D CSS flips from breaking page splits */
   }
 
   /* 3. Hide any temporary interactive presentation UI overlay graphics */
   .reveal .controls, .reveal .progress, .playback-bar, .timer-widget {
     display: none !important;
   }
 }
 ```===============================================


 read, study, learn, practice, tranining, creating own things check in all stages and in all files and in all conditions
 ===========================================

 what to do, how to do, where to do, what, how, where, free or open sources things, step by step thigns, leaning steps, full things 
 ===============================================

 each agent should have their own unqiue things prompts, rules, instuctions, duties, do and don't things clearly 
 ===========================================

 idea is user will paste the topic and script content and to agent with our agentic ai framework i should get the complete digital  product package 

 ===========================

 don't missing all steps in the C:\Users\DELL\Documents\AI Tester Projects\ShamshuTalks - Reels\ST Product Package Creation\productPackage-STs.md. don't miss a single thing for this file 

 ----

all agent files and other files, i will use github copliot in vsode and any other idk, i will select shamshu agent and paste context, it will do the rest
