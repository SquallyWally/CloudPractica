'use strict';

const chalk = require('chalk');
var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;DeviceId=device-student-10-device-3;SharedAccessKey=pZR8PoLwAYupHTvZLSFLgez6KCc9ky10Bz63VXMo5Kk=';

// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

// Status die wordt gebruikt voor het vergelijken met het oude status
var status_new = 0

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);
var intervalLoop = 0


 function onLamp(req,res){

  function directMethodResponse(err) {
    if(err) {
      console.error(chalk.red('An error ocurred when sending a method response:\n' + err.toString()));
    } else {
        console.log(chalk.green('Response to method \'' + req.methodName + '\' sent successfully.' ));
    }
  }

  // Payload is de indicatie van het lamp status, bijv 5 betekent 'aan'
  var status = req.payload

  //Als het oude status gelijk is aan de nieuw status, dan was het lamp AL aan
  if (status == status_new) {

      console.log('Lamp 2 is AL aan ')

      //Zo niet...
  } else {

      status_new = status

      console.log('Lamp 2 is NU aan')
  }

    //reset interval timer
 clearInterval(intervalLoop)
 intervalLoop = setInterval(sendMessage, req.payload * 1000)
 
  res.send(200, status_new, directMethodResponse)

}



// Create a message and send it to the IoT hub every second
function sendMessage(){


  // Simulate telemetry.
  var light_value_1 = 'aan'
  
  
    var message = new Message(JSON.stringify({
        light: light_value_1
      }));

  
  message.properties.add('iotLamp'); 

  console.log('Sending message: ' + message.getData());

  // Send the message.
  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
   
    }
  });
}

// Set up the handler for the SetTelemetryInterval direct method call.
client.onDeviceMethod('SetTurnOn', onLamp);
