# PowerShell script to start the server with environment variables

# Set environment variables
$env:MONGODB_URI = "mongodb://localhost:27017/job-portal-pro"
$env:JWT_SECRET = "your-super-secret-jwt-key-change-this-in-production"
$env:PORT = "3001"
$env:CLIENT_ORIGIN = "http://localhost:3000"

Write-Host "Environment variables set:"
Write-Host "MONGODB_URI: $env:MONGODB_URI"
Write-Host "JWT_SECRET: Set"
Write-Host "PORT: $env:PORT"
Write-Host "CLIENT_ORIGIN: $env:CLIENT_ORIGIN"

Write-Host "`nStarting MongoDB..."
Start-Process -FilePath "mongod" -ArgumentList "--dbpath", "./data", "--port", "27017" -WindowStyle Minimized

Write-Host "Waiting for MongoDB to start..."
Start-Sleep -Seconds 3

Write-Host "Starting server..."
Set-Location server
node server.js
