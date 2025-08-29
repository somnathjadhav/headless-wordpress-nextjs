# Prompt Highlighter - Cursor Extension

A Cursor extension that automatically highlights specified prompts in your code, making them easily visible and searchable.

## Features

- **Automatic Highlighting**: Automatically highlights predefined prompts as you type
- **Customizable Prompts**: Add your own prompts to highlight
- **Visual Customization**: Customize colors, background, and font weight
- **Real-time Updates**: Highlights update automatically when you change files or edit content
- **Easy Management**: Commands to add new prompts and clear highlights

## Default Highlighted Prompts

The extension comes with these default prompts:
- `TODO:`
- `FIXME:`
- `NOTE:`
- `HACK:`
- `BUG:`
- `PROMPT:`

## Installation

### From Source

1. Clone or download this extension
2. Navigate to the extension directory:
   ```bash
   cd cursor-prompt-highlighter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Copy the extension to your Cursor extensions folder:
   - **macOS**: `~/Library/Application Support/Cursor/User/extensions/`
   - **Windows**: `%APPDATA%\Cursor\User\extensions\`
   - **Linux**: `~/.config/Cursor/User/extensions/`

### Development Installation

1. Follow steps 1-4 above
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. Run "Developer: Reload Window" to reload Cursor
4. The extension should now be active

## Usage

### Commands

Access these commands via the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`):

- **Prompt Highlighter: Highlight Prompt** - Manually trigger highlighting
- **Prompt Highlighter: Clear All Highlights** - Remove all highlights
- **Prompt Highlighter: Add New Prompt to Highlight** - Add a custom prompt

### Adding Custom Prompts

1. Open Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
2. Run "Prompt Highlighter: Add New Prompt to Highlight"
3. Enter your prompt (e.g., `REVIEW:`, `QUESTION:`, `IDEA:`)
4. The prompt will be added to your global settings and highlighted immediately

### Configuration

You can customize the extension behavior in your Cursor settings:

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
    "QUESTION:"
  ],
  "promptHighlighter.highlightColor": "#ff6b6b",
  "promptHighlighter.backgroundColor": "#ffeb3b",
  "promptHighlighter.fontWeight": "bold"
}
```

## Examples

The extension will highlight prompts like these in your code:

```javascript
// TODO: Implement user authentication
function login() {
  // FIXME: Add proper error handling
  console.log("Login functionality");
}

// NOTE: This is a temporary solution
const tempData = [];

// HACK: Workaround for browser compatibility
if (navigator.userAgent.includes('Safari')) {
  // BUG: Safari doesn't support this feature
  fallbackMethod();
}

// PROMPT: Consider refactoring this function
function complexFunction() {
  // REVIEW: Check if this optimization is still needed
  return optimizedResult;
}
```

## Development

### Building

```bash
npm run compile
```

### Watching for Changes

```bash
npm run watch
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This extension is open source and available under the MIT License.

## Support

If you encounter any issues or have feature requests, please open an issue on the repository.
