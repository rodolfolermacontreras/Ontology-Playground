# Copilot Instructions — Ontology Playground

> Last updated: 2026-04-17 | Synced to upstream commit: `a3206f7`

This file is the **single source of truth for getting a new Copilot session up to speed instantly.**
Read this before asking the user what to work on.

---

## What This Project Is

**Ontology Playground** is a fork of [`microsoft/Ontology-Playground`](https://github.com/microsoft/Ontology-Playground) —
a production-grade, fully static React 19 + TypeScript 5 + Vite 7 single-page application for learning and working
with **Microsoft Fabric IQ Ontologies**. Zero backend required. Deployed to Azure Static Web Apps and GitHub Pages.

**Live app**: [microsoft.github.io/Ontology-Playground](https://microsoft.github.io/Ontology-Playground/)
**Our fork**: [rodolfolermacontreras/Ontology-Playground](https://github.com/rodolfolermacontreras/Ontology-Playground)
**Local path**: `C:\Training\Projects\Context_Antology\`

---

## Git Remotes (already configured — do not re-add)

| Remote | URL | Purpose |
|--------|-----|---------|
| `origin` | `https://github.com/rodolfolermacontreras/Ontology-Playground.git` | Our fork |
| `upstream` | `https://github.com/microsoft/Ontology-Playground.git` | Microsoft source |

To sync with upstream:
```bash
git fetch upstream && git merge upstream/main --no-edit && git push origin main
```

---

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server at http://localhost:5173 |
| `npm run build` | Full production build (catalogue → learn → tsc → vite → embed) |
| `npm test` | Run test suite (Vitest) |
| `npm run test:watch` | Watch mode tests |
| `npm run validate` | Validate all catalogue RDF files |
| `npm run qa:tutorial-content` | QA check on Ontology School content |
| `npx tsx scripts/compile-catalogue.ts` | Rebuild catalogue.json only |

**Build pipeline order**: `catalogue:build` → `learn:build` → `tsc -b` → `vite build` → `build:embed`

---

## Project Structure

```
C:\Training\Projects\Context_Antology\
├── src/
│   ├── components/        # React components (graph, designer, modals, learn, FabricExportModal)
│   ├── data/              # Ontology model, query engine, quest definitions, designer templates
│   ├── lib/               # Router, RDF parser/serializer, catalogue helpers, fabric.ts (Fabric API)
│   ├── store/             # Zustand stores: appStore.ts + designerStore.ts
│   ├── styles/            # CSS (Microsoft Fluent-inspired dark/light themes)
│   └── types/             # TypeScript type definitions
├── catalogue/
│   ├── official/          # 36 official ontologies (including 4 FIBO risk step ontologies)
│   └── external/          # 12 external ontologies (FIBO, schema.org, etc.)
├── content/learn/         # 10 course directories, 47 markdown articles + quizzes
├── scripts/               # Build-time: compile-catalogue.ts, compile-learn.ts, validate-rdf.ts
├── docs/                  # Authoring guide, embed guide, OAuth setup, learning content guide
├── public/                # catalogue.json (48 entries), learn.json (10 courses, 47 articles)
├── .github/
│   ├── copilot-instructions.md   ← THIS FILE
│   ├── instructions/rdf-intake.instructions.md
│   ├── skills/ontology-catalog-import/SKILL.md
│   ├── skills/ontology-school-path-generator/SKILL.md
│   └── prompts/           # import-rdf-to-catalog.prompt.md, generate-ontology-school-module.prompt.md
├── PROJECT_STATUS_REVIEW.md   ← Session history & big-picture plan
└── SYSTEM_ARCHITECTURE.md     ← Full technical architecture reference
```

---

## What Has Been Built (Complete Features)

| Feature | Status |
|---------|--------|
| Interactive Cytoscape.js graph explorer | ✅ Done |
| Ontology Catalogue (48 entries: official + external) | ✅ Done |
| Visual Ontology Designer (entities, properties, relationships) | ✅ Done |
| RDF/XML import & export (round-trip fidelity) | ✅ Done |
| One-click Catalogue PR (GitHub OAuth device flow) | ✅ Done |
| Embeddable widget (`ontology-embed.js`) | ✅ Done |
| Ontology School (10 courses, 47 articles, quizzes, presentation mode) | ✅ Done |
| Quest system (5 gamified quests, badges) | ✅ Done |
| Natural Language Query playground | ✅ Done |
| Command palette (`Ctrl+K`) + keyboard shortcuts | ✅ Done |
| Starter templates in designer (5 domains) | ✅ Done |
| Interactive onboarding tour (5-step spotlight) | ✅ Done |
| Deep linking / hash routing | ✅ Done |
| Responsive design (mobile, tablet, desktop) | ✅ Done |
| Undo/redo in designer (50 levels) | ✅ Done |
| RDF syntax highlighting in designer | ✅ Done |
| Azure Static Web Apps + GitHub Pages CI/CD | ✅ Done |
| AI agent skills (ontology-catalog-import, ontology-school-path-generator) | ✅ Done |
| **Push to Microsoft Fabric via REST API** | ✅ Done (added 2026-04-17) |
| **FIBO Risk Management ontologies + school lab** | ✅ Done (added 2026-04-17) |

---

## What Is Still Pending (from TODO.md)

| Item | Section | Priority |
|------|---------|----------|
| RDF syntax highlighting in embed widget | §4.3 | Medium |
| Ontology diffing view | §5.2 | Medium |
| Full accessibility audit (ARIA, screen reader) | §5.3 | Medium |
| PWA / offline support | §5.4 | Low |
| Privacy-respecting analytics | §5.5 | Low |
| Bundle optimization pass | §5.7 | Low (post-freeze) |
| "Edit" button inside embed widget | §6.6 | Low |
| "Use in Fabric IQ" guided export wizard | low-priority | Low |

---

## Agent Skills Available in This Repo

When a `.rdf` or `.owl` file appears in context, **always** ask the user whether they want:
- **Catalogue import** → use skill `ontology-catalog-import`
- **Ontology School module** → use skill `ontology-school-path-generator`
- **Both** → catalogue import first, then school module

Always run before finishing:
```bash
npm run qa:tutorial-content   # if school content was touched
npx tsx scripts/compile-catalogue.ts
npm run validate
npm run build                 # when substantial changes made
```

Never push directly to `main` — use branch + PR workflow.

---

## Technology Stack

| Tech | Version | Role |
|------|---------|------|
| React | 19.2.0 | UI framework |
| TypeScript | ~5.9.3 | Type safety |
| Vite | 7.3.1 | Build tool |
| Cytoscape.js | 3.33.1 | Graph rendering |
| Zustand | 5.0.10 | State management (appStore + designerStore) |
| Framer Motion | 12.29.2 | Animations |
| Vitest | 4.0.18 | Tests |
| Azure OpenAI (GPT-4o-mini) | — | AI builder (feature-flagged: VITE_ENABLE_AI_BUILDER) |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_ENABLE_AI_BUILDER` | `false` | Enable Azure OpenAI ontology builder |
| `VITE_ENABLE_LEGACY_FORMATS` | `false` | Enable JSON/YAML/CSV import/export |
| `VITE_BASE_PATH` | `/` | Base path (auto-set for GitHub Pages) |
| `VITE_GITHUB_CLIENT_ID` | *(empty)* | GitHub OAuth App client ID for one-click catalogue PRs |
| `VITE_GITHUB_OAUTH_BASE` | *(empty)* | External OAuth proxy URL |

---

## Strategic Context (Why This Exists)

This project is used for **AI consulting work**:
- Demonstrate how client business domains can be modeled as ontologies
- Export production-ready RDF/XML for Microsoft Fabric IQ ingestion
- **Push ontologies directly to a Fabric workspace** via the new REST API
- Embed interactive ontology graphs in PowerPoint decks, wikis, or client deliverables
- Use Ontology School as a client onboarding / training platform

**Planned custom ontologies to build:**
1. Sales Compensation Ontology (immediate next experiment)
2. Inventory Intelligence Ontology (consulting client)

---

## Session History

| Date | What Happened |
|------|---------------|
| 2026-03-18 | Cloned repo, full architectural recon, created SYSTEM_ARCHITECTURE.md |
| 2026-04-17 | Synced 11 upstream commits (Fabric API push, FIBO Risk lab), build verified |
