// src/lib/services/monitoringManager.ts
import { PriceMonitor } from './priceMonitor';

export class MonitoringManager {
  private priceMonitor: PriceMonitor;
  private monitoredTokens: Set<string>;
  private intervalId: NodeJS.Timeout | null;

  constructor() {
    this.priceMonitor = new PriceMonitor();
    this.monitoredTokens = new Set();
    this.intervalId = null;
  }

  public addToken(tokenAddress: string): void {
    this.monitoredTokens.add(tokenAddress);
  }

  public removeToken(tokenAddress: string): void {
    this.monitoredTokens.delete(tokenAddress);
  }

  public start(interval: number = 60000): void { // Default 1 minute
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.checkAllTokens();
    }, interval);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private async checkAllTokens(): Promise<void> {
    const promises = Array.from(this.monitoredTokens).map(tokenAddress => 
      this.priceMonitor.checkPrice(tokenAddress, 'base')
    );

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error('Error checking tokens:', error);
    }
  }
}