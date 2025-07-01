# Coding Style Preferences

To ensure consistency in this project, please follow these conventions for all code contributions:

1. **Semicolons**
   - Always end statements with a semicolon (`;`).

2. **Block Scoping**
   - Always use curly braces `{}` for `if`, `for`, `while`, etc., even for single-line blocks.
   - Example:
     ```js
     if (condition) {
       doSomething();
     }
     ```

3. **No Inline Styles in Templates**
   - Do not use the `style` attribute directly on elements in Vue templates.
   - All styles should be placed in the `<style scoped>` section and referenced via class names.

4. **General**
   - Prefer clear, readable, and consistent code.
   - Follow existing patterns in the codebase.

Thank you for helping keep the codebase clean and consistent!
