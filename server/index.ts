import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import roomRoutes from "./routes/roomRoutes";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 4001;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", roomRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("FlashFiles server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
