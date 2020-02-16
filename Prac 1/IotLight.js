const chalk = require('chalk');

const mqtt = require('mqtt');
const kanaal = 'licht';
const client = mqtt.connect('mqtt://broker.hivemq.com');

var stdin = process.stdin;
stdin.resume();
stdin.setEncoding('utf8');



stdin.on('data', function (key) {

	//verbind met het client
	client.on('connect', () => {
		client.subscribe(kanaal);
	});


	//var helderheid =process.env['Helderheid'];
	var helderheid = 255;
	console.log(chalk.rgb(helderheid, helderheid, helderheid).underline('This is a simulated dimmable bulb'));

	helderheid = 0;
	print();

	helderheid = Math.floor((Math.random() * 255) + 1);
	setInterval(print, 1000);

	function print() {
		//console.clear();
		if (helderheid == 0) {
			console.log(chalk.rgb(0, 0, 0).underline('Light is switched off'));
		}
		else {
			console.log(chalk.rgb(helderheid, helderheid, helderheid)(helderheid));
		}
	}



	//Iot Lamp gaat uit na 5 sec
	function uit(arg){
		process.exit();
	}

	setTimeout(uit, 5000, 'uit');
})


//TODO, telkens de helderheid resetten