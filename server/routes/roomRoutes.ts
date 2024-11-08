import { Router } from "express";
import { createRoom } from "../controllers/roomControllers";

const router = Router();

router.post("/createRoom", createRoom);

export default router;
