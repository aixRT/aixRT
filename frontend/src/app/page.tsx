'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Agent } from '@/types';

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents');
        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }
        const data = await response.json();
        const transformedAgents: Agent[] = (data.agents || []).map((agent: any) => ({
          ...agent,
          totalValueLocked: agent.totalValueLocked || 0,
          priceHistory: agent.priceHistory || []
        }));
        setAgents(transformedAgents);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-aixrt-navy/30 to-black">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-aixrt-gold mb-4">
            Welcome to aixRT
          </h1>
          <p className="text-gray-400 text-lg">
            AI-powered real-time monitoring and signals for Virtual Protocol agents
          </p>
        </div>

        {loading && (
          <div className="text-aixrt-gold">Loading agents...</div>
        )}

        {error && (
          <div className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            Error: {error}
          </div>
        )}

        {!loading && !error && agents.length === 0 && (
          <div className="text-aixrt-gold/60">No agents found</div>
        )}

        {!loading && !error && agents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-aixrt-navy/20 rounded-xl border border-aixrt-gold/20 overflow-hidden backdrop-blur-sm hover:border-aixrt-gold/40 transition-all duration-200"
              >
                <div className="relative h-48 bg-gradient-to-br from-aixrt-purple/80 to-aixrt-navy p-4">
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-aixrt-purple/90 text-aixrt-gold text-xs border border-aixrt-gold/30">
                    AGENT
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-aixrt-gold">{agent.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Market Cap:</span>
                      <span className="text-aixrt-gold font-medium">
                        ${agent.totalValueLocked?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Price Change (1h):</span>
                      <span className="text-green-400 font-medium">+5.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Alert Profile:</span>
                      <span className="text-aixrt-gold font-medium">Aggressive</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Time Window:</span>
                      <span className="text-aixrt-gold font-medium">15min</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-aixrt-purple text-aixrt-gold border border-aixrt-gold/30 rounded-lg hover:bg-aixrt-purple/80 hover:border-aixrt-gold/60 transition-all duration-200 font-medium">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
