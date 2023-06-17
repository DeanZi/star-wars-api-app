# Backend (Express API) Dockerfile
FROM node:16-alpine

# Set the working directory
WORKDIR /

# Copy package.json and yarn.lock
COPY /package*.json yarn.lock ./

# Install backend dependencies
RUN yarn install

# Copy the rest of the backend source code
COPY / .

# Expose the backend port
EXPOSE 8000

# Start the backend server
CMD ["yarn", "start"]

