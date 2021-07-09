# We strongly recommend using the required_providers block to "the
# Azure Provider source and version being used

terraform {
  backend "azurerm" {
    resource_group_name   = "#{terraformStorageRG}#"
    storage_account_name  = "#{terraformStorageAccount}#"
    container_name        = "#{terraformContainer}#"
    key                   = "terraform.tfstate"
  }
}

resource "random_pet" "prefix" {}

provider "azurerm" {
  features {}
}

#Defining Variables
#Define variables
variable "resource_group_name" {
    default = "#{resourceGroup}#"
    description = "the name of the resource group"
}

variable "resource_group_location" {
    default = "#{resourceLocation}#"
    description = "the location of the resource group"
}

variable "app_service_plan_name" {
    default = "#{appServicePlan}#"
    description = "the name of the app service plan"
}

variable "app_service_name_prefix" {
    default = "#{appServicePrefix}#"
    description = "begining part of the app service name"
}

#Creating a resource group
resource "azurerm_resource_group" "my" {
    name = var.resource_group_name
    location = var.resource_group_location
}

#Creating an App Service plan
resource "azurerm_app_service_plan" "my" {
    name = var.app_service_plan_name
    location = azurerm_resource_group.my.location
    resource_group_name = azurerm_resource_group.my.name

    kind = "Linux"
    reserved = true

    sku {
        tier = "Basic"
        size = "B1"
    }

}

#Creating an App Service for QA
resource "azurerm_app_service" "qa" {
    name = "${var.app_service_name_prefix}-qa"
    location = azurerm_resource_group.my.location
    resource_group_name = azurerm_resource_group.my.name
    app_service_plan_id = azurerm_app_service_plan.my.id 

    site_config {
        linux_fx_version = "NODE|12"
        app_command_line = "npm start"
    }
    
    app_settings = {
        "MYNWAPP_ENV" = "development"
        "MYNWAPP_PORT" = "8091"
        "MYNWAPP_AuthTokenKey" = "authtoken1"
        "MYNWAPP_SessionKey" = "sessionkey1"
        "MYNWAPP_GEOCODER_API_KEY" = "AIzaSyAFN7pm1QA20ojk8CA2tQnXzOHB1ryRGtM"
        "MYNWAPP_ERRORLOG" = "true"
        "MYNWAPP_TRACKINGLOG" = "true"
        "MYNWAPP_MONGO_URI" = "#{MYNWAPP-MONGO-URI}#"
    }

    connection_string {
        name  = "Database"
        type  = "SQLServer"
        value = "Server=some-server.mydomain.com;Integrated Security=SSPI"
    }
}
