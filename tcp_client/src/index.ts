const net = require('net');

net.bufferSize = 300000;
net.byteRead = 300000;
const client = new net.Socket();
client.connect({port: 8107, host:'localhost'}, function() {
    console.log(' Connected: ' + 8107 + ':' + 'localhost');
    client.setTimeout(500);
    client.write('world!\r\n');
    client.on('drain', () =>  {
        console.log('clinet occured drain >> write buffer is empty');
    })
    client.on('data',(data : any) => {
        console.log(net.bufferSize, data.length);
        client.end();
    });
    client.on('end', () => {
        console.log(' Client disconnected');
    });
    client.on('error', (err : any) => {
        console.log('Socket Error: ');
    });
    client.on('timeout', () => {
        console.log('Socket Timed Out');
    });
    client.on('close', () => {
        console.log('Socket Closed');
    });

});