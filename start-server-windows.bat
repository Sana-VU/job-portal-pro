@echo off
set MONGODB_URI=mongodb://localhost:27017/job-portal-pro
set JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
set PORT=3001
set CLIENT_ORIGIN=http://localhost:3000

echo Starting MongoDB...
start "MongoDB" mongod --dbpath ./data --port 27017

echo Waiting for MongoDB to start...
timeout /t 3 /nobreak > nul

echo Starting server...
cd server
node server.js

pause
