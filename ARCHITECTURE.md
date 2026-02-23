# Frontend Architecture

This document describes the frontend architecture, technology choices, conventions, and extension points for this project.

## Overview

- Framework: React 19 with Vite for fast dev/build.
- Routing: React Router DOM v7 with SPA navigation.
- Styling: Tailwind CSS v4 with PostCSS and a small theme extension.
- Forms: Formik for form state + Yup for schema validation.
- UI Inputs: react-select for enhanced selects; custom file uploader.
- Linting: ESLint (flat config) with React Hooks and React Refresh plugins.

## Tech Stack & Tooling

- Runtime: React 19 (`react`, `react-dom`).
- Router: `react-router-dom`.
- Forms: `formik`, `yup`.
- Select: `react-select`.
- Build: Vite 7 with React and Tailwind plugins. See [vite.config.js](vite.config.js).
- Styles: Tailwind 4 postcss pipeline. See [postcss.config.js](postcss.config.js) and [tailwind.config.js](tailwind.config.js).
- Lint: Flat config with recommended JS + React Hooks rules. See [eslint.config.js](eslint.config.js).
- Scripts: `dev`, `build`, `preview`, `lint` in [package.json](package.json).

Quick commands:

```bash
# Start dev server
npm run dev

# Type-check-free build (Vite bundling)
npm run build

# Preview production build
npm run preview

# Lint source
npm run lint
```

## Project Structure

- Entrypoint: [index.html](index.html)
- App bootstrap: [src/main.jsx](src/main.jsx)
- Router + pages: [src/App.jsx](src/App.jsx), [src/pages/Landing.jsx](src/pages/Landing.jsx), [src/pages/Registeration.jsx](src/pages/Registeration.jsx)
- UI composition:
  - Feature: Landing — [src/components/landing](src/components/landing)
  - Feature: Registration — [src/components/registeration](src/components/registeration)
  - Shared UI: [src/components/shared](src/components/shared)
- Global styles: [src/index.css](src/index.css)

## Application Composition

- `BrowserRouter` wraps the app in [src/main.jsx](src/main.jsx), enabling SPA navigation.
- Route map is declared in [src/App.jsx](src/App.jsx):
  - `/` → Landing page
  - `/registeration` → Registration flow
- Pages compose feature modules rather than duplicating header/footer logic:
  - Landing page composes `Header`, `Carousel`, `HowItWorks`, `Footer`.
  - Registration page composes `Header`, `Stepper`, `DynamicFields`, `RightPanel`, `Footer`.

## UI Layer

- Shared layout and atoms:
  - `Header`, `Footer`, `Container`, `Carousel` in [src/components/shared](src/components/shared).
  - `Header` includes accessibility affordances (skip link, font size control).
  - `Carousel` supports autoplay, manual navigation, and ARIA-friendly structure.
- Landing feature module:
  - Composition in [src/components/landing/index.jsx](src/components/landing/index.jsx).
  - Section content in [src/components/landing/HowItWorks.jsx](src/components/landing/HowItWorks.jsx).
- Registration feature module:
  - Orchestrator: [src/components/registeration/index.jsx](src/components/registeration/index.jsx)
    - Tracks current step, fetches step config, and manages progression.
    - Uses `Formik` for step-local form state and `Yup` for validation.
  - `Stepper`: visualizes step status in [src/components/registeration/Stepper.jsx](src/components/registeration/Stepper.jsx).
  - `DynamicFields`: renders fields from API-driven schema in [src/components/registeration/DynamicFields.jsx](src/components/registeration/DynamicFields.jsx).
    - Supports `text`, `number`, `radio`, `select` (via `react-select`), and `fileUpload`.
  - `FileUpload`: drag-and-drop/multi-select uploader in [src/components/registeration/FileUpload.jsx](src/components/registeration/FileUpload.jsx).
  - `RightPanel`: contextual guidance in [src/components/registeration/RightPanel.jsx](src/components/registeration/RightPanel.jsx).

## Styling System

- Tailwind v4 is the primary styling mechanism.
- Configured content scanning and a custom `brand` color scale in [tailwind.config.js](tailwind.config.js).
- PostCSS pipeline defined in [postcss.config.js](postcss.config.js), enabling `@tailwindcss/postcss` and `autoprefixer`.
- Global base styles and Tailwind import live in [src/index.css](src/index.css).

Conventions:
- Utility-first classes within components.
- Keep typography and layout consistent with Container and max-width patterns.
- Prefer semantic HTML elements and accessible patterns (labels, ARIA where appropriate).

## State Management

- Local UI state via React Hooks within components (e.g., carousel index, header font scale).
- Form state via `Formik` in the Registration feature, with schema derived dynamically per-step.
- No centralized global state library; cross-step persistence is done by lifting and merging `formik.values` into `formData` in the orchestrator.

## Routing

- Defined in [src/App.jsx](src/App.jsx) using `Routes`/`Route` from React Router v7.
- Browser history is managed by `BrowserRouter` in [src/main.jsx](src/main.jsx).
- Links use `<Link>` (e.g., CTA in `Carousel`) for client-side navigation.

## Data Fetching & API Shape

- Registration fields are schema-driven via a simulated API in [src/components/registeration/api.js](src/components/registeration/api.js).
  - `fetchStepConfig(stepIndex)` returns `{ projectName, sections[] }`.
  - Each section has a `fields[]` array with `{ label, fieldType, placeholder, requiredField, options }`.
- Extension path for real data:
  - Replace the simulated function with a real `fetch`/`axios` call and adapt to the shape above (or update `DynamicFields` if shape changes).

## Forms & Validation

- `Formik` is used with `enableReinitialize` so step changes re-seed the form.
- `Yup` schema is built from the fetched field definitions per step (required and type-aware for numbers/emails).
- Validation strategy:
  - On `Next`, the current step’s subset of fields is validated; if no errors, values merge into accumulated `formData` and step advances.

## Accessibility Considerations

- `Header`:
  - Skip-to-content link targets `main` region with `id="main-content"`.
  - Font size scaling updates `documentElement.style.fontSize`.
- `Carousel`:
  - ARIA role description for the carousel container.
  - Keyboard focusable controls, labeled navigation buttons, and visible focus rings.
- Form elements:
  - Labels and error messaging for inputs, radio groups, and selects.

## Performance Notes

- Vite enables optimized dev server and modern build output.
- Component-level state management avoids unnecessary re-renders.
- Potential improvements:
  - Route-based code-splitting with `React.lazy` for page components.
  - Memoization of heavy subtrees if required (not currently necessary).

## Linting & Code Quality

- ESLint (flat config) enforces recommended JS rules and React Hooks correctness.
- React Refresh plugin helps detect invalid Fast Refresh patterns during development.
- Config: [eslint.config.js](eslint.config.js)

## Extensibility Guidelines

- Add a new route:
  1. Create a page in `src/pages/`.
  2. Register it in [src/App.jsx](src/App.jsx) with a new `<Route>`.
- Add a new registration step:
  1. Update the source of truth in your backend (or the mock in [src/components/registeration/api.js](src/components/registeration/api.js)) to return an additional step.
  2. Update `steps` labels in [src/components/registeration/Stepper.jsx](src/components/registeration/Stepper.jsx) and the max-step logic in the orchestrator if step count changes.
- Support a new field type:
  1. Extend the `Field` switch in [src/components/registeration/DynamicFields.jsx](src/components/registeration/DynamicFields.jsx).
  2. Add corresponding `Yup` rule logic in the schema builder within the orchestrator ([src/components/registeration/index.jsx](src/components/registeration/index.jsx)).

## Docker Deployment

The project includes a production-ready multi-stage Dockerfile:

### Multi-Stage Build

1. **Builder Stage**: Node.js 20 Alpine
   - Installs dependencies with `npm ci`
   - Builds application for target environment
   - Optimized layer caching

2. **Production Stage**: Nginx 1.25 Alpine
   - Serves static files from build stage
   - Custom nginx configuration with gzip, security headers
   - Runtime environment variable injection via `env.sh`
   - Health check endpoint at `/health`

### Key Files

- [Dockerfile](Dockerfile) - Multi-stage build configuration
- [docker-compose.yml](docker-compose.yml) - Multi-environment orchestration
- [nginx.conf](nginx.conf) - Nginx server configuration
- [docker/env.sh](docker/env.sh) - Runtime environment injection script
- [.dockerignore](.dockerignore) - Build context optimization
- [DOCKER.md](DOCKER.md) - Comprehensive Docker documentation

### Features

- **Small Image Size**: ~25MB final image (Alpine-based)
- **Layer Caching**: Optimized for fast rebuilds
- **Runtime Config**: Environment variables injected at startup
- **Health Checks**: Built-in container health monitoring
- **Security**: Minimal attack surface, security headers, non-root capable
- **Performance**: Gzip compression, static asset caching, SPA routing

### Quick Commands

```bash
# Build for production
docker build --build-arg BUILD_ENV=prod -t tsrs:prod .

# Run single container
docker run -d -p 8080:80 -e VITE_API_BASE_URL=https://api.tsrs.gov.in/api tsrs:prod

# Run all environments with Docker Compose
docker-compose up -d
```

See [DOCKER.md](DOCKER.md) for complete deployment guide, CI/CD integration, and Kubernetes examples.

## Known Gaps / Future Work

- Testing: No tests currently. Consider adding Vitest + React Testing Library for pages and components.
- Error handling: Introduce error boundaries and user-friendly API error states.
- Forms: Add progress persistence and resumable drafts (localStorage or backend).
- Type Safety: Consider TypeScript for stronger contracts on field schemas and form state.
- i18n: Header hints at language switching; wire up i18n infra (e.g., `react-i18next`).

## Appendix: Key Files

- App shell and routing: [src/main.jsx](src/main.jsx), [src/App.jsx](src/App.jsx)
- Landing feature: [src/components/landing](src/components/landing)
- Registration feature: [src/components/registeration](src/components/registeration)
- Shared components: [src/components/shared](src/components/shared)
- Styling config: [tailwind.config.js](tailwind.config.js), [postcss.config.js](postcss.config.js), [src/index.css](src/index.css)
- Build config: [vite.config.js](vite.config.js)
- Lint config: [eslint.config.js](eslint.config.js)
