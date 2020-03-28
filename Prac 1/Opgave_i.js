const chalk = require('chalk');
const http = require("http");
const mqtt = require('mqtt');
const kanaal = 'PracticumIotDelft/klimaatsensors';
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', function () {
    console.log('CONNECTED ALA FIM ALA FAM')
    client.subscribe(kanaal)
});

var sensors = {
   // quality: quality,
   // temperature: [28.300093437295715],
   //humidity: [75.62730724902968]
};


const handleMqttMsg = (msg) => {
    const data = JSON.parse(msg);
};


//weer een form
var forum = `
<html>
    <head>
        <title>A L A F I M A L A F A M.</title>
    </head>
    <body>
    <form action="/" method="post">
        <label for="room">Kies een kamer: </label>
        <input id="room" type="text" name="room" value="Lab_NSE_D2.00"><br>
        <input type="submit" value="OK">
    </form>
    
    </body>
</html>`;



//maakt een server verbinging 

http.createServer((request, response) =>{
   
    if (request.method == 'GET') {

        response.writeHead(200, { "Content-type": "text/html" });

        response.end(forum);

    //als er een POST is dan wordt al het data vanuit het forum verwerkt
    } else if (request.method == 'POST') {

        request.on('data',  (data) =>{
            var post = '';
            post += data;

            //Hier word de kamer nummer gedeclareerd
            var roomNumber = post.split('=')[1];

            //Zorgt voor onderscheid tussen de kamers
            if(sensors[roomNumber] == 'undefined')
            sensors[roomNumber] =  request.data;

            response.writeHead(200, { 'Content-Type': 'text/html' });

            
            response.end(`
            <html>
    <head>
        <title>A L A F I M A L A F A M.</title>
    </head>
    <body>
    <form action="/" method="post">
        <label for="room">Kies een kamer: </label>
        <input id="room" type="text" name="room" value="Lab_NSE_D2.00"><br>
        <input type="submit" value="OK">
    </form>
    <pre>${JSON.stringify(sensors[roomNumber],null, 2)}</pre>
    </body>
</html>`);
        });

    }
}).listen(9090);

client.on('message',(topic, msg)=> {
    var parsed = JSON.parse(msg);

    //parsed de declaraties
    var temperature = parsed.data.temperature;
    var humidity = parsed.data.humidity;
    

    //parsed dan sensor data, als die undifined is dan krij 
    if (typeof sensors[parsed.room] == 'undefined') {
        sensors[parsed.room] = {

           
            temperature: [temperature],
            humidity: [humidity]
        }
    } else {


        //hier worden de waardes opgeslagen
        sensors[parsed.room].temperature.push(temperature);
        sensors[parsed.room].humidity.push(humidity);
    }

    console.log('dit zijn de gegevens');
     console.log(sensors);
});