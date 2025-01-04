# Use a smaller Node.js base image (Alpine Linux)
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for dependency caching
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the React application for production
RUN yarn build

# Use a lightweight Nginx image for serving the static files
FROM nginx:1.23-alpine

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d

# Copy custom Nginx configuration (if you have one, otherwise use default)
COPY deployments/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]