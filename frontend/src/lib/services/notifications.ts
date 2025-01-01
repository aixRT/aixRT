// src/lib/services/notifications.ts
import { API_URLS } from '../constants';

export async function sendDiscordAlert(message: string): Promise<void> {
  try {
    if (!API_URLS.DISCORD_WEBHOOK) {
      throw new Error('Discord webhook URL not configured');
    }

    const response = await fetch(API_URLS.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: message
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to send Discord alert: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error sending Discord alert:', error);
    throw error;
  }
}