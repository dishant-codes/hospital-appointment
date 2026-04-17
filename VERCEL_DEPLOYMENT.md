# Vercel Deployment Guide

This project consists of three parts that can be deployed to Vercel:
- **doctor-backend**: Express.js API server (Node.js)
- **doctor-admin**: React/Vite admin dashboard
- **doctor-frontend**: React/Vite patient portal

## Prerequisites

1. Create a [Vercel account](https://vercel.com/signup)
2. Install Vercel CLI: `npm install -g vercel`
3. Ensure all `.env.example` files are configured with actual values

## Environment Variables Setup

### For Backend (doctor-backend)

Set these environment variables in Vercel project settings:

- **MONGODB_URI**: Your MongoDB connection string
- **JWT_SECRET**: Your JWT secret key for token signing
- **FRONTEND_URL**: URL of the deployed frontend (e.g., `https://doctor-admin.vercel.app`)
- **PORT**: Leave as default (Vercel manages this automatically)

### For Frontends (doctor-admin & doctor-frontend)

Set these environment variables:

- **VITE_API_URL**: URL of the deployed backend API (e.g., `https://doctor-backend.vercel.app/api`)

## Deployment Instructions

### 1. Deploy Backend

```bash
cd doctor-backend
vercel
```

**During setup:**
- Choose "Yes" for creating a new Vercel project
- Select Node.js when prompted for framework
- Accept default settings for other prompts
- Add environment variables in the Vercel dashboard after deployment

**Get your backend URL** from the Vercel dashboard console output.

### 2. Deploy doctor-admin Frontend

```bash
cd doctor-admin
vercel env add VITE_API_URL
# Enter your backend URL: https://your-backend.vercel.app/api
vercel
```

### 3. Deploy doctor-frontend Frontend

```bash
cd doctor-frontend
vercel env add VITE_API_URL
# Enter your backend URL: https://your-backend.vercel.app/api
vercel
```

## Project Structure for Monorepo

If you want to deploy from a single Vercel project for the entire monorepo, create a root `vercel.json`:

```json
{
  "version": 2,
  "projects": [
    {
      "name": "doctor-backend",
      "path": "doctor-backend"
    },
    {
      "name": "doctor-admin",
      "path": "doctor-admin"
    },
    {
      "name": "doctor-frontend",
      "path": "doctor-frontend"
    }
  ]
}
```

## Configuration Files

All `vercel.json` files have been created:
- **doctor-backend/vercel.json**: Node.js serverless function configuration
- **doctor-admin/vercel.json**: React static site configuration
- **doctor-frontend/vercel.json**: React static site configuration
- **.vercelignore**: Files to exclude from deployment

## CORS Configuration

The backend is configured with CORS to accept requests from the `FRONTEND_URL` environment variable. Make sure to:

1. Set `FRONTEND_URL` to your deployed frontend URL
2. Update the frontend's `VITE_API_URL` to match your backend deployment URL

## Testing

After deployment:

1. Test the backend API:
   ```
   https://your-backend.vercel.app/
   ```
   Should return: "Welcome to the Doctor's Appointment API"

2. Test the frontends:
   - doctor-admin: `https://doctor-admin.vercel.app`
   - doctor-frontend: `https://doctor-frontend.vercel.app`

## Troubleshooting

### Build Failures
- Check that all dependencies are in package.json (not installed locally)
- Verify environment variables are set correctly in Vercel dashboard

### CORS Errors
- Ensure backend's `FRONTEND_URL` matches your frontend deployment URL exactly
- Check that frontend's `VITE_API_URL` matches your backend URL with `/api` path

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Ensure MongoDB IP whitelist includes Vercel's IP ranges (or use 0.0.0.0/0 for testing)

### Missing Environment Variables
- Check Vercel project settings → Environment Variables
- Redeploy after adding/updating variables: `vercel --prod`

## Local Development

To use deployed backend locally:

1. Create a `.env.local` file in the frontend directories
2. Add: `VITE_API_URL=https://your-backend.vercel.app/api`
3. Run: `npm run dev`

## Additional Resources

- [Vercel Node.js Documentation](https://vercel.com/docs/functions/nodejs)
- [Vercel Static Deployments](https://vercel.com/docs/concepts/deployments/static-deployments)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
