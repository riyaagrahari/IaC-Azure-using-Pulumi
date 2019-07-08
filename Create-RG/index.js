"use strict";
const pulumi = require("@pulumi/pulumi");
const azure = require("@pulumi/azure");
// Include Creation of Resource Group Class
const resourceGroup = require("../Create-RG/create-rg.js");
// Create an Azure Resource Group object by passing Resource Group name and location in constructor  parameter
let azureResourceGroup = new resourceGroup.ResourceGroup("Resource-Group-Pulumi","CentralUS");
// Include Creation of Storage Account Class
const storageAccount = require("./create-storage.js");
// Create object of Storage Account
let azureStorageAccount = new storageAccount.AzureStorageAccount();
// Create Storage Account
const account = storageAccount.createAzureStorageAcc("myFirstStorage",azureResourceGroup.resourceGroupName,azureResourceGroup.location);

console.log(account.name);

