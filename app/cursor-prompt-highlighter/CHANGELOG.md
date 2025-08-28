# Changelog

All notable changes to the "Prompt Highlighter" extension will be documented in this file.

## [1.0.0] - 2024-01-XX

### Added
- Initial release of Prompt Highlighter extension
- Automatic highlighting of predefined prompts (TODO:, FIXME:, NOTE:, HACK:, BUG:, PROMPT:)
- Real-time highlighting as you type
- Customizable prompt list through settings
- Visual customization options (colors, background, font weight)
- Command palette integration
- Add new prompts dynamically
- Clear all highlights functionality
- Auto-highlight on document and editor changes

### Features
- **Automatic Detection**: Highlights prompts automatically without manual intervention
- **Customizable Appearance**: Configure highlight colors, background colors, and font weight
- **Dynamic Prompt Management**: Add new prompts through the command palette
- **Cross-file Support**: Works across all file types and languages
- **Performance Optimized**: Efficient regex-based detection with minimal performance impact

### Technical Details
- Built with TypeScript for type safety
- Uses VS Code extension API for seamless integration
- Configurable through workspace settings
- Supports both global and workspace-specific configurations
