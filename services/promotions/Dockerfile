# Stage 1: Build
FROM node:10.16.0-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:10.16.0-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -S app && adduser -S app -G app
RUN chown -R app:app /app

USER app

# Install only production dependencies
COPY --chown=app:app package*.json ./
RUN npm install --only=production

# Copy built artifacts from builder stage
COPY --chown=app:app --from=builder /app/build ./build

# Expose port
EXPOSE 5001

# Start command
CMD ["npm", "run", "prod"]
