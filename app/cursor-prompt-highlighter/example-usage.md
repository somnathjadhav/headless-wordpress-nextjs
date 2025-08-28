# Example Usage

This file demonstrates how the Prompt Highlighter extension works with various types of prompts in your code.

## JavaScript/TypeScript Examples

```javascript
// TODO: Implement user authentication system
function authenticateUser(credentials) {
  // FIXME: Add proper input validation
  if (!credentials) {
    return false;
  }
  
  // NOTE: This is a temporary implementation
  // HACK: Using localStorage for demo purposes
  const storedUser = localStorage.getItem('user');
  
  // BUG: This doesn't handle expired tokens
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  
  // PROMPT: Consider implementing OAuth2 flow
  return false;
}

// REVIEW: Check if this optimization is still needed
function optimizedFunction() {
  // QUESTION: Should we cache this result?
  const result = expensiveCalculation();
  
  // IDEA: We could use a worker thread for this
  return result;
}
```

## Python Examples

```python
# TODO: Add error handling for file operations
def read_config_file(filename):
    # FIXME: Handle file not found exception
    with open(filename, 'r') as file:
        # NOTE: This assumes JSON format
        data = json.load(file)
    
    # HACK: Temporary workaround for encoding issues
    if isinstance(data, str):
        data = json.loads(data)
    
    # BUG: Doesn't validate required fields
    return data

# PROMPT: Consider using a configuration management library
class ConfigManager:
    def __init__(self):
        # REVIEW: Is this the best way to handle defaults?
        self.defaults = {
            'debug': False,
            'timeout': 30
        }
    
    # IDEA: Add support for environment variables
    def load_config(self, path):
        pass
```

## CSS Examples

```css
/* TODO: Add responsive design for mobile */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* FIXME: This doesn't work in IE11 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* NOTE: Using CSS custom properties for theming */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}

/* HACK: Temporary fix for Safari flexbox bug */
.flex-container {
  display: -webkit-flex;
  display: flex;
}

/* BUG: This causes layout shift on page load */
.lazy-image {
  width: 100%;
  height: auto;
}

/* PROMPT: Consider using CSS-in-JS for better maintainability */
.button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

/* REVIEW: Check if these vendor prefixes are still needed */
.transition {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

/* QUESTION: Should we use CSS Grid instead of Flexbox here? */
.layout {
  display: flex;
  justify-content: space-between;
}

/* IDEA: Create a design system with consistent spacing */
.spacing {
  margin: 1rem;
  padding: 0.5rem;
}
```

## HTML Examples

```html
<!-- TODO: Add meta tags for SEO -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- FIXME: Add proper title tag -->
    <title>My Website</title>
</head>
<body>
    <!-- NOTE: This is a placeholder header -->
    <header>
        <h1>Welcome</h1>
    </header>
    
    <!-- HACK: Using inline styles for quick styling -->
    <main style="padding: 20px;">
        <!-- BUG: Missing alt attribute for accessibility -->
        <img src="logo.png">
        
        <!-- PROMPT: Consider using semantic HTML elements -->
        <div class="content">
            <p>This is the main content.</p>
        </div>
    </main>
    
    <!-- REVIEW: Check if this footer structure is optimal -->
    <footer>
        <!-- QUESTION: Should we add social media links? -->
        <p>&copy; 2024 My Website</p>
    </footer>
    
    <!-- IDEA: Add structured data for better SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite"
    }
    </script>
</body>
</html>
```

## How to Test

1. Install the extension following the installation instructions
2. Open any of these example files in Cursor
3. The prompts should be automatically highlighted with the configured styling
4. Try adding new prompts using the command palette
5. Test the "Clear All Highlights" command to remove highlights temporarily

## Customization

You can customize the appearance by modifying your Cursor settings:

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
  "promptHighlighter.highlightColor": "#e74c3c",
  "promptHighlighter.backgroundColor": "#fdf2e9",
  "promptHighlighter.fontWeight": "bold"
}
```
