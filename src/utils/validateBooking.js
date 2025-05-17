import { Booking } from '../models/index.js'

export const isBookingAvailable = async (roomId, startTime, endTime) => {
  const conflict = await Booking.findOne({
    where: {
      roomId,
      startTime,
      endTime
    }
  })
  return !conflict
}
