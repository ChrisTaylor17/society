# Railway Deployment Guide for Socket.IO Server

## Step 1: Prepare for Railway

Your `server.js` file is ready to deploy. Railway will automatically detect and run it.

## Step 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up or log in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `society` repository
6. Railway will auto-detect Node.js

## Step 3: Configure the Service

Railway should automatically:
- Detect `server.js`
- Install dependencies (express, socket.io, cors)
- Start the server

If needed, manually set:
- **Start Command**: `node server.js`
- **Install Command**: `npm install express socket.io cors`

## Step 4: Get Your Public URL

1. After deployment, go to your service
2. Click "Settings" tab
3. Scroll to "Networking"
4. Click "Generate Domain"
5. Copy the URL (e.g., `https://society-production.up.railway.app`)

## Step 5: Update Your .env File

For local development:
```env
NEXT_PUBLIC_SOCKET_URL=https://your-app.up.railway.app
```

For Vercel deployment:
Add this environment variable in Vercel dashboard:
```
NEXT_PUBLIC_SOCKET_URL=https://your-app.up.railway.app
```

## Step 6: Test the Connection

1. Deploy your Next.js app to Vercel
2. Navigate to the Chat page
3. You should see "Connected to chat" toast
4. Send a message to test

## Troubleshooting

**Server not starting?**
- Check Railway logs for errors
- Ensure dependencies are installed
- Verify start command is `node server.js`

**CORS errors?**
- The server.js already has CORS configured for all origins
- Check browser console for specific errors

**Connection timeout?**
- Verify the Railway URL is correct
- Check if Railway service is running
- Ensure port is not hardcoded (Railway assigns dynamically)

## Railway Free Tier

- $5 free credit per month
- Enough for testing and small projects
- Automatically scales
- No credit card required to start
