export interface Agent {
  id: string;
  name: string;
  mcapInVirtual: number;
  holderCount: number;
  totalValueLocked: number;
  priceHistory: PricePoint[];
}

export interface PricePoint {
  price: number;
  timestamp: string;
}

export interface NotificationSettings {
  discord: {
    enabled: boolean;
    webhooks: string[];
  };
  telegram: {
    enabled: boolean;
    botToken?: string;
    chatIds: string[];
  };
}

export interface ThresholdSettings {
  micro: ThresholdTimes;  // < 10k VIRTUAL
  small: ThresholdTimes;  // 10k-50k VIRTUAL
  medium: ThresholdTimes; // 50k-200k VIRTUAL
  large: ThresholdTimes;  // 200k-1M VIRTUAL
  mega: ThresholdTimes;   // > 1M VIRTUAL
}

export interface ThresholdTimes {
  fiveMin: number;
  oneHour: number;
  oneDay: number;
}
