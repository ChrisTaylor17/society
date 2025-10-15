const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

let onlineUsers = 0

io.on('connection', (socket) => {
  onlineUsers++
  io.emit('userCount', onlineUsers)
  console.log(`User connected. Online users: ${onlineUsers}`)

  socket.on('sendMessage', (data) => {
    const message = {
      id: Date.now().toString(),
      user: data.user,
      text: data.text,
      timestamp: Date.now()
    }
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    onlineUsers--
    io.emit('userCount', onlineUsers)
    console.log(`User disconnected. Online users: ${onlineUsers}`)
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
