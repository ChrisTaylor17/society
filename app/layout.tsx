import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { WalletProvider } from '@/components/WalletProvider'
import { Toaster } from 'react-hot-toast'
import Navigation from '@/components/Navigation'
import AIAssistant from '@/components/AIAssistant'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Society of Explorers',
  description: 'Create NFTs, tokens, and connect with explorers on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <AIAssistant />
          <Toaster position="top-right" />
        </WalletProvider>
      </body>
    </html>
  )
}
