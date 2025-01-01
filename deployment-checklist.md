# Virtual Monitor Deployment Checklist

## 1. Frontend (Vercel) Setup
- [ ] Create Vercel account
- [ ] Install Vercel CLI
  ```bash
  npm i -g vercel
  ```
- [ ] Configure environment variables in Vercel
  - [ ] `NEXT_PUBLIC_API_URL` (pointing to DigitalOcean backend)
- [ ] Deploy frontend
  ```bash
  cd frontend
  vercel
  ```
- [ ] Deploy to production
  ```bash
  vercel --prod
  ```

## 2. Backend (DigitalOcean) Setup
- [ ] Create DigitalOcean account
- [ ] Create new Droplet
  - [ ] Ubuntu 22.04 LTS
  - [ ] Basic plan ($5-$10/month)
  - [ ] Choose datacenter region
  - [ ] Add SSH key

### Initial Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install python3-pip python3-venv nginx certbot python3-certbot-nginx -y

# Create application directory
mkdir -p /var/www/virtual-monitor
```

### Python Environment Setup
```bash
cd /var/www/virtual-monitor
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Process Manager Setup
```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

## 3. Configuration Files
- [ ] Create systemd service file for auto-restart
- [ ] Setup Nginx as reverse proxy
- [ ] Configure SSL with Let's Encrypt
- [ ] Setup environment variables
  - [ ] `DISCORD_WEBHOOK_URL`
  - [ ] `TELEGRAM_BOT_TOKEN`
  - [ ] Other API keys/secrets

## 4. Domain & DNS Setup
- [ ] Purchase/configure domain (if needed)
- [ ] Set up DNS records
  - [ ] Frontend: point to Vercel
  - [ ] Backend: point to DigitalOcean IP
- [ ] Configure SSL certificates

## 5. Deployment Scripts
- [ ] Create deployment script for backend
- [ ] Setup GitHub Actions for automated deployment
- [ ] Configure backup system

## 6. Monitoring & Logging
- [ ] Setup basic monitoring
  - [ ] CPU usage
  - [ ] Memory usage
  - [ ] Disk usage
- [ ] Configure log rotation
- [ ] Setup error alerting

## 7. Testing
- [ ] Test frontend-backend communication
- [ ] Test Discord notifications
- [ ] Test Telegram notifications
- [ ] Load testing
- [ ] Error handling verification

## 8. Documentation
- [ ] Update README with deployment info
- [ ] Document maintenance procedures
- [ ] Create troubleshooting guide