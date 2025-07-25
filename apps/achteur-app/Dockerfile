# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Install dependencies with exact versions
COPY package*.json ./
RUN npm ci --no-audit --prefer-offline --no-fund

# Copy shared directory with its complete structure
COPY shared/api ./shared/api
COPY shared/components ./shared/components
COPY shared/constants ./shared/constants
COPY shared/types ./shared/types
COPY shared/utils ./shared/utils
COPY shared/README.md ./

# Create a symlink to the shared directory in node_modules for easy imports
RUN mkdir -p node_modules/@shared && \
    ln -sf /app/shared node_modules/@shared

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM nginx:1.25-alpine

# Install curl for healthchecks
RUN apk --no-cache add curl

# Copy nginx configuration
COPY ./apps/achteur-app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Switch to non-root user
USER nginx

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
