# Environment Variables Guide

## Required Environment Variables

### For Local Development (.env file)

```env
# OpenAI API Key (REQUIRED)
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx

# Solana Network Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Socket.IO Server URL
# Local: http://localhost:3001
# Production: Your deployed server URL
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# Metaplex Program ID (Optional)
NEXT_PUBLIC_METAPLEX_PROGRAM_ID=metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s
```

### For Vercel Production Deployment

Add these in Vercel Dashboard → Settings → Environment Variables:

1. **OPENAI_API_KEY**
   - Value: `sk-proj-your-key-here`
   - Required for AI image generation and chatbot

2. **NEXT_PUBLIC_SOLANA_NETWORK**
   - Value: `devnet`
   - Specifies Solana network

3. **NEXT_PUBLIC_SOLANA_RPC_URL**
   - Value: `https://api.devnet.solana.com`
   - Solana RPC endpoint

4. **NEXT_PUBLIC_SOCKET_URL**
   - Value: `https://your-socket-server.railway.app`
   - Your deployed Socket.IO server URL

## How to Get OpenAI API Key

1. Visit https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Add to your .env file

**Note**: DALL-E 3 costs approximately $0.04 per image generation.

## Socket.IO Server Deployment

The chat feature requires a separate Socket.IO server. Deploy to:

- **Railway**: https://railway.app (Recommended)
- **Render**: https://render.com
- **Heroku**: https://heroku.com

After deployment, copy the public URL and set it as `NEXT_PUBLIC_SOCKET_URL`.

## Solana Devnet Setup

1. Install Phantom wallet: https://phantom.app
2. Switch to Devnet in settings
3. Get free devnet SOL: https://faucet.solana.com
4. Request 2 SOL for testing

## Security Notes

- Never commit .env file to Git (already in .gitignore)
- Never share your OpenAI API key
- Keep your wallet seed phrase private
- Devnet tokens have no real value
