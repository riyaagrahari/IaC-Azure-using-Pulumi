"use strict"
const  pulumi =  require ("@pulumi/pulumi");
const  azure =  require ("@pulumi/azure");

class VirtualNetworkPeering {

    constructor() {

    }
    
    VnetPeering(vnet1ID,vnet1Name,vnet2ID,vnet2Name,rg1name,rg2name)
    {
        const test1VirtualNetworkPeering = new azure.network.VirtualNetworkPeering("Peering1", {
            name: "peerVnet1toVnet2",
            resourceGroupName: rg1name,
            remoteVirtualNetworkId: vnet2ID,
            virtualNetworkName: vnet1Name,
            allowVirtualNetworkAccess: true,
            allowForwardedTraffic: false,
            allowGatewayTransit: false,
            useRemoteGateways: false,
            
        });
        const test2VirtualNetworkPeering = new azure.network.VirtualNetworkPeering("Peering2", {
            name: "peerVnet2toVnet1",
            resourceGroupName: rg2name,
            remoteVirtualNetworkId: vnet1ID,
            virtualNetworkName: vnet2Name,
            allowVirtualNetworkAccess: true,
            allowForwardedTraffic: false,
            allowGatewayTransit: false,
            useRemoteGateways: false,
        });
    }
}
module.exports.VirtualNetworkPeering = VirtualNetworkPeering; 

