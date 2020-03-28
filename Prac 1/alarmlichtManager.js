const chalk = require('chalk');

const mqtt = require('mqtt');
const kanaal = 'alarmmanage';
const client = mqtt.connect('mqtt://broker.hivemq.com');

//heb nodig voor het intoetsen
var stdin = process.stdin

argv = process.argv.slice(2);

//Zelf je waarde aanpassen
var waarde = {
    'state' : 'aan',
    'R': 111,
    'B': 122,
    'G': 134,

    'freq': 2000
    // 'tijdsduur': 5000
}

//verstuurd telemetrie naar de lampen
client.on('connect', function () {
    console.log('verbonden')

    var command = JSON.stringify(waarde)
    console.log(`Verstuurd deze info\t${command}`)
    client.publish(kanaal, command)
    client.end()
})