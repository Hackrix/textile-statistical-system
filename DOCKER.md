# Docker Deployment Guide

This document provides instructions for building and deploying the TSRS application using Docker.

## Overview

The project uses a multi-stage Dockerfile for optimized production builds:
- **Stage 1 (Builder)**: Builds the React application with Node.js
- **Stage 2 (Production)**: Serves the static files with Nginx

## Prerequisites

- Docker 20.10+ installed
- Docker Compose 1.29+ (optional, for multi-environment setup)

## Quick Start

### Build Docker Image

```bash
# Build for production (default)
docker build -t tsrs:latest .

# Build for specific environment
docker build --build-arg BUILD_ENV=dev -t tsrs:dev .
docker build --build-arg BUILD_ENV=uat -t tsrs:uat .
docker build --build-arg BUILD_ENV=prod -t tsrs:prod .
```

### Run Container

```bash
# Run with default settings
docker run -d -p 8080:80 --name tsrs tsrs:latest

# Run with custom environment variables
docker run -d -p 8080:80 \
  -e VITE_ENV=production \
  -e VITE_API_BASE_URL=https://api.tsrs.gov.in/api \
  -e VITE_APP_NAME=TSRS \
  -e VITE_ENABLE_DEBUG=false \
  --name tsrs \
  tsrs:latest
```

Access the application at: http://localhost:8080

## Docker Compose

Use Docker Compose to run multiple environments simultaneously:

```bash
# Start all environments
docker-compose up -d

# Start specific environment
docker-compose up -d tsrs-dev
docker-compose up -d tsrs-uat
docker-compose up -d tsrs-prod

# View logs
docker-compose logs -f tsrs-dev

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Port Mappings

- Local: http://localhost:8080
- Dev: http://localhost:8081
- UAT: http://localhost:8082
- Prod: http://localhost:8083

## Environment Variables

Runtime environment variables can be passed to the container:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ENV` | Environment name | `production` |
| `VITE_API_BASE_URL` | API base URL | `https://api.tsrs.gov.in/api` |
| `VITE_APP_NAME` | Application name | `TSRS` |
| `VITE_ENABLE_DEBUG` | Enable debug logging | `false` |

### Runtime Environment Injection

The Docker setup includes runtime environment variable injection via `env.sh` script. This allows you to change environment variables without rebuilding the image:

```bash
docker run -d -p 8080:80 \
  -e VITE_API_BASE_URL=https://custom-api.example.com/api \
  --name tsrs \
  tsrs:latest
```

## Health Checks

The container includes built-in health checks:

```bash
# Check container health
docker ps

# Manual health check
curl http://localhost:8080/health
```

Health check configuration:
- Interval: 30 seconds
- Timeout: 3 seconds
- Retries: 3
- Start period: 5 seconds

## Image Optimization

The multi-stage build ensures:
- Small image size (~25MB final image)
- No development dependencies in production
- Optimized layer caching
- Security best practices

### Build Cache Optimization

```bash
# Clear build cache if needed
docker builder prune

# Build with no cache
docker build --no-cache -t tsrs:latest .
```

## Nginx Configuration

The included `nginx.conf` provides:
- Gzip compression for assets
- Security headers
- Static asset caching (1 year)
- SPA routing support
- Health check endpoint
- Optional API proxy configuration

### Custom Nginx Config

Modify `nginx.conf` and rebuild the image:

```bash
# Edit nginx.conf
vim nginx.conf

# Rebuild
docker build -t tsrs:latest .
```

## Production Deployment

### Using Docker

```bash
# Build production image
docker build --build-arg BUILD_ENV=prod -t tsrs:prod .

# Run in production
docker run -d \
  -p 80:80 \
  --name tsrs-production \
  --restart unless-stopped \
  -e VITE_ENV=production \
  -e VITE_API_BASE_URL=https://api.tsrs.gov.in/api \
  -e VITE_ENABLE_DEBUG=false \
  tsrs:prod
```

### Using Docker Compose

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d tsrs-prod
```

### Behind a Reverse Proxy

If running behind Nginx/Apache/Traefik:

```bash
# Don't expose port 80 publicly
docker run -d \
  --name tsrs \
  --network reverse-proxy-network \
  -e VITE_API_BASE_URL=https://api.tsrs.gov.in/api \
  tsrs:prod
```

## Container Management

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View logs
docker logs -f tsrs

# Execute commands in container
docker exec -it tsrs sh

# Stop container
docker stop tsrs

# Remove container
docker rm tsrs

# View container stats
docker stats tsrs
```

## Debugging

### View Container Logs

```bash
docker logs -f tsrs
```

### Access Container Shell

```bash
docker exec -it tsrs sh
```

### Check Nginx Configuration

```bash
docker exec tsrs nginx -t
```

### Verify Environment Variables

```bash
docker exec tsrs cat /usr/share/nginx/html/env-config.js
```

## Security Best Practices

1. **Don't expose unnecessary ports**
2. **Use environment variables for sensitive data**
3. **Keep base images updated**
   ```bash
   docker pull node:20-alpine
   docker pull nginx:1.25-alpine
   ```
4. **Scan for vulnerabilities**
   ```bash
   docker scan tsrs:latest
   ```
5. **Run as non-root user** (if needed, modify Dockerfile)
6. **Use Docker secrets for production**

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Build Docker Image
  run: docker build --build-arg BUILD_ENV=prod -t tsrs:${{ github.sha }} .

- name: Push to Registry
  run: |
    docker tag tsrs:${{ github.sha }} registry.example.com/tsrs:latest
    docker push registry.example.com/tsrs:latest
```

### GitLab CI Example

```yaml
build:
  stage: build
  script:
    - docker build --build-arg BUILD_ENV=prod -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

## Kubernetes Deployment

Example Kubernetes deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tsrs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: tsrs
  template:
    metadata:
      labels:
        app: tsrs
    spec:
      containers:
      - name: tsrs
        image: tsrs:prod
        ports:
        - containerPort: 80
        env:
        - name: VITE_API_BASE_URL
          value: "https://api.tsrs.gov.in/api"
        - name: VITE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs tsrs

# Check if port is already in use
lsof -i :8080
```

### Application Not Accessible

```bash
# Verify container is running
docker ps | grep tsrs

# Check port mapping
docker port tsrs

# Test from inside container
docker exec tsrs curl http://localhost:80
```

### Environment Variables Not Working

```bash
# Verify env-config.js generation
docker exec tsrs cat /usr/share/nginx/html/env-config.js

# Check if env.sh executed
docker logs tsrs | grep "Runtime environment"
```

## Image Registry

### Push to Registry

```bash
# Tag image
docker tag tsrs:latest registry.example.com/tsrs:latest

# Login to registry
docker login registry.example.com

# Push image
docker push registry.example.com/tsrs:latest
```

### Pull from Registry

```bash
docker pull registry.example.com/tsrs:latest
docker run -d -p 8080:80 registry.example.com/tsrs:latest
```

## Performance Tuning

### Nginx Worker Processes

Modify nginx.conf for high-traffic scenarios:

```nginx
worker_processes auto;
worker_connections 1024;
```

### Container Resources

Limit container resources:

```bash
docker run -d \
  --memory="512m" \
  --cpus="1.0" \
  -p 8080:80 \
  tsrs:latest
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [ARCHITECTURE.md](ARCHITECTURE.md) - Frontend architecture
- [README.md](README.md) - Project documentation
