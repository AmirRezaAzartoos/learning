# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Stop and remove any running containers with the same name
RUN docker stop ejs-challenge-container || true \
    && docker rm ejs-challenge-container || true

# Remove the last image with the same name
RUN docker rmi $(docker images -q ejs-challenge-signup) || true

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
EXPOSE 3003

# Run the app
CMD ["npm", "start"]