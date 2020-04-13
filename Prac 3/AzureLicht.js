const Mqtt = require('azure-iot-device-mqtt').Mqtt;
const DeviceClient = require('azure-iot-device').Client
const Message = require('azure-iot-device').Message;

var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;DeviceId=device-student-10-device-2;SharedAccessKey=pygE4L0+9paE0WjIJbcaZbEEm/b8frz7zLY2CFhEOSg=';

const client = DeviceClient.fromConnectionString(connectionString,Mqtt)



function lichtAan(req,res){
    res.send(200, 'Licht is aan')

    client.sendEvent( { isAan : true} , (err) =>{
        if(err){
            console.log('Licht ging niet aan')
        }else{
            console.log('LIGHTS GO ON')
           
        }
    })

}

function lichtUit(req,res){
    res.send(200, 'Licht is nu uit')

    client.sendEvent( { isAan : false} , (err) =>{
        if(err){
            console.log('Huh?')
        }else{
            console.log('Ja die staan uit')
        }
    })

}

client.onDeviceMethod('LichtAanZetter', lichtAan)
client.onDeviceMethod('LichtGaatUit', lichtUit)