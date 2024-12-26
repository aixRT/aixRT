from dataclasses import dataclass
from typing import List, Dict
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

@dataclass
class AlertConfig:
    # Tokens to monitor
    tokens_to_monitor: List[str] = None  # Will be initialized in __post_init__
    
    # Price monitoring
    price_change_threshold: float = 3.0  # More sensitive price change detection
    rapid_price_threshold: float = 1.5   # Very quick price movements (1.5% in 1 min)
    
    # Volume monitoring
    volume_spike_threshold: float = 50.0  # Percentage increase from average
    volume_window: int = 720  # 12 hours (in minutes)
    rapid_volume_threshold: float = 25.0  # Quick volume spikes (25% in 1 min)
    
    # Order monitoring
    order_windows: dict = None  # Will be initialized in __post_init__
    min_order_value: float = 50  # Lower minimum to catch more activity
    large_order_threshold: float = 500  # Lower threshold for significant orders
    
    # Market sentiment monitoring
    buy_sell_ratio_threshold: float = 2.0  # Alert when buy/sell ratio exceeds 2:1 or 1:2
    
    # Order flood thresholds for different time windows
    order_thresholds: dict = None  # Will be initialized in __post_init__
    
    # General settings
    check_interval: int = 30  # Check more frequently (30 seconds)
    log_file: str = "monitor.log"
    
    def __post_init__(self):
        # Default to empty list - tokens will be added via command line or config
        self.tokens_to_monitor = []
        
        # Initialize order windows (in seconds)
        self.order_windows = {
            '1min': 60,
            '3min': 180,
            '5min': 300,
            '15min': 900
        }
        
        # Initialize order thresholds for different time windows
        self.order_thresholds = {
            '1min': {
                'buy': 3,
                'sell': 3
            },
            '3min': {
                'buy': 8,
                'sell': 8
            },
            '5min': {
                'buy': 12,
                'sell': 12
            },
            '15min': {
                'buy': 25,
                'sell': 25
            }
        }

class Config:
    # Load environment variables
    load_dotenv()
    
    # API Configuration
    BASE_URL = "https://api.virtuals.io/api/virtuals"
    AGENTS_ENDPOINT = "/agents"  # Endpoint for agent data
    MARKET_ENDPOINT = "/market"  # Endpoint for market data
    LOG_FORMAT = '%(asctime)s - %(levelname)s - %(message)s'
    DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
    
    # Price Change Thresholds based on market cap and timeframe
    PRICE_THRESHOLDS = {
        'MICRO': {    # < 10k VIRTUAL
            'cap': 10_000,
            'changes': {
                '5m': 10.0,   # 5 minute threshold
                '1h': 20.0,   # 1 hour threshold
                '24h': 30.0   # 24 hour threshold
            }
        },
        'SMALL': {    # 10k-50k VIRTUAL
            'cap': 50_000,
            'changes': {
                '5m': 7.0,
                '1h': 15.0,
                '24h': 25.0
            }
        },
        'MEDIUM': {   # 50k-200k VIRTUAL
            'cap': 200_000,
            'changes': {
                '5m': 5.0,
                '1h': 10.0,
                '24h': 20.0
            }
        },
        'LARGE': {    # 200k-1M VIRTUAL
            'cap': 1_000_000,
            'changes': {
                '5m': 3.0,
                '1h': 7.0,
                '24h': 15.0
            }
        },
        'MEGA': {     # > 1M VIRTUAL
            'cap': float('inf'),
            'changes': {
                '5m': 2.0,
                '1h': 5.0,
                '24h': 10.0
            }
        }
    }

    @dataclass
    class PricePoint:
        price: float
        timestamp: datetime

    @staticmethod
    def get_price_thresholds(market_cap: float) -> Dict[str, float]:
        """Get all timeframe thresholds for a given market cap"""
        for category in Config.PRICE_THRESHOLDS.values():
            if market_cap < category['cap']:
                return category['changes']
        return Config.PRICE_THRESHOLDS['MEGA']['changes']

    @staticmethod
    def get_timeframe_changes(current_price: float, price_history: List[PricePoint]) -> Dict[str, float]:
        """Calculate price changes for each timeframe"""
        now = datetime.now()
        changes = {}
        
        # Define timeframes to check
        timeframes = {
            '5m': timedelta(minutes=5),
            '1h': timedelta(hours=1),
            '24h': timedelta(hours=24)
        }
        
        for timeframe, delta in timeframes.items():
            # Find the closest price point within the timeframe
            reference_time = now - delta
            reference_prices = [p for p in price_history if p.timestamp >= reference_time]
            
            if reference_prices:
                reference_price = reference_prices[0].price
                change = ((current_price - reference_price) / reference_price) * 100
                changes[timeframe] = change
            else:
                changes[timeframe] = 0.0
                
        return changes

    # Bot settings
    DISCORD_BOT_TOKEN: str = None  # Will be loaded from env
    TELEGRAM_BOT_TOKEN: str = None  # Will be loaded from env
    
    # Bot commands
    COMMANDS = {
        'monitor': '!monitor <token>  - Start monitoring a token (e.g., !monitor ETH)',
        'stop': '!stop <token>     - Stop monitoring a token (e.g., !stop ETH)',
        'list': '!list            - List all tokens being monitored',
        'help': '!help            - Show this help message',
        'settings': '!settings        - Show current alert settings'
    }
    
    # Command responses
    RESPONSES = {
        'start_monitoring': "🟢 Started monitoring {token}-VIRTUAL",
        'stop_monitoring': "🔴 Stopped monitoring {token}-VIRTUAL",
        'already_monitoring': "⚠️ Already monitoring {token}-VIRTUAL",
        'not_monitoring': "⚠️ Not monitoring {token}-VIRTUAL",
        'invalid_token': "❌ Invalid token format. Example: !monitor ETH"
    }
