const http = require('http');

var options = {
    host: 'localhost',
    port: 8080,
    path: '',
    method: ''
  
}

var data = JSON.stringify({

    
});

options.path = '/lichten';
options.method = 'GET';

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