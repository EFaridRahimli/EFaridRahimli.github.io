---
name: Farid Rahimli
description: One-page ML portfolio as a trading-floor ticker board; views dissolve into amber phosphor particles.
colors:
  ground: "#0b0b0b"
  ink: "#e8e6e1"
  muted: "#8d8a84"
  line: "#262624"
  accent: "#ffa028"
  up: "#3ddc84"
typography:
  display:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.2rem, 9.5vw, 10rem)"
    fontWeight: 900
    lineHeight: 0.86
  headline:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.9rem, 4.6vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 0.92
  title:
    fontFamily: "'Martian Mono', ui-monospace, monospace"
    fontSize: "clamp(1.5rem, 2.2vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.25
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 87.5"
  lead:
    fontFamily: "'Martian Mono', ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 3.4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    fontVariation: "'wdth' 87.5"
  quote:
    fontFamily: "'Martian Mono', ui-monospace, monospace"
    fontSize: "clamp(0.95rem, 1.6vw, 1.35rem)"
    fontWeight: 400
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 87.5"
  body:
    fontFamily: "'Martian Mono', ui-monospace, monospace"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
    fontVariation: "'wdth' 87.5"
  label:
    fontFamily: "'Martian Mono', ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
    fontVariation: "'wdth' 87.5"
rounded:
  focus: "2px"
spacing:
  gutter: "clamp(20px, 3vw, 48px)"
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "12px 8px"
  nav-link-current:
    textColor: "{colors.accent}"
  display-link:
    textColor: "{colors.accent}"
    typography: "{typography.headline}"
  display-link-hover:
    textColor: "{colors.ink}"
  ticker-symbol:
    textColor: "{colors.accent}"
    typography: "{typography.quote}"
  ticker-delta:
    textColor: "{colors.up}"
    typography: "{typography.quote}"
  project-row:
    textColor: "{colors.accent}"
    typography: "{typography.headline}"
    padding: "16px 0"
  pause-control:
    textColor: "{colors.muted}"
    padding: "12px 0"
  header:
    backgroundColor: "{colors.ground}"
    typography: "{typography.label}"
    padding: "12px {spacing.gutter}"
---

# Design System: Farid Rahimli

## Overview

**Creative North Star: "The Trading Floor After Hours"**

A quote board for one engineer's work, lit in terminal amber on a black that never moves. The landing view is a perpetual ticker: the name rolls past in giant condensed signage capitals, a symbol tape quotes each project's real headline figure, and the project titles roll underneath as links. Every other view is a few enormous amber words over paper-white reading text set in a semi-condensed monospace.

Hierarchy is two voices and nothing else: Chicago-signage display caps for anything that names a person, a place or a project, and tabular monospace for everything you read or count. Structure comes from hairline row rules, the way a board separates its tapes; there are no cards, panels, shadows or glass.

Motion has two forms. The tapes roll forever (user-requested) and stop on hover, focus, a visible Pause control, and under reduced motion. Changing view samples the rendered words and drawings into amber phosphor particles that run white-hot in flight and re-form as the next view over the still ground. Imagery is traced line art in paper white with amber live-text data labels.

**Key Characteristics:**
- Black ground, amber display, paper-white reading text; green only for a measured change.
- Two families: Big Shoulders Display caps for names, Martian Mono (semi-condensed, tabular) for text and figures.
- Ticker grammar: symbol, quote, delta, on hairline-ruled tapes.
- Flat: depth is only the transient particle canvas.
- Two motions: the pausable ticker and the particle dissolve between views.

## Colors

Terminal phosphor: one hot amber and one rare signal green on a near-black ground, with warm paper white for reading.

### Primary
- **Terminal Amber** (accent): all display type at rest (view titles, ticker name, project titles, the Projects action), ticker symbols, illustration data labels, hover on text links, the current page in the header, the focus outline (2px, 3px offset), text selection (amber fill, ground text), and settled particles.

### Secondary
- **Signal Green** (up): the delta after a quote, only where the project measured a real change against a baseline (e.g. a gain over a prior model, a score reduction). Never decorative, never a status color for anything else.

### Neutral
- **Terminal Black** (ground): the page, the fixed header, `theme-color`, and text on amber selection.
- **Paper White** (ink): reading text, quotes, metrics, nav links at rest, the line art, and the hover color of amber display links.
- **Graphite** (muted): metadata only: category and coursework tags, stack lists, section labels, Previous/Next captions, the ticker separators, the Pause control.
- **Hairline** (line): 1px top rules between ticker tapes, above the index foot, and between project rows. Also the scrollbar thumb.

### Named Rules
**The Measured Green Rule.** Green appears only on a delta that a project actually measured. No delta, no green; a quote without a baseline stays paper white.

**The Amber Inverts on Hover Rule.** Amber display type goes to paper white on hover; paper-white text links go to amber. State is always the swap to the other voice.

**The Still Ground Rule.** The ground never changes, animates or carries an image. Only type, tapes and particles move.

## Typography

**Display Font:** Big Shoulders Display (with 'Arial Narrow', sans-serif)
**Body Font:** Martian Mono at font-stretch 87.5% (with ui-monospace, monospace)
**Label/Mono Font:** Martian Mono, same settings

**Character:** Condensed signage capitals shout from the board; a semi-condensed terminal mono reads and counts underneath. The pairing is a departures board over a Bloomberg screen.

### Hierarchy
- **Display** (900, uppercase, 0.86 line-height, amber): view titles and the project-page title (clamp in token, max 15ch, balanced), the static index name (fitted to the measure: two lines on phones, one line from md), and the About email (lowercase). Projects and About titles and the email are sized by measurement to span the measure.
- **Headline** (800, uppercase, 0.92, amber): project rows, the title tape (clamp(2.4rem, 10vh, 7rem)), the Projects (11) action (clamp(2.2rem, 4.4vw, 4rem)), Previous/Next titles (clamp(1.6rem, 3vw, 2.75rem)).
- **Title** (600, tabular, 1.25): the one result that matters on a project page.
- **Lead** (500, 1.1, max 28ch): the About statement.
- **Quote** (400, tabular): the symbol tape; symbols bold amber, quote paper white, delta green.
- **Body** (400, 17px, 1.625, max 60ch): summaries, results, About prose. The index sentence uses the 15px base at the same leading, max 44ch.
- **Label** (400, 14px): header, metadata, section labels, ticker symbols in rows (bold, amber). The Pause control is 13px uppercase with 0.12em tracking in Graphite.

### Named Rules
**The Two Voices Rule.** Big Shoulders for names, Martian Mono for everything read or counted. No third family, no italics.

**The Every Number Is Tabular Rule.** Quotes, deltas, metrics, counts, positions and data labels set with `tabular-nums`.

**The Fit Rule.** A full-measure view title is sized by measuring the rendered line so its widest line touches both gutters. Never pick that size by eye.

## Layout

A single column of views inside a fluid gutter (clamp(20px, 3vw, 48px)), with a 12-column grid from md (768px). Splits: 6 / 2 / 4 for the index foot (sentence, Pause control, action right-aligned, bottom-aligned); 1 / 7 / 4 for project rows (symbol, title, category over quote, right-aligned) with a 4rem symbol column below md; 6 + 5 from column 8 for the project drawing and its text; 5 + 6 from column 7 on About.

The index fills the viewport (min-height 100svh): tapes run edge to edge (they break out of the gutter), vertically centred, with the foot pinned to the bottom under a hairline. Other views start 6rem from the top under the fixed header. Rhythm is stepped and generous: 1.5-2.5rem from title to first content, 3-4rem to the body grid, 5-8rem before closing sections. Below md everything stacks.

## Elevation & Depth

Flat. No shadows, no blurs, no layered surfaces. Separation is the 1px hairline. The only depth is the particle canvas: fixed, pointer-transparent, aria-hidden, above content (z 10) and below the header (z 20), present only during a transition.

### Named Rules
**The Board Has Rows, Not Boxes Rule.** Group with a top hairline and grid position. No cards, panels, pills or bordered boxes.

## Shapes

No containers, so no corner language; the only radius is 2px on the focus outline. Rules are horizontal 1px hairlines only. Drawings are unframed traced line art (filled paths in paper white on transparent). Icons are thin Lucide arrows (1.75 stroke, 0.9em) inline with text: left for back/previous, right for forward, up-right for external. The ▲ / ▼ in deltas is ticker notation and travels with its figure, in green.

## Components

### Navigation
Fixed ground-colored header, 14px: name (600) left, Projects / About / Email right, 8px horizontal and 12px vertical padding per link. Paper white at rest; hover and `aria-current="page"` go amber over 150ms ease-out. A project page marks Projects as current. Email is a `mailto:` link on every view.

### Ticker Tape (signature)
A full-bleed row with a hairline above: the sequence rendered twice, sliding by half its width on an infinite linear loop (symbols 60s right, titles 90s left; the name above them is static). The second copy is `inert` and `aria-hidden` so links tab once; decorative tapes are `aria-hidden` and the name lives in a screen-reader-only `h1`. Items are separated by a Graphite slash. Deliberate exception to the no-perpetual-motion default, user-requested and WCAG 2.2.2 compliant: tapes pause on hover and focus-within, a visible Pause ticker / Resume ticker button (`aria-pressed`) stops both, and under `prefers-reduced-motion` they do not animate and scroll horizontally instead.

### Quote Line
Symbol (bold amber), quote (paper white), optional delta (green, with ▲ or ▼), then category in Graphite. Appears in the symbol tape, under each project row's category, and under the project title.

### Display Link
Actions are amber display type with a trailing arrow (Projects (11), Previous/Next titles, the About email). Hover goes to paper white. There are no filled buttons.

### Project Row
Hairline above; amber symbol, headline title, Graphite category over the paper-white quote and green delta, tabular. The whole row is the link; the title goes paper white on hover.

### Pause Control
A text button, 13px uppercase, 0.12em tracking, Graphite, 12px vertical padding; amber on hover and focus. Label states the action it performs.

### Illustration Plate
Traced SVG line art in paper white at full column width. An optional data label is live amber text, 12px (13px on the project plate), tabular, absolutely placed beside the detail it names.

### Particle Transition (signature)
On view change: sample visible text and images into points (every 3px, cap 9000; every 4px, cap 3800 under 640px), hide the DOM, render the next view invisibly, sample it, pair left to right, and tween. Points disperse 40-190px (ease-out over the first 32%) then fuse (ease-in-out), staggered left to right. Color runs through six steps from amber to white-hot and back to amber. 1250ms (600ms fuse-only on first load), then the DOM fades in over 220ms and the canvas clears; focus moves to the new `h1`. Reduced motion gets only the 220ms crossfade.

## Do's and Don'ts

### Do:
- **Do** set names, view titles and project titles in amber Big Shoulders caps, and fit full-measure titles by measurement.
- **Do** set every figure in tabular Martian Mono, and quote each project as symbol, figure and (only if measured) delta.
- **Do** keep green to real measured deltas.
- **Do** separate rows and tapes with a single 1px hairline.
- **Do** ship any perpetual motion with pause on hover and focus, a visible Pause control with `aria-pressed`, and no animation under reduced motion.
- **Do** keep data labels on drawings as live text, never baked into the image.

### Don't:
- **Don't** add a third typeface or italics.
- **Don't** put content in cards, panels, pills or bordered boxes, or add shadows or glass.
- **Don't** use green for anything but a measured change, or invent a delta to fill a quote.
- **Don't** animate the ground or add scroll-triggered reveals; motion is the ticker, the view transition and color state.
- **Don't** add filled buttons; actions are type.
