const mqtt = require('mqtt');
const receiverHoog = mqtt.connect('mqtt://broker.hivemq.com');
const channel = 'weerstation';

// //var startTijd = Date.now();

// var hoogsteGraden = 0;
// var keren = 0;


receiverHoog.on('connect', function () {
    receiverHoog.subscribe(channel + '-max');
    console.log("Subscribed for Maximum!");
});

receiverHoog.on('message', (topic, msg) => {
;
  console.log('Max Value past 5 min: ' + msg);

});

// receiverHoog.on('message', function (topic, msg) {

//   var jsonObject = JSON.parse(msg.toString())
//   console.log("Graden: " + jsonObject.Graden);
 

//   if (jsonObject.Graden > hoogsteGraden) {
//     hoogsteGraden = jsonObject.Graden;
//     keren = 0;
//   }

//   if (jsonObject.Graden === hoogsteGraden) {
//     keren++;
//   }

//   var EindTijd = Date.now();

//   var tijd = EindTijd - startTijd;
  

//   //Pakt
//   if (tijd > 300000) { 
//     console.log("Het hoogste temperatuur van de afgelopen 5 minuten is: " + hoogsteGraden + ". Hoe vaak dat temperatuur voorkwam: " + keren);
//     startTijd = EindTijd;
//     hoogsteGraden = 0;
//     keren = 0;
//   } 
  

// });