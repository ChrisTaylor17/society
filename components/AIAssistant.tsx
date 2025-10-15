'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch (error) {
      toast.error('Failed to get AI response')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-purple-500/50 transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="w-8 h-8 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-card p-4 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-purple-400" />
                <h3 className="font-bold">AI Explorer Guide</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-purple-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[360px] overflow-y-auto mb-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20">
                  <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Ask me anything about NFTs, tokens, or Solana!</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.role === 'user' ? 'bg-purple-600/30 ml-8' : 'bg-white/5 mr-8'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="input-field flex-1 text-sm py-2"
              />
              <button onClick={sendMessage} className="btn-primary px-4 py-2">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
