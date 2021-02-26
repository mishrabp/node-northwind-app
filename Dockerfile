# Specifies which OS to use. Here it is unix OS pre-installed with node v-12
FROM ubuntu:latest
LABEL developer=bibhup_mishra@yahoo.com
RUN apt-get update -y && \
    apt-get install curl -y && \
    curl -sL https://deb.nodesource.com/setup_10.2  && \
    apt-get install nodejs -y && \
    apt-get install npm -y && \
    npm install --unsafe-perm=true --allow-root -y && \
    # create folder <app> inside the container image
    mkdir -p /app 

# copy source files from host computer to container
COPY package.json ./app/ 
COPY . ./app/

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /app

# Install dependencies and build app
RUN npm config set registry http://registry.npmjs.org/ && \
    npm install && \
    npm run build

# Specify port app runs on
EXPOSE 8091

# Set environment variable default value
ENV ENVIRONMENT=production \
NODE_ENV=production \
PORT=8091 \
SSLPORT=443 \
MYNWAPP_AuthTokenKey=authtoken1 \
MYNWAPP_SessionKey=sessionkey1 \
GEOCODER_API_KEY=AIzaSyAFN7pm1QA20ojk8CA2tQnXzOHB1ryRGtM


# Run the app
CMD [ "npm", "start" ]
