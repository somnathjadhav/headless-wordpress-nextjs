# Cursor Chat Highlighter

A Cursor extension that provides a custom chat interface with highlighted user and AI messages, making it easy to distinguish between your messages and AI responses.

## Features

- **Custom Chat Interface**: Opens a dedicated chat panel within Cursor
- **Color-Coded Messages**: User messages and AI responses have different background colors
- **Real-time Color Customization**: Change colors on the fly with color pickers
- **VS Code Theme Integration**: Automatically adapts to your current theme
- **Interactive Interface**: Send messages and receive simulated AI responses
- **Persistent Settings**: Colors and preferences are saved across sessions

## Installation

### From Source

1. Clone or download this extension
2. Navigate to the extension directory:
   ```bash
   cd cursor-chat-highlighter
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

### Opening the Chat Interface

1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Chat Highlighter: Open Highlighted Chat Interface"
3. Press Enter to open the chat panel

### Commands Available

- **Chat Highlighter: Open Highlighted Chat Interface** - Opens the custom chat interface
- **Chat Highlighter: Toggle Chat Message Highlighting** - Enable/disable the extension
- **Chat Highlighter: Change User Message Color** - Change user message background color
- **Chat Highlighter: Change AI Message Color** - Change AI message background color

### Using the Chat Interface

1. **Send Messages**: Type your message in the text area and press Enter or click Send
2. **Change Colors**: Use the color pickers at the top to change message colors in real-time
3. **Auto-resize**: The text area automatically resizes as you type
4. **Timestamps**: Each message includes a timestamp for reference

## Configuration

You can customize the extension behavior in your Cursor settings:

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

### Color Options

- **User Message Background**: Background color for your messages (default: light blue)
- **User Message Border**: Border color for your messages (default: blue)
- **AI Message Background**: Background color for AI responses (default: light purple)
- **AI Message Border**: Border color for AI responses (default: purple)
- **Border Radius**: Rounded corners for message bubbles (default: 8px)
- **Padding**: Internal spacing for messages (default: 12px)

## Default Colors

- **User Messages**: Light blue background (`#e3f2fd`) with blue border (`#2196f3`)
- **AI Messages**: Light purple background (`#f3e5f5`) with purple border (`#9c27b0`)

## Features in Detail

### Visual Design
- **Message Bubbles**: Rounded corners with shadows for a modern look
- **Hover Effects**: Messages lift slightly when hovered over
- **Theme Integration**: Uses VS Code's theme colors for consistency
- **Responsive Layout**: Adapts to different panel sizes

### Interaction
- **Real-time Updates**: Color changes apply immediately
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines
- **Auto-scroll**: Chat automatically scrolls to show new messages
- **Message History**: All messages are preserved during the session

### Customization
- **Color Pickers**: Visual color selection in the interface
- **Settings Persistence**: Colors are saved and restored
- **Global Settings**: Changes apply to all workspaces

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

## Technical Details

- **Webview-based**: Uses VS Code's webview API for the chat interface
- **TypeScript**: Written in TypeScript for type safety
- **Theme-aware**: Integrates with VS Code's theme system
- **Message Passing**: Secure communication between extension and webview

## Limitations

- This extension provides a custom chat interface within Cursor
- It does not integrate with Cursor's built-in AI chat functionality
- AI responses are simulated for demonstration purposes
- The interface is separate from the main Cursor chat panel

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



