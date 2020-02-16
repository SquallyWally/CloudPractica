const mqtt = require('mqtt');
const kanaal = 'licht';
const client = mqtt.connect('mqtt://broker.hivemq.com');

var interval = 2000;

function publishMessage(kanaal , msg){
    console.log('Pub msg to kanaal: ' + kanaal);
    publisher.publish(kanaal, mgs);
}

publisher.on('connect' , () =>{
    publisher.subscribe(kanaal + '-interval');
});