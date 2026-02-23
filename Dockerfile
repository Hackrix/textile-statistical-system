# Multi-stage Dockerfile for TSRS React Application

# Stage 1: Build Stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build argument for environment
ARG BUILD_ENV=production
ENV NODE_ENV=production

# Build the application for the specified environment
RUN npm run build:${BUILD_ENV}

# Stage 2: Production Stage
FROM nginx:1.25-alpine AS production

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy env.sh script for runtime environment variable injection
COPY docker/env.sh /docker-entrypoint.d/40-env.sh
RUN chmod +x /docker-entrypoint.d/40-env.sh

# Create placeholder for environment variables
RUN touch /usr/share/nginx/html/env-config.js

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

# Expose port 80
EXPOSE 80

# Labels for metadata
LABEL maintainer="TSRS Team"
LABEL description="TSRS - Textile Statistical Returns System Frontend"
LABEL version="1.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
