"use strict";

const azure = require("@pulumi/azure");
const pulumi = require("@pulumi/pulumi");

class VirtualNetwork {
    VirtualNetwork(){}
    VirtualNetworkcreate(vNetName,location,Vnetaddr,rgName,subAddr1,subAddr2,subAddr3,subAddr4,subname1,subname2,subname3,subname4)
    {
         const testVirtualNetwork = new azure.network.VirtualNetwork(vNetName,
         {
            addressSpaces: [Vnetaddr],
            location: location,
           // name: vNetName,
            resourceGroupName: rgName,
            subnets: [
                {
                    addressPrefix: subAddr1,
                    name: subname1,
                   // securityGroup: nsgID1,
                },
                {
                    addressPrefix: subAddr2,
                    name: subname2,
                    //securityGroup: nsgID2,
                },
                {
                    addressPrefix: subAddr3,
                    name: subname3,
                    //securityGroup: nsgID3,
                },
                {
                    addressPrefix: subAddr4,
                    name: subname4,
                }
            ],

            });
            return testVirtualNetwork;
        }
    }
module.exports.VirtualNetwork = VirtualNetwork;