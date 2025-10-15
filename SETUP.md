# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Create .env File

Copy `.env.example` to `.env` and fill in:

```env
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## 3. Get OpenAI API Key

1. Go to https://platform.openai.com
2. Create account or sign in
3. Go to API Keys section
4. Create new secret key
5. Copy and paste into .env file

## 4. Setup Phantom Wallet

1. Install Phantom extension: https://phantom.app
2. Create or import wallet
3. Switch to Devnet:
   - Settings → Developer Settings → Change Network → Devnet
4. Get free SOL: https://faucet.solana.com

## 5. Run the Application

Terminal 1 - Socket.IO Server:
```bash
node server.js
```

Terminal 2 - Next.js App:
```bash
npm run dev
```

## 6. Open Browser

Navigate to http://localhost:3000

## 7. Connect Wallet

Click "Select Wallet" and connect your Phantom wallet

## Ready to Explore!

- Create NFTs with AI-generated images
- Launch tokens with team allocations
- Chat with other explorers in real-time
- Get help from the AI assistant
