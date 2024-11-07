import { Socket } from "socket.io";

interface MessageData {
  user: string;
  message: string;
}

export default function registerSocketEvents(socket: Socket) {
  socket.on("send_message", (data: MessageData) => {
    console.log(`Message received from ${socket.id}:`, data);
    socket.broadcast.emit("receive_message", data);
  });
}
