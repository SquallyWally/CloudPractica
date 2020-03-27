'use strict';

// az iot hub show-connection-string --hub-name {YourIoTHubName} --output table
const chalk = require('chalk');
var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=wExt9HorN4rxhmpSEUuV4eY0oLwSfKnKFcn7hLHCZaw=';

// The sample connects to service-side endpoint to call direct methods on devices.
var Client = require('azure-iothub').Client;

var lamp = 'device-student-10-device-2';
var lamp2 = 'device-student-10-device-3';
var lamp3 = 'device-student-10-device-4';
// Connect to the service-side endpoint on your IoT hub.
var client = Client.fromConnectionString(connectionString);

var methodParams = {
  methodName: 'SetTurnOn',

  payload: 5, // Number of seconds.
  responseTimeoutInSeconds: 30
};



//Aansturen voor IotLamp
// Call the direct method on your device using the defined parameters.
client.invokeDeviceMethod(lamp, methodParams, function (err, result) {

    //Kijkt al lamp 1 uit is
  if (err) {
    console.log(chalk.green('Status van lamp 1 is U I T '))
  } else {
    console.log('Response from ' + methodParams.methodName + ' on ' + lamp + ':');
    
    //hij gaat aan want hij is een 'bewegingssensor'
    console.log(chalk.green('Status van lamp 1 is ' + methodParams.payload))
  
  }
});

client.invokeDeviceMethod(lamp2, methodParams, function (err, result) {

     //Kijkt al lamp 2 uit is
    if (err) {
        console.log(chalk.green('Status van lamp 2 is U I T '))
      } else {
        console.log('Response from ' + methodParams.methodName + ' on ' + lamp2 + ':');
        
        //hij gaat aan want hij is een 'bewegingssensor'
        console.log(chalk.green('Status van lamp 2 is ' + methodParams.payload))
      
      }
    });

  client.invokeDeviceMethod(lamp3, methodParams, function (err, result) {
       //Kijkt al lamp 3 uit is
    if (err) {
        console.log(chalk.green('Status van lamp 3 is U I T '))
      } else {
        console.log('Response from ' + methodParams.methodName + ' on ' + lamp3 + ':');
        
        //hij gaat aan want hij is een 'bewegingssensor'
        console.log(chalk.green('Status van lamp 3 is ' + methodParams.payload))
      
      }
    });