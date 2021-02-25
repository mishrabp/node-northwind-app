# Specifies which OS to use. Here it is unix OS pre-installed with node v-12
FROM ubuntu:latest
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - -y
RUN apt-get install nodejs -y
RUN npm install --unsafe-perm=true --allow-root -y


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
EXPOSE 8091

# Set environment variable default value
ENV ENVIRONMENT=production
ENV PORT=8091
ENV SSLPORT=443
ENV MYNWAPP_AuthTokenKey=authtoken1
ENV MYNWAPP_SessionKey=sessionkey1
ENV GEOCODER_API_KEY=AIzaSyAFN7pm1QA20ojk8CA2tQnXzOHB1ryRGtM


# Run the app
CMD [ "npm", "start" ]
