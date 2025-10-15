'use client'

import { useState, useEffect, useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion } from 'framer-motion'
import { MessageCircle, Send, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import io, { Socket } from 'socket.io-client'

interface Message {
  id: string
  user: string
  text: string
  timestamp: number
}

export default function Chat() {
  const { publicKey } = useWallet()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'
    const newSocket = io(socketUrl)

    newSocket.on('connect', () => {
      toast.success('Connected to chat')
    })

    newSocket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    newSocket.on('userCount', (count: number) => {
      setOnlineUsers(count)
    })

    newSocket.on('disconnect', () => {
      toast.error('Disconnected from chat')
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!inputMessage.trim() || !socket) return

    const username = publicKey ? publicKey.toBase58().slice(0, 8) : 'Anonymous'

    socket.emit('sendMessage', {
      user: username,
      text: inputMessage,
    })

    setInputMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-8">
          <MessageCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Explorer Chat</h1>
          <p className="text-gray-300">Connect with fellow explorers in real-time</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
            <h2 className="text-xl font-bold">General Chat</h2>
            <div className="flex items-center gap-2 text-green-400">
              <Users className="w-5 h-5" />
              <span>{onlineUsers} online</span>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto mb-4 space-y-3 pr-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-purple-400">{message.user}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-200">{message.text}</p>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="input-field flex-1"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="btn-primary px-6"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
