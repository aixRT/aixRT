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
    <div className="p-6 max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Notification Settings */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-6">
          {/* Discord Settings */}
          <div className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="discord"
                checked={settings.notifications.discord}
                onChange={() => handleNotificationChange('discord')}
                className="h-4 w-4"
              />
              <label htmlFor="discord" className="font-medium">Discord</label>
            </div>
            {settings.notifications.discord && (
              <div className="ml-8">
                <label className="block text-sm text-gray-600 mb-1">
                  Webhook URL
                </label>
                <input
                  type="text"
                  value={settings.notifications.discordWebhook}
                  onChange={(e) => handleWebhookChange('discordWebhook', e.target.value)}
                  placeholder="https://discord.com/api/webhooks/..."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            )}
          </div>

          {/* Telegram Settings */}
          <div className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="telegram"
                checked={settings.notifications.telegram}
                onChange={() => handleNotificationChange('telegram')}
                className="h-4 w-4"
              />
              <label htmlFor="telegram" className="font-medium">Telegram</label>
            </div>
            {settings.notifications.telegram && (
              <div className="ml-8 space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Bot Token
                  </label>
                  <input
                    type="text"
                    value={settings.notifications.telegramBotToken}
                    onChange={(e) => handleWebhookChange('telegramBotToken', e.target.value)}
                    placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Chat ID
                  </label>
                  <input
                    type="text"
                    value={settings.notifications.telegramChatId}
                    onChange={(e) => handleWebhookChange('telegramChatId', e.target.value)}
                    placeholder="-100123456789"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Alert Profile */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Alert Profile</h2>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleProfileChange('conservative')}
            className={`p-4 rounded-lg border ${
              settings.alertProfile === 'conservative'
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <h3 className="font-semibold mb-2">Conservative</h3>
            <p className="text-sm text-gray-600">
              Larger price movements required for alerts
            </p>
          </button>
          <button
            onClick={() => handleProfileChange('balanced')}
            className={`p-4 rounded-lg border ${
              settings.alertProfile === 'balanced'
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <h3 className="font-semibold mb-2">Balanced</h3>
            <p className="text-sm text-gray-600">
              Moderate sensitivity to price changes
            </p>
          </button>
          <button
            onClick={() => handleProfileChange('aggressive')}
            className={`p-4 rounded-lg border ${
              settings.alertProfile === 'aggressive'
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <h3 className="font-semibold mb-2">Aggressive</h3>
            <p className="text-sm text-gray-600">
              More frequent alerts on smaller price movements
            </p>
          </button>
        </div>
      </section>

      {/* Time Window */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Time Window</h2>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleTimeWindowChange(5)}
            className={`p-4 rounded-lg border ${
              settings.thresholds.timeWindow === 5
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            5 minutes
          </button>
          <button
            onClick={() => handleTimeWindowChange(15)}
            className={`p-4 rounded-lg border ${
              settings.thresholds.timeWindow === 15
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            15 minutes
          </button>
          <button
            onClick={() => handleTimeWindowChange(60)}
            className={`p-4 rounded-lg border ${
              settings.thresholds.timeWindow === 60
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            1 hour
          </button>
        </div>
      </section>

      {/* Current Thresholds Display */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Alert Thresholds</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Micro Cap</h3>
            <p>{settings.thresholds.priceChange.microCap}% price change</p>
          </div>
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Small Cap</h3>
            <p>{settings.thresholds.priceChange.smallCap}% price change</p>
          </div>
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Mid Cap</h3>
            <p>{settings.thresholds.priceChange.midCap}% price change</p>
          </div>
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Large Cap</h3>
            <p>{settings.thresholds.priceChange.largeCap}% price change</p>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save Changes
      </button>

      {/* Save Confirmation Toast */}
      {showSaveConfirmation && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Settings saved successfully!
        </div>
      )}
    </div>
  );
}
