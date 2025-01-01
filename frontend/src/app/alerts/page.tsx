'use client';

export default function AlertsPage() {
  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-aixrt-gold">Alerts</h1>
      
      {/* Create New Alert Section */}
      <div className="bg-aixrt-navy/50 rounded-lg p-6 border border-aixrt-gold/20">
        <h2 className="text-xl font-semibold mb-4">Create New Alert</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              className="w-full px-4 py-2 bg-aixrt-navy rounded-lg text-white border border-aixrt-gold/20 
                       focus:border-aixrt-gold focus:ring-1 focus:ring-aixrt-gold/50"
            >
              <option value="price">Price Change</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Threshold</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-aixrt-navy rounded-lg text-white border border-aixrt-gold/20 
                       focus:border-aixrt-gold focus:ring-1 focus:ring-aixrt-gold/50"
              placeholder="Enter threshold value"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Agent</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-aixrt-navy rounded-lg text-white border border-aixrt-gold/20 
                       focus:border-aixrt-gold focus:ring-1 focus:ring-aixrt-gold/50"
              placeholder="Enter agent name or address"
            />
          </div>
          
          <button
            className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 
                     transition-all duration-200"
          >
            Create Alert
          </button>
        </div>
      </div>
    </div>
  );
}
