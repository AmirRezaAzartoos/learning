# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Stop and remove any running containers with the same name
RUN docker stop newsletter-signup-container || true \
    && docker rm newsletter-signup-container || true

# Remove the last image with the same name
RUN docker rmi $(docker images -q newsletter-signup) || true

# Clone latest code from the Git repository
# RUN git pull

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "start"]