# Storage Account in Azure using Pulumi-js
This script creates a Storage Account in a Resource Group of Microsoft Azure.

For default values , you may refer to [`index.js`](https://github.com/riyaagrahari/Pulumi-Azure/blob/master/Create-Storage/index.js) file. Variables are declared and initialized with default values.

You can give your own values by changing the entries.

## Installation

- Install <b>Pulumi package</b> for your respective Operating System and setup Pulumi CLI. (Refer [`Download Pulumi`](https://www.pulumi.com/docs/reference/install/) )

- After Installation, verify pulumi is installed or not by using
 ```bash
$ pulumi version
```
- Install Node.js (Refer [`Download Node.js`](https://nodejs.org/en/download/) )<br />

- Install <b>Pulumi with Node.js</b> <br/>
 Install using npm to use pulumi from JavaScript or TypeScript in Node.js
 ```bash
$ npm install @pulumi/azure
```
- Configure Azure (Refer [`Azure Configuration`](https://www.pulumi.com/docs/reference/clouds/azure/setup/) )
Note: If Azure CLI is working on your local system , skip this step 

- Create a New Project
 ```bash
$ mkdir <folder name> && cd <folder name>
$ pulumi new azure-javascript
```
Note: If ```pulumi new``` is being used for the first time, you will be asked to login to [`Pulumi Cloud Console`](https://app.pulumi.com/). Sign up and Login there using Azure Credentials.

It will ask for project name and stack name. Change it as desired or to use default just press Enter.

It will generate some project files in your current folder which are as follows: <br />
- ```Pulumi.yaml``` which defines your project.<br />

- ```Pulumi.dev.yaml``` which contains stack configuration values.<br />

- ```index.js``` which defines your stack resources.
- Download the JavaScript files of the folder [`Create-Storage`](https://github.com/riyaagrahari/Pulumi-Azure/tree/master/Create-Storage), paste and replace it in your current folder where Pulumi project is initiated.
- Deploy the Stack using following command
 ```bash
$ pulumi up
```
## Usage
After creating a new project and stack in Pulumi using ```pulumi new azure-javascript```<br />


- Download the JavaScript files in the folder [`Create-Vnet-NSG-Subnet`](https://github.com/riyaagrahari/Pulumi-Azure/tree/master/Create-Vnet-NSG-Subnet), paste and replace it in your current folder where Pulumi project is initiated.
- [`index.js`](https://github.com/riyaagrahari/IaC-using-Pulumi/blob/master/Create-Vnet-NSG-Subnet-DisasterRecovery/index.js) is the master template which calls all other templates in it.
```index.js``` executes first and calls the follwing linked templates:

- [`create-rg.js`](https://github.com/riyaagrahari/IaC-using-Pulumi/blob/master/Create-Vnet-NSG-Subnet-DisasterRecovery/create-rg.js)is the Resource Group Creation Template in a particular location. 

- [`create-nsg.js`](https://github.com/riyaagrahari/IaC-using-Pulumi/blob/master/Create-Vnet-NSG-Subnet-DisasterRecovery/create-nsg.js) is the Network Security Group Creation template which creates 3 NSG- WEB, API, DB which have their own inbound and outbound rules for traffic control.

- [`create-peering.js`](https://github.com/riyaagrahari/IaC-using-Pulumi/blob/master/Create-Vnet-NSG-Subnet-DisasterRecovery/create-peering.js) is used for creating peering from Primary to Secondary Virtual Network and Secondary to Primary Virtual Network.

- Deploy the Stack using following command
 ```bash
$ pulumi up
```
- ```index.js``` will execute and all other Linked Templates will be called.

## License
This project is licensed under the  License - see the [`LICENSE.md`](https://github.com/riyaagrahari/ARM-Templates/blob/master/LICENSE) file for details
## Author
[`Riya Agrahari`](https://github.com/riyaagrahari/)<br />

