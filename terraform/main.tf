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
resource "azurerm_resource_group" "main" {
    name = var.resource_group_name
    location = var.resource_group_location
}

#Creating an App Service plan
resource "azurerm_app_service_plan" "main" {
    name = var.app_service_plan_name
    location = azurerm_resource_group.main.location
    resource_group_name = azurerm_resource_group.main.name

    kind = "Linux"
    reserved = true

    sku {
        tier = "Standard"
        size = "S1"
    }

}

#Creating an App Service for QA
resource "azurerm_app_service" "main" {
    name = "${var.app_service_name_prefix}-qa"
    location = azurerm_resource_group.main.location
    resource_group_name = azurerm_resource_group.main.name
    app_service_plan_id = azurerm_app_service_plan.main.id 

    site_config {
        linux_fx_version = "NODE|12-lts"
        app_command_line = "npm start"
    }
    
    app_settings = {
        "MYNWAPP_ENV" = "development"
        "MYNWAPP_PORT" = "8080"
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
        value = "Server=some-server.maindomain.com;Integrated Security=SSPI"
    }
}


#Creating an App Service Slot for QA
resource "azurerm_app_service_slot" "qaslot" {
    name = "staging"
    app_service_name = azurerm_app_service.main.name 
    location = azurerm_resource_group.main.location
    resource_group_name = azurerm_resource_group.main.name
    app_service_plan_id = azurerm_app_service_plan.main.id 

    site_config {
        linux_fx_version = "NODE|12-lts"
        app_command_line = "npm start"
    }
    
    app_settings = {
        "MYNWAPP_ENV" = "development"
        "MYNWAPP_PORT" = "8080"
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
        value = "Server=some-server.maindomain.com;Integrated Security=SSPI"
    }
}

#Creating an virtual network
resource "azurerm_virtual_network" "main" {
  name                = "${var.app_service_name_prefix}-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

#Creating a subnet within the virtual network
resource "azurerm_subnet" "internal" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

#Creating public ip for VM
resource "azurerm_public_ip" "main" {
  name                = "${var.app_service_name_prefix}-vm-ip"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  allocation_method   = "Static"
  domain_name_label = "${var.app_service_name_prefix}-vm"

  tags = {
    environment = "Production"
  }
}

#create a NIC
resource "azurerm_network_interface" "main" {
  name                = "${var.app_service_name_prefix}-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "testconfiguration1"
    subnet_id                     = azurerm_subnet.internal.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.main.id
  }
}

#create a vm
resource "azurerm_virtual_machine" "main" {
  name                  = "${var.app_service_name_prefix}-vm"
  location              = azurerm_resource_group.main.location
  resource_group_name   = azurerm_resource_group.main.name
  network_interface_ids = [azurerm_network_interface.main.id]
  vm_size               = "Standard_DS1_v2"

  # Uncomment this line to delete the OS disk automatically when deleting the VM
  # delete_os_disk_on_termination = true

  # Uncomment this line to delete the data disks automatically when deleting the VM
  # delete_data_disks_on_termination = true

  storage_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }
  storage_os_disk {
    name              = "mainosdisk1"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }
  os_profile {
    computer_name  = "${var.app_service_name_prefix}-vm"
    admin_username = "azureuser"
    admin_password = "Password1234!"
  }
  os_profile_linux_config {
    disable_password_authentication = false
  }
  tags = {
    environment = "demo"
  }
}
