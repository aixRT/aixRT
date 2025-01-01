'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  CogIcon, 
  ChartBarIcon, 
  BoltIcon, 
  SignalIcon, 
  WalletIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Holdings', href: '/holdings', icon: WalletIcon },
    { name: 'Agents', href: '/agents', icon: ChartBarIcon },
    { name: 'Real-Time', href: '/realtime', icon: BoltIcon },
    { name: 'Signals', href: '/signals', icon: SignalIcon },
    { name: 'Alerts', href: '/alerts', icon: CogIcon },
    { name: 'Getting Started', href: '/getting-started', icon: QuestionMarkCircleIcon },
    { name: 'Roadmap', href: '/roadmap', icon: RocketLaunchIcon },
  ];

  return (
    <div className="flex flex-col w-64 bg-aixrt-navy border-r border-aixrt-gold/20">
      <div className="flex items-center h-16 px-4 bg-gradient-to-r from-aixrt-navy to-aixrt-purple border-b border-aixrt-gold/20">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-aixrt-gold">aixRT</h1>
          <p className="text-xs text-aixrt-gold/70">AI Exchange Real-Time</p>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-aixrt-purple text-aixrt-gold shadow-lg shadow-aixrt-purple/50'
                  : 'text-gray-300 hover:bg-aixrt-purple/50 hover:text-aixrt-gold'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-aixrt-gold' : 'text-gray-300'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
