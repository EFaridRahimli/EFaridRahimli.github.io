# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers, recruiters and engineers hiring a machine-learning engineer. They arrive from a CV, LinkedIn or GitHub link, usually on a desktop at work, sometimes on a phone, and decide in under a minute whether Farid is worth an email.

## Product Purpose

The personal portfolio of Farid Rahimli (MSc AI, Data Science and Digital Business student). It shows his public ML projects with their real results so a hiring reader can judge his work quickly and get in touch. Success: the reader understands what he builds, opens at least one project, and emails him.

## Positioning

An ML engineer who reports honest, measured results: every project carries its real metric (mAP, accuracy, RMSE, latency), and coursework is labelled as coursework.

## Operating Context

Static site on GitHub Pages (https://efaridrahimli.github.io), built with React, Vite and Tailwind, deployed with `npm run deploy` to the gh-pages branch. Visitors come from external links; there is no login, CMS or backend.

## Capabilities and Constraints

- One page; views switch in place (index, projects, project detail, about) with deep-linkable URLs.
- 11 public projects in `src/projects.ts`; Tomato is the capstone, five others are coursework and are tagged so.
- Contact: email erahimlif@gmail.com and GitHub. No LinkedIn and no CV link (user's choice).
- Positioning is ML engineer only; no game-development, RAG or FastAPI project claims.
- FastAPI and RAG stay in the About toolkit as skills, without a public project behind them (user confirmed, 2026-11-08).

## Brand Commitments

- Maximum minimalism, very large type, typography-led (user, 2026-11-08).
- View changes dissolve the text and drawings into particles that re-form as the next view, over a background that stays still (user, 2026-11-08).
- Project drawings are AI-generated line art traced to SVG (`public/illos/`), with live-text data labels.

## Evidence on Hand

Project titles, summaries, results and repo links in `src/projects.ts`; drawings in `public/illos/`. No testimonials, employers, publications or benchmarks beyond the listed project metrics; do not invent any.

## Product Principles

1. Results first: a real number beats an adjective.
2. Honest labels: coursework says coursework.
3. One action: make emailing Farid effortless.
4. The motion serves reading; content is always readable without it.

## Accessibility & Inclusion

WCAG 2.2 AA. Full keyboard use; the particle layer is decorative and hidden from assistive tech, the real text stays in the DOM, and reduced-motion users get a plain crossfade.
