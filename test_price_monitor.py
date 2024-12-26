import os
import time
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
from notifications import DiscordNotifier
from virtual_api import VirtualAPI
from config import Config

def test_price_monitor(agent_ids=None):
    """Monitor price changes for Virtual Agents
    Args:
        agent_ids (list): List of agent IDs to monitor. Defaults to ['15729']
    """
    if agent_ids is None:
        agent_ids = ['15729']  # Default to H1DR4
    
    # Load Discord webhook from .env
    load_dotenv()
    webhook_url = os.getenv('DISCORD_WEBHOOK_URL')
    if not webhook_url:
        print("Error: DISCORD_WEBHOOK_URL not found in .env")
        return
    
    # Initialize API and notifier
    api = VirtualAPI()
    notifier = DiscordNotifier(webhook_url)
    
    # Track price history for each agent
    price_histories = {agent_id: [] for agent_id in agent_ids}
    
    print(f"Starting price monitor for {len(agent_ids)} agent(s)")
    print("Will notify on significant price changes based on market cap and timeframe:")
    print("  5m  : 2-10% (based on market cap)")
    print("  1h  : 5-20% (based on market cap)")
    print("  24h : 10-30% (based on market cap)")
    print("Checking every 30 seconds")
    print("Press Ctrl+C to stop")
    
    try:
        while True:
            for agent_id in agent_ids:
                print(f"\nFetching data for Agent #{agent_id}...")
                
                # Fetch current data
                data = api.fetch_agent_data(agent_id)
                if not data:
                    print(f"Error fetching data for Agent #{agent_id}, skipping...")
                    continue
                
                # Print relevant agent data
                print("\nAgent Data:")
                print(f"Name: {data.get('name')}")
                print(f"Market Cap: {data.get('mcapInVirtual')} VIRTUAL")
                print(f"Holders: {data.get('holderCount')}")
                print(f"TVL: {data.get('totalValueLocked')}")
                
                # Get current price and thresholds
                current_price = float(data.get('mcapInVirtual', 0))
                if current_price == 0:
                    print("No price data available")
                    continue
                
                # Add current price to history
                now = datetime.now()
                price_histories[agent_id].append(Config.PricePoint(current_price, now))
                
                # Keep only last 24 hours of price history
                cutoff = now - timedelta(hours=24)
                price_histories[agent_id] = [p for p in price_histories[agent_id] if p.timestamp >= cutoff]
                
                # Get thresholds and calculate changes
                thresholds = Config.get_price_thresholds(current_price)
                if len(price_histories[agent_id]) > 1:  # Need at least 2 points for changes
                    changes = Config.get_timeframe_changes(current_price, price_histories[agent_id])
                    
                    # Check each timeframe for significant changes
                    alerts = []
                    for timeframe, change in changes.items():
                        threshold = thresholds[timeframe]
                        if abs(change) >= threshold:
                            alerts.append(f"{timeframe}: {change:+.2f}% (threshold: {threshold}%)")
                    
                    if alerts:
                        message = (
                            f"💲 Price Alert for Agent #{agent_id}!\n"
                            f"Name: {data.get('name', 'Unknown')}\n"
                            f"Current Price: {current_price:,.0f} VIRTUAL\n"
                            f"Significant Changes:\n" + "\n".join(alerts) + "\n"
                            f"Holders: {data.get('holderCount', 0)}"
                        )
                        print("\nSENDING NOTIFICATION:")
                        print(message)
                        notifier.send_alert(f"Agent #{agent_id}", message)
                    else:
                        print("\nPrice changes below thresholds:")
                        for timeframe, change in changes.items():
                            print(f"{timeframe}: {change:+.2f}% (threshold: {thresholds[timeframe]}%)")
            
            print("\nWaiting 30 seconds...")
            time.sleep(30)
            
    except KeyboardInterrupt:
        print("\nStopping price monitor...")
    except Exception as e:
        print(f"\nError: {str(e)}")
        print("Full error details:", e)
        raise

if __name__ == "__main__":
    import sys
    
    # Get agent IDs from command line or use default
    agent_ids = sys.argv[1:] if len(sys.argv) > 1 else ['15729']
    test_price_monitor(agent_ids)
