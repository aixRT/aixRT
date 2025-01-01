# aixRT - AI Exchange Real-Time

A sophisticated monitoring and analytics platform for Virtual Protocol agents, providing real-time data, portfolio tracking, and AI-powered insights.

## Features

### Core Functionality
- **Dashboard**: Central command center for monitoring key metrics and recent activity
- **Holdings**: Track portfolio value, token balances, and performance metrics across wallets
- **Agents**: Monitor Virtual Protocol agents with market cap tracking and holder analytics
- **Real-Time**: Watch live price movements, volume changes, and market activity
- **Signals**: Receive AI-powered trading signals with confidence ratings
- **Alerts**: Configure custom notifications for price, volume, and holder changes

### Technical Features
- Built with Next.js 14 and React
- TypeScript for type safety
- Tailwind CSS for modern styling
- Real-time data updates
- Responsive design
- Dark mode optimized

## Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/aixrt.git
cd aixrt
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your API keys and configuration

4. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to view the application

## Project Structure
```
frontend/
  ├── src/
  │   ├── app/         # Next.js pages
  │   ├── components/  # Reusable components
  │   └── lib/         # Utilities and APIs
  └── public/          # Static assets
```

## API Integrations
- GeckoTerminal for market data
- DexScreener for price feeds
- Blockchain APIs for wallet data

## Development

### Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linting
npm run test     # Run tests
```

### Style Guide
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain consistent component structure
- Add JSDoc comments for documentation

### Color Scheme
- Primary: aixrt-navy (backgrounds)
- Secondary: aixrt-purple (accents)
- Accent: aixrt-gold (highlights)

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
This project is proprietary software. All rights reserved.

## Support
For support, please open an issue in the repository or contact the development team.
