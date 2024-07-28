import { createServer } from "http";
import { Server } from "socket.io";

let io: Server;

if(!io) {
    io = new Server({
      cors: {
        origin: "http://localhost:3000",
      }
    });

    io.on("connection", (socket) => {
      console.log('Websocket server listening on port 8080')
      socket.on("disconnect", () => {
        console.log("Client disconnected!");
        io.close();
        io = undefined;
      })
    })
    
    io.listen(8080);
}

export default io;