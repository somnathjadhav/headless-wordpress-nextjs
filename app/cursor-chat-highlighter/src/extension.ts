import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Cursor Chat Highlighter extension is now active!');

  const chatHighlighter = new ChatHighlighter();
  
  // Register commands
  let toggleCommand = vscode.commands.registerCommand('chatHighlighter.toggleHighlighting', () => {
    chatHighlighter.toggleHighlighting();
  });

  let userColorCommand = vscode.commands.registerCommand('chatHighlighter.changeUserColor', async () => {
    await chatHighlighter.changeUserColor();
  });

  let aiColorCommand = vscode.commands.registerCommand('chatHighlighter.changeAIColor', async () => {
    await chatHighlighter.changeAIColor();
  });

  let openChatCommand = vscode.commands.registerCommand('chatHighlighter.openHighlightedChat', () => {
    chatHighlighter.openHighlightedChat(context);
  });

  context.subscriptions.push(toggleCommand, userColorCommand, aiColorCommand, openChatCommand);

  // Apply initial styling
  chatHighlighter.applyChatStyling();

  // Watch for configuration changes
  let configChangeListener = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('chatHighlighter')) {
      chatHighlighter.applyChatStyling();
    }
  });

  context.subscriptions.push(configChangeListener);
}

class ChatHighlighter {
  private panel: vscode.WebviewPanel | undefined;
  private isEnabled: boolean = true;

  constructor() {
    this.isEnabled = vscode.workspace.getConfiguration('chatHighlighter').get('enabled', true);
  }

  public openHighlightedChat(context: vscode.ExtensionContext): void {
    if (this.panel) {
      this.panel.reveal();
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      'highlightedChat',
      'Highlighted Chat Interface',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );

    const config = vscode.workspace.getConfiguration('chatHighlighter');
    const userBg = config.get<string>('userMessageBackground', '#e3f2fd');
    const userBorder = config.get<string>('userMessageBorder', '#2196f3');
    const aiBg = config.get<string>('aiMessageBackground', '#f3e5f5');
    const aiBorder = config.get<string>('aiMessageBorder', '#9c27b0');
    const borderRadius = config.get<string>('borderRadius', '8px');
    const padding = config.get<string>('padding', '12px');

    this.panel.webview.html = this.getWebviewContent(userBg, userBorder, aiBg, aiBorder, borderRadius, padding);

    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });

    // Handle messages from webview
    this.panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'sendMessage':
            this.handleMessage(message.text);
            return;
          case 'changeColor':
            this.handleColorChange(message.type, message.color);
            return;
        }
      },
      undefined,
      context.subscriptions
    );
  }

  private getWebviewContent(userBg: string, userBorder: string, aiBg: string, aiBorder: string, borderRadius: string, padding: string): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Highlighted Chat</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: var(--vscode-editor-background);
                color: var(--vscode-editor-foreground);
                height: 100vh;
                display: flex;
                flex-direction: column;
            }

            .chat-container {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background-color: var(--vscode-editor-background);
                border: 1px solid var(--vscode-panel-border);
                border-radius: 8px;
                margin-bottom: 20px;
            }

            .message {
                margin: 16px 0;
                padding: ${padding};
                border-radius: ${borderRadius};
                max-width: 80%;
                word-wrap: break-word;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: all 0.2s ease;
            }

            .message:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .user-message {
                background-color: ${userBg};
                border: 2px solid ${userBorder};
                margin-left: auto;
                text-align: right;
            }

            .ai-message {
                background-color: ${aiBg};
                border: 2px solid ${aiBorder};
                margin-right: auto;
                text-align: left;
            }

            .input-container {
                display: flex;
                gap: 10px;
                padding: 20px;
                background-color: var(--vscode-editor-background);
                border: 1px solid var(--vscode-panel-border);
                border-radius: 8px;
            }

            .message-input {
                flex: 1;
                padding: 12px;
                border: 1px solid var(--vscode-input-border);
                border-radius: 6px;
                background-color: var(--vscode-input-background);
                color: var(--vscode-input-foreground);
                font-family: inherit;
                resize: none;
                min-height: 40px;
                max-height: 120px;
            }

            .send-button {
                padding: 12px 24px;
                background-color: var(--vscode-button-background);
                color: var(--vscode-button-foreground);
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                transition: background-color 0.2s ease;
            }

            .send-button:hover {
                background-color: var(--vscode-button-hoverBackground);
            }

            .controls {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }

            .color-picker {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .color-picker input[type="color"] {
                width: 40px;
                height: 30px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }

            .color-picker label {
                font-size: 12px;
                color: var(--vscode-descriptionForeground);
            }

            .timestamp {
                font-size: 11px;
                color: var(--vscode-descriptionForeground);
                margin-top: 4px;
                opacity: 0.7;
            }

            .user-message .timestamp {
                text-align: right;
            }

            .ai-message .timestamp {
                text-align: left;
            }
        </style>
    </head>
    <body>
        <div class="controls">
            <div class="color-picker">
                <label>User:</label>
                <input type="color" id="userColor" value="${userBg}" onchange="changeColor('user', this.value)">
            </div>
            <div class="color-picker">
                <label>AI:</label>
                <input type="color" id="aiColor" value="${aiBg}" onchange="changeColor('ai', this.value)">
            </div>
        </div>

        <div class="chat-container" id="chatContainer">
            <div class="message ai-message">
                <div>Hello! I'm your AI assistant. How can I help you today?</div>
                <div class="timestamp">${new Date().toLocaleTimeString()}</div>
            </div>
        </div>

        <div class="input-container">
            <textarea 
                class="message-input" 
                id="messageInput" 
                placeholder="Type your message here..."
                onkeydown="handleKeyDown(event)"
            ></textarea>
            <button class="send-button" onclick="sendMessage()">Send</button>
        </div>

        <script>
            const vscode = acquireVsCodeApi();
            const chatContainer = document.getElementById('chatContainer');
            const messageInput = document.getElementById('messageInput');

            function sendMessage() {
                const text = messageInput.value.trim();
                if (!text) return;

                // Add user message
                addMessage(text, 'user');
                
                // Send to extension
                vscode.postMessage({
                    command: 'sendMessage',
                    text: text
                });

                messageInput.value = '';
                messageInput.style.height = 'auto';
            }

            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = \`message \${sender}-message\`;
                
                const contentDiv = document.createElement('div');
                contentDiv.textContent = text;
                
                const timestampDiv = document.createElement('div');
                timestampDiv.className = 'timestamp';
                timestampDiv.textContent = new Date().toLocaleTimeString();
                
                messageDiv.appendChild(contentDiv);
                messageDiv.appendChild(timestampDiv);
                
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }

            function handleKeyDown(event) {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                }
                
                // Auto-resize textarea
                messageInput.style.height = 'auto';
                messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            }

            function changeColor(type, color) {
                vscode.postMessage({
                    command: 'changeColor',
                    type: type,
                    color: color
                });
                
                // Update local styles
                const messages = document.querySelectorAll(\`.\${type}-message\`);
                messages.forEach(msg => {
                    msg.style.backgroundColor = color;
                });
            }

            // Handle messages from extension
            window.addEventListener('message', event => {
                const message = event.data;
                switch (message.command) {
                    case 'addAIMessage':
                        addMessage(message.text, 'ai');
                        break;
                    case 'updateColors':
                        document.getElementById('userColor').value = message.userColor;
                        document.getElementById('aiColor').value = message.aiColor;
                        break;
                }
            });
        </script>
    </body>
    </html>`;
  }

  private handleMessage(text: string): void {
    // Simulate AI response
    setTimeout(() => {
      if (this.panel) {
        this.panel.webview.postMessage({
          command: 'addAIMessage',
          text: `I received your message: "${text}". This is a simulated response from the AI assistant.`
        });
      }
    }, 1000);
  }

  private handleColorChange(type: string, color: string): void {
    const config = vscode.workspace.getConfiguration('chatHighlighter');
    
    if (type === 'user') {
      config.update('userMessageBackground', color, vscode.ConfigurationTarget.Global);
    } else if (type === 'ai') {
      config.update('aiMessageBackground', color, vscode.ConfigurationTarget.Global);
    }
  }

  public applyChatStyling(): void {
    // This method is kept for compatibility but the main functionality
    // is now handled by the webview interface
    if (this.isEnabled) {
      vscode.window.showInformationMessage('Chat highlighting is enabled. Use "Chat Highlighter: Open Highlighted Chat" to start.');
    }
  }

  public toggleHighlighting(): void {
    this.isEnabled = !this.isEnabled;
    vscode.workspace.getConfiguration('chatHighlighter').update('enabled', this.isEnabled, vscode.ConfigurationTarget.Global);
    
    if (this.isEnabled) {
      vscode.window.showInformationMessage('Chat highlighting enabled. Use "Chat Highlighter: Open Highlighted Chat" to start.');
    } else {
      vscode.window.showInformationMessage('Chat highlighting disabled');
    }
  }

  public async changeUserColor(): Promise<void> {
    const color = await vscode.window.showInputBox({
      prompt: 'Enter user message background color (hex):',
      placeHolder: '#e3f2fd',
      value: vscode.workspace.getConfiguration('chatHighlighter').get('userMessageBackground', '#e3f2fd')
    });

    if (color) {
      await vscode.workspace.getConfiguration('chatHighlighter').update('userMessageBackground', color, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(`User message color changed to ${color}`);
    }
  }

  public async changeAIColor(): Promise<void> {
    const color = await vscode.window.showInputBox({
      prompt: 'Enter AI message background color (hex):',
      placeHolder: '#f3e5f5',
      value: vscode.workspace.getConfiguration('chatHighlighter').get('aiMessageBackground', '#f3e5f5')
    });

    if (color) {
      await vscode.workspace.getConfiguration('chatHighlighter').update('aiMessageBackground', color, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(`AI message color changed to ${color}`);
    }
  }
}

export function deactivate() {
  console.log('Cursor Chat Highlighter extension is now deactivated!');
}
