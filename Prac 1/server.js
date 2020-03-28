const mqtt = require('mqtt');
const readline = require('readline')
//var stdin = process.stdin;

readline.emitKeypressEvents(process.stdin);

process.stdin.on('data', function (key) {

    if(key.ctrl && key.name === 'c'){
        process.exit()
    }

    else{

    const kanaal = 'licht';
    const client = mqtt.connect('mqtt://broker.hivemq.com')
    const kanaal3 = 'opdr_g';




    var waarde = {
   
       'Helderheid' : 255,
        'tijdsduur': 5000
    }

    var waardeUit = {
        'Helderheid' : 0,
        'tijdsduur': 5000
    }



    client.on('connect', () => {


        console.log('verbonden EN beweging geconstateerd')

        var command = JSON.stringify(waarde)
      //  var commando = JSON.stringify(waardeUit)
        console.log(`Verstuurd deze info\t${command}`)
        client.publish(kanaal, command)
      //  client.publish(kanaal, commando)
        client.end()

    });

    client.on('message', (topic, message) => {
       
      
        message = 255;
       client.publish(kanaal, message.toString())
       
    });
    
    }
}); 