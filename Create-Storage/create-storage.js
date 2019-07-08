"use strict"

const pulumi = require("@pulumi/pulumi");
const azure = require("@pulumi/azure")
const azurestorage = require("azure-storage");

class AzureStorageAccount{

    AzureStorageAccount(accountName,rgName,rglocation){
        const account = new azure.storage.Account(accountName,
            {
                resourceGroupName: rgName,
                location: rglocation,
                accountTier: "Standard",
                accountReplicationType: "LRS",
            });
            return account;
        }
    }
   

module.exports.AzureStorageAccount = AzureStorageAccount;