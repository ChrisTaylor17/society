# Deployment Guide

## Required Environment Variables for Vercel

Add these in your Vercel project settings:

```
OPENAI_API_KEY=sk-your-openai-api-key-here
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.railway.app
```

## Step 1: Deploy Socket.IO Server

### Using Railway (Recommended)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add a new service
5. Set start command: `node server.js`
6. Deploy
7. Copy the public URL (e.g., `https://society-production.up.railway.app`)

### Using Render

1. Go to https://render.com
2. New → Web Service
3. Connect your GitHub repository
4. Build Command: `npm install express socket.io cors`
5. Start Command: `node server.js`
6. Deploy
7. Copy the URL

## Step 2: Deploy Frontend to Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "Deploy Society of Explorers"
git push origin main
```

2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables (see above)
5. Deploy

## Step 3: Update Socket URL

After deploying the Socket.IO server, update the environment variable in Vercel:
- `NEXT_PUBLIC_SOCKET_URL` = your Railway/Render URL

## Testing Production

1. Visit your Vercel URL
2. Connect Phantom wallet (set to Devnet)
3. Test NFT creation with OpenAI
4. Test token creation
5. Test real-time chat
