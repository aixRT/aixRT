'use client';

import { useState } from 'react';

interface Signal {
  id: string;
  agentName: string;
  type: 'buy' | 'sell' | 'hold';
  confidence: number;
  timestamp: string;
  price: number;
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);

  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-aixrt-gold">Signals</h1>
      
      {/* Signals Overview */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-aixrt-navy/50 p-6 rounded-lg border border-aixrt-gold/20">
          <h3 className="text-lg font-medium text-aixrt-gold mb-2">Buy Signals</h3>
          <p className="text-2xl font-bold">{signals.filter(s => s.type === 'buy').length}</p>
        </div>
        <div className="bg-aixrt-navy/50 p-6 rounded-lg border border-aixrt-gold/20">
          <h3 className="text-lg font-medium text-aixrt-gold mb-2">Sell Signals</h3>
          <p className="text-2xl font-bold">{signals.filter(s => s.type === 'sell').length}</p>
        </div>
        <div className="bg-aixrt-navy/50 p-6 rounded-lg border border-aixrt-gold/20">
          <h3 className="text-lg font-medium text-aixrt-gold mb-2">Hold Signals</h3>
          <p className="text-2xl font-bold">{signals.filter(s => s.type === 'hold').length}</p>
        </div>
      </div>

      {/* Signals List */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Recent Signals</h2>
        {signals.length === 0 ? (
          <p className="text-gray-400">No signals generated yet</p>
        ) : (
          <div className="space-y-4">
            {signals.map((signal) => (
              <div
                key={signal.id}
                className="flex items-center justify-between bg-aixrt-navy p-4 rounded-lg
                         border border-aixrt-gold/20 hover:border-aixrt-gold/40 transition-colors duration-200"
              >
                <div>
                  <p className="font-medium text-aixrt-gold">{signal.agentName}</p>
                  <p className="text-sm text-gray-400">
                    Price: ${signal.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-lg ${
                    signal.type === 'buy' ? 'bg-emerald-500/20 text-emerald-400' :
                    signal.type === 'sell' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {signal.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(signal.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
