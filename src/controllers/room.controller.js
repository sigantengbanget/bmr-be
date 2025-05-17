import { Room } from "../models/index.js"


export const createRoom = async (req, res) => {
  try {
    const user = req.user
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ msg: 'Only admin can create room' })
    }

    const { name, capacity } = req.body
    const room = await Room.create({ name, capacity })
    res.status(201).json({ msg: 'Success create room', data: room })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getAllRoom = async (req, res) => {
  try {
    const rooms = await Room.findAll()
    res.status(200).json({ msg: 'Success get all room', data: rooms })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const updateRoom = async (req, res) => {
  try {
    const user = req.user
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ msg: 'Only admin can update room' })
    }

    const { id } = req.params
    const { name, capacity } = req.body

    const room = await Room.findByPk(id)
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' })
    }

    room.name = name
    room.capacity = capacity
    await room.save()

    res.status(200).json({ msg: 'Success update room', data: room })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const deleteRoom = async (req, res) => {
  try {
    const user = req.user
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ msg: 'Only admin can delete room' })
    }

    const { id } = req.params

    const room = await Room.findByPk(id)
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' })
    }

    await room.destroy()
    res.status(200).json({ msg: 'Success delete room', data: room })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ msg: 'Internal server error' })
  }
}
