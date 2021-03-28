default.json - stores variables that are common for all environments

development.json - stores development specific configuration 
- For this to be in use, you must set the ENVIRONMENT environment variable to "development"

production.json - stores development specific configuration 
- For this to be in use, you must set the ENVIRONMENT environment variable to "production"

custom-environment-varaibles - stores the config vriable and OS environment varaibles.
- values like database password, secret keys are stored in the OS environment variable 
and the variable is mapped here in this file to a configuration variable for config module to access it.

e.g.
{
    //left side name is what the config module will use to access values
    //right side name is the name of the environment variable that you need to define at OS level
    "authTokenSecretKey": "MYNWAPP_AuthTokenKey"

}

SET MYNWAPP_AuthTokenKey="X089HEA31209SE67)@56"


