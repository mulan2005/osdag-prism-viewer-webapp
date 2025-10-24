# Prism Viewer — Frontend (Complete)


## Overview
This is the complete frontend for the Prism Viewer screening task. It implements:
- React + react-three-fiber 3D rendering
- Plugin installation UI and dynamic plugin loading (via backend-provided bundle URLs)
- Tests and CI workflow
- Production Dockerfile + nginx config


## Local development
1. Install dependencies
```bash
cd frontend
npm install
```
2. Start dev server
```bash
npm start
```
The app will run on http://localhost:3000 and communicates with backend at `REACT_APP_API_BASE`.


## Plugin system contract (backend responsibilities)
- `GET /api/plugins` -> JSON list of plugins: `[{id, name, repo_url, installed}]`
- `POST /api/plugins/install` -> accept `{repo_url}`; server clones/validates/builds plugin into a safe bundle and records metadata; returns plugin metadata
- `GET /api/plugins/:id/bundle-url` -> returns `{url: 'https://.../shape-cylinder.js'}` where the JS is an ES module that `export function Shape(){...}` and `export const meta = {...}`


The frontend fetches the `url`, creates a Blob and dynamic-imports it (avoiding `eval`).


## Build & Docker
To create a production Docker image for the frontend (serving static build via nginx):
```bash
# from frontend/
docker build -t prism-frontend:latest .
# or with compose
docker compose -f docker-compose.frontend.yml up --build
```
This serves the app on port 3000 (mapped to nginx port 80 in container).


## Tests
Run `npm test` to run unit tests (Jest + React Testing Library). CI pipeline is included in `.github/workflows/ci.yml`.


## Security notes
- Plugins must be built and vetted on the backend. The frontend uses dynamic imports of backend-hosted bundles to avoid `eval`.
- Backend should enforce plugin build sandboxing and strict content checks before exposing bundle URL.


## Plugin example
A minimal example plugin bundle `shape-cylinder` is provided in `plugins/` for local testing. Backend can serve it (or build a bundle) as an ES module.
