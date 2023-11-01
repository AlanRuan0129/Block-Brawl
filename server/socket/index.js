import { Server } from "socket.io";

let io;

function initSocketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin:"*",
            methods: ["GET", "POST"]
        },
    });

    //test

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('test_message', (data) => {
            console.log('Received message:', data);
            socket.emit('response_message', 'This is a message from the server!');
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
}

function getSocketIO(){
    if(!io){
        throw new Error("SocketIO not initialized.");
    }
    return io;
}

export { initSocketServer, getSocketIO };