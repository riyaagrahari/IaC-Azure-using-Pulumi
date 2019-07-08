 "use strict" ;

const azure = require( "@pulumi/azure" );
const pulumi = require( "@pulumi/pulumi" );

class NetworkSecurityGroup{

    NetworkSecurityGroup()
    {

    }

    NetworkSecurityGroupWeb(nsgName,location,rgName,subAddr1,subAddr2,subAddr3,MgmtAddr,subAddr1Replica,subAddr2Replica,subAddr3Replica,MgmtAddrReplica)
    {
        const nsgWeb = new azure.network.NetworkSecurityGroup(nsgName,
        {
            name : nsgName,
            resourceGroupName: rgName,
            location: location,
			securityRules: [
					{
						 name :  "HTTPorHTTPS-request",
						 description :  "Rule for HTTP request and HTTPS SSL request",
						 protocol :  "Tcp",
							 sourcePortRange : "*",
							 sourceAddressPrefix :  "*",
							 destinationPortRanges : [
								 "80",
								 "443" 
							],
							 destinationAddressPrefixes : [   subAddr1 ,  subAddr1Replica  ],
							 access :  "Allow" ,
							 priority : 100,
							 direction : "Inbound", 
					},
					{
						 name :  "SSHandRDP-to-WEB" ,
						 description :  "Rule for SSH and RDP Request",
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefixes : [ MgmtAddr  , MgmtAddrReplica ],
							 destinationPortRanges : [
								 "22" ,
								 "3389" 
							],
							 destinationAddressPrefixes : [  subAddr1  ,   subAddr1Replica ],
							 access :  "Allow" ,
							 priority : 110,
							 direction :  "Inbound", 
                        },
                        {
                            name :  "API-Web-response" ,
                            description :  "Rule for accepting response from API-Web Server",
                                 protocol :  "Tcp" ,
                                 sourcePortRange :  "8083" ,
                                 sourceAddressPrefixes : [  subAddr2  ,    subAddr2Replica ],
                                 destinationPortRange :  "8081" ,
                                 destinationAddressPrefixes : [  subAddr1  ,    subAddr1Replica ],
                                 access :  "Allow" ,
                                 priority : 120,
                                 direction :  "Inbound", 
                            },
					{
						 name :  "DenyOutBoundToDB", 
						 description :  "Rule for denying Out-bound traffic to Database",
						     protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefixes :  [   subAddr1  ,   subAddr1Replica ] ,
							 destinationPortRange :  "*" ,
							 destinationAddressPrefixes : [   subAddr3   ,   subAddr3Replica ],
							 access :  "Deny" ,
							 priority : 100,
							 direction :  "Outbound", 
                    },
					{
						name :  "Web-API-request" ,
						description :  "Rule for sending request from Web-API Server",
							 protocol :  "Tcp" ,
							 sourcePortRange :  "8081" ,
							 sourceAddressPrefixes : [  subAddr1  ,    subAddr1Replica ],
							 destinationPortRange :  "8083" ,
							 destinationAddressPrefixes : [  subAddr2  ,    subAddr2Replica ],
							 access :  "Allow" ,
							 priority : 110,
							 direction :  "Outbound", 
						}
				]
            });
            return nsgWeb;
          
    }

    NetworkSecurityGroupApp(nsgName,location,rgName,subAddr1,subAddr2,subAddr3,MgmtAddr,subAddr1Replica,subAddr2Replica,subAddr3Replica,MgmtAddrReplica)
    {
        const nsgApi = new azure.network.NetworkSecurityGroup(nsgName,
		{
            //name : nsgName,
			resourceGroupName: rgName,
            location :  location ,
            securityRules: [
                {
						 name :  "Web-request-API",
						 description :  "Rule for accepting requests from WEB to API",
							 protocol :  "Tcp",
							 sourcePortRange :  "8081" ,
							 sourceAddressPrefixes : [subAddr1 ,    subAddr1Replica ],
							 destinationPortRange :  "8083" ,
							 destinationAddressPrefixes : [  subAddr2  ,    subAddr2Replica ],
							 access : "Allow" ,
							 priority : 100,
							 direction :  "Inbound", 
						},
					{
						 name :  "SSHandRDP-to-API",
						 description :  "Rule for SSH and RDP Request to API",
							 protocol :  "Tcp",
							 sourcePortRange :  "*" ,
							 sourceAddressPrefixes : [  MgmtAddr   ,  MgmtAddrReplica  ],
							 destinationPortRanges : [
								 "22" ,
								 "3389" 
							],
							 destinationAddressPrefixes : [  subAddr2  ,    subAddr2Replica ],
                             priority : 110,
                             access : "Deny",
							 direction :  "Inbound", 
					},
					{
						 name :  "FTPfromDB-Api" ,
						 description :  "Rule for accepting FTP requests from Database to API server",
							 protocol :  "Tcp",
							 sourcePortRange : "*" ,
							 sourceAddressPrefixes : [  subAddr3   ,  subAddr3Replica ],
							 destinationPortRange :  "21" ,
							 destinationAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 access :  "Allow" ,
							 priority : 120,
							 direction :  "Inbound", 
						},
					{
						 name :  "API-MySQL-request",
						 description :  "Rule for MySQL request",
							 protocol :  "Tcp",
							 sourcePortRange :  "118" ,
							 sourceAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 destinationPortRange :  "3306" ,
							 destinationAddressPrefixes : [  subAddr3   ,  subAddr3Replica ],
							 access :  "Allow" ,
							 priority : 100,
							 direction :  "Outbound", 
					},
					{
						 name :  "API-web-response",
						 description :  "Rule for sending response from API - WEB",
							 protocol :  "Tcp",
							 sourcePortRange :  "8081" ,
							 sourceAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 destinationPortRange :  "8083" ,
							 destinationAddressPrefixes : [ subAddr1 ,  subAddr1Replica ],
							 access :  "Allow" ,
							 priority : 110,
							 direction : "Outbound", 
				
					},
					{
						 name :  "FTPtoDB" ,
						 description :  "Rule for making FTP connection from API to Database server",
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 destinationPortRange :  "21" ,
							 destinationAddressPrefixes : [  subAddr3   ,  subAddr3Replica ],
							 access :  "Allow" ,
							 priority : 120,
							 direction :  "Outbound" ,
						}
					
				]
            });
            return nsgApi;
        }
        NetworkSecurityGroupDB(nsgName,location,rgName,subAddr1,subAddr2,subAddr3,MgmtAddr,subAddr1Replica,subAddr2Replica,subAddr3Replica,MgmtAddrReplica)
        {    
        const nsgDB = new azure.network.NetworkSecurityGroup(nsgName,
            {
               // name : nsgName,
                resourceGroupName: rgName,
                location :  location ,
                securityRules: [
			    {
						 name :  "API-DB-request" ,
						 description :  "Rule for accepting MySQL request from API" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "118" ,
							 sourceAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 destinationPortRange :  "3306" ,
							 destinationAddressPrefixes : [  subAddr3   ,  subAddr3Replica ],
							 access :  "Allow" ,
							 priority : 100,
							 direction :  "Inbound", 
                },
				{
						 name :  "Web-Database" ,
						 description :  "Deny direct Communication between DATABASE and WEB subnets.",
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 destinationPortRange :  "*" ,
							 sourceAddressPrefixes : [ subAddr1 ,  subAddr1Replica ],
							 destinationAddressPrefixes : [  subAddr3   ,  subAddr3Replica ],
							 access :  "Deny" ,
							 priority : 110,
							 direction :  "Inbound", 
						
					},
					{
						 name :  "SSHandRDP-from-admin-to-db",
						 description :  "Rule for SSH Request" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefixes :[  MgmtAddr   ,  MgmtAddrReplica  ],
							 destinationPortRanges : [
								 "22" ,
								 "3389" 
							],
							 destinationAddressPrefixes : [  subAddr3   ,  subAddr3Replica ],
							 access :  "Allow" ,
							 priority : 120,
							 direction :  "Inbound", 
						
					},
					{
						 name :  "FTPfromAPI-DB-Inbound" ,
						 description :  "Rule for accepting FTP connection from API to DB server" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 destinationPortRange :  "21" ,
							 destinationAddressPrefixes : [  subAddr3   ,  subAddr3Replica ],
							 access :  "Allow" ,
							 priority : 130,
							 direction :  "Inbound", 
					},
					{
						 name :  "MySQL-API-response" ,
						 description :  "Rule for MySQL response to API-server" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "3306" ,
							 sourceAddressPrefixes :[  subAddr3   ,  subAddr3Replica ],
							 destinationPortRange :  118 ,
							 destinationAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 access :  "Allow" ,
							 priority : 100,
							 direction :  "Outbound", 
					},
					{
						 name :  "FTPfromDB-API-Outbound" ,
						 description :  "Rule for sesnding FTP connection from Database to API server" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefixes : [  subAddr3  ,  subAddr3Replica ],
							 destinationPortRange :  21 ,
							 destinationAddressPrefixes : [  subAddr2  ,  subAddr2Replica ],
							 access :  "Allow" ,
							 priority : 110,
							 direction :  "Outbound",
					}
				]

    });
    return nsgDB
}
}
module.exports.NetworkSecurityGroup = NetworkSecurityGroup;