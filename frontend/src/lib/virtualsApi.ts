import { API_URLS } from './constants';

export async function getAgentUID(virtualId: string) {
  try {
    const response = await fetch(`${API_URLS.VIRTUALS}/${virtualId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch agent UID');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching agent UID:', error);
    throw error;
  }
}

export async function getAccessToken(agentUid: string, userUid: string) {
  try {
    const response = await fetch(`${API_URLS.VIRTUALS}/accesses/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.NEXT_PUBLIC_VIRTUALS_API_KEY || ''
      },
      body: JSON.stringify({
        data: {
          userUid,
          virtualUid: agentUid
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}