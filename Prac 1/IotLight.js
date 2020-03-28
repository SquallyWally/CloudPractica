const chalk = require('chalk');

const mqtt = require('mqtt');
const kanaal = 'licht';
const kanaal2 = 'manage';
const client = mqtt.connect('mqtt://broker.hivemq.com');

function print() {
    //console.clear();
    if (lights_on.Helderheid == 0) {
        console.log(chalk.rgb(0, 0, 0).underline('Light is switched off'));
    }
    else {
		console.log(chalk.rgb(0, 0, 0).underline('This is a simulated dimmable bulb'));
		console.log('lichtsterkte is: '  + lights_on.Helderheid)
    }}

    var lights_on = {
        'Helderheid': 255,
       
        'tijdsduur': 5000
    }
    
    var light_off = {
        'Helderheid': 0,
		
       
        'tijdsduur': 5000
}


client.on('connect', () =>{
    console.log('verbonden');
    client.subscribe(kanaal);
    client.subscribe(kanaal2);
})

client.on('message', (topic,message) =>{
    if(topic === kanaal){
        print()
        setTimeout(()=>{
            const lamp = lights_on
            lights_on = light_off
            print();
            lights_on = lamp


        }, lights_on.tijdsduur);
    }else if(topic === kanaal2){
        console.log(`Status is: ${JSON.stringify(lights_on)}`)
        lights_on = JSON.parse(message)

    }
})