FROM node:10.16.3-alpine

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY package.json .
COPY ["package.json", "./"]
RUN npm install

# Exports
EXPOSE 80
CMD [ "npm", "run", "dev" ]