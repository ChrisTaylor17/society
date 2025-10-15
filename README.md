# Society of Explorers

A professional Web3 platform for creating NFTs, launching tokens, and connecting with fellow explorers on Solana blockchain.

## Features

- **AI-Generated NFTs**: Create unique NFT images using OpenAI's DALL-E 3 and mint them directly to your Phantom wallet
- **Token Creation**: Launch custom SPL tokens with team allocation percentages
- **Real-Time Chat**: Connect and communicate with other explorers
- **AI Assistant**: Get guided through blockchain interactions with an intelligent chatbot
- **Solana Devnet**: All transactions happen on Solana devnet for safe testing

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Blockchain**: Solana Web3.js, SPL Token, Metaplex
- **AI**: OpenAI (DALL-E 3 for images, GPT-4 for assistance)
- **Real-Time**: Socket.IO
- **Wallet**: Phantom, Solflare (via Solana Wallet Adapter)

## Prerequisites

- Node.js 18+ installed
- Phantom wallet browser extension
- OpenAI API key
- Solana devnet SOL (get free airdrop from https://faucet.solana.com)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Socket.IO Server
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# Optional: Metaplex Configuration
NEXT_PUBLIC_METAPLEX_PROGRAM_ID=metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s
```

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Install Socket.IO server dependencies**:
```bash
npm install --prefix . express socket.io cors
```

## Running Locally

1. **Start the Socket.IO server** (in one terminal):
```bash
node server.js
```

2. **Start the Next.js development server** (in another terminal):
```bash
npm run dev
```

3. **Open your browser**:
Navigate to `http://localhost:3000`

4. **Connect your Phantom wallet**:
- Make sure you're on Solana Devnet in Phantom settings
- Click "Select Wallet" and connect

## Deployment to Vercel

### Frontend Deployment

1. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ChrisTaylor17/society.git
git push -u origin main
```

2. **Deploy to Vercel**:
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables in Vercel dashboard:
  - `OPENAI_API_KEY`
  - `NEXT_PUBLIC_SOLANA_NETWORK=devnet`
  - `NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com`
  - `NEXT_PUBLIC_SOCKET_URL` (your deployed Socket.IO server URL)
- Deploy

### Socket.IO Server Deployment

Deploy the Socket.IO server separately (recommended platforms):

**Option 1: Railway**
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Set root directory to `/` and start command to `node server.js`
4. Deploy and copy the URL
5. Update `NEXT_PUBLIC_SOCKET_URL` in Vercel with Railway URL

**Option 2: Render**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Set start command: `node server.js`
5. Deploy and copy the URL
6. Update `NEXT_PUBLIC_SOCKET_URL` in Vercel

**Option 3: Heroku**
```bash
heroku create society-chat-server
git subtree push --prefix . heroku main
```

## Usage Guide

### Creating NFTs

1. Navigate to "NFT Creator"
2. Enter a description for your NFT image (e.g., "A cosmic explorer in a purple galaxy")
3. Click "Generate Image" (uses OpenAI DALL-E 3)
4. Fill in NFT name, description, and attributes
5. Click "Mint NFT on Solana"
6. Approve the transaction in Phantom
7. Check your Phantom wallet under "Collectibles" to see your NFT!

### Creating Tokens

1. Navigate to "Token Creator"
2. Enter token name and symbol
3. Set decimals (usually 9) and initial supply
4. Add wallet addresses and allocation percentages (must total 100%)
5. Click "Create Token on Solana"
6. Token will be minted and distributed to specified wallets

### Using Chat

1. Navigate to "Chat"
2. Connect your wallet (your address will be your username)
3. Send messages to connect with other explorers
4. Real-time updates show online users

### AI Assistant

1. Click the purple bot icon in the bottom-right corner
2. Ask questions about NFTs, tokens, or Solana
3. Get step-by-step guidance for blockchain interactions

## Project Structure

```
society/
├── app/
│   ├── api/              # API routes
│   │   ├── chat/         # AI assistant endpoint
│   │   ├── generate-image/ # OpenAI image generation
│   │   ├── mint-nft/     # NFT minting
│   │   └── create-token/ # Token creation
│   ├── nft-creator/      # NFT creation page
│   ├── token-creator/    # Token creation page
│   ├── chat/             # Real-time chat page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── Navigation.tsx    # Navigation bar
│   ├── WalletProvider.tsx # Solana wallet provider
│   └── AIAssistant.tsx   # AI chatbot widget
├── lib/
│   ├── openai.ts         # OpenAI utilities
│   └── solana.ts         # Solana utilities
├── server.js             # Socket.IO server
└── package.json          # Dependencies
```

## Important Notes

- **Devnet Only**: This app uses Solana devnet. NFTs and tokens are for testing only.
- **Free SOL**: Get devnet SOL from https://faucet.solana.com
- **OpenAI Costs**: Image generation uses DALL-E 3 which costs ~$0.04 per image
- **Wallet Security**: Never share your seed phrase or private keys
- **Real NFTs**: NFTs minted will appear in your Phantom wallet's Collectibles tab

## Troubleshooting

**NFT not showing in wallet?**
- Make sure Phantom is set to Devnet
- Wait a few minutes for blockchain confirmation
- Refresh your wallet

**Image generation failing?**
- Check your OpenAI API key is valid
- Ensure you have API credits
- Check OpenAI API status

**Chat not connecting?**
- Ensure Socket.IO server is running
- Check `NEXT_PUBLIC_SOCKET_URL` is correct
- Verify CORS settings in server.js

**Token creation failing?**
- Ensure wallet has devnet SOL
- Verify all addresses are valid Solana addresses
- Check allocations total 100%

## Support

For issues or questions:
- Check Solana devnet status: https://status.solana.com
- Solana documentation: https://docs.solana.com
- OpenAI API docs: https://platform.openai.com/docs

## License

MIT License - feel free to use this project for learning and development!
