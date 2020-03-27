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
  if (err) {
    console.error('Failed to invoke method \'' + methodParams.methodName + '\': ' + err.message);
  } else {
    console.log('Response from ' + methodParams.methodName + ' on ' + lamp + ':');
    
    //Als het lamp script al werd uitgevoerd
    console.log(chalk.green('LAMP 1 IS AAN'))
  
  }
});

//Stuurt lamp 2 aan
client.invokeDeviceMethod(lamp2, methodParams, function (err, result) {
    if (err) {
      console.error('Failed to invoke method \'' + methodParams.methodName + '\': ' + err.message);
    } else {
      console.log('Response from ' + methodParams.methodName + ' on ' + lamp2 + ':');
      
     //Als het lamp script al werd uitgevoerd
      console.log(chalk.green('LAMP 2 IS AAN'))
    
    }
  });

  //Stuurt lamp 3 aan
  client.invokeDeviceMethod(lamp3, methodParams, function (err, result) {
    if (err) {
      console.error('Failed to invoke method \'' + methodParams.methodName + '\': ' + err.message);
    } else {
      console.log('Response from ' + methodParams.methodName + ' on ' + lamp3 + ':');
      
      //Als het lamp script al werd uitgevoerd
      console.log(chalk.green('LAMP 3 IS AAN'))
    
    }
  });
  