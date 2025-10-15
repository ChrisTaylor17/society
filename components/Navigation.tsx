'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="glass-card m-4 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold">Society of Explorers</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/nft-creator" className="hover:text-purple-400 transition">
            NFT Creator
          </Link>
          <Link href="/token-creator" className="hover:text-purple-400 transition">
            Token Creator
          </Link>
          <Link href="/chat" className="hover:text-purple-400 transition">
            Chat
          </Link>
          <WalletMultiButton />
        </div>
      </div>
    </nav>
  )
}
