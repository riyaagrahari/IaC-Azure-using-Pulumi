 "use strict" ;

const azure = require( "@pulumi/azure" );
const pulumi = require( "@pulumi/pulumi" );

class NetworkSecurityGroup{

    NetworkSecurityGroup()
    {

    }

    NetworkSecurityGroupWeb(nsgName,location,rgName,subAddr1,subAddr2,subAddr3,MgmtAddr)
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
							 destinationAddressPrefix : subAddr1 ,
							 access :  "Allow" ,
							 priority : 100,
							 direction : "Inbound", 
					},
					{
						 name :  "SSHandRDP-to-WEB" ,
						 description :  "Rule for SSH and RDP Request",
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefix : MgmtAddr,
							 destinationPortRanges : [
								 "22" ,
								 "3389" 
							],
							 destinationAddressPrefix :subAddr1,
							 access :  "Allow" ,
							 priority : 110,
							 direction :  "Inbound", 
                        },
                        {
                            name :  "API-Web-response" ,
                            description :  "Rule for accepting response from API-Web Server",
                                 protocol :  "Tcp" ,
                                 sourcePortRange :  "8083" ,
                                 sourceAddressPrefix :   subAddr2  , 
                                 destinationPortRange :  "8081" ,
                                 destinationAddressPrefix :  subAddr1  ,
                                 access :  "Allow" ,
                                 priority : 120,
                                 direction :  "Inbound", 
                            },
					{
						 name :  "DenyOutBoundToDB", 
						 description :  "Rule for denying Out-bound traffic to Database",
						     protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefix :  subAddr1  ,
							 destinationPortRange :  "*" ,
							 destinationAddressPrefix :   subAddr3   ,
							 access :  "Deny" ,
							 priority : 100,
							 direction :  "Outbound", 
                    },
					{
						name :  "Web-API-request" ,
						description :  "Rule for sending request from Web-API Server",
							 protocol :  "Tcp" ,
							 sourcePortRange :  "8081" ,
							 sourceAddressPrefix : subAddr1,
							 destinationPortRange :  "8083" ,
							 destinationAddressPrefix : subAddr2, 
							 access :  "Allow" ,
							 priority : 110,
							 direction :  "Outbound", 
						}
				]
            });
            return nsgWeb;
          
    }

    NetworkSecurityGroupApp(nsgName,location,rgName,subAddr1,subAddr2,subAddr3,MgmtAddr,subAddr1Replica,subAddr2Replica,subAddr3Replica,  )
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
							 sourceAddressPrefix : subAddr1 ,
							 destinationPortRange :  "8083" ,
							 destinationAddressPrefix :   subAddr2  , 
							 access : "Allow" ,
							 priority : 100,
							 direction :  "Inbound", 
						},
					{
						 name :  "SSHandRDP-to-API",
						 description :  "Rule for SSH and RDP Request to API",
							 protocol :  "Tcp",
							 sourcePortRange :  "*" ,
							 sourceAddressPrefix : MgmtAddr ,
							 destinationPortRanges : [
								 "22" ,
								 "3389" 
							],
							 destinationAddressPrefix :   subAddr2  , 
                             priority : 110,
                             access : "Deny",
							 direction :  "Inbound", 
					},
					{
						 name :  "FTPfromDB-Api" ,
						 description :  "Rule for accepting FTP requests from Database to API server",
							 protocol :  "Tcp",
							 sourcePortRange : "*" ,
							 sourceAddressPrefix : subAddr3 ,
							 destinationPortRange :  "21" ,
							 destinationAddressPrefix :   subAddr2  ,
							 access :  "Allow" ,
							 priority : 120,
							 direction :  "Inbound", 
						},
					{
						 name :  "API-MySQL-request",
						 description :  "Rule for MySQL request",
							 protocol :  "Tcp",
							 sourcePortRange :  "118" ,
							 sourceAddressPrefix : subAddr2  ,
							 destinationPortRange :  "3306" ,
							 destinationAddressPrefix :  subAddr3  ,
							 access :  "Allow" ,
							 priority : 100,
							 direction :  "Outbound", 
					},
					{
						 name :  "API-web-response",
						 description :  "Rule for sending response from API - WEB",
							 protocol :  "Tcp",
							 sourcePortRange :  "8081" ,
							 sourceAddressPrefix : subAddr2 ,
							 destinationPortRange :  "8083" ,
							 destinationAddressPrefix : subAddr1 ,
							 access :  "Allow" ,
							 priority : 110,
							 direction : "Outbound", 
				
					},
					{
						 name :  "FTPtoDB" ,
						 description :  "Rule for making FTP connection from API to Database server",
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefix : subAddr2  ,
							 destinationPortRange :  "21" ,
							 destinationAddressPrefix :  subAddr3 ,
							 access :  "Allow" ,
							 priority : 120,
							 direction :  "Outbound" ,
						}
					
				]
            });
            return nsgApi;
        }
        NetworkSecurityGroupDB(nsgName,location,rgName,subAddr1,subAddr2,subAddr3,MgmtAddr)
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
							 sourceAddressPrefix : subAddr2 ,
							 destinationPortRange :  "3306" ,
							 destinationAddressPrefix : subAddr3 ,
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
							 sourceAddressPrefix : subAddr1 ,
							 destinationAddressPrefix : subAddr3 ,
							 access :  "Deny" ,
							 priority : 110,
							 direction :  "Inbound", 
						
					},
					{
						 name :  "SSHandRDP-from-admin-to-db",
						 description :  "Rule for SSH Request" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefix : MgmtAddr ,
							 destinationPortRanges : [
								 "22" ,
								 "3389" 
							],
							 destinationAddressPrefix : subAddr3 ,
							 access :  "Allow" ,
							 priority : 120,
							 direction :  "Inbound", 
						
					},
					{
						 name :  "FTPfromAPI-DB-Inbound" ,
						 description :  "Rule for accepting FTP connection from API to DB server" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefix : subAddr2 ,
							 destinationPortRange :  "21" ,
							 destinationAddressPrefix : subAddr3 ,
							 access :  "Allow" ,
							 priority : 130,
							 direction :  "Inbound", 
					},
					{
						 name :  "MySQL-API-response" ,
						 description :  "Rule for MySQL response to API-server" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "3306" ,
							 sourceAddressPrefix :  subAddr3 ,
							 destinationPortRange :  118 ,
							 destinationAddressPrefix : subAddr2 ,
							 access :  "Allow" ,
							 priority : 100,
							 direction :  "Outbound", 
					},
					{
						 name :  "FTPfromDB-API-Outbound" ,
						 description :  "Rule for sesnding FTP connection from Database to API server" ,
							 protocol :  "Tcp" ,
							 sourcePortRange :  "*" ,
							 sourceAddressPrefix :  subAddr3 ,
							 destinationPortRange :  21 ,
							 destinationAddressPrefix :  subAddr2 ,
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
