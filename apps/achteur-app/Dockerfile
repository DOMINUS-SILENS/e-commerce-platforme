# Build stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY ./apps/achteur-app/package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY ./apps/achteur-app/index.html .
COPY ./apps/achteur-app/src ./src
COPY ./apps/achteur-app/public ./public
COPY ./apps/achteur-app/tsconfig.json ./
COPY ./apps/achteur-app/tsconfig.node.json ./
COPY ./apps/achteur-app/tsconfig.app.json ./
COPY ./apps/achteur-app/vite.config.ts ./

# Create a symlink to the shared directory
RUN mkdir -p /app/shared && \
    ln -sf /shared/utils /app/shared/utils

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx config
COPY ./apps/achteur-app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
