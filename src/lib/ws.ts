import { Server } from "socket.io";

const globalForSockets = global as unknown as { io: Server | undefined };

let io: Server | undefined = globalForSockets.io;

if(!io) {
    io = new Server({
      cors: {
        origin: process.env.NEXT_HOST,
      }
    });

    io.on("connection", (socket) => {
      console.log(`Websocket server listening on port ${process.env.WS_PORT}.`)
      socket.on("disconnect", () => {
        console.log("Client disconnected!");
      })
    })
    
    io.listen(Number(process.env.WS_PORT));
    globalForSockets.io = io;
}

export default io;