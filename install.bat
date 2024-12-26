@echo off
echo Installing Virtual Monitor...

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed!
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
)

:: Create virtual environment
python -m venv venv
call venv\Scripts\activate

:: Install requirements
pip install -r requirements.txt

:: Create .env file if it doesn't exist
if not exist .env (
    echo Please enter your Discord webhook URL:
    set /p webhook_url=
    echo DISCORD_WEBHOOK_URL=%webhook_url%> .env
)

echo.
echo Installation complete! You can now run:
echo python monitor.py ETH BTC USDC
echo.
echo This will monitor ETH-VIRTUAL, BTC-VIRTUAL, and USDC-VIRTUAL pairs
echo.
pause
