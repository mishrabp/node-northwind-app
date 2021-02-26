##Run this command file from command prompt after you have logged into heroku.
##this deploys the code to heroku cloud. https://node-northwind-app.herokuapp.com

heroku config:set ENVIRONMENT=production
heroku config:set PORT=8080
heroku config:set SSLPORT=443
heroku config:set MYNWAPP_AuthTokenKey=authtoken1
heroku config:set MYNWAPP_SessionKey=sessionkey1
heroku config:set GEOCODER_API_KEY=AIzaSyAFN7pm1QA20ojk8CA2tQnXzOHB1ryRGtM

git push heroku master

heroku logs --tail

