#!/bin/sh

# This script generates env-config.js at container startup
# allowing runtime environment variable injection without rebuilding the image

echo "Generating runtime environment configuration..."

cat <<EOF > /usr/share/nginx/html/env-config.js
// Runtime Environment Configuration
// This file is generated at container startup
window._env_ = {
  VITE_ENV: "${VITE_ENV:-production}",
  VITE_API_BASE_URL: "${VITE_API_BASE_URL:-https://api.tsrs.gov.in/api}",
  VITE_APP_NAME: "${VITE_APP_NAME:-TSRS}",
  VITE_ENABLE_DEBUG: "${VITE_ENABLE_DEBUG:-false}"
};
EOF

echo "Runtime environment configuration generated successfully"
cat /usr/share/nginx/html/env-config.js
