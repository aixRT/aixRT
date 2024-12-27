export interface Agent {
  id: string;
  name: string;
  type: 'MICRO_CAP' | 'SMALL_CAP' | 'MID_CAP' | 'LARGE_CAP';
  marketCap: number;
  priceChange: {
    fiveMin: number;
    fifteenMin: number;
    oneHour: number;
  };
  alertProfile: 'Conservative' | 'Balanced' | 'Aggressive';
  timeWindow: '5min' | '15min' | '1hr';
  totalValueLocked: number;
  priceHistory?: Array<{
    timestamp: number;
    price: number;
    change: number;
  }>;
}
