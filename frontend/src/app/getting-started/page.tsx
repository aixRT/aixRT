'use client';

import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-aixrt-gold">Getting Started with aixRT</h1>
      
      {/* Quick Start Guide */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 mb-8 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Quick Start Guide</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-aixrt-purple text-white flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-medium text-aixrt-gold">Add Agents to Monitor</h3>
              <p className="text-gray-400 mt-1">
                Start by visiting the <Link href="/agents" className="text-aixrt-purple hover:text-aixrt-gold transition-colors">Agents</Link> page 
                and adding Virtual Protocol agents you want to track. You can search for agents or filter them by market cap size.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-aixrt-purple text-white flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-medium text-aixrt-gold">Set Up Your Portfolio</h3>
              <p className="text-gray-400 mt-1">
                Add your wallet addresses in the <Link href="/holdings" className="text-aixrt-purple hover:text-aixrt-gold transition-colors">Holdings</Link> page 
                to track your portfolio. We'll automatically monitor your tokens and their performance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-aixrt-purple text-white flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-medium text-aixrt-gold">Configure Alerts</h3>
              <p className="text-gray-400 mt-1">
                Visit the <Link href="/alerts" className="text-aixrt-purple hover:text-aixrt-gold transition-colors">Alerts</Link> page 
                to set up custom notifications for price movements, volume changes, or holder count updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 mb-8 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Feature Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-aixrt-gold mb-2">Dashboard</h3>
            <p className="text-gray-400">
              Your central command center. View key metrics, recent activity, and important notifications at a glance.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-aixrt-gold mb-2">Agents</h3>
            <p className="text-gray-400">
              Monitor Virtual Protocol agents, track their market caps, and analyze holder distributions.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-aixrt-gold mb-2">Holdings</h3>
            <p className="text-gray-400">
              Track your portfolio value, token balances, and performance metrics across multiple wallets.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-aixrt-gold mb-2">Signals</h3>
            <p className="text-gray-400">
              Receive AI-powered trading signals with confidence ratings and historical performance data.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-aixrt-gold mb-2">Real-Time</h3>
            <p className="text-gray-400">
              Watch live price movements, volume changes, and market activity as they happen.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-aixrt-gold mb-2">Alerts</h3>
            <p className="text-gray-400">
              Create custom alerts for price, volume, and holder changes. Get notified through your preferred channels.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Best Practices</h2>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-aixrt-purple"></span>
            Start with a few key agents to monitor before expanding your watchlist
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-aixrt-purple"></span>
            Set up alerts with reasonable thresholds to avoid alert fatigue
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-aixrt-purple"></span>
            Regularly check the Signals page for AI-generated trading opportunities
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-aixrt-purple"></span>
            Use the Real-Time monitor during active trading sessions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-aixrt-purple"></span>
            Keep your wallet addresses up to date for accurate portfolio tracking
          </li>
        </ul>
      </div>
    </div>
  );
}
