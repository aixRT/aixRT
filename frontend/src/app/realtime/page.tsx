'use client';

import { useState, useEffect } from 'react';

interface PriceData {
  agentName: string;
  price: number;
  priceChange: number;
  volume24h: number;
  lastUpdate: string;
}

export default function RealTimePage() {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-aixrt-gold">Real-Time Monitor</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`} />
          <span className="text-sm text-gray-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Price Feed */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Live Price Feed</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-aixrt-gold/20">
            <thead className="bg-aixrt-navy/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-aixrt-gold">Agent</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-aixrt-gold">Price</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-aixrt-gold">Change</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-aixrt-gold">Volume (24h)</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-aixrt-gold">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aixrt-gold/20 bg-aixrt-navy/30">
              {priceData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                    No price data available
                  </td>
                </tr>
              ) : (
                priceData.map((data) => (
                  <tr key={data.agentName} className="hover:bg-aixrt-navy/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {data.agentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      ${data.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${
                        data.priceChange > 0 ? 'text-emerald-400' :
                        data.priceChange < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {data.priceChange > 0 ? '+' : ''}{data.priceChange.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      ${data.volume24h.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(data.lastUpdate).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Placeholder for Charts */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-aixrt-navy/50 rounded-lg p-6 border border-aixrt-gold/20 h-64">
          <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Price Chart</h2>
          <div className="flex items-center justify-center h-full text-gray-400">
            Chart coming soon
          </div>
        </div>
        <div className="bg-aixrt-navy/50 rounded-lg p-6 border border-aixrt-gold/20 h-64">
          <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Volume Chart</h2>
          <div className="flex items-center justify-center h-full text-gray-400">
            Chart coming soon
          </div>
        </div>
      </div>
    </div>
  );
}
