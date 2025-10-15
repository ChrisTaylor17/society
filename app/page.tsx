'use client'

import { motion } from 'framer-motion'
import { Compass, Coins, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'AI-Generated NFTs',
      description: 'Create unique NFTs with OpenAI image generation',
      href: '/nft-creator'
    },
    {
      icon: <Coins className="w-12 h-12" />,
      title: 'Token Creation',
      description: 'Launch custom tokens with team allocation',
      href: '/token-creator'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Connect & Chat',
      description: 'Real-time chat with fellow explorers',
      href: '/chat'
    },
    {
      icon: <Compass className="w-12 h-12" />,
      title: 'AI Assistant',
      description: 'Get guided through every blockchain interaction',
      href: '#'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="flex justify-center mb-6">
          <Compass className="w-24 h-24 text-purple-400 animate-float" />
        </div>
        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-red-500 to-slate-200 bg-clip-text text-transparent uppercase tracking-tight">
          Society of Explorers
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore the Web3 frontier. Create NFTs, launch tokens, and connect with fellow explorers on Solana.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={feature.href}>
              <div className="glass-card p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer h-full">
                <div className="text-red-500 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-black mb-3 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <Link href="/nft-creator">
          <button className="btn-primary text-lg px-12 py-4">
            Start Exploring
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
