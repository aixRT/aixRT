'use client';

import { useState, useEffect } from 'react';

interface Wallet {
  address: string;
  name?: string;
}

interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  price: number;
  priceChange24h: number;
}

interface WalletHoldings {
  address: string;
  tokens: Token[];
  totalValue: number;
}

export default function HoldingsPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [holdings, setHoldings] = useState<WalletHoldings[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addWallet = async () => {
    if (!newWalletAddress) return;
    
    try {
      // Basic validation of Ethereum address
      if (!/^0x[a-fA-F0-9]{40}$/.test(newWalletAddress)) {
        throw new Error('Invalid Ethereum address');
      }

      setWallets([...wallets, { address: newWalletAddress }]);
      setNewWalletAddress('');
      
      // TODO: Save wallet to backend/local storage
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add wallet');
    }
  };

  const removeWallet = (address: string) => {
    setWallets(wallets.filter(wallet => wallet.address !== address));
    // TODO: Remove wallet from backend/local storage
  };

  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-aixrt-gold">Holdings</h1>
      
      {/* Add Wallet Section */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 mb-8 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Add Wallet</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newWalletAddress}
            onChange={(e) => setNewWalletAddress(e.target.value)}
            placeholder="Enter Ethereum address (0x...)"
            className="flex-1 px-4 py-2 bg-aixrt-navy rounded-lg text-white placeholder-gray-400 
                     border border-aixrt-gold/20 focus:outline-none focus:border-aixrt-gold 
                     transition-colors duration-200"
          />
          <button
            onClick={addWallet}
            className="px-6 py-2 bg-aixrt-purple text-white rounded-lg hover:bg-aixrt-purple/80 
                     focus:outline-none focus:ring-2 focus:ring-aixrt-gold transition-all duration-200
                     border border-aixrt-gold/20"
          >
            Add Wallet
          </button>
        </div>
        {error && (
          <p className="text-red-400 mt-2">{error}</p>
        )}
      </div>

      {/* Wallets List */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4 text-aixrt-gold">Your Wallets</h2>
        {wallets.length === 0 ? (
          <p className="text-gray-400">No wallets added yet</p>
        ) : (
          <div className="space-y-4">
            {wallets.map((wallet) => (
              <div
                key={wallet.address}
                className="flex items-center justify-between bg-aixrt-navy p-4 rounded-lg
                         border border-aixrt-gold/20 hover:border-aixrt-gold/40 transition-colors duration-200"
              >
                <div>
                  <p className="font-medium text-aixrt-gold">{wallet.name || 'Unnamed Wallet'}</p>
                  <p className="text-sm text-gray-400">{wallet.address}</p>
                </div>
                <button
                  onClick={() => removeWallet(wallet.address)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 
                           focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200
                           border border-red-500/20"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
