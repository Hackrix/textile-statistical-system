// Environment configuration utilities
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  appName: import.meta.env.VITE_APP_NAME || 'TSRS',
  environment: import.meta.env.VITE_ENV || 'local',
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Debug logger
export const logger = {
  log: (...args) => {
    if (config.enableDebug) {
      console.log(`[${config.environment.toUpperCase()}]`, ...args);
    }
  },
  error: (...args) => {
    if (config.enableDebug) {
      console.error(`[${config.environment.toUpperCase()}]`, ...args);
    }
  },
  warn: (...args) => {
    if (config.enableDebug) {
      console.warn(`[${config.environment.toUpperCase()}]`, ...args);
    }
  },
};

// API utilities
export const apiClient = {
  get: async (endpoint, options = {}) => {
    const url = `${config.apiBaseUrl}${endpoint}`;
    logger.log('GET', url);
    
    try {
      const response = await fetch(url, {
        ...options,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      logger.error('API GET failed:', error);
      throw error;
    }
  },
  
  post: async (endpoint, data, options = {}) => {
    const url = `${config.apiBaseUrl}${endpoint}`;
    logger.log('POST', url, data);
    
    try {
      const response = await fetch(url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      logger.error('API POST failed:', error);
      throw error;
    }
  },
};

export default config;
