# Frontend (React App) Dockerfile
FROM node:16-alpine

# Set the working directory
WORKDIR /

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install frontend dependencies
RUN yarn install

# Copy the rest of the frontend source code
COPY / .

# Expose the frontend port
EXPOSE 3000

# Start the frontend development server
CMD ["yarn", "start"]