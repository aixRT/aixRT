'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      discord: false,
      telegram: false,
      discordWebhook: '',
      telegramBotToken: '',
      telegramChatId: ''
    },
    alertProfile: 'balanced',
    thresholds: {
      priceChange: {
        microCap: 10,
        smallCap: 7,
        midCap: 5,
        largeCap: 3
      },
      timeWindow: 5
    }
  });

  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('monitorSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleNotificationChange = (platform: 'discord' | 'telegram') => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [platform]: !prev.notifications[platform]
      }
    }));
  };

  const handleWebhookChange = (
    field: 'discordWebhook' | 'telegramBotToken' | 'telegramChatId',
    value: string
  ) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleProfileChange = (profile: string) => {
    const thresholds = {
      conservative: {
        microCap: 15,
        smallCap: 10,
        midCap: 7,
        largeCap: 5
      },
      balanced: {
        microCap: 10,
        smallCap: 7,
        midCap: 5,
        largeCap: 3
      },
      aggressive: {
        microCap: 5,
        smallCap: 4,
        midCap: 3,
        largeCap: 2
      }
    };

    setSettings(prev => ({
      ...prev,
      alertProfile: profile,
      thresholds: {
        ...prev.thresholds,
        priceChange: thresholds[profile as keyof typeof thresholds]
      }
    }));
  };

  const handleTimeWindowChange = (minutes: number) => {
    setSettings(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        timeWindow: minutes
      }
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('monitorSettings', JSON.stringify(settings));
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Settings</h1>
      
      {/* Notifications Section */}
      <section className="bg-gray-800 rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Notifications</h2>
        
        {/* Discord Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={settings.notifications.discord}
              onChange={() => handleNotificationChange('discord')}
              className="w-5 h-5 rounded accent-indigo-600"
            />
            <label className="text-lg text-white">Discord</label>
          </div>
          
          {settings.notifications.discord && (
            <div className="ml-9">
              <input
                type="text"
                value={settings.notifications.discordWebhook}
                onChange={(e) => handleWebhookChange('discordWebhook', e.target.value)}
                placeholder="Discord Webhook URL"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Telegram Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={settings.notifications.telegram}
              onChange={() => handleNotificationChange('telegram')}
              className="w-5 h-5 rounded accent-indigo-600"
            />
            <label className="text-lg text-white">Telegram</label>
          </div>
          
          {settings.notifications.telegram && (
            <div className="ml-9 space-y-4">
              <input
                type="text"
                value={settings.notifications.telegramBotToken}
                onChange={(e) => handleWebhookChange('telegramBotToken', e.target.value)}
                placeholder="Telegram Bot Token"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={settings.notifications.telegramChatId}
                onChange={(e) => handleWebhookChange('telegramChatId', e.target.value)}
                placeholder="Telegram Chat ID"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>
      </section>

      {/* Alert Profile Section */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Alert Profile</h2>
        <div className="grid grid-cols-3 gap-4">
          {['conservative', 'balanced', 'aggressive'].map((profile) => (
            <button
              key={profile}
              onClick={() => handleProfileChange(profile)}
              className={`p-4 rounded-lg transition-all ${
                settings.alertProfile === profile
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold capitalize mb-2">{profile}</div>
              <div className="text-sm opacity-80">
                {profile === 'conservative' && 'Larger price movements required for alerts'}
                {profile === 'balanced' && 'Moderate sensitivity to price changes'}
                {profile === 'aggressive' && 'More frequent alerts on smaller price movements'}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Time Window Section */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Time Window</h2>
        <div className="grid grid-cols-3 gap-4">
          {[5, 15, 60].map((minutes) => (
            <button
              key={minutes}
              onClick={() => handleTimeWindowChange(minutes)}
              className={`p-4 rounded-lg transition-all ${
                settings.thresholds.timeWindow === minutes
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="font-semibold">
                {minutes === 60 ? '1 hour' : `${minutes} minutes`}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Current Thresholds Section */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Current Alert Thresholds</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(settings.thresholds.priceChange).map(([cap, threshold]) => (
            <div key={cap} className="bg-gray-700 p-4 rounded-lg">
              <div className="font-semibold text-white capitalize mb-2">
                {cap.replace(/Cap$/, ' Cap')}
              </div>
              <div className="text-gray-300">{threshold}% price change</div>
            </div>
          ))}
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Settings
        </button>
      </div>

      {/* Save Confirmation */}
      {showSaveConfirmation && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Settings saved successfully!
        </div>
      )}
    </div>
  );
}
