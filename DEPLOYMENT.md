# Deployment Guide — StackLens

This guide covers running StackLens locally for development and deploying it to
production on AWS Lightsail, DigitalOcean, GCP, and Azure.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Production — AWS Lightsail](#production--aws-lightsail)
- [Production — DigitalOcean Droplet](#production--digitalocean-droplet)
- [Production — Google Cloud Run](#production--google-cloud-run)
- [Production — Azure App Service](#production--azure-app-service)
- [Nginx Configuration](#nginx-configuration)
- [HTTPS with Let's Encrypt](#https-with-lets-encrypt)
- [Process Management with PM2](#process-management-with-pm2)
- [Updating the Application](#updating-the-application)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Runtime |
| npm | 9+ | Package manager |
| Docker | 24+ | PostgreSQL container |
| Docker Compose | v2+ | Container orchestration |
| Git | any | Source control |

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/code-and-secure/Devops-Discovery-Platform.git
cd Devops-Discovery-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start PostgreSQL via Docker

```bash
docker compose up -d
```

This starts PostgreSQL 15 on `localhost:5432` with:
- User: `postgres`
- Password: `password123`
- Database: `opsatlas`

### 4. Create the environment file

```bash
cp .env.example .env   # if example exists, otherwise create manually
```

Edit `.env` with your values (see [Environment Variables](#environment-variables)).

### 5. Push the database schema

```bash
npx drizzle-kit push
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The database is seeded automatically on the first page load via `ensureSeeded()`.

---

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.**

```env
# ── Database ──────────────────────────────────────────────────────────────────
# Local: postgresql://postgres:password123@localhost:5432/opsatlas
# Production: use your server's IP or a managed DB connection string
DATABASE_URL="postgresql://postgres:password123@localhost:5432/opsatlas"

# ── App ───────────────────────────────────────────────────────────────────────
# No trailing slash. Use your server's public IP or domain in production.
APP_URL="http://localhost:3000"

# ── SMTP (Email Verification) ─────────────────────────────────────────────────
# Gmail: generate an App Password at https://myaccount.google.com/apppasswords
# Do NOT use your Gmail account password here.
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your@gmail.com"
SMTP_PASS="xxxx xxxx xxxx xxxx"
SMTP_FROM="StackLens <your@gmail.com>"
```

### Variable reference

| Variable | Required | Example |
|----------|----------|---------|
| `DATABASE_URL` | Yes | `postgresql://user:pass@host:5432/dbname` |
| `APP_URL` | Yes | `http://18.143.224.244` or `https://yourdomain.com` |
| `SMTP_HOST` | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | `587` |
| `SMTP_SECURE` | Yes | `false` (port 587) / `true` (port 465) |
| `SMTP_USER` | Yes | `you@gmail.com` |
| `SMTP_PASS` | Yes | Gmail App Password (16 chars with spaces) |
| `SMTP_FROM` | Yes | `StackLens <you@gmail.com>` |

---

## Database Setup

### Using Docker (recommended for all environments)

```bash
# Start
docker compose up -d

# Stop
docker compose down

# Stop and delete all data
docker compose down -v

# View logs
docker compose logs db

# Connect to the database
docker exec -it opsatlas-db psql -U postgres -d opsatlas
```

### Push schema (run once, or after schema changes)

```bash
npx drizzle-kit push
```

### Open Drizzle Studio (GUI)

```bash
npx drizzle-kit studio
```

Opens a database browser at `https://local.drizzle.studio`.

### Manual backup

```bash
docker exec opsatlas-db pg_dump -U postgres opsatlas > backup_$(date +%Y%m%d).sql
```

### Restore from backup

```bash
cat backup_20260610.sql | docker exec -i opsatlas-db psql -U postgres -d opsatlas
```

---

## Production — AWS Lightsail

### 1. Create a Lightsail instance

- Blueprint: **Ubuntu 22.04 LTS**
- Plan: **$10/mo** (2 GB RAM, 1 vCPU) minimum — $20/mo recommended
- Add a static IP to your instance

### 2. Open firewall ports

In the Lightsail console → Networking → Add rules:
- **HTTP**: port 80
- **HTTPS**: port 443
- **SSH**: port 22 (already open)

Do **not** open port 3000 or 5432 to the public.

### 3. SSH into the instance

```bash
ssh -i ~/LightsailDefaultKey.pem ubuntu@<YOUR_STATIC_IP>
```

### 4. Install dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Docker
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
newgrp docker

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

### 5. Clone the repository

```bash
cd ~
git clone https://github.com/code-and-secure/Devops-Discovery-Platform.git
cd Devops-Discovery-Platform
npm install
```

### 6. Create the .env file

```bash
nano .env
# Paste your environment variables and save (Ctrl+X, Y, Enter)
```

### 7. Start PostgreSQL

```bash
docker compose up -d
```

### 8. Push database schema

```bash
npx drizzle-kit push
```

### 9. Build the application

```bash
npm run build
```

### 10. Start with PM2

```bash
pm2 start "npm start" --name stacklens
pm2 save
pm2 startup   # copy and run the command it outputs
```

### 11. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/stacklens
```

Paste the [Nginx config](#nginx-configuration) below, then:

```bash
sudo ln -s /etc/nginx/sites-available/stacklens /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Your app is now live at `http://<YOUR_STATIC_IP>`.

---

## Production — DigitalOcean Droplet

### 1. Create a Droplet

- Image: **Ubuntu 22.04 LTS**
- Size: **Basic — $12/mo** (2 GB RAM) minimum
- Add your SSH key during creation
- Enable a floating IP

### 2. Follow steps 4–11 from the AWS Lightsail guide above

The process is identical — DigitalOcean Droplets are standard Ubuntu VMs.

### Firewall (ufw)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## Production — Google Cloud Run

Cloud Run is a good serverless option for the Next.js app (PostgreSQL must be on
Cloud SQL or another managed service).

### 1. Build and push Docker image

```bash
# Build
docker build -t gcr.io/<PROJECT_ID>/stacklens:latest .

# Push
docker push gcr.io/<PROJECT_ID>/stacklens:latest
```

> You need a `Dockerfile` in the project root for this. See below.

### 2. Create a Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Deploy to Cloud Run

```bash
gcloud run deploy stacklens \
  --image gcr.io/<PROJECT_ID>/stacklens:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="...",APP_URL="...",SMTP_HOST="..." \
  --port 3000
```

### 4. Set up Cloud SQL (PostgreSQL)

- Create a Cloud SQL PostgreSQL 15 instance in the same region
- Use the Cloud SQL Proxy or private IP in `DATABASE_URL`
- Add `--add-cloudsql-instances` flag to the Cloud Run deploy command

---

## Production — Azure App Service

### 1. Create App Service

```bash
# Login
az login

# Create resource group
az group create --name stacklens-rg --location eastus

# Create App Service plan
az appservice plan create \
  --name stacklens-plan \
  --resource-group stacklens-rg \
  --sku B2 \
  --is-linux

# Create web app
az webapp create \
  --resource-group stacklens-rg \
  --plan stacklens-plan \
  --name stacklens-app \
  --runtime "NODE:20-lts"
```

### 2. Configure environment variables

```bash
az webapp config appsettings set \
  --resource-group stacklens-rg \
  --name stacklens-app \
  --settings \
    DATABASE_URL="..." \
    APP_URL="https://stacklens-app.azurewebsites.net" \
    SMTP_HOST="smtp.gmail.com" \
    SMTP_PORT="587" \
    SMTP_SECURE="false" \
    SMTP_USER="..." \
    SMTP_PASS="..." \
    SMTP_FROM="..."
```

### 3. Deploy via GitHub Actions or ZIP deploy

```bash
# Build locally
npm run build

# ZIP and deploy
zip -r deploy.zip . -x "node_modules/*" ".git/*"
az webapp deployment source config-zip \
  --resource-group stacklens-rg \
  --name stacklens-app \
  --src deploy.zip
```

### 4. Set up Azure Database for PostgreSQL

- Create a Flexible Server instance (PostgreSQL 15)
- Set `DATABASE_URL` to the Azure PostgreSQL connection string
- Whitelist the App Service outbound IPs in the PostgreSQL firewall

---

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # Replace with your static IP if no domain:
    # server_name 18.143.224.244;

    # Redirect HTTP to HTTPS (remove this block if no SSL yet)
    # return 301 https://$host$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Serve Next.js static assets with caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    client_max_body_size 10M;
}
```

---

## HTTPS with Let's Encrypt

Run this after your domain's DNS is pointing to your server:

```bash
sudo apt install -y certbot python3-certbot-nginx

sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (runs twice daily)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

After certbot runs, update `APP_URL` in `.env` to `https://yourdomain.com` and restart:

```bash
pm2 restart stacklens
```

---

## Process Management with PM2

```bash
# Start
pm2 start "npm start" --name stacklens

# Stop
pm2 stop stacklens

# Restart
pm2 restart stacklens

# View logs (live)
pm2 logs stacklens

# View last 100 lines
pm2 logs stacklens --lines 100

# Monitor CPU/memory
pm2 monit

# List all processes
pm2 list

# Save process list (survives reboot)
pm2 save

# Set PM2 to start on boot
pm2 startup
# → Run the command it prints
```

---

## Updating the Application

After pushing new code to GitHub, SSH into the server and run:

```bash
cd ~/Devops-Discovery-Platform
git pull
npm install          # only needed if package.json changed
npm run build
pm2 restart stacklens
```

If you changed the database schema (`src/db/schema.ts`):

```bash
npx drizzle-kit push
pm2 restart stacklens
```

---

## Troubleshooting

### App not loading / 502 Bad Gateway

```bash
# Check if Next.js is running
pm2 list
pm2 logs stacklens --lines 50

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
sudo journalctl -u nginx --since "10 min ago"

# Restart everything
pm2 restart stacklens
sudo systemctl reload nginx
```

### Database connection error

```bash
# Check PostgreSQL container is running
docker ps

# Start it if stopped
docker compose up -d

# Test connection manually
docker exec -it opsatlas-db psql -U postgres -d opsatlas -c "SELECT 1;"

# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Build fails on the server

```bash
# Check Node version (need 18+)
node --version

# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

### Email verification not sending

```bash
# Check SMTP config in .env
cat .env | grep SMTP

# Test SMTP connection
node -e "
const nodemailer = require('nodemailer');
const t = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
t.verify().then(() => console.log('SMTP OK')).catch(console.error);
" 
```

### Port 3000 not accessible from outside

Do not expose port 3000 directly — use Nginx on port 80. Check Lightsail/Droplet
firewall allows port 80, and that Nginx is running:

```bash
sudo systemctl status nginx
curl http://localhost:3000   # should return HTML
curl http://localhost        # through Nginx, should also return HTML
```

### Resource cards blank on homepage

This was a Framer Motion opacity issue fixed in the latest code. Ensure you've
pulled the latest changes and rebuilt:

```bash
git pull && npm run build && pm2 restart stacklens
```

---

## Quick Reference

```bash
# Full deploy from scratch (after SSH)
git clone https://github.com/code-and-secure/Devops-Discovery-Platform.git
cd Devops-Discovery-Platform
npm install
nano .env                    # add environment variables
docker compose up -d         # start PostgreSQL
npx drizzle-kit push         # create tables
npm run build                # build Next.js
pm2 start "npm start" --name stacklens
pm2 save && pm2 startup

# Update existing deployment
cd ~/Devops-Discovery-Platform
git pull && npm install && npm run build && pm2 restart stacklens
```
