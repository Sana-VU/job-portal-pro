@echo off
cd server
echo Starting MongoDB...
start "MongoDB" mongod --dbpath ./data --port 27017
timeout /t 3 /nobreak > nul
echo Starting Server...
node server.js
pause
