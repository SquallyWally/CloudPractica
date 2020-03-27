'use strict';

//Connection string  met de primary key van device student 10
var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;DeviceId=device-student-10-device-1;SharedAccessKey=d7K9jUJOg8s8jmyBVoS2uHi0JJJu3ZCNijq/suHWlX8=';

// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

// Create a message and send it to the IoT hub every second
setInterval(function(){
  
  // Simulate telemetry.
  var movement_value = Math.random() >= 0.8;
  var message = new Message(JSON.stringify({
    beweging: movement_value
  }));

  console.log('Sending message: ' + message.getData());

  // Send the message.
  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
   
    }
  });
}, 1000);