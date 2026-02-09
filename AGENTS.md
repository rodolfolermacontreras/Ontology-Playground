# Coding Guidelines for AI Agents

This document contains guidelines for AI coding assistants working on this project.

## Git Workflow

### Branching Strategy
- **Main branch**: `main` - production-ready code only
- **Feature branches**: `feature/<feature-name>` - for new features
- **Bugfix branches**: `fix/<issue-description>` - for bug fixes
- **Always create a feature branch** before making changes to existing functionality

### Commit Practices
- **Commit incrementally** - small, focused commits that do one thing
- **Use conventional commits** format:
  - `feat:` - new features
  - `fix:` - bug fixes
  - `docs:` - documentation changes
  - `refactor:` - code refactoring
  - `test:` - adding or updating tests
  - `chore:` - maintenance tasks
- **Write descriptive commit messages** with a summary line and bullet points for details
- **Verify build passes** before committing (`npm run build`)

### Before Merging
- Test changes locally (`npm run dev`)
- Ensure no TypeScript errors
- Review the diff for unintended changes

## Project Structure

```
ontology-quest/
├── src/
│   ├── components/    # React components
│   ├── data/          # Data models and sample data
│   ├── store/         # Zustand state management
│   ├── styles/        # CSS styles
│   └── types/         # TypeScript type definitions
├── api/               # Azure Functions backend
├── build/             # Production build output
└── public/            # Static assets
```

## Code Style

### TypeScript
- Use strict TypeScript - no `any` types unless absolutely necessary
- Define interfaces for all data structures
- Export types from dedicated type files or alongside their implementations

### React Components
- Use functional components with hooks
- Keep components focused - split large components
- Use the existing component patterns in `src/components/`

### State Management
- Use Zustand store (`src/store/appStore.ts`) for global state
- Keep component-local state with `useState` when appropriate

## Testing Changes

```bash
# Development server
npm run dev

# Production build
npm run build

# Type checking
npx tsc --noEmit
```

## Common Tasks

### Adding a New Export Format
1. Add format type to the state (`exportFormat` union type)
2. Create export function (`exportAs<Format>`)
3. Add format handler in `handleExport()`
4. Add UI button in the format selector

### Adding a New Component
1. Create component file in `src/components/`
2. Export from `src/components/index.ts`
3. Follow existing component patterns for modals/panels

## Dependencies

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **Vite** - Build tool
- **Cytoscape.js** - Graph visualization
- **Zustand** - State management
- **Framer Motion** - Animations
