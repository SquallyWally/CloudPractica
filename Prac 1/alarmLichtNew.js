const chalk = require('chalk');

const mqtt = require('mqtt');
const kanaal = 'alarmSensor';
const kanaal2 = 'alarmmanage';
const kanaal3 = 'alarmLogica';
var dev1Mov, dev2Mov;
var moment = require('moment');
const client = mqtt.connect('mqtt://broker.hivemq.com');
var interval , i = 0;

/*function print() {
    
    if (lights_on.R ==0 && lights_on.G ==0 && lights_on.B ==0) {
        console.log(chalk.rgb(0, 0, 0).underline('Alarm is uit'));
    }
    else {
        console.log(chalk.rgb(lights_on.R, lights_on.G, lights_on.B).underline('Alarm is aan'));
    }
}
*/
    var lights_on = {
        'state' : 'aan',
        'R': 255,
        'G': 255,
        'B': 255,
        'freq': 2000
       // 'tijdsduur': 5000
    }

    var light_off = {
        'state' : 'uit',
        'R': 1,
        'G': 1,
        'B': 1,
        'freq': 2000
}

    
  

function blink(){
    console.log(chalk.rgb(lights_on.R, lights_on.G, lights_on.B).underline('knipper'));

}
//setInterval functie met blin(r,g,b)
//periode  = 1 / freq * 1000

client.on('connect', () =>{
    console.log('verbonden');
    client.subscribe(kanaal);
    client.subscribe(kanaal2);
    client.subscribe(kanaal3);
})

//skip = 1/frequentie
client.on('message', (topic,message) =>{
    var skip = 1/lights_on.freq;
    if(topic === kanaal ){
        console.log('1ste Sensor is gevonden')
        dev1Mov = moment();
    } if(topic === kanaal3){

      console.log('2de Sensor is gevonden')
      dev2Mov = moment();
        

        //laat als status zien dat het alarm aan is
        if (dev1Mov != null && moment.duration(dev2Mov.diff(dev1Mov)).seconds() <= 5) {
            blink()
    
            //in deze logica het zorgt ervoor dat de alarm blijft knipperen
            function makker(){
                if(lights_on.state == 'aan')
                {
                const lamp = lights_on
                lights_on = light_off
                blink();
                lights_on = lamp
                }
              
                //reset de interal
                else clearInterval(interval);
                      console.log('----');
            }
            interval = setInterval(makker, lights_on.freq)
        }
        
    }else if(topic === kanaal2 ){
        console.log(`Status is: ${JSON.stringify(lights_on)}`)
        lights_on = JSON.parse(message)

    }

  
})