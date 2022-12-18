const Websocket = require('ws');
const fs  = require('fs');

const wss = new Websocket.Server({port : 8080});

wss.on('connection', function connection(ws : any) {
    ws.on('message', function incoming(message : any) {
        let data = new Buffer(message);
        fs.writeFile('new.png', data, 'binary', function (err : any) {
            if(err) {
                console.log('error');
            }
            else {
                console.log('done');
            }
        });
    });
    ws.send('something');
})