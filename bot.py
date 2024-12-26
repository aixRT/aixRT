import os
import discord
import telebot
import logging
from typing import Dict, Set
from discord.ext import commands
from config import Config, AlertConfig
from monitor import VirtualMonitor
from notifications import NotificationManager

class MonitorBot:
    def __init__(self):
        self.config = Config()
        self.alert_config = AlertConfig()
        self.monitored_tokens: Dict[str, Set[str]] = {}  # chat_id -> set of tokens
        
        # Initialize Discord bot
        self.discord_bot = commands.Bot(command_prefix='!', intents=discord.Intents.default())
        self.setup_discord_commands()
        
        # Initialize Telegram bot
        self.telegram_bot = telebot.TeleBot(self.config.TELEGRAM_BOT_TOKEN)
        self.setup_telegram_commands()
        
        # Initialize monitor with both Discord and Telegram
        self.notification_manager = NotificationManager(
            discord_webhook=os.getenv('DISCORD_WEBHOOK_URL'),
            telegram_token=self.config.TELEGRAM_BOT_TOKEN,
            telegram_chats=[]  # Will be populated as users interact
        )
        self.monitor = VirtualMonitor(self.notification_manager)

    def setup_discord_commands(self):
        @self.discord_bot.command(name='monitor')
        async def monitor(ctx, token: str = None):
            if not token:
                await ctx.send(self.config.RESPONSES['invalid_token'])
                return
                
            channel_id = str(ctx.channel.id)
            token = token.upper()
            
            if channel_id not in self.monitored_tokens:
                self.monitored_tokens[channel_id] = set()
            
            if token in self.monitored_tokens[channel_id]:
                await ctx.send(self.config.RESPONSES['already_monitoring'].format(token=token))
                return
                
            self.monitored_tokens[channel_id].add(token)
            await ctx.send(self.config.RESPONSES['start_monitoring'].format(token=token))
            
        @self.discord_bot.command(name='stop')
        async def stop(ctx, token: str = None):
            if not token:
                await ctx.send(self.config.RESPONSES['invalid_token'])
                return
                
            channel_id = str(ctx.channel.id)
            token = token.upper()
            
            if channel_id not in self.monitored_tokens or token not in self.monitored_tokens[channel_id]:
                await ctx.send(self.config.RESPONSES['not_monitoring'].format(token=token))
                return
                
            self.monitored_tokens[channel_id].remove(token)
            await ctx.send(self.config.RESPONSES['stop_monitoring'].format(token=token))
            
        @self.discord_bot.command(name='list')
        async def list_tokens(ctx):
            channel_id = str(ctx.channel.id)
            if channel_id not in self.monitored_tokens or not self.monitored_tokens[channel_id]:
                await ctx.send("No tokens being monitored in this channel")
                return
                
            tokens = ", ".join(f"{token}-VIRTUAL" for token in sorted(self.monitored_tokens[channel_id]))
            await ctx.send(f"Monitoring: {tokens}")
            
        @self.discord_bot.command(name='settings')
        async def settings(ctx):
            settings_msg = (
                f"**Current Alert Settings**\n"
                f"• Price changes ≥ {self.alert_config.price_change_threshold}%\n"
                f"• Volume spikes ≥ {self.alert_config.volume_spike_threshold}%\n"
                f"• Large orders ≥ {self.alert_config.large_order_threshold} VIRTUAL\n"
                f"• Order thresholds:\n"
                f"  - 1min: {self.alert_config.order_thresholds['1min']['buy']} orders\n"
                f"  - 3min: {self.alert_config.order_thresholds['3min']['buy']} orders\n"
                f"  - 5min: {self.alert_config.order_thresholds['5min']['buy']} orders\n"
                f"  - 15min: {self.alert_config.order_thresholds['15min']['buy']} orders"
            )
            await ctx.send(settings_msg)

    def setup_telegram_commands(self):
        @self.telegram_bot.message_handler(commands=['start'])
        def send_welcome(message):
            help_text = "Welcome to Virtual Monitor Bot!\n\n"
            help_text += "Available commands:\n"
            for cmd, desc in self.config.COMMANDS.items():
                help_text += f"{desc}\n"
            self.telegram_bot.reply_to(message, help_text)
            
        @self.telegram_bot.message_handler(commands=['monitor'])
        def monitor_command(message):
            chat_id = str(message.chat.id)
            try:
                token = message.text.split()[1].upper()
            except IndexError:
                self.telegram_bot.reply_to(message, self.config.RESPONSES['invalid_token'])
                return
                
            if chat_id not in self.monitored_tokens:
                self.monitored_tokens[chat_id] = set()
                
            if token in self.monitored_tokens[chat_id]:
                self.telegram_bot.reply_to(message, self.config.RESPONSES['already_monitoring'].format(token=token))
                return
                
            self.monitored_tokens[chat_id].add(token)
            self.telegram_bot.reply_to(message, self.config.RESPONSES['start_monitoring'].format(token=token))
            
        @self.telegram_bot.message_handler(commands=['stop'])
        def stop_command(message):
            chat_id = str(message.chat.id)
            try:
                token = message.text.split()[1].upper()
            except IndexError:
                self.telegram_bot.reply_to(message, self.config.RESPONSES['invalid_token'])
                return
                
            if chat_id not in self.monitored_tokens or token not in self.monitored_tokens[chat_id]:
                self.telegram_bot.reply_to(message, self.config.RESPONSES['not_monitoring'].format(token=token))
                return
                
            self.monitored_tokens[chat_id].remove(token)
            self.telegram_bot.reply_to(message, self.config.RESPONSES['stop_monitoring'].format(token=token))
            
        @self.telegram_bot.message_handler(commands=['list'])
        def list_command(message):
            chat_id = str(message.chat.id)
            if chat_id not in self.monitored_tokens or not self.monitored_tokens[chat_id]:
                self.telegram_bot.reply_to(message, "No tokens being monitored in this chat")
                return
                
            tokens = ", ".join(f"{token}-VIRTUAL" for token in sorted(self.monitored_tokens[chat_id]))
            self.telegram_bot.reply_to(message, f"Monitoring: {tokens}")
            
        @self.telegram_bot.message_handler(commands=['settings'])
        def settings_command(message):
            settings_msg = (
                f"Current Alert Settings\n\n"
                f"• Price changes ≥ {self.alert_config.price_change_threshold}%\n"
                f"• Volume spikes ≥ {self.alert_config.volume_spike_threshold}%\n"
                f"• Large orders ≥ {self.alert_config.large_order_threshold} VIRTUAL\n"
                f"• Order thresholds:\n"
                f"  - 1min: {self.alert_config.order_thresholds['1min']['buy']} orders\n"
                f"  - 3min: {self.alert_config.order_thresholds['3min']['buy']} orders\n"
                f"  - 5min: {self.alert_config.order_thresholds['5min']['buy']} orders\n"
                f"  - 15min: {self.alert_config.order_thresholds['15min']['buy']} orders"
            )
            self.telegram_bot.reply_to(message, settings_msg)

    def run(self):
        """Run both Discord and Telegram bots"""
        # Start monitoring in a separate thread
        import threading
        monitor_thread = threading.Thread(target=self.monitor.run, daemon=True)
        monitor_thread.start()
        
        # Start Telegram bot in a separate thread
        telegram_thread = threading.Thread(target=self.telegram_bot.polling, daemon=True)
        telegram_thread.start()
        
        # Run Discord bot in main thread
        self.discord_bot.run(self.config.DISCORD_BOT_TOKEN)

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format=Config.LOG_FORMAT,
        handlers=[logging.StreamHandler()]
    )
    
    # Start the bot
    bot = MonitorBot()
    bot.run()
