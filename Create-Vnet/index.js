"use strict";
const pulumi = require("@pulumi/pulumi");
const azure = require("@pulumi/azure");
const virtualNet = require("./create-vnet.js");
const resourceGroup = require("./create-rg.js");
let azureResourceGroup = new resourceGroup.ResourceGroup("Resource-Group-Pulumi","CentralUS");
// Create an Azure Resource Group
/*const resourceGroup = new azure.core.ResourceGroup({
    name : "resourceGroup123",
    location: "WestUS",
});
*/
const vnetobj = new virtualNet.VirtualNetwork();
const vnet = vnetobj.VirtualNetworkcreate("Vnet-123-Riya",azureResourceGroup.location,"10.0.0.0/16",azureResourceGroup.resourceGroupName,"10.0.1.0/24","10.0.2.0/24","10.0.3.0/24","10.0.4.0/24","sub-1","sub-2","sub-3","adminNet");

// Export the connection string for the storage account
//exports.connectionString = .primaryConnectionString;
