//
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const channel = 'weerstation';

var Start = Date.now();

var iteratie = 0;
var verstuurdeNummers;

var max_nummer = 0;

client.on('connect', function () {
    client.subscribe(channel);
    console.log("Subescribed sender:" + channel);
});

client.on('connect', function () {
    client.subscribe('updated_weerstation');
    console.log("Subescribed receiver: update_cijfers");
});


client.on('connect', function () {

    verstuurdeNummers = setInterval(interval, 1000);

})


client.on('message', function (topic, msg) {


    if (topic === "updated_weerstation") {
        clearInterval(verstuurdeNummers);
        console.log("Update interval with time: " + parseInt(msg));
        verstuurdeNummers = setInterval(interval, parseInt(msg) * 1000);
    }
});


//Voor Receiver
function makeJSONString(nummer) {
    return '{"Aantal iteraties" : ' + iteratie++ + ', "Graden" : ' + nummer + '}';
}

//Publisher
var interval = function () {

   
    var nummer = Math.floor((Math.random() * 30) + 1);

    console.log("Sending weerNummer " + iteratie + " met het willkeurig getal van: " + nummer);
    client.publish(channel, makeJSONString(nummer).toString());

    ////////////////////////////

    //Logica, in die 5 minuten kijkt de programma of
    // de max nummer HOGER is dan de huidige nummer

    //Pakt de hoogste nummer
    if (nummer > max_nummer) {
        
        max_nummer = nummer;
    }

    var Eind = Date.now();

    //Tijd
    var Verschil = Eind - Start;

    //4000 ipv 300 000
    //Pakt het hoogste waarde binnen die 5 minuten , vervolgen wordt het tijd teruggezet, vanuit een nieuwe kanaal( weerstation-max)
    if (Verschil > 4000) {
        client.publish(channel + '-max', max_nummer.toString())

        max_nummer = 0;
       Start = Eind;
      //  Verschil = 0;
    } 


};



