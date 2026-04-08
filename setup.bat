@echo off
REM Quick Start Script for DeepFake Detection System

echo.
echo ========================================
echo DeepFake Detection System - Quick Start
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
    echo Virtual environment created.
)

REM Activate virtual environment
echo Activating Python virtual environment...
call venv\Scripts\activate.bat

REM Install/update Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To run the project:
echo    python -m backend.app
echo.
echo Open your browser at:
echo    http://127.0.0.1:5000
echo Backend API at: http://localhost:5000
echo.
pause
