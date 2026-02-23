# TSRS - Textile Statistical Returns System

A modern React-based web application for managing textile statistical returns with multi-environment support.

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4
- **Forms:** Formik + Yup
- **UI Components:** react-select

## Environment Setup

This project supports multiple environments: **local**, **dev**, **uat**, and **production**.

### Environment Files

- `.env.local` - Local development
- `.env.dev` - Development server
- `.env.uat` - UAT/Staging server
- `.env.production` - Production server
- `.env.example` - Template file

### Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client code:

```bash
VITE_ENV=local                           # Environment name
VITE_API_BASE_URL=http://localhost:3000/api  # API base URL
VITE_APP_NAME=TSRS                       # Application name
VITE_ENABLE_DEBUG=true                   # Enable debug logging
```

### Initial Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Update `.env.local` with your local configuration

## Available Scripts

### Development

```bash
# Start local development server (default)
npm run dev

# Start with specific environment
npm run dev:local   # Uses .env.local
npm run dev:dev     # Uses .env.dev
npm run dev:uat     # Uses .env.uat
```

### Build

```bash
# Build for production
npm run build

# Build for specific environment
npm run build:dev   # Uses .env.dev
npm run build:uat   # Uses .env.uat
npm run build:prod  # Uses .env.production
```

### Preview

Preview production builds locally:

```bash
# Preview with specific environment
npm run preview       # Local mode
npm run preview:dev   # Dev mode
npm run preview:uat   # UAT mode
npm run preview:prod  # Production mode
```

### Linting

```bash
npm run lint
```

## Project Structure

```
tsrs/
├── src/
│   ├── components/
│   │   ├── landing/           # Landing page components
│   │   ├── registeration/     # Registration flow components
│   │   └── shared/            # Shared/reusable components
│   ├── pages/                 # Page components
│   ├── config/                # Configuration utilities
│   │   └── env.js            # Environment config & API client
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                    # Static assets
├── .env.example              # Environment template
├── .env.local                # Local environment (gitignored)
├── .env.dev                  # Dev environment (gitignored)
├── .env.uat                  # UAT environment (gitignored)
├── .env.production           # Production environment (gitignored)
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies & scripts
```

## Using Environment Variables

### In Components

```javascript
import { config, logger, apiClient } from './config/env';

// Access configuration
console.log(config.apiBaseUrl);
console.log(config.environment);

// Use debug logger
logger.log('Debug message');
logger.error('Error message');

// Make API calls
const data = await apiClient.get('/endpoint');
const result = await apiClient.post('/endpoint', { data });
```

### Direct Access

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
```

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed frontend architecture documentation.

## Deployment

### Traditional Deployment

#### Development/UAT

```bash
# Build for target environment
npm run build:dev   # or build:uat

# Files will be in dist/ directory
# Deploy dist/ to your server
```

#### Production

```bash
# Build for production
npm run build:prod

# Deploy dist/ directory to production server
```

### Docker Deployment

The project includes a multi-stage Dockerfile for containerized deployment.

```bash
# Build Docker image
docker build -t tsrs:latest .

# Run container
docker run -d -p 8080:80 \
  -e VITE_API_BASE_URL=https://api.tsrs.gov.in/api \
  --name tsrs \
  tsrs:latest
```

#### Docker Compose (Multi-Environment)

```bash
# Start all environments
docker-compose up -d

# Start specific environment
docker-compose up -d tsrs-prod

# View logs
docker-compose logs -f tsrs-prod
```

Port mappings:
- Local: http://localhost:8080
- Dev: http://localhost:8081
- UAT: http://localhost:8082
- Prod: http://localhost:8083

For detailed Docker documentation, see [DOCKER.md](DOCKER.md).

## Development Workflow

1. Create feature branch from `main`
2. Make changes and test locally with `npm run dev`
3. Test with dev environment: `npm run dev:dev`
4. Build and preview: `npm run build:dev && npm run preview:dev`
5. Create pull request
6. After review, merge to main
7. Deploy to respective environments

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## TypeScript Migration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## License

Copyright © 2022 – UX4G. All rights reserved.

