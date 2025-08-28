#!/bin/bash

# Prompt Highlighter Extension Installer
# This script helps install the extension in Cursor

echo "🚀 Installing Prompt Highlighter Extension for Cursor..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Compile the extension
echo "🔨 Compiling extension..."
npm run compile

# Determine the Cursor extensions directory
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    EXTENSIONS_DIR="$HOME/Library/Application Support/Cursor/User/extensions"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows
    EXTENSIONS_DIR="$APPDATA/Cursor/User/extensions"
else
    # Linux
    EXTENSIONS_DIR="$HOME/.config/Cursor/User/extensions"
fi

# Create extensions directory if it doesn't exist
mkdir -p "$EXTENSIONS_DIR"

# Copy extension to Cursor extensions directory
EXTENSION_NAME="cursor-prompt-highlighter"
TARGET_DIR="$EXTENSIONS_DIR/$EXTENSION_NAME"

echo "📁 Copying extension to: $TARGET_DIR"

# Remove existing installation if it exists
if [ -d "$TARGET_DIR" ]; then
    rm -rf "$TARGET_DIR"
fi

# Copy the extension
cp -r . "$TARGET_DIR"

# Remove development files from the installed extension
cd "$TARGET_DIR"
rm -rf src/ .vscode/ .vscode-test/ .gitignore .eslintrc.json tsconfig.json package-lock.json node_modules/ install.sh

echo "✅ Extension installed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Restart Cursor or reload the window (Cmd+Shift+P > 'Developer: Reload Window')"
echo "2. The extension should now be active and highlighting prompts automatically"
echo "3. Try the commands in the Command Palette (Cmd+Shift+P):"
echo "   - 'Prompt Highlighter: Highlight Prompt'"
echo "   - 'Prompt Highlighter: Add New Prompt to Highlight'"
echo "   - 'Prompt Highlighter: Clear All Highlights'"
echo ""
echo "🎉 Enjoy using Prompt Highlighter!"
