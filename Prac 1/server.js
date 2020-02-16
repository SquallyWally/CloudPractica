const mqtt = require('mqtt');
var stdin = process.stdin;


stdin.resume();
stdin.setEncoding('utf8');



stdin.on('data', function (key) {


    const kanaal = 'licht';
    const client = mqtt.connect('mqtt://broker.hivemq.com')

    client.on('connect', () => {

        client.subscribe(kanaal);
        console.log('Subbed sender: ' + kanaal);

    });

    client.on('message', (topic, message) => {
        message = 255;
        console.log("Client received the following message:\n" + message.toString());
    });

}); 