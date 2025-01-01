# API Documentation

## GeckoTerminal API Integration

### Overview
GeckoTerminal is our primary data source for real-time market data, price information, and trading analytics. We use it to monitor token prices, analyze market movements, and trigger alerts.

### Endpoints and Usage

#### 1. Pool Information
```typescript
GET /pools/{network}/{address}
```
Used to fetch detailed information about a specific trading pool, including:
- Liquidity information
- Token pair data
- Trading volume
- Current price

#### 2. OHLCV Data
```typescript
GET /pools/{network}/{address}/ohlcv/{timeframe}
```
Fetches price candlestick data with configurable timeframes:
- Timeframes: 5m, 15m, 1h, 4h, 1d
- Default limit: 100 candles
- Used for price change calculations and trend analysis

#### 3. Trade Data
```typescript
GET /pools/{network}/{address}/trades
```
Retrieves recent trades for a specific pool:
- Transaction details
- Price impact
- Volume information

### Implementation
```typescript
export class GeckoTerminalAPI {
  // Get pool details
  static async getPool(network: string, address: string): Promise<Pool>

  // Get OHLCV data with configurable timeframe
  static async getOHLCV(
    network: string, 
    address: string, 
    timeframe: '5m' | '15m' | '1h' | '4h' | '1d' = '1h',
    limit: number = 100
  ): Promise<OHLCVData[]>

  // Get recent trades
  static async getTrades(
    network: string,
    address: string,
    limit: number = 100
  ): Promise<TradeData[]>
}
```

## Virtuals Protocol API

### Authentication and Access
- API Key required in X-API-KEY header
- Access tokens required for agent interactions
- Token refresh every 30 minutes

### Endpoints

#### 1. Get Agent Details
```typescript
GET <baseURL>/api/virtuals/:virtualId
```
Retrieves detailed information about a specific agent.

#### 2. Obtain Access Token
```typescript
POST <baseURL>/api/accesses/tokens
Headers:
- X-API-KEY: <Your API token>

Body:
{
  "data": {
    "userUid": "<userUid>",
    "virtualUid": "<virtualUid>"
  }
}
```

#### 3. Agent Module Prompt
```typescript
POST <token.claims.runner>/prompts
Headers:
- Authorization: Bearer <access token>

Body:
{
  "data": {
    "prompt": "<user's text prompt>"
  }
}
```

### Error Handling
1. 400 Errors
   - Token expiration
   - Invalid parameters
   - Missing required fields

2. 500 Errors
   - Server issues
   - Rate limiting
   - Network problems

## Best Practices
1. Implement token refresh mechanism
2. Cache GeckoTerminal responses when appropriate
3. Handle rate limits for both APIs
4. Implement proper error handling
5. Use appropriate timeout values
6. Monitor API response times and errors
