"use strict";
const pulumi = require("@pulumi/pulumi");
const azure = require("@pulumi/azure");
const resourceGroup = require("./create-rg.js");
const nsgCreate = require("./create-nsg.js");
const virtualNet = require("./create-vnet.js");
const peering = require("./create-peering.js");

let rg1 = "Resource-Group-Pulumi-1";
let rg2 = "Resource-Group-Pulumi-2-replica";
let location1 = "CentralUS";
let location2 = "WestUS";
let vnet1Name = "Vnet-1Pulumi-Riya";
let vnet1IP = "10.0.0.0/16";
let subnet1Name = "sub-1";
let subnet1IP = "10.0.1.0/24";
let subnet2Name = "sub-2";
let subnet2IP = "10.0.2.0/24";
let subnet3Name = "sub-3";
let subnet3IP = "10.0.3.0/24";
let ManagementJumpboxName = "adminNet";
let ManagementJumpboxIP = "10.0.4.0/24"; 
let FirewallIP = "10.0.5.0/24";
let vnet2Name = "Vnet-2Pulumi-Riya";
let vnet2IP = "20.0.0.0/16";
let subnet1NameReplica = "sub-1-replica";
let subnet1IPReplica = "20.0.1.0/24";
let subnet2NameReplica = "sub-2-replica";
let subnet2IPReplica = "20.0.2.0/24";
let subnet3NameReplica = "sub-3-replica";
let subnet3IPReplica = "20.0.3.0/24";
let ManagementJumpboxNameReplica = "adminNet-Replica";
let ManagementJumpboxIPReplica = "20.0.4.0/24";
let FirewallIPReplica = "20.0.5.0/24";

let nsgNames = ["WEB","API","DB"];
var randomNumber = Math.floor(Math.random() * 10000);
// Create Azure Resource Group object by passing Resource Group name and location in constructor  parameter
// Primary Resource Group 
let azureResourceGroup = new resourceGroup.ResourceGroup(rg1,location1);
// Secondary Resource Group at different location
let azureResourceGroup2 = new resourceGroup.ResourceGroup(rg2,location2);


// Create Network Security Group
let nsgobj = new nsgCreate.NetworkSecurityGroup();
// Create Primary Network Security Group
let nsg = [];
//creation of 3 NSG- web,api,db
for(var i=1;i <= 3;i++)
nsg[i] = nsgobj.NetworkSecurityGroupWeb("Nsg-Azure-Primary"+randomNumber+"-"+nsgNames[i-1],azureResourceGroup.location,azureResourceGroup.resourceGroupName,subnet1IP,subnet2IP,subnet3IP,ManagementJumpboxIP,subnet1IPReplica,subnet2IPReplica,subnet3IPReplica,ManagementJumpboxIPReplica);
// Create Secondary Network Security Group
let nsgReplica = []
//creation of 3 NSG replica- web,api,db
for(var i=1;i <= 3;i++)
nsgReplica[i] = nsgobj.NetworkSecurityGroupWeb("Nsg-Azure-Secondary"+randomNumber+"-"+nsgNames[i-1],azureResourceGroup2.location,azureResourceGroup2.resourceGroupName,subnet1IP,subnet2IP,subnet3IP,ManagementJumpboxIP,subnet1IPReplica,subnet2IPReplica,subnet3IPReplica,ManagementJumpboxIPReplica);

const vnetobj = new virtualNet.VirtualNetwork();
const virtualnet = vnetobj.VirtualNetworkCreate(vnet1Name,azureResourceGroup.location,vnet1IP,azureResourceGroup.resourceGroupName,subnet1IP,subnet2IP,subnet3IP,ManagementJumpboxIP,FirewallIP,subnet1Name,subnet2Name,subnet3Name,ManagementJumpboxName,nsg[1].id,nsg[2].id,nsg[3].id);
const virtualNetworkReplica = vnetobj.VirtualNetworkCreate(vnet2Name,azureResourceGroup2.location,vnet2IP,azureResourceGroup2.resourceGroupName,subnet1IPReplica,subnet2IPReplica,subnet3IPReplica,ManagementJumpboxIPReplica,FirewallIPReplica,subnet1NameReplica,subnet2NameReplica,subnet3NameReplica,ManagementJumpboxNameReplica,nsgReplica[1].id,nsgReplica[2].id,nsgReplica[3].id);

const peeringobj = new peering.VirtualNetworkPeering();
const peering1 = peeringobj.VnetPeering(virtualnet.id,virtualnet.name,virtualNetworkReplica.id,virtualNetworkReplica.name,azureResourceGroup.resourceGroupName,azureResourceGroup2.resourceGroupName);


