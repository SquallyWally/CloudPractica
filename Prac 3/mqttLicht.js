const chalk = require('chalk');

const mqtt = require('mqtt');
const kanaal = 'licht';

const client = mqtt.connect('mqtt://broker.hivemq.com');

  var lights_on = {
        'Helderheid': 255,
       
        
    }


client.on('connect', () =>{

	client.subscribe(kanaal);
    console.log('verbonden');
    

})

client.on('message', (topic,message) =>{
    if(topic === kanaal){
        console.log(`Status is: ${JSON.stringify(lights_on)}`)
        lights_on = JSON.parse(message)

    }
})