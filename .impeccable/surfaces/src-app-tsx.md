---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface brief: one-page portfolio (src/App.tsx)

Scope: the whole site, one page with four views (index, projects, project, about) switched in place via hash routes. Visitor mode: Experience (portfolio) with one Persuade job: email Farid.
Audience and job: ML hiring managers judging work in under a minute. Proof: the 11 projects' real metrics. Constraint: no invented claims; coursework labelled.

## Direction contract

THESIS: A trading-floor board for one engineer's work. The landing view is a perpetual ticker: the name rolls past in giant amber condensed caps, a symbol tape quotes each project's real figure, and the project titles roll as links. Every other view is a few enormous words, and moving between views dissolves words and drawings into amber phosphor particles that re-form as the next view over a still black ground. Refuses the hero-over-card-grid default.

OWN-WORLD: Terminal black ground (#0B0B0B), amber (#FFA028) for all display type, ticker symbols, particles, hover, focus and the current page; paper white (#E8E6E1) for reading text; graphite (#8D8A84) for metadata; signal green (#3DDC84) only for a real measured improvement. Big Shoulders Display (Chicago signage) black caps for display; Martian Mono semi-condensed for text and figures, tabular. Hairline row rules (#262624) separate ticker tapes; no cards, shadows or glass. Drawings in paper white.

STORY: The visitor reads a name and a job in one glance, opens Projects, sees eleven titles with their metric, opens one, reads the number that matters, and emails.

FIRST VIEWPORT: Three ticker tapes stacked across the full width between hairlines: the name and role in amber display caps at up to a third of the viewport height rolling left (desktop: sized so the whole name fits the width; phones: larger than the title tape and cropped as it rolls, the header carries the full name); the symbol tape (TMTO, SRGT ...) with quotes rolling right; the project titles as links rolling left. Below a hairline: the one-sentence role (left), a visible Pause ticker control, and the primary action PROJECTS (11) → (right). Tapes pause on hover, focus and the control, and stand still under reduced motion (WCAG 2.2.2). Email in the header.

FORM: user-pinned (maximum minimalism, huge type, particle dissolve between views; 2026-11-09: perpetual horizontal ticker landing like a trading floor, Big Shoulders + Martian Mono, terminal amber). The direction roll was skipped because the user pinned the direction; no seed exists. seed: none (skipped: user-pinned direction)

SIGNATURE: the ticker board, and the particle dissolve/re-form between views (canvas sampling of the rendered DOM text and drawings), amber settling, white-hot in flight; reduced motion gets a crossfade and still tapes.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
