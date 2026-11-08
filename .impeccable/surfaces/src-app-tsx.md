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

THESIS: The type is the interface. Each view is a few enormous words set on a strict grid, and moving between views dissolves those words and drawings into ink particles that re-form as the next view over a still ground. Refuses the category default of a hero over a card grid with scroll reveals.

OWN-WORLD: Cool white ground (#EDEEEF), near-black ink (#111214), one ultramarine (#1F3BFF) used only for particles in flight, focus, hover and the current page. One family, Archivo, whose width axis carries the voice: extra-condensed heavy for display, normal width for text, tabular figures for every number. No cards, no shadows, no glass, no rules except one hairline grid line.

STORY: The visitor reads a name and a job in one glance, opens Projects, sees eleven titles with their metric, opens one, reads the number that matters, and emails.

FIRST VIEWPORT: "FARID / RAHIMLI" in extra-condensed 900 on two lines, the longer line spanning the full measure where the viewport height allows, otherwise capped at 60% of the viewport height so the sentence and action stay in the first viewport (at 1440x900 a full-measure two-line name would be ~80% of the height); under it, left, one sentence of what he builds; right, the single primary action "PROJECTS (11) →" in display type. Email always one click away in the header, top-right. (Amended: no numbered nav; section numbers would be decoration.)

FORM: user-pinned (maximum minimalism, huge type, particle dissolve between views). The direction roll was skipped because the user pinned the direction; no seed exists. seed: none (skipped: user-pinned direction)

SIGNATURE: particle dissolve/re-form between views (canvas sampling of the rendered DOM text and drawings), particles tinted ultramarine in flight, settling to ink; reduced motion gets a crossfade.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
