# 🚀 Deployment Guide - Render.com

## Quick Deploy Steps

### Option 1: Using Render Dashboard (Recommended)

#### Deploy Backend:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `expense-tracker-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

5. Add Environment Variables:
   - `PORT` = `5000`
   - `MONGODB_URI` = `your_mongodb_atlas_connection_string`
   - `NODE_ENV` = `production`

6. Click "Create Web Service"

#### Deploy Frontend:
1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name:** `expense-tracker-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Plan:** Free

4. Click "Create Static Site"

#### Update Frontend API URL:
After backend deploys, update `frontend/src/App.jsx`:
```javascript
const API_URL = 'https://your-backend-url.onrender.com/api/expenses'
```

### Option 2: Using render.yaml (Blueprint)

1. Push `render.yaml` to your repo
2. Go to Render Dashboard
3. Click "New +" → "Blueprint"
4. Select your repository
5. Render will auto-detect `render.yaml`
6. Add `MONGODB_URI` environment variable
7. Click "Apply"

## 📝 Important Notes

- **Free Tier:** Services sleep after 15 min of inactivity
- **Cold Start:** First request may take 30-60 seconds
- **MongoDB:** Use MongoDB Atlas (free tier available)
- **CORS:** Already configured in backend

## 🔗 After Deployment

1. Note your backend URL: `https://expense-tracker-backend.onrender.com`
2. Update frontend API_URL with backend URL
3. Redeploy frontend
4. Access your app at: `https://expense-tracker-frontend.onrender.com`

## ⚡ Alternative: Deploy Backend Only

If you want to deploy only backend and run frontend locally:

1. Deploy backend on Render (steps above)
2. Update `frontend/src/App.jsx`:
   ```javascript
   const API_URL = 'https://your-backend-url.onrender.com/api/expenses'
   ```
3. Run frontend locally: `npm run dev`

## 🐛 Troubleshooting

**Build fails:**
- Check `Root Directory` is set correctly
- Verify `package.json` exists in the directory

**Backend not connecting to MongoDB:**
- Verify `MONGODB_URI` environment variable
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Frontend can't reach backend:**
- Update `API_URL` in `App.jsx`
- Check CORS is enabled in backend

## 📚 Resources

- [Render Docs](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
