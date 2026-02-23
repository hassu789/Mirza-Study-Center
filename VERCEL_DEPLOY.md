# Vercel Deployment Checklist for Mirza Study Centre

## If the inquiry form still fails after deploying to Vercel:

### 1. MongoDB Atlas Network Access (REQUIRED)

Vercel uses **dynamic IP addresses** — they change often. You MUST allow all IPs in MongoDB Atlas:

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → your project
2. Click **Network Access** (under Security)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** — this adds `0.0.0.0/0`
5. Click **Confirm**

Without this, Vercel's servers cannot connect to your MongoDB cluster.

---

### 2. Verify MONGODB_URI in Vercel

1. Go to Vercel → your project → **Settings** → **Environment Variables**
2. Ensure `MONGODB_URI` exists with your MongoDB Atlas connection string
3. It must be enabled for **Production** (and Preview)
4. After adding/editing, **Redeploy** the project

> See `.env.example` for the full list of required environment variables.

---

### 3. Redeploy After Changes

After any env var or Network Access change:
- Vercel → Deployments → ⋮ on latest → **Redeploy**
