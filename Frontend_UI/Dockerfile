# Use official Node.js image as base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the project
RUN npm run build

# Create a new image for the final production build
FROM node:18-alpine AS runner

# Set working directory inside runner container
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expose port 3000 (default for Next.js)
 EXPOSE 3000
# EXPOSE 80

# Start the standalone Next.js server
CMD ["node", "server.js"]
