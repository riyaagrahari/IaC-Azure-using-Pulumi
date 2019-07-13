# Create Resource Group in Azure using Pulumi-js
<p align="center">
<img src="./Diagrams/rg.png" height="200" width="400">
<br />
</p>
 
This script creates a Resource Group at a specified region.

For default values , you may refer to [`index.js`](https://github.com/riyaagrahari/IaC-Azure-using-Pulumi/blob/master/Create-RG/index.js) file. Values are passed as parameter in the function. Change it there as desired.

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
After creating a new project and stack in Pulumi using ```pulumi new azure-javascript```<br />

- Download the JavaScript files of the folder [`Create-RG`](https://github.com/riyaagrahari/Pulumi-Azure/tree/master/Create-RG), paste and replace it in your current folder where Pulumi project is initiated.
- Deploy the Stack using following command
 ```bash
$ pulumi up
```
- [`create-rg.js`](https://github.com/riyaagrahari/IaC-Azure-using-Pulumi/blob/master/Create-RG/create-rg.js) contains the logic for creation of a Resource Group in particular location
- [`index.js`](https://github.com/riyaagrahari/IaC-Azure-using-Pulumi/blob/master/Create-RG/index.js) creates the object of Resource Group and calls [`create-rg`] using it.
## License
This project is licensed under the  License - see the [`LICENSE.md`](https://github.com/riyaagrahari/ARM-Templates/blob/master/LICENSE) file for details
## Author
[`Riya Agrahari`](https://github.com/riyaagrahari/)<br />

