'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, CogIcon, ChartBarIcon, BoltIcon, SignalIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Agents', href: '/agents', icon: ChartBarIcon },
    { name: 'Signals', href: '/signals', icon: SignalIcon },
    { name: 'Real-Time', href: '/realtime', icon: BoltIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center h-16 px-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">aixRT</h1>
          <p className="text-xs text-gray-400">AI Exchange Real-Time</p>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
