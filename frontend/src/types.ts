export interface Agent {
  id: string;
  name: string;
  ticker: string;
  type: 'MICRO_CAP' | 'SMALL_CAP' | 'MID_CAP' | 'LARGE_CAP';
  category: 'FUNCTIONAL' | 'IP_MIRROR' | 'OTHER';
  marketCap: number;
  price: number;
  holders: number;
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
