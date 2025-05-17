import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { createRoom, deleteRoom, getAllRoom, updateRoom } from "../controllers/room.controller.js";


const roomRouter = express.Router();

roomRouter.post("/", authenticate, createRoom);
roomRouter.get("/", getAllRoom);
roomRouter.patch("/:id", authenticate, updateRoom);
roomRouter.delete("/:id", authenticate, deleteRoom);

export default roomRouter;
