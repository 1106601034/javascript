# Repository Guidelines

## Project Structure & Module Organization
This Vite + React + TypeScript application is centered in `src/`. `src/main.tsx` bootstraps the app, loading the layout defined in `src/App.tsx`. Reusable UI and logic belong in `src/Components/`, where `Archieves.tsx` aggregates clock, sign-in, and data-fetching modules. Global styles live in `src/index.css`; scoped or component-level rules use adjacent SCSS files (e.g., `App.scss`). Static assets and the HTML shell stay in `public/`. Build settings and TypeScript project references are configured via `vite.config.ts`, `tsconfig.app.json`, and `tsconfig.node.json`.

## Build, Test, and Development Commands
Install dependencies with `npm install` (or `npm ci` in CI to honor `package-lock.json`). Use `npm run dev` for the hot-reloading dev server on port 5173. `npm run build` performs the TypeScript project build (`tsc -b`) and emits the production bundle under `dist/`. Preview a production build locally using `npm run preview`. Run `npm run lint` before every PR to enforce ESLint React and TypeScript rules.

## Coding Style & Naming Conventions
Match the existing 2-space indentation for TypeScript, TSX, and SCSS files. Name React components and files with `PascalCase` (`MyClock.tsx`); hooks and utilities stay `camelCase`. Co-locate component styles as `.scss` files and import them at the top of the component. Favor named exports for shared utilities to simplify tree-shaking. ESLint (see `eslint.config.js`) is the source of truth; do not ignore rules without a short comment explaining why. Coding style should adhere to SOLID, DRY, and KISS principles.

## Testing Guidelines
Automated testing is not yet configured; when adding coverage, scaffold Vitest with React Testing Library. Place tests alongside the code or under `src/__tests__/` with the `ComponentName.test.tsx` convention. Mock network calls (e.g., `FetchPostList`) to keep tests deterministic. Target meaningful coverage for any new component logic and update CI scripts once a test command is introduced.

## Commit & Pull Request Guidelines
Write commit messages in imperative present tense, ideally following `type(scope): summary` (for example, `feat(clock): add seconds hand`). Keep commits focused; bundle lint fixes with the change they support. Pull requests should describe the user-visible impact, outline testing performed (`npm run lint`, future `npm test`), and link related issues. Include screenshots or short clips when altering UI states so reviewers can verify rendering quickly.

## Code Review 2025-09-28
- `src/app/components/Calculater.tsx:6` calls `setCount` during render using undefined variables `input1` and `input2`; this throws immediately and forces an infinite re-render loop, so the calculator never mounts.
- `src/app/App.tsx:29` invokes `SignInToShowInput()` like a plain function; that violates the Rules of Hooks and causes its state to attach to `App`, leading to React warnings and broken updates.
- `src/app/App.tsx:11` runs `console.clear()` on every render, wiping useful logs and introducing a side-effect in the render path.
