"use strict";
const pulumi = require("@pulumi/pulumi");
const azure = require("@pulumi/azure");
// Include Creation of Resource Group Class
const resourceGroup = require("./create-rg.js");
// Include Creation of Storage Account Class
const storageAccount = require("./create-storage.js");
// Create an Azure Resource Group object by passing Resource Group name and location in constructor  parameter
let azureResourceGroup = new resourceGroup.ResourceGroup("Resource-Group-Pulumi","CentralUS");
// Create object of Storage Account
let storageAccountObject = new storageAccount.AzureStorageAccount();
// Create Storage Account
const account = storageAccountObject.AzureStorageAccount("MyfirstStorage",azureResourceGroup.resourceGroupName,azureResourceGroup.location)
console.log(account.name);

