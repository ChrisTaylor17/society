#!/bin/bash
echo "🚀 Starting Society of Explorers..."
echo ""
echo "Starting Socket.IO server on port 3001..."
node server.js &
SERVER_PID=$!
echo "Server PID: $SERVER_PID"
echo ""
sleep 2
echo "Starting Next.js on port 3000..."
npm run dev
