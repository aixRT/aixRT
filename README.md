# aixRT

A real-time monitoring tool for Virtual Protocol agents. Track price movements, set alerts, and receive instant notifications through Discord or Telegram.
# aixRT

A real-time monitoring tool for Virtual Protocol agents. Track price movements, set alerts, and receive instant notifications through Discord or Telegram.

## Features

### Price Movement Tracking
- Customizable alert profiles (Conservative, Balanced, Aggressive)
- Time windows: 5min, 15min, 1hr
- Market cap based thresholds:
  - Micro Cap: 5-15% (based on profile)
  - Small Cap: 4-10% (based on profile)
  - Mid Cap: 3-7% (based on profile)
  - Large Cap: 2-5% (based on profile)

### Notification Options
- Discord webhooks integration
- Telegram bot integration
- Test notification feature
- Customizable alert messages

### User Interface
- Clean, modern web interface
- Real-time agent monitoring
- Easy settings configuration
- Market cap indicators
- Visual price charts

## Quick Start

### Using the Web Interface
1. Visit [Virtual Monitor](https://virtual-monitor.vercel.app)
2. Configure your notification preferences:
   - Add Discord webhook URL and/or
   - Set up Telegram bot token and chat ID
3. Choose your alert profile (Conservative/Balanced/Aggressive)
4. Select your preferred time window
5. Start monitoring!

### Manual Setup
If you prefer manual setup:

1. Clone the repository
```bash
git clone https://github.com/yourusername/virtual-monitor.git
cd virtual-monitor
```

2. Install dependencies
```bash
# Backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

3. Configure environment variables
```bash
# Create .env file in root directory
cp .env.example .env
# Edit .env with your settings
```

4. Start the services
```bash
# Backend
python monitor.py

# Frontend (in another terminal)
cd frontend
npm run dev
```

## Upcoming Features

### Alert Types
- ⚡ Rapid movement alerts for sudden changes
- 🚨 Regular movement alerts
- 💰 Large order alerts
- 📈 Volume spike alerts

### Volume Activity Tracking
- Regular volume spikes ≥ 50%
- Rapid volume surges ≥ 25% in 1 minute
- Comparisons against 1-hour moving average

### Order Flow Monitoring
- Checks every 30 seconds
- Minimum order value: 50 VIRTUAL
- Large order threshold: 500 VIRTUAL
- Multiple time windows:
  - 1min: 3+ orders
  - 3min: 8+ orders
  - 5min: 12+ orders
  - 15min: 25+ orders

## Price Alerts:
- Tracks significant price movements (configurable threshold)
- Alerts on both upward and downward movements
- Percentage-based triggers
- Price Level Alerts:
  - Set specific price targets for individual agents
  - Alert when price crosses above/below target levels
  - Multiple price levels per agent
  - Easy to add/remove price targets
  - Visual price level management in settings

### Enhanced Market Analysis
- Market sentiment analysis based on buy/sell ratios
- Price trend prediction using moving averages
- Historical performance metrics
- Custom indicator support

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
