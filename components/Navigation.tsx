'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="glass-card m-4 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="w-8 h-8 text-red-500" />
          <span className="text-xl font-black uppercase tracking-wider">Society of Explorers</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/nft-creator" className="hover:text-red-500 transition font-bold uppercase tracking-wide">
            NFT Creator
          </Link>
          <Link href="/token-creator" className="hover:text-red-500 transition font-bold uppercase tracking-wide">
            Token Creator
          </Link>
          <Link href="/chat" className="hover:text-red-500 transition font-bold uppercase tracking-wide">
            Chat
          </Link>
          <WalletMultiButton />
        </div>
      </div>
    </nav>
  )
}
