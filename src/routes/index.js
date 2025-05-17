import { Router } from "express";
import authRouter from "./auth.js";
import bookingRouter from "./booking.js";
import roomRouter from "./room.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/booking", bookingRouter)
router.use("/room", roomRouter)

export default router;