const http = require("http");
const mqtt = require('mqtt');
const kanaal = 'manage';
const client = mqtt.connect('mqtt://broker.hivemq.com');

var forum = `
<html>
    <head>
        <title>A L A F I M A L A F A M.</title>
    </head>
    <body>
    <form action="/" method="post">
        <label for="interval">Kies een interval: </label>
             <input id="interval" type="text" name="interval" value="5000">
        <label for="helderheid">Helderheid= </label>
        <input id="helderheid" type="text" name="helderheid" value="255">
      
        <input type="submit" value="OK">
    </form>
    </body>
</html>`

http.createServer((request, response) => {

    //kijkt of er een GET methode is
    if (request.method == 'GET') {

        //verwerkt het form
        response.writeHead(200, { "Content-type": "text/html" })
        response.end(forum);

        //als het een post is, dan wordt de aangepaste data versuurd
    } else if (request.method == 'POST') {

        request.on('data', (data) => {


            //hier worden de aangegeven data gesplitst 
            var element = ''
            element += data
            element = element.split('&')

            //Een araay 

            const elementen = []
            element.forEach((item) => {
                var i = item.split('=')
                elementen.push(i[1])
            })


            //Hier worden de waardes vvan Helderheid en Interval gedefinieerd als JSON op de web browser


            var waarde = {

                'Helderheid': elementen[1],
                'tijdsduur': elementen[0]
            }



            //waardes worden gestringfied en klaar om gepublished te worden 

            var command = JSON.stringify(waarde)
            console.log(`Verstuurd deze info\t${command}`)
            client.publish(kanaal, command)

          


        })

        request.on('end', () => {
            
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('bai den conjo')
        })
    }
}).listen(8080);