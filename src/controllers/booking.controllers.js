import { Booking, Room, User } from '../models/index.js'
import { isBookingAvailable } from '../utils/validateBooking.js'

export const createBooking = async (req, res) => {
    try {
        const { roomId, date, startTime, endTime } = req.body
        const userId = req.user.id

        const room = await Room.findByPk(roomId)
        if (!room) {
            return res.status(404).json({ message: 'Room not found' })
        }

        const available = await isBookingAvailable(roomId, new Date(startTime), new Date(endTime))
        if (!available) {
            return res.status(400).json({ message: 'Room is unavailable for the selected time' })
        }

        const booking = await Booking.create({
            roomId,
            userId,
            date: new Date(date),
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        })

        res.json(booking)
    } catch (err) {
        console.log({err})
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id
        const bookings = await Booking.findAll({
            where: { userId },
            include: [{ model: Room }]
        })

        res.json(bookings)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const user = req.user
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Forbidden' })
        }

        const bookings = await Booking.findAll({
            include: [
                { model: Room },
                { model: User }
            ]
        })

        res.status(200).json(bookings)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const cancelBooking = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params

        const booking = await Booking.findByPk(id)
        if (!booking) return res.status(404).json({ message: 'Booking not found' })

        if (user.role !== 'ADMIN' && booking.userId !== user.id) {
            return res.status(403).json({ message: "You don't have access to cancel this booking" })
        }

        await booking.destroy()

        res.status(200).json({ message: 'Booking canceled' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}
