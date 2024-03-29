# Virtual Network with Multiple Subnets in Pulumi-js
Azure Virtual Network allows various Azure resources to communicate with each other, the internet, and on-premises networks in a secure manner. Along with the traditional networking features, VNet also brings additional benefits of Azure's infrastructure such as scale, availability, and isolation. 
Subnets in Azure Vnet enable you to segment the virtual network into one or more sub-networks. It allocates a portion of the virtual network's address space to each of the subnets.

This script creates a Virtual Network with three subnets in Microsoft Azure.

For default values , you may refer to [`index.js`](https://github.com/riyaagrahari/Pulumi-Azure/blob/master/Create-Vnet/index.js) file. Variables are declared and initialized with default values.

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

## Usage
- Download the JavaScript files in the folder [`Create-Vnet`](https://github.com/riyaagrahari/Pulumi-Azure/tree/master/Create-Vnet), paste and replace it in your current folder where Pulumi project is initiated.
- Deploy the Stack using following command
 ```bash
$ pulumi up
```
## License
This project is licensed under the  License - see the [`LICENSE.md`](https://github.com/riyaagrahari/IaC-Azure-using-Pulumi/blob/master/LICENSE) file for details
## Author
[`Riya Agrahari`](https://github.com/riyaagrahari/)<br />

