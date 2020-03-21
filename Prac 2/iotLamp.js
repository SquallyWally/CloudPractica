// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';




'use strict';


var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;DeviceId=device-student-10-device-1;SharedAccessKey=d7K9jUJOg8s8jmyBVoS2uHi0JJJu3ZCNijq/suHWlX8=';

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
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
  var status = Math.floor((Math.random() * 10) + 1);

  if(status > 5){
    var message = new Message(JSON.stringify({
        light: light_value_1
      }));

      status = 0;

  }else{
    var message = new Message(JSON.stringify({
        light: light_value_2
      }));
      status = 0
  }
  

 //message.properties.add('light_status', light_value ? 'true' : 'false');

  console.log('Sending message: ' + message.getData());

  // Send the message.
  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
   //   console.log('message sent');
    }
  });
}, 1000);
