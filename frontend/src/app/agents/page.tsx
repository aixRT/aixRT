'use client';

import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { fetchTokenData, fetchTokenInfo } from '@/lib/api';

// This interface goes at the top of the file
interface Agent {
  id: string;
  name: string;
  ticker: string;
  category: string;
  marketCap: number;
  holders: number;
  priceUSD?: number;
  priceChange24h?: number;
  volume24h?: number;
  liquidity?: number;
}

type MarketCapFilter = 'ALL' | 'MICRO' | 'SMALL' | 'MID' | 'LARGE';

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [marketCapFilter, setMarketCapFilter] = useState<MarketCapFilter>('ALL');

  // This is your updated fetchAgents function
  const fetchAgents = async () => {
    try {
      setLoading(true);
      // First get the list of agents
      const response = await fetch('/api/agents');
      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }
      const data = await response.json();
      
      // Enhance agents with market data
      const enhancedAgents = await Promise.all(
        data.agents.map(async (agent: Agent) => {
          try {
            // Get market data from GeckoTerminal
            const marketData = await fetchTokenData(agent.id);
            const tokenInfo = await fetchTokenInfo(agent.id);
            
            return {
              ...agent,
              priceUSD: marketData.data?.attributes?.price_usd || 0,
              priceChange24h: marketData.data?.attributes?.price_change_24h || 0,
              volume24h: marketData.data?.attributes?.volume_24h || 0,
              liquidity: marketData.data?.attributes?.reserve_in_usd || 0
            };
          } catch (error) {
            console.error(`Error fetching market data for ${agent.name}:`, error);
            return agent;
          }
        })
      );

      setAgents(enhancedAgents);
      setError('');
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Your existing search and filter functions stay the same
  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // Your existing getFilteredAgents function stays the same
  const getFilteredAgents = () => {
    return agents.filter(agent => {
      const searchMatch = 
        agent.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.name.toLowerCase().includes(searchTerm.toLowerCase());

      let marketCapMatch = true;
      switch (marketCapFilter) {
        case 'MICRO':
          marketCapMatch = agent.marketCap < 1000;
          break;
        case 'SMALL':
          marketCapMatch = agent.marketCap >= 1000 && agent.marketCap < 10000;
          break;
        case 'MID':
          marketCapMatch = agent.marketCap >= 10000 && agent.marketCap < 100000;
          break;
        case 'LARGE':
          marketCapMatch = agent.marketCap >= 100000;
          break;
        default:
          marketCapMatch = true;
      }

      return searchMatch && marketCapMatch;
    });
  };

  const filteredAgents = getFilteredAgents();

  // Your existing market cap buttons configuration stays the same
  const marketCapButtons = [
    { label: 'All', value: 'ALL' as MarketCapFilter, class: 'bg-gray-700' },
    { label: 'Micro Cap (<1K)', value: 'MICRO' as MarketCapFilter, class: 'bg-blue-900' },
    { label: 'Small Cap (1K-10K)', value: 'SMALL' as MarketCapFilter, class: 'bg-purple-900' },
    { label: 'Mid Cap (10K-100K)', value: 'MID' as MarketCapFilter, class: 'bg-green-900' },
    { label: 'Large Cap (>100K)', value: 'LARGE' as MarketCapFilter, class: 'bg-violet-900' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  // Updated table structure with new columns
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">Monitored Agents</h1>
      
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-200"
              placeholder="Search by name or ticker..."
              value={inputValue}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {marketCapButtons.map((button) => (
              <button
                key={button.value}
                className={`px-4 py-2 text-white rounded-full text-sm transition-colors ${
                  marketCapFilter === button.value 
                    ? `${button.class} ring-2 ring-yellow-400` 
                    : `${button.class} opacity-75 hover:opacity-100`
                }`}
                onClick={() => setMarketCapFilter(button.value)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-left">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Ticker</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price USD</th>
              <th className="px-6 py-3">24h Change</th>
              <th className="px-6 py-3">24h Volume</th>
              <th className="px-6 py-3">Market Cap</th>
              <th className="px-6 py-3">Holders</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent.id} className="border-t border-gray-800">
                <td className="px-6 py-4 text-gray-300">{agent.name}</td>
                <td className="px-6 py-4 text-gray-300">{agent.ticker}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-900 text-white rounded-full text-sm">
                    {agent.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  ${(agent.priceUSD || 0).toLocaleString()}
                </td>
                <td className={`px-6 py-4 ${(agent.priceChange24h ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {((agent.priceChange24h ?? 0)).toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-gray-300">
                  ${(agent.volume24h || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  ${(agent.marketCap || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {(agent.holders || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button className="text-red-500 hover:text-red-400">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filteredAgents.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No agents found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}