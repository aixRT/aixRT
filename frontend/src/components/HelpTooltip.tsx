'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface HelpTooltipProps {
  text: string;
  position?: 'top' | 'right';
}

export default function HelpTooltip({ text, position = 'top' }: HelpTooltipProps) {
  return (
    <div className="relative inline-block">
      <QuestionMarkCircleIcon className="w-5 h-5 text-aixrt-gold/60 hover:text-aixrt-gold cursor-help transition-colors" />
      <div className={`absolute z-50 invisible group-hover:visible bg-aixrt-navy border border-aixrt-gold/20 
                    rounded-lg p-3 text-sm text-gray-300 w-64 shadow-lg shadow-black/50
                    ${position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : 
                                         'left-full ml-2 top-1/2 -translate-y-1/2'}`}>
        {text}
        {position === 'top' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 
                        w-2 h-2 bg-aixrt-navy border-r border-b border-aixrt-gold/20" />
        )}
        {position === 'right' && (
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 
                        w-2 h-2 bg-aixrt-navy border-l border-b border-aixrt-gold/20" />
        )}
      </div>
    </div>
  );
}
