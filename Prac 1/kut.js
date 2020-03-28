var iothub = require('azure-iothub');
 
var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;SharedAccessKeyName=registryRead;SharedAccessKey=5ZAToEG8l1TbGE405/fuZUzSnX70g6qYa0V3QIwHyOU=';
 
var registry = iothub.Registry.fromConnectionString(connectionString);


var device = 'device-student9-device-1'
  registry.create('device', function(err, deviceInfo, res) {
   if (err) console.log(' error: ' + err.toString());
   if (res) console.log(' status: ' + res.statusCode + ' ' + res.statusMessage);
   if (deviceInfo) console.log(' device info: ' + JSON.stringify(deviceInfo));
  });