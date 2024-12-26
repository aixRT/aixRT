'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AgentCard from '@/components/AgentCard';
import { BoltIcon, SignalIcon, ChartBarIcon } from '@heroicons/react/24/outline';
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
        // Transform the data to match our Agent interface
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to aixRT</h1>
        <p className="mt-2 text-gray-600">AI-powered real-time monitoring and signals for Virtual Protocol agents</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <BoltIcon className="w-8 h-8 text-blue-500" />
            <h2 className="ml-3 text-xl font-semibold">Real-Time Monitoring</h2>
          </div>
          <p className="mt-4 text-gray-600">Track agent performance and market movements as they happen</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <SignalIcon className="w-8 h-8 text-green-500" />
            <h2 className="ml-3 text-xl font-semibold">AI Signals</h2>
          </div>
          <p className="mt-4 text-gray-600">Receive intelligent alerts and trading signals</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-purple-500" />
            <h2 className="ml-3 text-xl font-semibold">Market Analysis</h2>
          </div>
          <p className="mt-4 text-gray-600">Deep insights into agent performance and market trends</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Monitored Agents</h2>
        <p className="mt-2 text-gray-600">Real-time status of Virtual Protocol agents</p>
      </div>

      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="w-8 h-8 mx-auto border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
