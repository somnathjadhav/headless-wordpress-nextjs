import * as vscode from 'vscode';

interface PromptHighlight {
  prompt: string;
  decoration: vscode.TextEditorDecorationType;
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Prompt Highlighter extension is now active!');

  const promptHighlighter = new PromptHighlighter();
  
  // Register commands
  let highlightCommand = vscode.commands.registerCommand('promptHighlighter.highlightPrompt', () => {
    promptHighlighter.highlightPrompts();
  });

  let clearCommand = vscode.commands.registerCommand('promptHighlighter.clearHighlights', () => {
    promptHighlighter.clearAllHighlights();
  });

  let addPromptCommand = vscode.commands.registerCommand('promptHighlighter.addPrompt', async () => {
    await promptHighlighter.addNewPrompt();
  });

  context.subscriptions.push(highlightCommand, clearCommand, addPromptCommand);

  // Auto-highlight on document change
  let changeListener = vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    if (editor && event.document === editor.document) {
      promptHighlighter.highlightPrompts();
    }
  });

  // Auto-highlight on editor change
  let editorChangeListener = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      promptHighlighter.highlightPrompts();
    }
  });

  context.subscriptions.push(changeListener, editorChangeListener);

  // Initial highlight
  if (vscode.window.activeTextEditor) {
    promptHighlighter.highlightPrompts();
  }
}

class PromptHighlighter {
  private highlights: PromptHighlight[] = [];
  private decorations: vscode.TextEditorDecorationType[] = [];

  constructor() {
    this.initializeHighlights();
  }

  private initializeHighlights(): void {
    const config = vscode.workspace.getConfiguration('promptHighlighter');
    const prompts = config.get<string[]>('prompts', []);
    const highlightColor = config.get<string>('highlightColor', '#ff6b6b');
    const backgroundColor = config.get<string>('backgroundColor', '#ffeb3b');
    const fontWeight = config.get<string>('fontWeight', 'bold');

    this.highlights = prompts.map(prompt => ({
      prompt,
      decoration: vscode.window.createTextEditorDecorationType({
        color: highlightColor,
        backgroundColor: backgroundColor,
        fontWeight: fontWeight as 'normal' | 'bold',
        border: '1px solid ' + highlightColor,
        borderRadius: '3px',
        after: {
          contentText: ' 🔍',
          color: highlightColor
        }
      })
    }));
  }

  public highlightPrompts(): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    // Clear existing decorations
    this.clearAllHighlights();

    const document = editor.document;
    const text = document.getText();

    this.highlights.forEach(({ prompt, decoration }) => {
      const ranges: vscode.Range[] = [];
      const regex = new RegExp(`\\b${this.escapeRegExp(prompt)}\\b`, 'gi');

      let match;
      while ((match = regex.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        ranges.push(new vscode.Range(startPos, endPos));
      }

      if (ranges.length > 0) {
        editor.setDecorations(decoration, ranges);
        this.decorations.push(decoration);
      }
    });
  }

  public clearAllHighlights(): void {
    this.decorations.forEach(decoration => {
      decoration.dispose();
    });
    this.decorations = [];
  }

  public async addNewPrompt(): Promise<void> {
    const prompt = await vscode.window.showInputBox({
      prompt: 'Enter a new prompt to highlight:',
      placeHolder: 'e.g., REVIEW:, QUESTION:, IDEA:'
    });

    if (prompt) {
      const config = vscode.workspace.getConfiguration('promptHighlighter');
      const currentPrompts = config.get<string[]>('prompts', []);
      
      if (!currentPrompts.includes(prompt)) {
        currentPrompts.push(prompt);
        await config.update('prompts', currentPrompts, vscode.ConfigurationTarget.Global);
        
        // Reinitialize highlights with new prompt
        this.highlights.forEach(h => h.decoration.dispose());
        this.initializeHighlights();
        this.highlightPrompts();
        
        vscode.window.showInformationMessage(`Added "${prompt}" to highlighted prompts`);
      } else {
        vscode.window.showWarningMessage(`"${prompt}" is already in the list of highlighted prompts`);
      }
    }
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export function deactivate() {
  console.log('Prompt Highlighter extension is now deactivated!');
}
