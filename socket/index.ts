import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import registerSocketEvents from "./events/registerSocketEvents";

const app = express();
const httpServer = createServer(app);

const isDevelopment = process.env.NODE_ENV === 'development';
const corsOptions = {
  origin: isDevelopment ? "*" : process.env.CLIENT_URL,
  methods: ["GET", "POST"],
};

const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  registerSocketEvents(socket);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


const PORT: number = parseInt(process.env.PORT || "5001", 10);
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
