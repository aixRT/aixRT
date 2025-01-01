'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface PageDescriptionProps {
  title: string;
  description: string;
}

export default function PageDescription({ title, description }: PageDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-aixrt-navy/30 rounded-lg p-4 mb-6 border border-aixrt-gold/20">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="text-lg font-medium text-aixrt-gold">{title}</h2>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-aixrt-gold/60" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-aixrt-gold/60" />
        )}
      </div>
      {isExpanded && (
        <p className="mt-2 text-gray-400">{description}</p>
      )}
    </div>
  );
}
