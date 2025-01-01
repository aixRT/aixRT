// src/lib/constants.ts
export const API_URLS = {
    GECKO: '/api/gecko',
    VIRTUALS: '/api/virtuals',
    DISCORD_WEBHOOK: process.env.DISCORD_WEBHOOK_URL || ''
  };
  
  export const NETWORKS = {
    BASE: 'base'
  };
  
  export const PRICE_ALERT_THRESHOLDS = {
    MICRO_CAP: {
      marketCap: 1000,
      priceChange: 0.10  // 10%
    },
    SMALL_CAP: {
      marketCap: 10000,
      priceChange: 0.07  // 7%
    },
    MID_CAP: {
      marketCap: 100000, 
      priceChange: 0.05  // 5%
    },
    LARGE_CAP: {
      marketCap: Infinity,
      priceChange: 0.03  // 3%
    }
  };