'use client';

import { Agent } from '@/types';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const priceChange = 0; // Calculate from price history

  // Safely format numbers with fallbacks
  const formatNumber = (num: number | undefined) => {
    if (num === undefined || isNaN(num)) return '0';
    return num.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{agent.name || 'Unknown'}</h3>
          <p className="text-sm text-gray-500">#{agent.id || '0'}</p>
        </div>
        <div className={`flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {priceChange >= 0 ? (
            <ArrowUpIcon className="h-5 w-5" />
          ) : (
            <ArrowDownIcon className="h-5 w-5" />
          )}
          <span className="ml-1 font-medium">{Math.abs(priceChange)}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Market Cap</span>
          <span className="font-medium">{formatNumber(agent.mcapInVirtual)} VIRTUAL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Holders</span>
          <span className="font-medium">{formatNumber(agent.holderCount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">TVL</span>
          <span className="font-medium">{formatNumber(agent.totalValueLocked)}</span>
        </div>
      </div>
    </div>
  );
}
