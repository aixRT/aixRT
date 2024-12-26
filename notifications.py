import requests
import logging
from datetime import datetime
from typing import Optional, List
from abc import ABC, abstractmethod
from config import Config

class NotificationService(ABC):
    @abstractmethod
    def send_alert(self, agent_name: str, alert_message: str):
        """Send alert through the notification service"""
        pass

class DiscordNotifier(NotificationService):
    def __init__(self, webhook_url: Optional[str]):
        self.webhook_url = webhook_url
    
    def send_alert(self, agent_name: str, alert_message: str):
        """Send alert to Discord webhook"""
        if not self.webhook_url:
            logging.warning("Discord webhook URL not configured")
            return
            
        payload = {
            "content": (
                f"**{agent_name}** - {alert_message}\n"
                f"*{datetime.now().strftime(Config.DATE_FORMAT)}*"
            )
        }
        
        try:
            requests.post(self.webhook_url, json=payload)
        except Exception as e:
            logging.error(f"Error sending Discord alert: {e}")

class TelegramNotifier(NotificationService):
    def __init__(self, bot_token: Optional[str], chat_ids: Optional[List[str]]):
        self.bot_token = bot_token
        self.chat_ids = chat_ids or []
        self.base_url = f"https://api.telegram.org/bot{bot_token}/sendMessage" if bot_token else None
    
    def send_alert(self, agent_name: str, alert_message: str):
        """Send alert to Telegram chats"""
        if not self.bot_token or not self.chat_ids:
            logging.warning("Telegram bot token or chat IDs not configured")
            return
            
        message = (
            f"*{agent_name}*\n"
            f"{alert_message}\n"
            f"_{datetime.now().strftime(Config.DATE_FORMAT)}_"
        )
        
        payload = {
            "parse_mode": "Markdown",
            "text": message
        }
        
        for chat_id in self.chat_ids:
            try:
                payload["chat_id"] = chat_id
                requests.post(self.base_url, json=payload)
            except Exception as e:
                logging.error(f"Error sending Telegram alert to {chat_id}: {e}")

class NotificationManager:
    def __init__(self, discord_webhook: Optional[str] = None, 
                 telegram_token: Optional[str] = None, 
                 telegram_chats: Optional[List[str]] = None):
        self.services = []
        
        # Initialize Discord if configured
        if discord_webhook:
            self.services.append(DiscordNotifier(discord_webhook))
            
        # Initialize Telegram if configured
        if telegram_token and telegram_chats:
            self.services.append(TelegramNotifier(telegram_token, telegram_chats))
    
    def send_alert(self, agent_name: str, alert_message: str):
        """Send alert to all configured notification services"""
        for service in self.services:
            service.send_alert(agent_name, alert_message)
