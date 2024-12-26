@echo off
echo Building Virtual Monitor executable...

:: Install pyinstaller if not present
pip install pyinstaller

:: Create single executable
pyinstaller --onefile --name virtual-monitor ^
    --add-data "config.py;." ^
    --add-data "requirements.txt;." ^
    monitor.py

echo.
echo Build complete! The executable is in the dist folder.
echo Users just need to:
echo 1. Download virtual-monitor.exe
echo 2. Enter their Discord webhook
echo 3. Type the token they want to monitor
echo.
pause
