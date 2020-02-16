//sample van github: https://github.com/Azure/azure-iot-sdk-node/tree/master/service
var iothub = require('azure-iothub');
 
var connectionString = 'HostName=gmdelftiotpracticum.azure-devices.net;SharedAccessKeyName=registryRead;SharedAccessKey=EWr6RUR8ktZxRxKlZTWR+r7aVOz9IBmKTC22vVHU6uI=';
 
var registry = iothub.Registry.fromConnectionString(connectionString);
 

 
registry.get('device-studentB-9-device-1', function(err, deviceInfo, res) {
    if (err) console.log(' error: ' + err.toString());
    if (res) console.log(' status: ' + res.statusCode + ' ' + res.statusMessage);
    if (deviceInfo) console.log(' device info: ' + JSON.stringify(deviceInfo));
});
