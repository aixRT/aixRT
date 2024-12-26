'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: number;
  name: string;
  category: string;
  mcapInVirtual: number;
  holderCount: number;
}

function getMarketCapCategory(mcap: number) {
  if (mcap < 1000) return { label: 'Micro Cap', color: 'bg-gray-100 text-gray-800' };
  if (mcap < 10000) return { label: 'Small Cap', color: 'bg-blue-100 text-blue-800' };
  if (mcap < 100000) return { label: 'Mid Cap', color: 'bg-green-100 text-green-800' };
  return { label: 'Large Cap', color: 'bg-purple-100 text-purple-800' };
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAgentId, setNewAgentId] = useState('');
  const [error, setError] = useState('');

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/agents');
      const data = await res.json();
      setAgents(data.agents);
      setError('');
    } catch (error) {
      console.error('Error fetching agents:', error);
      setError('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const addAgent = async () => {
    if (!newAgentId) {
      setError('Please enter an agent ID');
      return;
    }

    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: newAgentId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add agent');
      }

      setNewAgentId('');
      setError('');
      fetchAgents();
    } catch (error) {
      console.error('Error adding agent:', error);
      setError(error instanceof Error ? error.message : 'Failed to add agent');
    }
  };

  const removeAgent = async (agentId: string) => {
    try {
      const res = await fetch('/api/agents', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to remove agent');
      }

      setError('');
      fetchAgents();
    } catch (error) {
      console.error('Error removing agent:', error);
      setError(error instanceof Error ? error.message : 'Failed to remove agent');
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Monitored Agents</h1>
        
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newAgentId}
            onChange={(e) => setNewAgentId(e.target.value)}
            placeholder="Enter agent ID..."
            className="px-4 py-2 border rounded-lg"
          />
          <button
            onClick={addAgent}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Agent
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4 flex gap-3">
          <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">Micro Cap (&lt;1K)</span>
          <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Small Cap (1K-10K)</span>
          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Mid Cap (10K-100K)</span>
          <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">Large Cap (&gt;100K)</span>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search agents..."
          className="w-full max-w-md px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Cap</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => {
              const marketCap = getMarketCapCategory(agent.mcapInVirtual);
              return (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded bg-gray-100">
                      {agent.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${marketCap.color}`}>
                        {marketCap.label}
                      </span>
                      <span>{agent.mcapInVirtual.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {agent.holderCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => removeAgent(agent.id.toString())}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
