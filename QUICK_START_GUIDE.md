# Quick Start Guide - AI Educational Tools

**Complete Full-Stack Setup with Cloudflare Deployment**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Cloudflare Deployment](#cloudflare-deployment)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

```bash
# Check versions
node --version  # Should be 20+
npm --version   # Should be 9+
docker --version  # For local database
```

### Install if Missing

- **Node.js 20+**: [https://nodejs.org/](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm)
- **Docker**: [https://www.docker.com/get-started](https://www.docker.com/get-started)
- **Git**: [https://git-scm.com/downloads](https://git-scm.com/downloads)

### Required API Keys

1. **Anthropic Claude API Key** (recommended) OR **OpenAI API Key**
   - Anthropic: [https://console.anthropic.com/](https://console.anthropic.com/)
   - OpenAI: [https://platform.openai.com/](https://platform.openai.com/)

2. **Cloudflare Account** (for deployment)
   - Sign up: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

3. **PostgreSQL Database** (choose one):
   - [Neon](https://neon.tech/) - Serverless Postgres (recommended for Cloudflare)
   - [Supabase](https://supabase.com/) - Free tier available
   - [Railway](https://railway.app/) - Easy PostgreSQL hosting

4. **Redis** (optional for production):
   - [Upstash](https://upstash.com/) - Serverless Redis (Cloudflare-compatible)
   - Or use local Redis for development

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ai-educational-tools-landing
```

### Step 2: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 3: Start Local Database

```bash
cd backend
docker-compose -f docker-compose.dev.yml up -d

# Verify containers are running
docker ps
```

You should see:
- `ai-edu-postgres` on port 5432
- `ai-edu-redis` on port 6379

### Step 4: Set Up Environment Variables

```bash
# In backend directory
cd backend
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
# Minimum required for local development
NODE_ENV=development
PORT=8080
FRONTEND_URL=http://localhost:3000

# Local database (using Docker)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_edu_tools
REDIS_URL=redis://localhost:6379

# Generate strong secrets (use: openssl rand -base64 32)
JWT_SECRET=your-generated-secret-here
JWT_REFRESH_SECRET=your-generated-refresh-secret-here

# AI Provider (get key from Anthropic or OpenAI)
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### Step 5: Initialize Database

```bash
# In backend directory
npm run db:push

# This will:
# - Create all tables from schema
# - Set up indexes
# - Prepare database for use
```

### Step 6: Verify Setup

```bash
# Test database connection
npm run dev

# You should see:
# ✅ Database connection established
# 🚀 Server running on http://0.0.0.0:8080
```

---

## Running the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
# In project root
npm run dev
# Frontend runs on http://localhost:3000
```

### Option 2: Run Both Together (Coming Soon)

```bash
npm run dev:all
```

### Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **API Health Check**: [http://localhost:8080/health](http://localhost:8080/health)

---

## Environment Configuration

### Development vs Production

**Development (.env):**
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_edu_tools
REDIS_URL=redis://localhost:6379
LOG_LEVEL=debug
```

**Production (.env.production):**
```env
NODE_ENV=production
DATABASE_URL=<neon-or-supabase-connection-string>
REDIS_URL=<upstash-redis-url>
LOG_LEVEL=info
```

### Getting Production Database URLs

**Neon (Recommended for Cloudflare):**
1. Sign up at [https://neon.tech/](https://neon.tech/)
2. Create new project
3. Copy connection string: `postgresql://user:pass@ep-xxx.neon.tech/neondb`

**Supabase:**
1. Sign up at [https://supabase.com/](https://supabase.com/)
2. Create new project
3. Go to Settings → Database → Connection String (Direct)

**Upstash Redis:**
1. Sign up at [https://upstash.com/](https://upstash.com/)
2. Create Redis database
3. Copy connection string

---

## Cloudflare Deployment

### Architecture

```
┌─────────────────────────────────────────────────┐
│  Cloudflare Pages (Frontend)                    │
│  - React/Vite Static Site                       │
│  - CDN Distribution                              │
│  - Auto HTTPS                                    │
└─────────────────────────────────────────────────┘
                      │
                      │ API Calls
                      ▼
┌─────────────────────────────────────────────────┐
│  Backend API (Choose One)                       │
│  ├─ Cloudflare Workers (Serverless)            │
│  ├─ Railway.app (Traditional)                   │
│  └─ Render.com (Traditional)                    │
└─────────────────────────────────────────────────┘
                      │
         ┌────────────┴────────────┐
         ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│  Neon Postgres   │    │  Upstash Redis   │
│  (Serverless DB) │    │  (Serverless)    │
└──────────────────┘    └──────────────────┘
```

### Deploy Frontend to Cloudflare Pages

#### Method 1: Via Cloudflare Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
   - Click "Pages" → "Create a project"
   - Connect your GitHub repository
   - Select `ai-educational-tools-landing`

3. **Configure Build Settings**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

4. **Add Environment Variables** (in Cloudflare Pages settings)
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

5. **Deploy**
   - Click "Save and Deploy"
   - Your site will be live at: `https://your-project.pages.dev`

#### Method 2: Via Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages publish dist --project-name=ai-edu-tools
```

### Deploy Backend

#### Option A: Railway.app (Recommended for Simplicity)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   cd backend
   railway init
   ```

3. **Add PostgreSQL**
   ```bash
   railway add --plugin postgresql
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set JWT_SECRET=<your-secret>
   railway variables set ANTHROPIC_API_KEY=<your-key>
   railway variables set FRONTEND_URL=https://your-frontend.pages.dev
   ```

5. **Deploy**
   ```bash
   railway up
   ```

#### Option B: Render.com

1. Go to [https://render.com/](https://render.com/)
2. "New" → "Web Service"
3. Connect GitHub repo, select `backend` directory
4. Configure:
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. Add environment variables in Render dashboard

#### Option C: Cloudflare Workers (Advanced)

**Note:** Requires adaptation for serverless (different from current Express setup)

```bash
# Future: Will need to create Cloudflare Workers version
# For now, use Railway or Render for traditional Node.js deployment
```

### Custom Domain Setup

1. **Add Domain in Cloudflare Pages**
   - Pages → Your Project → Custom domains
   - Add your domain (e.g., `app.yourdomain.com`)

2. **Update DNS** (automatically handled if domain is on Cloudflare)

3. **Update Environment Variables**
   ```env
   # In backend
   FRONTEND_URL=https://app.yourdomain.com

   # In frontend (.env.production)
   VITE_API_URL=https://api.yourdomain.com
   ```

---

## Testing

### API Testing with curl

```bash
# Health check
curl http://localhost:8080/health

# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234"
  }'

# Get current user (replace TOKEN)
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Run Unit Tests

```bash
cd backend
npm test
```

---

## Troubleshooting

### Database Connection Failed

**Error:** `Failed to connect to database`

**Solutions:**
```bash
# Check Docker containers are running
docker ps

# Restart containers
docker-compose -f docker-compose.dev.yml restart

# Check logs
docker logs ai-edu-postgres
docker logs ai-edu-redis

# Verify DATABASE_URL is correct
echo $DATABASE_URL
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::8080`

**Solution:**
```bash
# Find process using port
lsof -i :8080

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=8081
```

### Invalid Token Errors

**Solution:**
```bash
# Generate new JWT secrets
openssl rand -base64 32

# Update .env with new secrets
# Restart backend server
```

### CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solution:**
```env
# In backend/.env, ensure FRONTEND_URL matches your frontend
FRONTEND_URL=http://localhost:3000

# For production
FRONTEND_URL=https://your-app.pages.dev
```

### Drizzle Migration Issues

```bash
# Reset database (WARNING: deletes all data)
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d

# Re-push schema
npm run db:push
```

---

## Next Steps

1. ✅ **Backend is running** - Authentication API ready
2. ⏳ **Add AI Tutor endpoints** - See `EXPERT_ROUNDTABLE_CANNIBALIZATION.md`
3. ⏳ **Integrate frontend** - Connect React to backend API
4. ⏳ **Add Smart Classrooms** - WebSocket + Excalidraw
5. ⏳ **Implement Adaptive Learning** - Algorithms + analytics

---

## Useful Commands

```bash
# Backend
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm test             # Run tests
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio (database GUI)

# Frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Docker
docker-compose -f backend/docker-compose.dev.yml up -d    # Start
docker-compose -f backend/docker-compose.dev.yml down     # Stop
docker-compose -f backend/docker-compose.dev.yml logs -f  # View logs
```

---

## Support

**Documentation:**
- Implementation Plan: `AI_TOOLS_IMPLEMENTATION_PLAN.md`
- Expert Roundtable: `EXPERT_ROUNDTABLE_CANNIBALIZATION.md`
- Project History: `PROJECT_HISTORY.md`

**Issues:**
- Open an issue on GitHub
- Check troubleshooting section above

---

**Last Updated:** 2025-11-24
**Version:** 1.0
**Status:** ✅ Backend Ready, ⏳ Frontend Integration Pending
