import { Socket } from "socket.io";

export default function registerSocketEvents(socket: Socket) {
  socket.on("send_message", (data) => {
    console.log(`Message received from ${socket.id}:`, data);
    socket.broadcast.emit("receive_message", data);
  });
}
