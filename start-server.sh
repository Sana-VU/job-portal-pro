#!/bin/bash

# Set environment variables
export MONGODB_URI="mongodb://localhost:27017/job-portal-pro"
export JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
export PORT=3001
export CLIENT_ORIGIN="http://localhost:3000"

echo "Starting MongoDB..."
mongod --dbpath ./data --port 27017 &
MONGO_PID=$!

echo "Waiting for MongoDB to start..."
sleep 3

echo "Starting server..."
cd server
node server.js

# Cleanup
kill $MONGO_PID 2>/dev/null
