const mqtt = require('mqtt');
const receiver = mqtt.connect('mqtt://broker.hivemq.com');
const channel = 'weerstation';





//Moet hetzelfde channel zijn
receiver.on('connect', function () {
    receiver.subscribe(channel);
    console.log("Subscribed!");
});


receiver.on('message', (topic, msg) => {
    console.log('Received message: ' + msg);
   
    var nogRandom = 3 *Math.random();
    receiver.publish('updated_weerstation' , nogRandom.toString());


});


