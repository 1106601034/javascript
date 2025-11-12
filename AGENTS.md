# Repository Guidelines

## Project Structure & Module Organization
- Root `package.json` wires scripts; code lives in `backend/` (Express + Mongo API) and `frontend/` (Vite + React + TS).  
- Backend: `src/config` (Winston, env), `src/database` (connection helpers), `src/controllers`/`routes` (feature logic), `src/middlewares` (error + auth). Put specs in `backend/test/`.  
- Frontend: `src/` contains pages, Redux slices, hooks, and styling (`index.scss`, Tailwind entry). Keep assets in `public/` or beside components.

## Build, Test & Development Commands
- Root: `npm run project` launches API + client concurrently—default for local development.  
- API: `npm run server --prefix backend` (Nodemon), `npm start --prefix backend` (production entry), `npm test --prefix backend` (Node --test).  
- UI: `npm run dev --prefix frontend` (Vite dev), `npm run build --prefix frontend` (tsc + vite build), `npm run preview --prefix frontend` (serve dist), `npm run lint --prefix frontend` (ESLint). Set `PORT=5173` (or similar) when both servers run.

## Coding Style & Naming Conventions
- Stick to ES modules, async/await, and explicit export lists. Name backend files after their feature (`movieReview.controller.js`), frontend hooks/components in PascalCase.  
- Preserve indentation already in place (backend 4 spaces, frontend 2 spaces).  
- Run `npm run lint --prefix frontend` before committing; mirror linting on the backend when feasible.

## Testing Guidelines
- Backend specs live in `backend/test/*.test.js`; mock Mongo/3rd-party calls via dependency injection and assert both success and failure paths.  
- Frontend unit tests should sit next to the component as `ComponentName.test.tsx`, using Testing Library + Jest DOM matchers to assert user-visible behavior.  
- Run Cypress for flows that span API + UI (`npx cypress run --prefix frontend`); keep fixtures under `frontend/cypress/fixtures` and tag smoke suites for CI.

## Commit & Pull Request Guidelines
- Recent history uses one-word commits; prefer imperative, scoped titles (`feat(api): add movie review filters`) plus short bodies capturing rationale, risks, and test evidence.  
- PR checklist: describe the change, link issues, attach screenshots or cURL output, and state which commands were run. Request API reviewers for backend work and UI reviewers for frontend work.  
- Rebase on `main` before opening a PR, and document migrations or config toggles in the description.

## Configuration & Security Notes
- Backend config flows through `.env` + `src/config`; record required vars (`_PORT`, `MONGO_URI`, `JWT_SECRET`, etc.) whenever they change.  
- Do not commit `.env`, logs, or credentials; redact tokens in tickets/PRs.  
- Winston (`src/config/winston.js`) already formats JSON logs—extend it rather than introducing ad-hoc `console.log`.
