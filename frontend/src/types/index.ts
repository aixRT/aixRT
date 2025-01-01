export interface Agent {
  id: string;
  name: string;
  ticker: string;
  category: string;
  marketCap: number;
  holders: number;
}

export type AlertType = 'price' | 'volume' | 'holders';

export interface Alert {
  type: AlertType;
  threshold: number;
  agent: string;
  id?: string;
  enabled?: boolean;
}

export interface NewAlert {
  type: AlertType;
  threshold: number;
  agent: string;
}

// Add any other shared types here