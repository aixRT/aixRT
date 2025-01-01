// src/lib/services/priceMonitor.ts
import { fetchTokenData, fetchTokenInfo } from '../api';
import { PRICE_ALERT_THRESHOLDS } from '../constants';
import { sendDiscordAlert } from './notifications';

export interface PriceAlert {
  tokenAddress: string;
  network: string;
  currentPrice: number;
  previousPrice: number;
  percentageChange: number;
  marketCap: number;
  timestamp: number;
}

export class PriceMonitor {
  private priceCache: Map<string, { price: number; timestamp: number }> = new Map();
  
  constructor() {
    // Initialize price cache
    this.priceCache = new Map();
  }

  private getThreshold(marketCap: number): number {
    if (marketCap < PRICE_ALERT_THRESHOLDS.MICRO_CAP.marketCap) {
      return PRICE_ALERT_THRESHOLDS.MICRO_CAP.priceChange;
    } else if (marketCap < PRICE_ALERT_THRESHOLDS.SMALL_CAP.marketCap) {
      return PRICE_ALERT_THRESHOLDS.SMALL_CAP.priceChange;
    } else if (marketCap < PRICE_ALERT_THRESHOLDS.MID_CAP.marketCap) {
      return PRICE_ALERT_THRESHOLDS.MID_CAP.priceChange;
    } else {
      return PRICE_ALERT_THRESHOLDS.LARGE_CAP.priceChange;
    }
  }

  public async checkPrice(tokenAddress: string, network: string): Promise<PriceAlert | null> {
    try {
      const tokenData = await fetchTokenData(tokenAddress, network);
      const tokenInfo = await fetchTokenInfo(tokenAddress, network);
      
      const currentPrice = tokenData.data?.attributes?.price_usd || 0;
      const marketCap = tokenInfo.data?.attributes?.market_cap_usd || 0;
      const currentTime = Date.now();

      // Get cached price
      const cached = this.priceCache.get(tokenAddress);
      
      if (!cached) {
        this.priceCache.set(tokenAddress, {
          price: currentPrice,
          timestamp: currentTime
        });
        return null;
      }

      const threshold = this.getThreshold(marketCap);
      const percentageChange = (currentPrice - cached.price) / cached.price;

      // Check if change exceeds threshold
      if (Math.abs(percentageChange) >= threshold) {
        const alert: PriceAlert = {
          tokenAddress,
          network,
          currentPrice,
          previousPrice: cached.price,
          percentageChange,
          marketCap,
          timestamp: currentTime
        };

        // Update cache
        this.priceCache.set(tokenAddress, {
          price: currentPrice,
          timestamp: currentTime
        });

        // Send alert
        await this.handleAlert(alert);
        
        return alert;
      }

      return null;
    } catch (error) {
      console.error('Error checking price:', error);
      return null;
    }
  }

  private async handleAlert(alert: PriceAlert): Promise<void> {
    try {
      const message = this.formatAlertMessage(alert);
      await sendDiscordAlert(message);
    } catch (error) {
      console.error('Error handling alert:', error);
    }
  }

  private formatAlertMessage(alert: PriceAlert): string {
    const direction = alert.percentageChange > 0 ? '📈 Increased' : '📉 Decreased';
    const percentage = (alert.percentageChange * 100).toFixed(2);
    
    return `
🚨 Price Alert for ${alert.tokenAddress}
${direction} by ${percentage}%
Current Price: $${alert.currentPrice.toFixed(6)}
Previous Price: $${alert.previousPrice.toFixed(6)}
Market Cap: $${alert.marketCap.toLocaleString()}
Network: ${alert.network}
    `.trim();
  }
}