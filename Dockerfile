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

# Set working directory within the image. Paths will be relative this WORKDIR.
WORKDIR /app

# copy source files from host computer to container
COPY ["package.json", "package-lock.json*", "./"]
COPY . .

# Install dependencies and build app
RUN npm config set registry http://registry.npmjs.org/ && \
    npm install --silent && \
    npm run build

# Specify port app runs on
EXPOSE 8080

# Set environment variable default value
ENV MYNWAPP_ENV=development \
MYNWAPP_PORT=8080 \
MYNWAPP_AuthTokenKey=authtoken1 \
MYNWAPP_SessionKey=sessionkey1 \
MYNWAPP_GEOCODER_API_KEY=AIzaSyAFN7pm1QA20ojk8CA2tQnXzOHB1ryRGtM \
MYNWAPP_ERRORLOG=true \
MYNWAPP_TRACKINGLOG=true \
MYNWAPP_MONGO_URI="mongodb://mongoadmin:passw0rd!@devopsmasterlinuxvm.centralus.cloudapp.azure.com:9003/northwind?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false"


# Run the app
CMD [ "npm", "start" ]
