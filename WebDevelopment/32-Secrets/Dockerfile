# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Stop and remove any running containers with the same name
RUN docker stop Secrets-container || true \
    && docker rm Secrets-container || true

# Remove the last image with the same name
RUN docker rmi $(docker images -q Secrets) || true

# Clone latest code from the Git repository
# RUN git pull

# Install app dependencies
COPY package*.json ./
RUN npm install

# Install vim and nano packages
RUN apt-get update && apt-get install -y nano && rm -rf /var/lib/apt/lists/*

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3012

# Run the app
CMD ["npm", "start"]