# Vercel Deployment Guide - Guys Car Rental

## ✅ Pre-Deployment Checklist (Completed)

- [x] Next.js project builds successfully (`npm run build`)
- [x] Git repository initialized and connected to GitHub
- [x] `vercel.json` configuration created
- [x] `.gitignore` properly configured (excludes `.env.local`)
- [x] TypeScript errors fixed
- [x] Changes committed and pushed to GitHub

## 🚀 Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `ezscore/guys-car-rental`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Add Environment Variables** (CRITICAL STEP)
   Click "Environment Variables" and add the following:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `HQRENTAL_API_REGION` | `america` | Production, Preview, Development |
   | `HQRENTAL_TENANT_TOKEN` | `gSFgYpyygBDSzpQQRaKms5z6D0yITcp9knhGOxtk7RXUtrF7vf` | Production, Preview, Development |
   | `HQRENTAL_USER_TOKEN` | `y1tET60zbPUlJBBz70Hyfh79K7DHsL3tAAy084bw4mOjhosV6e` | Production, Preview, Development |
   | `HQRENTAL_BRAND_ID` | `1` | Production, Preview, Development |

   **Important:** Make sure to select all three environments (Production, Preview, Development) for each variable.

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Vercel will provide you with a URL like: `https://guys-car-rental-xxx.vercel.app`

### Option 2: Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to your project
cd "/Users/grayangelo/Guys Car Rental/guys-car-rental-frontend"

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# ? Set up and deploy? [Y/n] y
# ? Which scope? [Select your account]
# ? Link to existing project? [N/y] n
# ? What's your project's name? guys-car-rental
# ? In which directory is your code located? ./

# Add environment variables via CLI
vercel env add HQRENTAL_API_REGION
# Enter value: america

vercel env add HQRENTAL_TENANT_TOKEN
# Enter value: gSFgYpyygBDSzpQQRaKms5z6D0yITcp9knhGOxtk7RXUtrF7vf

vercel env add HQRENTAL_USER_TOKEN
# Enter value: y1tET60zbPUlJBBz70Hyfh79K7DHsL3tAAy084bw4mOjhosV6e

vercel env add HQRENTAL_BRAND_ID
# Enter value: 1

# Deploy to production
vercel --prod
```

## 🧪 Testing Your Deployment

### 1. Test the Homepage
Visit your Vercel URL: `https://your-app.vercel.app`

### 2. Test the API Endpoint
Use this cURL command to test the reservation API:

```bash
curl -X POST https://your-app.vercel.app/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "pickupLocation": "main",
    "pickupDate": "2025-11-15",
    "pickupTime": "10:00",
    "returnDate": "2025-11-20",
    "returnTime": "10:00",
    "vehicleGroup": "ECAR",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "US",
    "driversLicense": "DL123456",
    "birthdate": "1990-01-01",
    "licenseExpiration": "2030-12-31",
    "street": "123 Main St",
    "city": "Miami",
    "state": "FL",
    "zip": "33101",
    "selectedEnhancements": [],
    "specialRequests": ""
  }'
```

### 3. Check Vercel Logs
- Go to Vercel Dashboard → Your Project → Deployments
- Click on the latest deployment
- View "Build Logs" and "Function Logs"
- Look for any errors or API call logs

## 📊 Monitoring & Debugging

### View Function Logs
```
Vercel Dashboard → Project → Functions → Logs
```

### Common Issues

**Issue: API Timeout**
- Solution: Upgrade to Vercel Pro (60s timeout instead of 10s)
- Current `vercel.json` already configures 60s timeout

**Issue: Environment Variables Not Loading**
- Solution: Redeploy after adding env vars
- Check: Settings → Environment Variables
- Verify: All variables are set for Production, Preview, Development

**Issue: Build Fails**
- Check: Build Logs in Vercel dashboard
- Verify: `npm run build` works locally
- Solution: Push fixes to GitHub (auto-deploys)

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to GitHub:
- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment

To manually redeploy:
```bash
vercel --prod
```

## 🌐 Custom Domain (Optional)

1. Go to: Project Settings → Domains
2. Add your custom domain
3. Configure DNS:
   - Add A record or CNAME pointing to Vercel
   - Vercel provides automatic SSL certificates

## 🔐 Security Notes

- ✅ API credentials are stored as environment variables (not in code)
- ✅ `.env.local` is in `.gitignore` (not committed to git)
- ✅ API calls are made server-side only (secure)
- ✅ Basic Auth credentials are Base64 encoded server-side

## 📱 Next Steps

1. Deploy to Vercel using Option 1 (GitHub integration)
2. Test the deployment with the provided cURL command
3. Set up custom domain (if desired)
4. Configure Vercel Pro if you need longer API timeouts
5. Set up monitoring/alerts in Vercel dashboard

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

---

**Ready to deploy!** Follow Option 1 above to get your app live in minutes.
