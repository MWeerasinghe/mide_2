# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app/frontend/user

# Copy package.json and package-lock.json
COPY frontend/user/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app (including public folder and src)
COPY frontend/user/ .

# Build the React app
RUN npm run build

# Install serve globally to serve the build files
RUN npm install -g serve

# Serve the built React app using serve
CMD ["serve", "-s", "build", "-l", "4000"]
