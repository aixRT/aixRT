import { API_URLS, NETWORKS } from './constants';

// GeckoTerminal API functions
export async function fetchTokenData(tokenAddress: string, network: string = NETWORKS.BASE) {
  try {
    // Get token pools
    const response = await fetch(
      `${API_URLS.GECKO}/networks/${network}/tokens/${tokenAddress}/pools`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch token data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

export async function fetchTokenInfo(tokenAddress: string, network: string = NETWORKS.BASE) {
  try {
    const response = await fetch(
      `${API_URLS.GECKO}/networks/${network}/tokens/${tokenAddress}/info`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch token info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw error;
  }
}

// Virtuals API functions
export async function fetchAgentData(virtualId: string) {
  try {
    const response = await fetch(`${API_URLS.VIRTUALS}/${virtualId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch agent data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching agent data:', error);
    throw error;
  }
}

// Helper function for checking API health
export async function checkAPIStatus() {
  try {
    // Check GeckoTerminal API
    const geckoResponse = await fetch(`${API_URLS.GECKO}/networks`);
    const geckoStatus = geckoResponse.ok;

    // Check Virtuals API
    const virtualsResponse = await fetch(`${API_URLS.VIRTUALS}`);
    const virtualsStatus = virtualsResponse.ok;

    return {
      gecko: geckoStatus,
      virtuals: virtualsStatus
    };
  } catch (error) {
    console.error('Error checking API status:', error);
    return {
      gecko: false,
      virtuals: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}