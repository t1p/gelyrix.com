# Repository Guidelines

## Technology Stack
- SvelteKit for the frontend framework.
- TailwindCSS for styling.
- Appwrite for backend services (auth, database, storage).
- Responsive design is required across mobile and desktop breakpoints.
- Localization is required for Russian and English content.

## Project Structure & Module Organization
- `src/routes/` contains SvelteKit pages for the site map (e.g., `src/routes/how-it-works/+page.svelte`).
- `src/lib/` holds shared UI, i18n, and Appwrite setup (example: `src/lib/i18n.ts`).
- `static/` is for static assets served at the site root.
- `versions/` stores content plan drafts; keep `versions/v0.1.md` intact and add new versions alongside it.
- `nginx/` and `ecosystem.config.js` contain deployment configs.

## Build, Test, and Development Commands
- `npm run dev` starts the local dev server.
- `npm run build` generates the production build.
- `npm run preview` serves the production build locally.
- `npm run start` runs the Node adapter build (used by PM2).
- `npm run check` runs Svelte type checks.

## Coding Style & Naming Conventions
- Use SvelteKit conventions; keep components small and focused.
- Prefer Tailwind utility classes over custom CSS unless a shared component style is needed.
- Use `camelCase` for variables, `PascalCase` for components, and `kebab-case` for route folders.
- Prefer ASCII text unless content is intentionally localized (RU/EN).
- Versioned content files follow `versions/vX.Y.md` (example: `versions/v0.2.md`).

## Testing Guidelines
- Use `npm run check` for type safety; add automated tests if new logic is introduced.
- If tests are added, place them in a clear location such as `tests/` and document how to run them.

## Commit & Pull Request Guidelines
- No Git history is available here, so there is no established commit message convention.
- Use clear, imperative subjects (example: `Add v0.2 content outline`) and keep commits scoped.
- PRs should include: a brief summary of content changes, rationale for structural changes, and links to related issues or briefs.
- If visual design or layout artifacts are added later, include screenshots or previews.

## Content Updates & Review
- When revising content, preserve prior versions and add a new `versions/vX.Y.md` file.
- Note key deltas at the top of the new version (example: “Added FAQ section, refined CTA copy”).
