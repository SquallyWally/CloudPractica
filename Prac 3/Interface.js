const http = require('http')
const url = require('url')
const Client = require('azure-iothub').Client

const mqtt = require('mqtt');

//client
const mqtt_client = mqtt.connect('mqtt://broker.hivemq.com');
mqtt_client.on('connect', () => {
    console.log('verbonden')
});



const PORT = 8080
var connectionString = 'HostName=gmdelftiotpracticum2020.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=wExt9HorN4rxhmpSEUuV4eY0oLwSfKnKFcn7hLHCZaw=';
const azureIotServer = Client.fromConnectionString(connectionString)


var lamp = 'device-student-10-device-2';

//topic
var m_lamp = 'licht';

var dataset = [
    {
        id: '1',
        naam: "Lamp0",
        kamer: ' 1',
        helderheid: "5"
    }, {
        id: '2',
        naam: "Lamp1",
        kamer: ' 3',
        helderheid: "3"

    }, {
        id: '3',
        naam: "Lamp2",
        kamer: ' 4',
        helderheid: "17"
        
    }
];


//Waarde voor MQtt
var waarde = {
   
    'Helderheid' : 255,
     
 }

 var waardeUit = {
     'Helderheid' : 0,
     
 }


var licht = false

server = http.createServer();



server.on('request', function(req, res) {

    var route = url.parse(req.url, true);
    console.log(route, req.method);
  
    //Om alles op te halen
    if (req.method === 'GET' &&
         route.pathname === '/lichten') {
        listAll(res);
    }

    //Om maar 1 op te halen
    if (req.method === 'GET' &&
    route.pathname.startsWith('/lichten')) {

        //Maakt gebruik van split zodat ik geen ?id=  hoeft te gebruiken, dus REST comfort
    let split = route.path.split('/');
    listDevPerID(res, split[split.length-1]);
}



    //om eentje toe te voegen
    else if (req.method === 'POST' &&
        route.pathname.startsWith('/lichten')) {
        
        

            // Die pakt dan het gemaakte JSON body en die wordt dan verstuurd met een POST request
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            addDevice(res,JSON.parse(body));
        });
    }


    //Om eentje te gaan aanpassen
    else if (req.method === 'PUT' &&
    route.pathname.startsWith('/lichten')) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            editDevice(res,JSON.parse(body));
        });
    }


    //Om eentje te gaan verwijderen
    else if (req.method === 'DELETE' && 
             route.pathname.startsWith('/lichten')) {
                let split = route.path.split('/');
              deleteDevice(res, split[split.length-1]);
    }



    //Om Azure en Mqtt lamp aan en uit te doen
    else if (req.method === 'GET' && 
            route.pathname === '/licht') {
        AzureLicht(res);
        MqttLicht(res);
    }

 
});

//Haalt alles op vanuit het dataset
function listAll(res) {
    res.end(JSON.stringify(dataset));
}


//haalt een device op per ID 
function listDevPerID(res, id) {

    dataset.some((device) => {
        if (device.id == id) {
            return res.end(JSON.stringify(device));
        }
        
    });
}

//Wordt gebruikt om te kijken of er identieke lampen zijn of niet
function resolveNesting(res, devices, id, returnBool=false) {
    return devices.some((device) => {
        if (device.id == id) {
            return returnBool ? true : res.end(JSON.stringify(device));
        }
      
    });
}

function addDevice(res, body) {
    if (resolveNesting(res, dataset, body.id, true)) {
        return res.end('Device with id already exists');
    }
    else {
        dataset.push(body);
        res.end('Added a LIGHT!');
        console.log(dataset);
    }
}


//past een device aan aan de hand van het id, dus "edit?id=(insert id)""

function editDevice(res, body) {

    dataset.forEach((device) => {


        //Als het ID's met elkaar overeenkomen
        if (device.id == body.id) {


            for (const b in body) {

                device[b] = body[b];
            }

            res.end('Device updated');
        }
       
    });
    console.log(dataset);
}

//verwijdert een device aan aan de hand van het id, dus "edit?id=(insert id)""
function deleteDevice(res, id) {
    dataset = dataset.filter((device) => {
      
        while(true) {
            if (device.id == id) {
                res.end('Device deleted!');
                return false;
            }

            return true;
        }
       
    });
    console.log(dataset);
}

//Een direct method waardoor ik het IoT lamp aan en uit kan zetten

function AzureLicht(res) {
    azureIotServer.invokeDeviceMethod(lamp, {methodName: (licht ? 'LichtGaatUit' : 'LichtAanZetter')}, (err, result) => {
        if (err) {
            console.log('Failed to execute method: ' + err.message);
        } else {
            console.log('Response: ' + JSON.stringify(result));
            res.end(result.payload);
            licht = !licht;
        }
    });
}


//Mqtt lamp
function MqttLicht(res){
    var command = JSON.stringify(waarde)
    console.log(`Verstuurd deze info\t${command}`)
    mqtt_client.publish(m_lamp, command)
    res.end()

    var command = JSON.stringify(waardeUit)
    console.log(`Verstuurd deze info\t${command}`)
    mqtt_client.publish(m_lamp, command)
    res.end()
}


server.listen(PORT, () => {
    console.log(`Node server created on port ${PORT}`);
});
