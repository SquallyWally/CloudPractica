
'use strict';

var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;DeviceId=device-student-10-device-2;SharedAccessKey=pygE4L0+9paE0WjIJbcaZbEEm/b8frz7zLY2CFhEOSg=';

// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

// Create a message and send it to the IoT hub every second
setInterval(function(){
  // Simulate telemetry.
  var light_value_1 = 'aan'
  var light_value_2 = 'uit'

  //status van een willekeurige nummer tussen 1 en 2
  var status = Math.floor((Math.random() * 2) + 1);

  //als het status groter is dan 1, dan gaat het licht aan
  if(status > 1){
    var message = new Message(JSON.stringify({
        light: light_value_1
      }));

      //status wordt opnieuw ingesteld
      status = 0;

      //zo niet, dan gaat het licht uit
  }else{
    var message = new Message(JSON.stringify({
        light: light_value_2
      }));
      status = 0
  }


  console.log('Sending message: ' + message.getData());

  // Send the message.
  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
   
    }
  });
}, 1000);