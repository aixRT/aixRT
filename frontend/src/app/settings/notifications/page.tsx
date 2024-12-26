'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function NotificationSettings() {
  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [webhooks, setWebhooks] = useState<string[]>([]);
  const [chatIds, setChatIds] = useState<string[]>([]);
  const [newWebhook, setNewWebhook] = useState('');
  const [newChatId, setNewChatId] = useState('');
  const [botToken, setBotToken] = useState('');

  const addWebhook = () => {
    if (newWebhook && !webhooks.includes(newWebhook)) {
      setWebhooks([...webhooks, newWebhook]);
      setNewWebhook('');
    }
  };

  const addChatId = () => {
    if (newChatId && !chatIds.includes(newChatId)) {
      setChatIds([...chatIds, newChatId]);
      setNewChatId('');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Notification Settings</h2>

      {/* Discord Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Discord</h3>
          <Switch
            checked={discordEnabled}
            onChange={setDiscordEnabled}
            className={`${
              discordEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable Discord notifications</span>
            <span
              className={`${
                discordEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        {discordEnabled && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newWebhook}
                onChange={(e) => setNewWebhook(e.target.value)}
                placeholder="Discord Webhook URL"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={addWebhook}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {webhooks.map((webhook) => (
                <li
                  key={webhook}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="truncate flex-1 mr-4">{webhook}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      Test
                    </button>
                    <button
                      onClick={() => setWebhooks(webhooks.filter((w) => w !== webhook))}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Telegram Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Telegram</h3>
          <Switch
            checked={telegramEnabled}
            onChange={setTelegramEnabled}
            className={`${
              telegramEnabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable Telegram notifications</span>
            <span
              className={`${
                telegramEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        {telegramEnabled && (
          <div className="space-y-4">
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="Telegram Bot Token"
              className="w-full p-2 border rounded"
            />

            <div className="flex gap-2">
              <input
                type="text"
                value={newChatId}
                onChange={(e) => setNewChatId(e.target.value)}
                placeholder="Chat ID"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={addChatId}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {chatIds.map((chatId) => (
                <li
                  key={chatId}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span>{chatId}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      Test
                    </button>
                    <button
                      onClick={() => setChatIds(chatIds.filter((id) => id !== chatId))}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
