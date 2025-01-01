# aixRT (AI Exchange Real-Time) Project Documentation

This comprehensive documentation covers all aspects of the aixRT project and should be excellent for training a custom GPT. It includes:
1. Project overview and architecture
2. Detailed component descriptions
3. Configuration and thresholds
4. Alert system functionality
5. Development setup
6. Best practices
7. Future features
8. Technical details

## Project Overview
aixRT (AI Exchange Real-Time) is a sophisticated monitoring and analytics platform designed for tracking Virtual Protocol agents and market activity. The platform provides real-time data, portfolio tracking, and AI-powered insights for traders and investors.

## System Architecture

### Core Components
- Frontend (Vercel)
  - React-based user interface
  - Web3 wallet integration
  - Real-time monitoring displays
- Backend (Digital Ocean)
  - WebSocket connections
  - Price monitoring engine
  - Alert system
- Data Sources
  - GeckoTerminal API
  - DexScreener API
- Notification Systems
  - Discord webhooks
  - Telegram bot

## Core Features

### Dashboard
- Central command center for monitoring key metrics
- Overview of recent activity and important notifications
- Quick access to essential features

### Holdings
- Portfolio value tracking
- Token balance monitoring
- Performance metrics across multiple wallets
- Historical performance analysis

### Agents
- Virtual Protocol agent monitoring
- Market cap tracking and analysis
- Holder distribution analytics
- Agent search and filtering capabilities

### Real-Time Monitoring
- Live price movement tracking
- Volume change monitoring
- Market activity updates
- Real-time data visualization

### Signals
- AI-powered trading signals
- Confidence ratings
- Historical performance data
- Signal analysis and metrics

### Alerts
- Custom price movement notifications
- Volume change alerts
- Holder count updates
- Multi-channel notification options

## Roadmap

### Phase 1: Core Infrastructure (Current)
1. **Authentication System**
   - Web3 wallet integration
   - Token-gated access (500,000 AIXRT requirement)
   - JWT-based API authentication

2. **Real-Time Price Monitoring**
   - GeckoTerminal API integration
   - WebSocket connections for live data
   - Basic price movement tracking
   - Market cap-based threshold system

3. **Alert System Foundation**
   - Discord webhook integration
   - Telegram bot setup
   - Basic price movement alerts
   - Alert delivery system

### Phase 2: Essential Features
4. **Holdings Tracking**
   - Wallet balance monitoring
   - Portfolio value calculation
   - Token performance metrics
   - Multi-wallet support

5. **Agent Monitoring**
   - Virtual Protocol API integration
   - Agent market data tracking
   - Basic agent analytics
   - Agent search functionality

6. **Dashboard**
   - Real-time price displays
   - Recent alerts overview
   - Quick access to key features
   - Basic portfolio summary

### Phase 3: Advanced Features
7. **Enhanced Analytics**
   - Volume spike detection
   - Order flow analysis
   - Market trend identification
   - Historical data analysis

8. **Signal System**
   - AI-powered trading signals
   - Signal confidence ratings
   - Historical signal performance
   - Signal filtering and sorting

9. **Advanced Alert System**
   - Custom alert thresholds
   - Multi-timeframe analysis (5m, 15m, 1h)
   - Volume-based alerts
   - Holder count alerts

### Phase 4: Platform Enhancement
10. **User Experience**
    - Advanced filtering options
    - Custom dashboard layouts
    - Dark/light theme support
    - Mobile responsiveness

11. **Performance Optimization**
    - Data caching system
    - API rate limit handling
    - WebSocket connection management
    - Response time optimization

12. **Additional Integrations**
    - SMS notifications
    - Additional data sources
    - Export functionality
    - API documentation

## Project Structure
```
aixRT/
├── frontend/          # Next.js web application
│   ├── src/          # Source code
│   │   ├── app/      # Next.js pages
│   │   ├── components/ # Reusable components
│   │   └── lib/      # Utilities and APIs
│   ├── public/       # Static assets
│   └── config/       # Frontend configuration
├── bot.py            # Command processing
├── config.py         # Configuration management
├── monitor.py        # Core monitoring system
├── notifications.py  # Alert delivery system
├── virtual_api.py    # API integration
├── test_api.py       # API tests
├── test_notification.py # Notification tests
├── test_price_monitor.py # Price monitoring tests
├── requirements.txt  # Python dependencies
├── deployment/       # Deployment configuration
└── project-context/  # Project documentation
```

## Core Components

### 1. Monitor System (`monitor.py`)
The heart of aixRT, responsible for:
- Real-time price movement tracking
- Volume spike detection
- Order flow analysis
- Market cap-based threshold management
- Multi-timeframe analysis (5min, 15min, 1hr)

### 2. Virtual Protocol Integration (`virtual_api.py`)
Handles all interactions with the Virtuals Protocol API:
- Base URL: https://api.virtuals.io/api/virtuals
- Endpoints:
  - `/agents`: Agent-specific data
  - `/market`: Market-wide statistics
- Features:
  - Robust error handling
  - Rate limiting protection
  - Response validation
  - Detailed logging

### 3. Notification System (`notifications.py`)
Multi-channel notification delivery:
- Discord integration via webhooks
- Telegram integration via bot API
- Extensible design for future channels (SMS planned)
- Message formatting per channel
- Delivery confirmation
- Error handling and retries

### 4. Configuration Management (`config.py`)
Centralized configuration system:
- Environment variable management
- Market cap thresholds:
  ```
  MICRO:  < 10k VIRTUAL    (5min: 10%, 1hr: 20%, 24hr: 30%)
  SMALL:  10k-50k VIRTUAL  (5min: 7%,  1hr: 15%, 24hr: 25%)
  MEDIUM: 50k-200k VIRTUAL (5min: 5%,  1hr: 10%, 24hr: 20%)
  LARGE:  200k-1M VIRTUAL  (5min: 3%,  1hr: 7%,  24hr: 15%)
  MEGA:   > 1M VIRTUAL     (5min: 2%,  1hr: 5%,  24hr: 10%)
  ```
- Alert configurations
- API endpoints
- Logging settings

### 5. Bot Interface (`bot.py`)
Command processing and user interaction:
- Commands:
  - `!monitor <token>`: Start monitoring
  - `!stop <token>`: Stop monitoring
  - `!list`: Show monitored tokens
  - `!help`: Display commands
  - `!settings`: Show current configuration

### Token Integration
- Launched as a Virtuals Protocol agent
- Token ticker: AIXRT
- Utility features:
  - Access to premium monitoring features
  - Enhanced alert configurations
  - Priority notifications
  - Custom threshold settings

## Alert System

### Price Monitoring
- Standard threshold: 3.0% change
- Rapid movement: 1.5% in 1 minute
- Market cap adjusted thresholds
- Multiple timeframe analysis

### Volume Monitoring
- Spike threshold: 50% increase from average
- Window: 12 hours (720 minutes)
- Rapid spike: 25% in 1 minute
- Moving average comparisons

### Order Flow Analysis
- Minimum order: 50 VIRTUAL
- Large order: 500 VIRTUAL
- Time windows:
  ```
  1 minute:  3+ orders
  3 minutes: 8+ orders
  5 minutes: 12+ orders
  15 minutes: Custom thresholds
  ```

## Development Setup

### Environment Configuration
Required variables:
```env
BASE_URL=https://api.virtuals.io/api/virtuals
DISCORD_WEBHOOK_URL=<webhook_url>
TELEGRAM_BOT_TOKEN=<bot_token>
TELEGRAM_CHAT_IDS=["id1","id2"]
```

### Installation
```bash
# Backend setup
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Run the monitor
python monitor.py
```

## Frontend Integration
- Modern web interface
- Real-time data display
- Settings management
- Alert history
- Market statistics

## New Feature: Holdings Page

### Objective:
Create a "Holdings" page in the aixRT platform that allows users to:

- Add multiple wallet addresses manually.
- Display an overview of wallet holdings, including token balances, values, and relevant metadata (e.g., market cap, price changes).
- Serve as a fallback for when external tools (like Virtuals Protocol’s profile page) are unavailable.

### Feature Requirements

#### Wallet Address Management:
- Allow users to input and save multiple wallet addresses.
- Enable the ability to edit or delete saved wallet addresses.

#### Data Retrieval:
- Integrate with APIs like:
  - Dexscreener: For token data and price updates.
  - GeckoTerminal or CoinGecko: For token metadata, including market cap and price fluctuations.
  - Blockchain-specific APIs (e.g., Etherscan, BaseScan) to fetch raw wallet data.

#### UI/UX:
- Display holdings in an organized, visually appealing dashboard:
  - Token name, symbol, balance, and current value.
  - Price change percentages (e.g., 24-hour change).
  - Overall portfolio value and asset allocation breakdown.

#### Error Handling:
- Handle errors gracefully, such as API rate limits or invalid wallet addresses.
- Display appropriate fallback messages if no data is available.

#### Performance Optimization:
- Use asynchronous requests to fetch data efficiently for multiple wallets.
- Cache data to reduce API call frequency.

## Best Practices
1. Error Handling
   - API failures
   - Network issues
   - Rate limiting
   - Invalid data

2. Performance
   - Efficient API calls
   - Request batching
   - Response caching
   - Resource management

3. Security
   - API key management
   - Webhook URL protection
   - Bot token security
   - Rate limiting

## Upcoming Features
1. SMS Notifications
   - Twilio integration
   - Priority alerts
   - Multiple numbers
   
2. Enhanced Analytics
   - Market sentiment
   - Trend analysis
   - Pattern recognition

3. Advanced Alerts
   - Custom thresholds
   - Alert combinations
   - Time-based rules

## Technical Details

### Alert Profiles
1. Conservative
   - Lower sensitivity
   - Fewer false positives
   - Longer timeframes

2. Balanced
   - Moderate thresholds
   - Standard timeframes
   - Regular updates

3. Aggressive
   - High sensitivity
   - Quick notifications
   - Short timeframes

### Market Analysis
- Price change calculation
- Volume analysis
- Order book monitoring
- Market cap tracking
- Trend detection

### API Integration
- RESTful endpoints
- JSON responses
- Authentication
- Rate limiting
- Error handling
