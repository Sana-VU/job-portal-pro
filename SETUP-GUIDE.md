# 🚀 Job Portal PRO - Setup Guide

## Quick Start

### 1. Environment Setup

Create a `.env` file in the `server` directory with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/job-portal-pro
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
CLIENT_ORIGIN=http://localhost:3000
```

### 2. Start MongoDB

**Option A: Using MongoDB Compass (Recommended)**

- Download and install MongoDB Compass
- Start MongoDB service from the system tray

**Option B: Command Line**

```bash
# Create data directory
mkdir -p data

# Start MongoDB
mongod --dbpath ./data --port 27017
```

### 3. Start the Servers

**Terminal 1 - Server:**

```bash
cd server
npm run dev
```

**Terminal 2 - Client:**

```bash
cd client
npm run dev
```

### 4. Test the Application

1. **Server Health Check:**

   ```
   http://localhost:3001/health
   ```

2. **Jobs API:**

   ```
   http://localhost:3001/jobs
   ```

3. **Client Application:**
   ```
   http://localhost:3000
   ```

## Troubleshooting

### Server Won't Start

1. **Check MongoDB is running:**

   ```bash
   mongod --version
   ```

2. **Check environment variables:**

   ```bash
   cd server
   node test-server.js
   ```

3. **Check port availability:**
   ```bash
   netstat -an | findstr ":3001"
   ```

### Common Issues

1. **"Missing MONGODB_URI" error:**

   - Make sure `.env` file exists in `server` directory
   - Check file permissions

2. **MongoDB connection failed:**

   - Ensure MongoDB is running
   - Check if port 27017 is available
   - Verify MongoDB URI format

3. **Client can't connect to server:**
   - Check CORS settings in server
   - Verify CLIENT_ORIGIN in .env
   - Check if both servers are running

## Features Implemented

✅ **Jobs CRUD & Detail Page**

- Enhanced Job model with new fields
- Job detail page with beautiful UI
- Search and filter API endpoints
- Pagination support
- Responsive design

## Next Steps

The following features are ready to be implemented:

- Search & Filters UI
- Applications + Resume Upload
- User Dashboard Enhancements
- Admin Panel
- Email Notifications
- SEO & Analytics
- Testing & CI

## API Endpoints

- `GET /jobs` - List jobs with search/filters
- `GET /jobs/:id` - Get job details
- `POST /jobs` - Create job (admin only)
- `PUT /jobs/:id` - Update job (admin only)
- `DELETE /jobs/:id` - Delete job (admin only)
