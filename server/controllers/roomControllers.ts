import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const createRoom = (req: Request, res: Response) => {
  const roomId = uuidv4();
  const roomLink = `https://localhost:3000/DummyRoom?roomId=${roomId}`;

  res.status(200).json({ roomLink });
};
