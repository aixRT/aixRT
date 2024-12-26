import requests
import logging
from typing import Optional, Dict
from config import Config

class VirtualAPI:
    def __init__(self):
        self.base_url = Config.BASE_URL
    
    def fetch_agent_data(self, agent_id: str) -> Optional[Dict]:
        """Fetch current data for a specific agent"""
        params = {
            "pagination[page]": 1,
            "filters[id][$eq]": agent_id,
            "filters[status][$in][0]": "AVAILABLE"
        }
        print(f"\nMaking API request to: {self.base_url}")
        print(f"With params: {params}")
        
        try:
            response = requests.get(self.base_url, params=params)
            print(f"Response status code: {response.status_code}")
            
            if response.status_code != 200:
                logging.error(f"API error: Status {response.status_code}")
                return None
                
            data = response.json()
            agents = data.get('data', [])
            
            if not agents:
                logging.error("No agent found with ID: " + agent_id)
                return None
                
            return agents[0]  # Return the first matching agent
            
        except Exception as e:
            logging.error(f"Error fetching agent data: {str(e)}")
            return None
            
    def list_markets(self) -> Optional[Dict]:
        """List all available markets"""
        url = f"{self.base_url}{Config.MARKET_ENDPOINT}"
        print(f"\nFetching market list: {url}")
        
        try:
            response = requests.get(url)
            print(f"Response status code: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            print(f"Response content: {response.text[:500]}")  # First 500 chars
            
            if response.status_code != 200:
                logging.error(f"API error: Status {response.status_code}")
                return None
                
            return response.json()
        except Exception as e:
            logging.error(f"Error fetching markets: {str(e)}")
            return None
