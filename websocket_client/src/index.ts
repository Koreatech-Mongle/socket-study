let input = document.querySelector('input[type=file]') as HTMLInputElement;
var socket = new WebSocket('ws://localhost:8080');


socket.addEventListener('open', function(event : any) {
    socket.send('Hello Server');
});

function readFile(e : any) {
    var rawData = e.target.result;
    socket.send(rawData);
}

function changeFile() {
    var file = input?.files?.[0];
    var reader = new FileReader();
    reader.addEventListener('load', readFile);
    reader.readAsArrayBuffer(file as Blob);
}

input?.addEventListener('change', changeFile);