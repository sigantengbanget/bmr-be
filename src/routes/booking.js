import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { cancelBooking, createBooking, getAllBookings, getUserBookings } from "../controllers/booking.controllers.js";


const bookingRouter = express.Router();

bookingRouter.post("/", authenticate, createBooking);
bookingRouter.get("/my", authenticate, getUserBookings);
bookingRouter.get("/all", authenticate, getAllBookings);
bookingRouter.delete("/:id", authenticate, cancelBooking);

export default bookingRouter;
