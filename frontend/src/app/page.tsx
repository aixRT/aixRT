'use client';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">Welcome to aixRT</h1>
        <p className="text-gray-400">AI-powered real-time monitoring and signals for Virtual Protocol agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-[#2A2359] rounded-lg overflow-hidden">
          <div className="h-40 bg-purple-900"></div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">G.A.M.E</h2>
              <span className="px-2 py-1 text-xs bg-yellow-400 text-black rounded-full">
                AGENT
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Market Cap:</span>
                <span className="text-white">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price Change (1h):</span>
                <span className="text-green-400">+5.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Alert Profile:</span>
                <span className="text-yellow-400">Aggressive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time Window:</span>
                <span className="text-white">15min</span>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-[#4A3880] hover:bg-[#5A4890] text-white rounded-lg transition-colors">
              VIEW DETAILS
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}