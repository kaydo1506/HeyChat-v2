#  parent image
FROM node:16-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json file into the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application's code into the container
COPY . .

# Make the container’s port available to the outside world
EXPOSE 8080

# Run server.js when the container launches
CMD ["npm", "start"]

