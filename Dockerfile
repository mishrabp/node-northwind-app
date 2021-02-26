# Specifies which OS to use. Here it is unix OS pre-installed with node v-12
FROM ubuntu:latest
LABEL developer=bibhup_mishra@yahoo.com
RUN apt-get update -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.2 
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN npm install --unsafe-perm=true --allow-root -y


# create folder <app> inside the container image
RUN mkdir -p /app

# copy source files from host computer to container
COPY package.json ./app/
COPY . ./app/

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /app

# Install dependencies
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

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