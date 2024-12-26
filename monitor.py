import logging
from typing import Dict, List, Optional
import time
from datetime import datetime

from config import AlertConfig, Config
from notifications import DiscordNotifier
from virtual_api import VirtualAPI

class VirtualMonitor:
    def __init__(self, discord_webhook_url: Optional[str] = None):
        self.api = VirtualAPI()
        self.notifier = DiscordNotifier(discord_webhook_url)
        self.config = AlertConfig()
        self.setup_logging()
        
        # Historical data storage
        self.price_history: Dict[str, List[float]] = {}
        self.volume_history: Dict[str, List[float]] = {}
        self.order_history: Dict[str, List[dict]] = {}
    
    def setup_logging(self):
        """Configure logging settings"""
        logging.basicConfig(
            level=logging.INFO,
            format=Config.LOG_FORMAT,
            handlers=[
                logging.FileHandler(self.config.log_file),
                logging.StreamHandler()
            ]
        )
    
    def check_price_alert(self, agent_id: str, current_price: float) -> Optional[str]:
        """Monitor for significant price movements"""
        if agent_id not in self.price_history:
            self.price_history[agent_id] = []
            
        history = self.price_history[agent_id]
        alerts = []
        
        if history and history[-1] != 0:
            # Check regular price changes
            price_change = ((current_price - history[-1]) / history[-1]) * 100
            if abs(price_change) >= self.config.price_change_threshold:
                alerts.append(
                    f" Price Movement: {price_change:.2f}% {'increase' if price_change > 0 else 'decrease'}"
                )
            
            # Check for rapid price changes (last minute)
            if len(history) >= 2:  # Need at least 2 points for rate
                rapid_change = ((current_price - history[-2]) / history[-2]) * 100
                if abs(rapid_change) >= self.config.rapid_price_threshold:
                    alerts.append(
                        f" Rapid Price Movement: {rapid_change:.2f}% {'surge' if rapid_change > 0 else 'drop'} in 1min"
                    )
                
        self.price_history[agent_id].append(current_price)
        return alerts[0] if alerts else None  # Return most significant alert
    
    def check_volume_spike(self, agent_id: str, current_volume: float) -> Optional[str]:
        """Monitor for unusual volume activity"""
        if agent_id not in self.volume_history:
            self.volume_history[agent_id] = []
            
        history = self.volume_history[agent_id]
        alerts = []
        
        if len(history) >= 12:  # At least 1 hour of data
            avg_volume = sum(history[-12:]) / 12
            if avg_volume > 0:
                # Check regular volume changes
                volume_change = ((current_volume - avg_volume) / avg_volume) * 100
                if volume_change >= self.config.volume_spike_threshold:
                    alerts.append(
                        f" Volume Spike Alert: {volume_change:.2f}% above average"
                    )
                
                # Check rapid volume changes (last minute)
                if len(history) >= 2:
                    rapid_volume_change = ((current_volume - history[-2]) / history[-2]) * 100
                    if rapid_volume_change >= self.config.rapid_volume_threshold:
                        alerts.append(
                            f" Rapid Volume Surge: {rapid_volume_change:.2f}% in 1min"
                        )
                
        self.volume_history[agent_id].append(current_volume)
        return alerts[0] if alerts else None  # Return most significant alert
    
    def check_order_flood(self, agent_id: str, new_orders: List[dict]) -> List[str]:
        """Monitor for unusual order activity across multiple time windows"""
        if agent_id not in self.order_history:
            self.order_history[agent_id] = []
            
        current_time = time.time()
        alerts = []
        
        # Add new orders
        for order in new_orders:
            order_value = order.get('value', 0)
            
            # Track orders above minimum value
            if order_value >= self.config.min_order_value:
                self.order_history[agent_id].append({
                    'timestamp': current_time,
                    'type': order['type'],
                    'value': order_value
                })
                
                # Check for large individual orders
                if order_value >= self.config.large_order_threshold:
                    alerts.append(
                        f" Large {order['type'].upper()} Order: {order_value:,.0f} VIRTUAL"
                    )
        
        # Remove old orders (older than largest time window)
        max_window = max(self.config.order_windows.values())
        self.order_history[agent_id] = [
            order for order in self.order_history[agent_id]
            if current_time - order['timestamp'] <= max_window
        ]
        
        # Check order floods for each time window
        for window_name, window_seconds in self.config.order_windows.items():
            # Get orders within this time window
            recent_orders = [
                order for order in self.order_history[agent_id]
                if current_time - order['timestamp'] <= window_seconds
            ]
            
            if recent_orders:
                # Count buy and sell orders
                buy_orders = [order for order in recent_orders if order['type'] == 'buy']
                sell_orders = [order for order in recent_orders if order['type'] == 'sell']
                
                # Calculate total value for each type
                buy_value = sum(order['value'] for order in buy_orders)
                sell_value = sum(order['value'] for order in sell_orders)
                
                # Check against thresholds
                thresholds = self.config.order_thresholds[window_name]
                
                if len(buy_orders) >= thresholds['buy']:
                    alerts.append(
                        f" Buy Order Flood ({window_name}): "
                        f"{len(buy_orders)} orders, "
                        f"Total: {buy_value:,.0f} VIRTUAL"
                    )
                
                if len(sell_orders) >= thresholds['sell']:
                    alerts.append(
                        f" Sell Order Flood ({window_name}): "
                        f"{len(sell_orders)} orders, "
                        f"Total: {sell_value:,.0f} VIRTUAL"
                    )
        
        return alerts
    
    def monitor_agent(self, agent_id: str):
        """Main monitoring loop for a specific agent"""
        logging.info(f"Starting monitor for agent {agent_id}")
        
        while True:
            try:
                # Fetch current data
                agent_data = self.api.fetch_agent_data(agent_id)
                if not agent_data:
                    continue
                
                # Extract metrics
                current_price = float(agent_data.get('virtualTokenValue', 0))
                current_volume = float(agent_data.get('totalValueLocked', 0))
                recent_orders = agent_data.get('recentOrders', [])
                
                # Check all alert conditions
                alerts = []
                for check in [
                    self.check_price_alert(agent_id, current_price),
                    self.check_volume_spike(agent_id, current_volume),
                    *self.check_order_flood(agent_id, recent_orders)
                ]:
                    if check:
                        alerts.append(check)
                
                # Send alerts if any
                for alert in alerts:
                    self.notifier.send_alert(
                        agent_data.get('name', 'Unknown Agent'),
                        alert
                    )
                    logging.info(f"Alert for {agent_data.get('name')}: {alert}")
                
                # Wait before next check
                time.sleep(self.config.check_interval)
                
            except Exception as e:
                logging.error(f"Error in monitor_agent: {e}")
                time.sleep(self.config.check_interval)

if __name__ == "__main__":
    import os
    import argparse
    from dotenv import load_dotenv
    
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Monitor Virtuals Protocol tokens')
    parser.add_argument('tokens', nargs='*', help='Tokens to monitor (e.g., ETH BTC USDC)')
    parser.add_argument('--webhook', help='Discord webhook URL (optional if in .env)')
    args = parser.parse_args()
    
    # Load environment variables
    load_dotenv()
    
    # Get webhook URL from args or .env
    webhook_url = args.webhook or os.getenv('DISCORD_WEBHOOK_URL')
    if not webhook_url:
        print("Error: Discord webhook URL not provided. Use --webhook or set DISCORD_WEBHOOK_URL in .env")
        exit(1)
    
    # Initialize monitor
    monitor = VirtualMonitor(webhook_url)
    
    # Add tokens from command line
    if args.tokens:
        monitor.config.tokens_to_monitor = [f"{token}-VIRTUAL" for token in args.tokens]
        print(f"Monitoring tokens: {', '.join(monitor.config.tokens_to_monitor)}")
    else:
        print("No tokens specified. Usage: python monitor.py ETH BTC USDC")
        print("This will monitor ETH-VIRTUAL, BTC-VIRTUAL, and USDC-VIRTUAL pairs")
        exit(1)
    
    # Monitor all configured tokens
    print(f"\nStarting monitor with:")
    print(f"- Price change alerts: ≥{monitor.config.price_change_threshold}%")
    print(f"- Volume spike alerts: ≥{monitor.config.volume_spike_threshold}%")
    print(f"- Large order alerts: ≥{monitor.config.large_order_threshold} VIRTUAL")
    print("\nPress Ctrl+C to stop\n")
    
    while True:
        try:
            for token in monitor.config.tokens_to_monitor:
                monitor.monitor_agent(token)
                logging.info(f"Monitored {token}")
            time.sleep(monitor.config.check_interval)
        except KeyboardInterrupt:
            print("\nStopping monitor...")
            break
        except Exception as e:
            logging.error(f"Error in monitoring loop: {str(e)}")
            time.sleep(5)  # Wait before retrying
