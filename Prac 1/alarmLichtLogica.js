const mqtt = require('mqtt');
const readline = require('readline')
//var stdin = process.stdin;

readline.emitKeypressEvents(process.stdin);


//stdin.resume();
//stdin.setEncoding('utf8');



process.stdin.on('data', function (key) {

    if(key.ctrl && key.name === 'c'){
        process.exit()
    }

    else{

    const kanaal = 'alarmLogica';
    const client = mqtt.connect('mqtt://broker.hivemq.com')
    const kanaal3 = 'opdr_g';




    var waarde = {
         'state' : 'uit',
        'R': 215,
        'G': 155,
        'B': 255,
        'freq' : 6000
       //'Helderheid' : 255,
        //'tijdsduur': 5000
    }


//setInterval functie met blin(r,g,b)
//periode  = 1 / freq * 1000
    client.on('connect', () => {


        console.log('verbonden')

        var command = JSON.stringify(waarde)
        console.log(`Verstuurd deze info\t${command}`)
        client.publish(kanaal, command)
        client.end()

    });

    client.on('message', (topic, message) => {
       
      
        message = 255;
       client.publish(kanaal, message.toString())
       
    });
    
    }
}); 