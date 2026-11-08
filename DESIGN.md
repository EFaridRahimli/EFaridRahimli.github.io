---
name: Farid Rahimli
description: One-page ML portfolio where the type is the interface and views dissolve into ink particles.
colors:
  ground: "#edeeef"
  ink: "#111214"
  muted: "#55585f"
  accent: "#1f3bff"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 9.5vw, 10rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 62.5"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4.6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.92
    fontVariation: "'wdth' 62.5"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.25
    fontFeature: "'tnum'"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.7vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
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
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
  display-link-hover:
    textColor: "{colors.accent}"
  project-row:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    padding: "12px 0"
  project-row-hover:
    textColor: "{colors.accent}"
  header:
    backgroundColor: "{colors.ground}"
    typography: "{typography.label}"
    padding: "12px {spacing.gutter}"
---

# Design System: Farid Rahimli

## Overview

**Creative North Star: "Ink on a Still Ground"**

The type is the interface. Every view is a handful of enormous words in one family, Archivo, set on a 12-column grid over a cool white ground that never moves. The width axis carries the voice: extra-condensed heavy capitals for anything that names a place or a project, normal-width text for everything you read. There are no surfaces to sit content on: no cards, no panels, no shadows, no rules. Hierarchy comes from size and width alone, and the jump between them is deliberately violent.

Motion has one job and one form. Changing view samples the rendered words and drawings into ink particles, scatters them, and re-forms them as the next view; the particles shift to ultramarine in flight and settle back to ink before the real DOM text fades in on top. The ground stays still throughout. Reduced motion gets a 220ms opacity crossfade and nothing else.

Imagery is traced line art: black strokes multiplied onto the ground, with any data label set as live text beside the detail it names.

**Key Characteristics:**
- One family, three voices by width and weight; tabular figures on every number.
- Display lines fitted to the full measure by measurement, not by a guessed size.
- Four colors; the accent appears only as state and in flight.
- Flat: no elevation, no borders, no containers.
- One signature motion: particle dissolve and re-form between views.

## Colors

A near-monochrome of cool paper and near-black ink, with one saturated ultramarine held back for state.

### Primary
- **Signal Ultramarine** (accent): the only color. It marks hover, keyboard focus (2px outline, 3px offset), the current page in the header, text selection, and particles in flight. It never fills an area at rest and never decorates.

### Neutral
- **Cool Paper** (ground): the page, the fixed header behind its links, and the `theme-color`. It is the still ground the particles cross.
- **Lamp Black** (ink): all display type, body text, numbers, and the line art. Particles settle to it.
- **Graphite** (muted): secondary metadata only: list indices, category and coursework tags, stack lists, section labels, "Previous / Next" captions. About 6:1 on the ground.

### Named Rules
**The Accent Is a State Rule.** Ultramarine appears only for hover, focus, current page, selection, and particles in flight. If a screen at rest shows ultramarine anywhere except the current-page link, it is wrong.

**The Still Ground Rule.** The ground color never changes, animates, or carries an image. Only ink moves.

## Typography

**Display Font:** Archivo (variable, wdth 62..125, wght 100..900), with ui-sans-serif, system-ui fallback
**Body Font:** Archivo at normal width
**Label/Mono Font:** none; labels are Archivo with tabular figures

**Character:** A single grotesque split into two voices by its width axis. Extra-condensed 900 capitals shout the name and the project titles; the same family at normal width reads quietly underneath.

### Hierarchy
- **Display** (900, extra-condensed, uppercase, 0.84 line-height, -0.005em): view titles (name, Projects, About, the email address) and project titles. On index, Projects and About the size is computed so the widest line spans the full measure exactly, capped on the index at 60% of viewport height; project titles use the clamp in the token at max 15ch, balanced.
- **Headline** (700, extra-condensed, uppercase, 0.92 line-height): project titles in the list, the "Projects (11)" primary action (clamp(2.4rem, 5vw, 4.5rem)), and previous/next titles (clamp(1.6rem, 3vw, 2.75rem)).
- **Title** (600, tabular): the one result that matters on a project page.
- **Lead** (400, ~1.2-1.6rem, max 30ch): the single sentence under the name. The About statement uses a larger step (500, clamp(1.75rem, 3.4vw, 3.25rem), 1.1 line-height, max 28ch).
- **Body** (400, 17px, relaxed): summaries, results, About prose, max 60ch.
- **Label** (400, 14px): header links, metadata, section labels; usually Graphite.

### Named Rules
**The Width Carries the Voice Rule.** Emphasis is made by width and weight within Archivo, never by a second family, italics, or color.

**The Every Number Is Tabular Rule.** Metrics, counts, indices, and data labels set with `tabular-nums`.

**The Fit Rule.** A view title is sized to the measure by measuring the rendered line, so its longest line touches both gutters. Never pick a display size by eye for a full-measure title.

## Layout

A single column of views inside a fluid gutter (clamp(20px, 3vw, 48px)) on both sides, with a 12-column grid from `md` (768px) up. Content splits unevenly across it: 6/6 for the index foot (sentence left, action right, bottom-aligned), 1/7/4 for project rows (index, title, metric right-aligned), 6 + 5 offset to column 8 for the project drawing and its text, 5 + 6 offset to column 7 on About. Below `md` everything stacks; project rows keep a 3rem index column.

The index view fills the viewport (min-height 100svh) and pins its content to the bottom. Other views start 6rem from the top under the fixed header. Vertical rhythm is generous and stepped: 2.5-3rem between the title and its first content, 5-8rem before closing sections. The header is fixed, ground-colored, 14px, name left and three links right.

## Elevation & Depth

Flat. There are no shadows, no borders, no blurs, and no layered surfaces. The only depth is the particle canvas, a fixed, pointer-transparent layer above the content (z 10) and below the header (z 20), present only during a transition and cleared after.

### Named Rules
**The Nothing to Sit On Rule.** Content sits directly on the ground. No cards, panels, chips, or dividers; grouping is done with grid position and spacing.

## Shapes

No containers means no corner language. The only radius in the system is 2px on the focus outline. Drawings are unframed line art, `mix-blend-mode: multiply` so their white disappears into the ground. Icons are thin stroked arrows (Lucide, 1.75 stroke, 0.9em) inline with text: left for back/previous, right for forward, up-right for external links.

## Components

### Navigation
Header: name (600) left, Projects / About / Email right, 14px, 8px horizontal and 12px vertical padding for a full hit area. No underline at rest; hover and `aria-current="page"` turn the link ultramarine over 150ms ease-out. Project counts as current on a project page. Email is a `mailto:` link in the header on every view.

### Display Link
The primary action and the About email address are display-type links, not buttons: ink at rest, ultramarine on hover and focus, with a trailing arrow. There are no filled buttons in the system.

### Project Row
Numbered list row: two-digit Graphite index, the title in headline type, and on the right the category (plus coursework tag) in Graphite over the first result in ink, tabular. The whole row is the link; the title turns ultramarine on hover.

### Illustration Plate
Traced SVG line art at full column width, multiplied onto the ground. An optional data label (a real metric or value) is absolutely positioned as live text beside the detail it names, 12px (13px on the project plate), tabular.

### Particle Transition (signature)
On view change: sample the visible text and images of the current view into points (every 3px, cap 9000; every 4px, cap 3800 under 640px), hide the DOM, render the next view invisibly, sample it, then pair and tween. Each point disperses outward (40-190px, eased out over the first 32%) then fuses to its target (ease-in-out), staggered left to right. Color tracks progress through six steps from ink to ultramarine and back. Duration 1250ms (600ms on first load, which only fuses in). Then the DOM fades in over 220ms and the canvas clears. The canvas is `aria-hidden`; the real text is always in the DOM; focus moves to the new `h1`.

## Do's and Don'ts

### Do:
- **Do** set every view title in Display and fit it to the measure by measurement.
- **Do** keep ultramarine to hover, focus, current page, selection, and particles in flight.
- **Do** use tabular figures for every metric, count, and index.
- **Do** give every number a real source; data labels on drawings are live text, never baked into the image.
- **Do** give reduced-motion users the 220ms crossfade and keep the content fully readable without the particle layer.

### Don't:
- **Don't** add a second typeface; contrast comes from Archivo's width and weight.
- **Don't** put content in cards, panels, or bordered boxes, or add shadows.
- **Don't** animate the ground or add scroll-triggered reveals; the only motion is the view transition and color state.
- **Don't** fill areas with the accent or use it as decoration.
- **Don't** add filled buttons; actions are type.
