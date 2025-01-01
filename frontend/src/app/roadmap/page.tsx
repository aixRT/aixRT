'use client';

import { 
  RocketLaunchIcon, 
  KeyIcon,
  ChartBarIcon, 
  UserGroupIcon,
  BeakerIcon,
  SignalIcon,
  BellAlertIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';

export default function RoadmapPage() {
  return (
    <div className="min-h-screen p-6 text-white">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-1 text-aixrt-gold">
          Roadmap
        </h1>
        <p className="text-sm text-gray-400">
          Building the future of intelligent trading ecosystems
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-6">
        {/* Phase 1: Core Infrastructure */}
        <div>
          <h2 className="text-xl font-bold text-aixrt-gold mb-3">Phase 1: Core Infrastructure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-aixrt-purple/20 rounded-xl p-2 w-fit mb-2">
                <KeyIcon className="w-5 h-5 text-aixrt-purple" />
              </div>
              <h3 className="text-lg font-bold text-aixrt-purple mb-2">Authentication System</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Web3 wallet integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Token-gated access (500,000 AIXRT)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>JWT-based API authentication</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-emerald-500/20 rounded-xl p-2 w-fit mb-2">
                <ChartBarIcon className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-emerald-500 mb-2">Real-Time Monitoring</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>GeckoTerminal API integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>WebSocket connections</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Market cap-based thresholds</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-blue-500/20 rounded-xl p-2 w-fit mb-2">
                <BellAlertIcon className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-blue-500 mb-2">Alert System</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Discord webhook integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Telegram bot setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Basic price movement alerts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phase 2: Essential Features */}
        <div>
          <h2 className="text-xl font-bold text-aixrt-gold mb-3">Phase 2: Essential Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-aixrt-purple/20 rounded-xl p-2 w-fit mb-2">
                <RocketLaunchIcon className="w-5 h-5 text-aixrt-purple" />
              </div>
              <h3 className="text-lg font-bold text-aixrt-purple mb-2">Holdings Tracking</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Wallet balance monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Portfolio value calculation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Multi-wallet support</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-emerald-500/20 rounded-xl p-2 w-fit mb-2">
                <UserGroupIcon className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-emerald-500 mb-2">Agent Monitoring</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Virtual Protocol integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Agent market data tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Basic agent analytics</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-blue-500/20 rounded-xl p-2 w-fit mb-2">
                <ComputerDesktopIcon className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-blue-500 mb-2">Dashboard</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Real-time price displays</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Recent alerts overview</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Portfolio summary</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phase 3: Advanced Features */}
        <div>
          <h2 className="text-xl font-bold text-aixrt-gold mb-3">Phase 3: Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-aixrt-purple/20 rounded-xl p-2 w-fit mb-2">
                <BeakerIcon className="w-5 h-5 text-aixrt-purple" />
              </div>
              <h3 className="text-lg font-bold text-aixrt-purple mb-2">Enhanced Analytics</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Volume spike detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Order flow analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Market trend identification</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-emerald-500/20 rounded-xl p-2 w-fit mb-2">
                <SignalIcon className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-emerald-500 mb-2">Signal System</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>AI-powered trading signals</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Signal confidence ratings</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Historical performance</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-blue-500/20 rounded-xl p-2 w-fit mb-2">
                <BellAlertIcon className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-blue-500 mb-2">Advanced Alerts</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Custom alert thresholds</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Multi-timeframe analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Volume & holder alerts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phase 4: Platform Enhancement */}
        <div>
          <h2 className="text-xl font-bold text-aixrt-gold mb-3">Phase 4: Platform Enhancement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-aixrt-purple/20 rounded-xl p-2 w-fit mb-2">
                <ComputerDesktopIcon className="w-5 h-5 text-aixrt-purple" />
              </div>
              <h3 className="text-lg font-bold text-aixrt-purple mb-2">User Experience</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Advanced filtering options</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Custom dashboard layouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aixrt-purple"></div>
                  <span>Mobile responsiveness</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-emerald-500/20 rounded-xl p-2 w-fit mb-2">
                <CpuChipIcon className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-emerald-500 mb-2">Performance</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Data caching system</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>API rate limit handling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>Response optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-aixrt-navy/30 rounded-xl p-4 border border-aixrt-gold/20 backdrop-blur-sm">
              <div className="bg-blue-500/20 rounded-xl p-2 w-fit mb-2">
                <PuzzlePieceIcon className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-blue-500 mb-2">Integrations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>SMS notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Additional data sources</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Export functionality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
