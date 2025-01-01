// src/components/GettingStartedGuide.tsx
import React from 'react';
import Link from 'next/link';

const GettingStartedGuide = () => {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-bold text-yellow-400">Getting Started with aixRT</h1>
      
      <div className="bg-indigo-900/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Quick Start Guide</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-yellow-400 font-semibold">Add Agents to Monitor</h3>
              <p className="text-gray-400">
                Start by visiting the <Link href="/agents" className="text-indigo-400 hover:text-indigo-300">Agents</Link> page 
                and adding Virtual Protocol agents you want to track. You can search for agents or filter them by market cap size.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-yellow-400 font-semibold">Set Up Your Portfolio</h3>
              <p className="text-gray-400">
                Add your wallet addresses in the <Link href="/holdings" className="text-indigo-400 hover:text-indigo-300">Holdings</Link> page 
                to track your portfolio. We'll automatically monitor your tokens and their performance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-yellow-400 font-semibold">Configure Alerts</h3>
              <p className="text-gray-400">
                Visit the <Link href="/alerts" className="text-indigo-400 hover:text-indigo-300">Alerts</Link> page to set up custom 
                notifications for price movements, volume changes, or holder count updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Feature Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-yellow-400 font-semibold">Dashboard</h3>
            <p className="text-gray-400">Your central command center. View key metrics, recent activity, and important notifications at a glance.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold">Agents</h3>
            <p className="text-gray-400">Monitor Virtual Protocol agents, track their market caps, and analyze holder distributions.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold">Holdings</h3>
            <p className="text-gray-400">Track your portfolio value, token balances, and performance metrics across multiple wallets.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold">Signals</h3>
            <p className="text-gray-400">Receive AI-powered trading signals with confidence ratings and historical performance data.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold">Real-Time</h3>
            <p className="text-gray-400">Watch live price movements, volume changes, and market activity as they happen.</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold">Alerts</h3>
            <p className="text-gray-400">Create custom alerts for price, volume, and holder changes. Get notified through your preferred channels.</p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Best Practices</h2>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            Start with a few key agents to monitor before expanding your watchlist
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            Set up alerts with reasonable thresholds to avoid alert fatigue
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            Regularly check the Signals page for AI-generated trading opportunities
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            Use the Real-Time monitor during active trading sessions
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            Keep your wallet addresses up to date for accurate portfolio tracking
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GettingStartedGuide;