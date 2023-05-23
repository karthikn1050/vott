# Base image
FROM node:14.18.1-alpine3.14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Build the app
RUN npm run build

# Production image
FROM nginx:1.21.3-alpine

# Copy the build files to the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
