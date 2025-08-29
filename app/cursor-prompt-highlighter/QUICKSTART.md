# Quick Start Guide

Get the Prompt Highlighter extension up and running in 5 minutes!

## 🚀 Quick Installation

### Option 1: Automated Installation (Recommended)

**macOS/Linux:**
```bash
cd cursor-prompt-highlighter
./install.sh
```

**Windows:**
```cmd
cd cursor-prompt-highlighter
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
   - **macOS**: `~/Library/Application Support/Cursor/User/extensions/cursor-prompt-highlighter/`
   - **Windows**: `%APPDATA%\Cursor\User\extensions\cursor-prompt-highlighter\`
   - **Linux**: `~/.config/Cursor/User/extensions/cursor-prompt-highlighter/`

4. **Reload Cursor:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
   - Run "Developer: Reload Window"

## ✅ Verify Installation

1. Open the test file: `test-example.js`
2. You should see prompts like `TODO:`, `FIXME:`, `NOTE:` highlighted
3. Try adding a new prompt:
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
   - Run "Prompt Highlighter: Add New Prompt to Highlight"
   - Enter `REVIEW:`
   - Check that it gets highlighted

## 🎯 Default Prompts

The extension highlights these prompts by default:
- `TODO:` - Tasks to complete
- `FIXME:` - Issues to fix
- `NOTE:` - Important notes
- `HACK:` - Workarounds
- `BUG:` - Known bugs
- `PROMPT:` - Future considerations

## ⚙️ Customization

Add these to your Cursor settings (`Cmd+,` or `Ctrl+,`):

```json
{
  "promptHighlighter.prompts": [
    "TODO:",
    "FIXME:",
    "NOTE:",
    "HACK:",
    "BUG:",
    "PROMPT:",
    "REVIEW:",
    "QUESTION:",
    "IDEA:"
  ],
  "promptHighlighter.highlightColor": "#ff6b6b",
  "promptHighlighter.backgroundColor": "#ffeb3b",
  "promptHighlighter.fontWeight": "bold"
}
```

## 🎉 You're Ready!

The extension will now automatically highlight prompts in all your files. Try typing `TODO:` in any file and watch it get highlighted!

## 🆘 Need Help?

- Check the full [README.md](README.md) for detailed documentation
- See [example-usage.md](example-usage.md) for more examples
- Review the [CHANGELOG.md](CHANGELOG.md) for updates
