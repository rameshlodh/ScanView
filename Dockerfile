# Step 1: Use a Node.js base image to build the app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Build the app using Vite
RUN npm run build

# Step 2: Set up the production environment with a minimal image
FROM nginx:alpine

# Copy the build output from the build stage to the nginx container's web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx server to serve the app
CMD ["nginx", "-g", "daemon off;"]
