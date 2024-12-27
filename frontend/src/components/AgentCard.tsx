'use client';

import { Agent } from '@/types';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const isPositive = agent.priceHistory?.[agent.priceHistory.length - 1]?.change > 0;

  return (
    <div className="p-6 bg-aixrt-navy/30 rounded-lg border border-aixrt-gold/20 backdrop-blur-sm shadow-xl transition-all duration-200 hover:shadow-aixrt-gold/20 hover:border-aixrt-gold/40">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-aixrt-gold">{agent.name}</h3>
          <p className="text-sm text-gray-400">{agent.description}</p>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? (
            <ArrowTrendingUpIcon className="w-6 h-6" />
          ) : (
            <ArrowTrendingDownIcon className="w-6 h-6" />
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-aixrt-navy/50 rounded-lg border border-aixrt-gold/10">
          <p className="text-sm text-gray-400">TVL</p>
          <p className="text-lg font-semibold text-aixrt-gold">
            ${agent.totalValueLocked.toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-aixrt-navy/50 rounded-lg border border-aixrt-gold/10">
          <p className="text-sm text-gray-400">24h Change</p>
          <p className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{agent.priceHistory?.[agent.priceHistory.length - 1]?.change.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-20 w-full bg-aixrt-navy/50 rounded-lg border border-aixrt-gold/10 overflow-hidden">
          {/* Price chart will go here */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-sm text-gray-400">Chart Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
