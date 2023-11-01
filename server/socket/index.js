import { Server } from "socket.io";

let io;

function initSocketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin:"*",
            methods: ["GET", "POST"]
        },
    });

}

function getSocketIO(){
    if(!io){
        throw new Error("SocketIO not initialized.");
    }
    return io;
}

export { initSocketServer, getSocketIO };