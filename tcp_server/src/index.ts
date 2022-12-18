const net = require('net');
const fs = require('fs');

net.bytesWritten = 300000;
net.bufferSize = 300000;
const server = net.createServer()
server.on('connection', function(client : any) {
    console.log('client connected');
    client.on('drain', () => {
        console.log('client occured drain -> write buffer is empty');
    });
    client.setTimeout(500);
    client.on('end', () => {
        console.log('client disconnected');
    });

    fs.readFile('test.png', (err: any, data: any) => {
        if (!err) {
            console.log(data.length);
            client.write(data);
        } else {
            console.log('readfile daemon0 err');
        }
    });
    client.pipe(client);
});
server.on('error', (err : any) => {
    throw err;
});

server.listen(8107, 'localhost', () => {
    console.log('server bound');
})

