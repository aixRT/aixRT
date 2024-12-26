#!/bin/bash

# Stop existing service if running
systemctl stop virtual-monitor

# Navigate to project directory
cd /root/virtual-monitor

# Pull latest changes
git pull

# Update virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Copy systemd service file
cp deployment/virtual-monitor.service /etc/systemd/system/

# Reload systemd and restart service
systemctl daemon-reload
systemctl enable virtual-monitor
systemctl start virtual-monitor

# Show status
systemctl status virtual-monitor
