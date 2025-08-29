# Quick Start Guide - Cursor Chat Highlighter

Get the Chat Highlighter extension up and running in 5 minutes!

## 🚀 Quick Installation

### Option 1: Automated Installation (Recommended)

**macOS/Linux:**
```bash
cd cursor-chat-highlighter
./install.sh
```

**Windows:**
```cmd
cd cursor-chat-highlighter
install.bat
```

### Option 2: Manual Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Compile the extension:**
   ```bash
   npm run compile
   ```

3. **Copy to Cursor extensions folder:**
   - **macOS**: `~/Library/Application Support/Cursor/User/extensions/cursor-chat-highlighter/`
   - **Windows**: `%APPDATA%\Cursor\User\extensions\cursor-chat-highlighter\`
   - **Linux**: `~/.config/Cursor/User/extensions/cursor-chat-highlighter/`

4. **Reload Cursor:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
   - Run "Developer: Reload Window"

## ✅ Verify Installation

1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Chat Highlighter: Open Highlighted Chat Interface"
3. Press Enter to open the chat panel
4. You should see a chat interface with:
   - Color pickers at the top for user and AI message colors
   - A welcome message from the AI
   - A text input area at the bottom

## 🎯 How to Use

### Basic Usage

1. **Open the Chat Interface:**
   - Command Palette → "Chat Highlighter: Open Highlighted Chat Interface"

2. **Send Messages:**
   - Type in the text area
   - Press Enter or click Send
   - Your message appears with a blue background
   - AI response appears with a purple background

3. **Change Colors:**
   - Use the color pickers at the top
   - Changes apply immediately to all messages

### Available Commands

- **Open Highlighted Chat Interface** - Opens the custom chat panel
- **Toggle Chat Message Highlighting** - Enable/disable the extension
- **Change User Message Color** - Change your message background color
- **Change AI Message Color** - Change AI message background color

## 🎨 Default Colors

- **Your Messages**: Light blue background (`#e3f2fd`) with blue border
- **AI Messages**: Light purple background (`#f3e5f5`) with purple border

## ⚙️ Customization

Add these to your Cursor settings (`Cmd+,` or `Ctrl+,`):

```json
{
  "chatHighlighter.enabled": true,
  "chatHighlighter.userMessageBackground": "#e3f2fd",
  "chatHighlighter.userMessageBorder": "#2196f3",
  "chatHighlighter.aiMessageBackground": "#f3e5f5",
  "chatHighlighter.aiMessageBorder": "#9c27b0",
  "chatHighlighter.borderRadius": "8px",
  "chatHighlighter.padding": "12px"
}
```

## 🎉 You're Ready!

The extension provides a custom chat interface where you can easily distinguish between your messages and AI responses with different background colors!

## 🆘 Need Help?

- Check the full [README.md](README.md) for detailed documentation
- The extension creates a separate chat interface within Cursor
- AI responses are simulated for demonstration purposes
- This is a custom interface, not integrated with Cursor's built-in chat



