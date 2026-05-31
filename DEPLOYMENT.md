# Mently - Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying Mently to production on various platforms.

## 📋 Prerequisites

- Docker installed
- Docker Hub account (optional, for image registry)
- Production database (MongoDB Atlas recommended)
- Production OpenAI API key
- Domain name (optional)
- SSL certificate (automatic with most platforms)

## 🔧 Environment Setup

### Production Environment Variables

**Backend (.env)**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=
JWT_SECRET=your_very_secure_secret_key_min_32_chars
JWT_EXPIRY=30d
OPENAI_API_KEY=sk-prod-key
CLIENT_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```

**Frontend (.env.production)**
```env
VITE_API_URL=https://api.yourdomain.com
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
cd server
docker build -t mently-server:latest .
```

### Run with Docker
```bash
docker run \
  -p 5000:5000 \
  -e MONGODB_URI="mongodb+srv://..." \
  -e OPENAI_API_KEY="sk-..." \
  mently-server:latest
```

### Docker Compose
```bash
# Make sure to set OPENAI_API_KEY
export OPENAI_API_KEY=sk-...

docker-compose up -d
```

## ☁️ Platform-Specific Guides

### Heroku

**Backend Deployment:**
```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create mently-server

# Set environment variables
heroku config:set \
  MONGODB_URI="mongodb+srv://..." \
  JWT_SECRET="..." \
  OPENAI_API_KEY="sk-..."

# Deploy
git push heroku main
```

**Frontend Deployment (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel --prod
```

### Railway

**One-Click Deploy:**
1. Go to [Railway](https://railway.app/)
2. Connect GitHub repository
3. Configure environment variables
4. Deploy

```bash
# Set up database
railway add

# Set environment variables in dashboard
# Deploy automatically on push
```

### Render

**Backend:**
1. Go to [Render](https://render.com/)
2. Create new Web Service
3. Connect GitHub repo
4. Configure:
   - Build: `npm install && npm run build`
   - Start: `npm start`
5. Add environment variables
6. Deploy

**Frontend:**
1. Create Static Site
2. Point to client directory
3. Build command: `npm run build`
4. Publish directory: `dist`

### AWS (EC2 + RDS)

```bash
# 1. Launch EC2 instance (Ubuntu)
# 2. SSH into instance
ssh -i key.pem ubuntu@instance-ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install MongoDB CLI (or use RDS)
# 5. Clone repository
git clone <repo-url>
cd mently/server

# 6. Install dependencies
npm install

# 7. Create production .env
cat > .env << EOF
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-...
EOF

# 8. Build and start
npm run build
npm start
```

### Google Cloud Run

```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT-ID/mently-server

# Deploy
gcloud run deploy mently-server \
  --image gcr.io/PROJECT-ID/mently-server \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGODB_URI=...,OPENAI_API_KEY=...
```

## 🗄️ Database Setup

### MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account
3. Create cluster (free tier available)
4. Create database user
5. Whitelist IP addresses
6. Get connection string
7. Update `.env`

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/mently?retryWrites=true&w=majority
```

## 🔒 Security Checklist

- [ ] Update `JWT_SECRET` to random 32+ character string
- [ ] Use HTTPS/SSL everywhere
- [ ] Set `ALLOWED_ORIGINS` to specific domain
- [ ] Enable CORS properly
- [ ] Whitelist MongoDB IPs
- [ ] Use production OpenAI API key
- [ ] Set `NODE_ENV=production`
- [ ] Enable logging and monitoring
- [ ] Regular backups of database
- [ ] Rate limiting enabled
- [ ] CSRF protection enabled
- [ ] Input validation on all endpoints

## 🔍 Monitoring

### Logs
```bash
# Heroku logs
heroku logs --tail

# Docker logs
docker logs -f container-id

# PM2 logs (if using PM2)
pm2 logs
```

### Error Tracking
```
# Consider using:
- Sentry.io
- LogRocket
- Rollbar
- CloudWatch
```

### Performance
```
- Monitor response times
- Track API latency
- Database query performance
- Memory usage
```

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and deploy backend
        run: |
          npm install
          npm run build
      
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/mently-server.git main
```

## 🧹 Maintenance

### Regular Tasks
- Monitor logs daily
- Update dependencies monthly
- Review security alerts
- Backup database weekly
- Check API usage/costs
- Monitor uptime

### Updates
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Major updates
npm uninstall package
npm install package@latest
```

## 🚨 Troubleshooting

### High Memory Usage
```bash
# Check running processes
ps aux | grep node

# Restart service
systemctl restart mently-server
```

### Database Connection Issues
```bash
# Verify connection string
# Check IP whitelist
# Verify credentials
# Check network connectivity
```

### API Rate Limits
- Implement caching
- Add rate limiting middleware
- Use API Gateway
- Monitor usage

## 📈 Scaling

### Vertical Scaling
- Increase server resources (CPU/RAM)
- Use faster database instance
- Optimize code

### Horizontal Scaling
- Load balancer
- Multiple server instances
- Distributed cache (Redis)
- CDN for static assets

## 💰 Cost Optimization

- Use free/tier databases initially
- Monitor API spending
- Optimize database queries
- Use caching aggressively
- CDN for static content

## 📚 Additional Resources

- [Docker Deployment](https://docs.docker.com/get-started/08_using_compose/)
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/deploying-nodejs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vercel Deployment](https://vercel.com/docs)
- [Railway Deployment](https://docs.railway.app/)

---

**Need help?** Check platform-specific documentation or submit an issue.
