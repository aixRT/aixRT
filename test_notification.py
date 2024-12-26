import os
from dotenv import load_dotenv
from notifications import DiscordNotifier

# Load environment variables
load_dotenv()

# Initialize notifier
notifier = DiscordNotifier(os.getenv('DISCORD_WEBHOOK_URL'))

# Send test message
notifier.send_alert(
    "TEST",
    "🔔 Monitor is active and notifications are working! Monitoring agent ID: 15729"
)
