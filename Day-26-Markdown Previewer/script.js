// Default placeholder markdown text
const placeholder = `
# Welcome to Markdown Previewer!

## This is a subheading
You can use **bold text**, *italic text*, or even [links](https://www.example.com).

\`\`\`javascript
// Code block example
function greet() {
    console.log('Hello, World!');
}
\`\`\`

- Here’s a list item
- Another list item

> This is a blockquote.

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png)

### Enjoy previewing your markdown!
`;

// Initialize with the placeholder content
const markdownInput = document.getElementById('markdown-input');
const previewDiv = document.getElementById('preview');

// Function to update the preview
function updatePreview() {
  const markdownText = markdownInput.value;
  previewDiv.innerHTML = marked.parse(markdownText);
}

// Load the placeholder content when the page loads
window.addEventListener('DOMContentLoaded', () => {
  markdownInput.value = placeholder;
  updatePreview(); // Preview the placeholder content
});

// Add an event listener for the textarea to update the preview on input
markdownInput.addEventListener('input', updatePreview);
