@echo off
echo 🚀 Installing Prompt Highlighter Extension for Cursor...

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install Node.js and npm first.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Compile the extension
echo 🔨 Compiling extension...
call npm run compile

REM Determine the Cursor extensions directory
set "EXTENSIONS_DIR=%APPDATA%\Cursor\User\extensions"

REM Create extensions directory if it doesn't exist
if not exist "%EXTENSIONS_DIR%" mkdir "%EXTENSIONS_DIR%"

REM Copy extension to Cursor extensions directory
set "EXTENSION_NAME=cursor-prompt-highlighter"
set "TARGET_DIR=%EXTENSIONS_DIR%\%EXTENSION_NAME%"

echo 📁 Copying extension to: %TARGET_DIR%

REM Remove existing installation if it exists
if exist "%TARGET_DIR%" rmdir /s /q "%TARGET_DIR%"

REM Copy the extension
xcopy /e /i /y . "%TARGET_DIR%"

REM Remove development files from the installed extension
cd /d "%TARGET_DIR%"
if exist "src" rmdir /s /q "src"
if exist ".vscode" rmdir /s /q ".vscode"
if exist ".vscode-test" rmdir /s /q ".vscode-test"
if exist ".gitignore" del ".gitignore"
if exist ".eslintrc.json" del ".eslintrc.json"
if exist "tsconfig.json" del "tsconfig.json"
if exist "package-lock.json" del "package-lock.json"
if exist "node_modules" rmdir /s /q "node_modules"
if exist "install.sh" del "install.sh"
if exist "install.bat" del "install.bat"

echo ✅ Extension installed successfully!
echo.
echo 📋 Next steps:
echo 1. Restart Cursor or reload the window (Ctrl+Shift+P ^> 'Developer: Reload Window'^)
echo 2. The extension should now be active and highlighting prompts automatically
echo 3. Try the commands in the Command Palette (Ctrl+Shift+P^):
echo    - 'Prompt Highlighter: Highlight Prompt'
echo    - 'Prompt Highlighter: Add New Prompt to Highlight'
echo    - 'Prompt Highlighter: Clear All Highlights'
echo.
echo 🎉 Enjoy using Prompt Highlighter!
pause
