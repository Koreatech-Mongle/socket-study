"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
let socketCnt = 0;
let socketMap = new Map();
const server = net_1.default.createServer((socket) => {
    const socketNo = socketCnt;
    socketMap.set(socketCnt++, socket);
    console.info(`socket(${socketNo}) connected`);
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        console.info(`socket(${socketNo}): ${data.toString('utf8')}`);
    });
    socket.on('error', (err) => {
        console.error(`socket(${socketNo}) Error: ${err.message}`);
    });
    socket.on('close', (hadError) => {
        socketMap.delete(socketNo);
        if (hadError) {
            console.error(`socket(${socketNo}) had an error. close socket`);
            return;
        }
        console.info(`socket(${socketNo}) closed`);
    });
});
server.on('error', (err) => {
    console.error(`server error: ${err.message}`);
});
server.on('close', () => {
    console.info(`server closed`);
    socketMap.clear();
});
server.listen(3000, () => {
    const serverInfo = server.address();
    console.dir(serverInfo);
    console.log(`listen server`);
    setInterval(() => {
        console.log('send packet to clients');
        for (const socket of socketMap.values()) {
            socket.write('Hello World');
        }
    }, 3000);
});
