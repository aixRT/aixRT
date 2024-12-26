'use client';

import { useState } from 'react';
import { ThresholdSettings } from '@/types';

const defaultThresholds: ThresholdSettings = {
  micro: { fiveMin: 10, oneHour: 20, oneDay: 30 },
  small: { fiveMin: 7, oneHour: 15, oneDay: 25 },
  medium: { fiveMin: 5, oneHour: 10, oneDay: 20 },
  large: { fiveMin: 3, oneHour: 7, oneDay: 15 },
  mega: { fiveMin: 2, oneHour: 5, oneDay: 10 },
};

export default function ThresholdSettingsPage() {
  const [thresholds, setThresholds] = useState<ThresholdSettings>(defaultThresholds);

  const handleChange = (
    category: keyof ThresholdSettings,
    timeframe: keyof typeof thresholds.micro,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setThresholds({
        ...thresholds,
        [category]: {
          ...thresholds[category],
          [timeframe]: numValue,
        },
      });
    }
  };

  const renderThresholdInputs = (
    category: keyof ThresholdSettings,
    label: string,
    description: string
  ) => (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">5 Minutes</label>
          <input
            type="number"
            value={thresholds[category].fiveMin}
            onChange={(e) => handleChange(category, 'fiveMin', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">1 Hour</label>
          <input
            type="number"
            value={thresholds[category].oneHour}
            onChange={(e) => handleChange(category, 'oneHour', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">24 Hours</label>
          <input
            type="number"
            value={thresholds[category].oneDay}
            onChange={(e) => handleChange(category, 'oneDay', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Price Change Thresholds</h2>
      <p className="text-gray-600">
        Set the percentage thresholds for price change notifications based on market cap size
      </p>

      <div className="space-y-6">
        {renderThresholdInputs(
          'micro',
          'Micro Cap Agents',
          'Market cap under 10k VIRTUAL'
        )}
        {renderThresholdInputs(
          'small',
          'Small Cap Agents',
          'Market cap between 10k-50k VIRTUAL'
        )}
        {renderThresholdInputs(
          'medium',
          'Medium Cap Agents',
          'Market cap between 50k-200k VIRTUAL'
        )}
        {renderThresholdInputs(
          'large',
          'Large Cap Agents',
          'Market cap between 200k-1M VIRTUAL'
        )}
        {renderThresholdInputs(
          'mega',
          'Mega Cap Agents',
          'Market cap over 1M VIRTUAL'
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {/* Save thresholds */}}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
