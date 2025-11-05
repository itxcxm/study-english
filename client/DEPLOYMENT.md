# Deployment Guide

This guide explains how to deploy the Study English application to production.

## Prerequisites

- Node.js 18.x or later
- MongoDB database (MongoDB Atlas recommended for production)
- Vercel account (for frontend) or your preferred hosting provider
- Server hosting (Vercel Serverless Functions, Railway, Render, or any Node.js hosting)

## Environment Variables

### Client (Frontend) Environment Variables

Create a `.env.local` file in the `client` directory for local development, or set these in your hosting platform:

```env
# Required: API Base URL
# Production example: https://api.yourdomain.com/api
# Development: http://localhost:4000/api
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api

# Optional: Supabase (if using)
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Server (Backend) Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=production

# Database - Use MongoDB Atlas connection string in production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/study-english?retryWrites=true&w=majority

# JWT Secrets - MUST be strong, unique values (32+ characters)
# Generate using: openssl rand -base64 32
JWT_SECRET=your_strong_access_token_secret_key_here
REFRESH_SECRET=your_strong_refresh_token_secret_key_here

# CORS - Frontend URL
# Production: https://yourdomain.com
# Development: http://localhost:3000
CLIENT_URL=https://yourdomain.com
```

## Deployment Steps

### 1. Deploy Backend (Server)

#### Option A: Vercel Serverless Functions

1. Navigate to `server` directory
2. Install Vercel CLI: `npm i -g vercel`
3. Deploy: `vercel`
4. Set environment variables in Vercel dashboard
5. The server will be available at `https://your-server.vercel.app`

#### Option B: Railway / Render / Heroku

1. Connect your repository to the platform
2. Set root directory to `server`
3. Configure environment variables
4. Deploy

#### Option C: Traditional Server

1. SSH into your server
2. Clone repository
3. Install dependencies: `npm install`
4. Set environment variables
5. Use PM2 or similar: `pm2 start server.js`

### 2. Deploy Frontend (Client)

#### Option A: Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` = your backend API URL
5. Deploy

#### Option B: Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Set environment variables
5. Deploy

#### Option C: Traditional Server

1. Build the app: `npm run build`
2. Start production server: `npm start`
3. Use PM2: `pm2 start npm --name "study-english-client" -- start`

## Important Configuration

### CORS Settings

The backend server must be configured to accept requests from your frontend domain:

```javascript
// In server/src/app.js
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
```

### Cookie Settings (Production)

For production with cross-domain cookies:

```javascript
// Server cookie settings
{
  httpOnly: true,
  secure: true,        // HTTPS only
  sameSite: 'None',    // Cross-domain
  maxAge: 15 * 60 * 1000  // 15 minutes
}
```

### Environment-Specific API URLs

The client automatically uses the correct API URL based on environment:

- **Development**: `http://localhost:4000/api` (fallback)
- **Production**: `process.env.NEXT_PUBLIC_API_URL` (must be set)

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend can connect to backend API
- [ ] Environment variables are set correctly
- [ ] CORS is configured for production domain
- [ ] Cookies are working (check browser DevTools)
- [ ] Authentication flow works
- [ ] Database connection is working
- [ ] SSL/HTTPS is enabled (required for secure cookies)

## Troubleshooting

### 401 Unauthorized Errors

- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify CORS settings allow your frontend domain
- Ensure cookies are being sent (check Network tab)

### CORS Errors

- Verify `CLIENT_URL` in backend matches your frontend URL
- Check that `credentials: true` is set in both frontend and backend

### Cookie Issues

- Ensure `secure: true` in production (HTTPS required)
- Verify `sameSite: 'None'` for cross-domain
- Check browser console for cookie warnings

## Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong JWT secrets** - Generate with `openssl rand -base64 32`
3. **Enable HTTPS** - Required for secure cookies
4. **Use environment variables** - Never hardcode secrets
5. **Regular updates** - Keep dependencies updated

## Support

For issues, check:

- Server logs
- Browser console
- Network tab in DevTools
- Vercel/Platform logs
