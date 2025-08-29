// Utility functions for WordPress content processing

export function parseHtml(html: string): string {
  // Basic HTML parsing - in a real app, you might want to use a library like DOMPurify
  // For now, we'll return the HTML as-is since we're using dangerouslySetInnerHTML
  return html;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
