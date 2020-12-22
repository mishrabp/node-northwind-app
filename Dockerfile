# Specifies which OS to use. Here it is unix OS pre-installed with node v-12
FROM node:12

# create folder <app> inside the container image
RUN mkdir -p /app

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /app

# Install dependencies
COPY package*.json /app
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

# Copy source files from host computer to the container
COPY . /app

# Build the app
RUN npm run build

# Specify port app runs on
EXPOSE 8080

# Run the app
CMD [ "npm", "start" ]
