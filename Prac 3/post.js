const http = require('http');

var options = {
    host: 'localhost',
    port: 8080,
    path: '',
    method: ''
  
}

var data = JSON.stringify({
    "id":"6"
    ,"naam":"Lamp6",
    "kamer": "6" ,
    "helderheid":"8"
    
});

options.path = '/lichten';
options.method = 'POST';


var req = http.request(options, (res) => {
    var data = '';

    res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(data);
      });
});
req.write(data);
req.end();