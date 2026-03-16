# match-hosted-site

Use Chrome DevTools MCP to analyze a hosted website and replicate its design, styling, and structure in the local codebase.

## Workflow

1. **Inspect the hosted website**
   - Use `mcp__chrome-devtools__new_page` to open the hosted site
   - Use `mcp__chrome-devtools__take_snapshot` to capture the page structure (accessibility tree)
   - Use `mcp__chrome-devtools__take_screenshot` for visual reference
   - Use `mcp__chrome-devtools__evaluate_script` to extract:
     - Computed styles (colors, fonts, spacing, etc.)
     - Layout properties (flexbox/grid settings, dimensions)
     - DOM structure and element attributes
   - Use `mcp__chrome-devtools__list_network_requests` to see loaded assets

2. **Inspect the local development site**
   - Ensure dev server is running (e.g., `npm run dev` for Next.js)
   - Use `mcp__chrome-devtools__new_page` to open localhost
   - Take snapshots and screenshots of the current state

3. **Compare and identify differences**
   - Compare snapshots to identify structural differences
   - Compare screenshots to spot visual differences
   - Use JavaScript evaluation to compare:
     - CSS custom properties / design tokens
     - Typography (font families, sizes, weights, line heights)
     - Colors (text, backgrounds, borders)
     - Spacing (margins, padding, gaps)
     - Layout techniques (display modes, positioning)
     - Responsive breakpoints

4. **Extract specific values**
   Example JavaScript to run via `evaluate_script`:
   ```javascript
   // Get computed styles
   () => {
     const el = document.querySelector('selector');
     const styles = window.getComputedStyle(el);
     return {
       color: styles.color,
       fontSize: styles.fontSize,
       fontFamily: styles.fontFamily,
       margin: styles.margin,
       padding: styles.padding
     };
   }

   // Get CSS custom properties
   () => {
     const root = document.documentElement;
     const styles = window.getComputedStyle(root);
     return {
       primaryColor: styles.getPropertyValue('--primary-color'),
       fontSize: styles.getPropertyValue('--font-size-base')
     };
   }

   // Get layout information
   () => {
     const el = document.querySelector('selector');
     return {
       display: window.getComputedStyle(el).display,
       width: el.offsetWidth,
       height: el.offsetHeight,
       boundingBox: el.getBoundingClientRect()
     };
   }
   ```

5. **Update local codebase**
   - Edit CSS files, Tailwind config, or design token files
   - Update component code if structural changes are needed
   - Reload the dev server (`mcp__chrome-devtools__navigate_page` with reload)
   - Compare again and iterate

6. **Test responsive behavior**
   - Use `mcp__chrome-devtools__emulate` to test different viewports
   - Use `mcp__chrome-devtools__resize_page` for specific dimensions
   - Compare mobile/tablet/desktop layouts between hosted and local

## Tips

- Start with high-level structure before diving into fine details
- Extract design tokens first (colors, typography, spacing) before individual component styles
- Use the snapshot tool (text-based) over screenshots when possible - it's faster and more precise
- Keep both tabs open for quick comparison
- For complex styles, take screenshots of specific elements using the `uid` parameter
- Use `emulate` to test dark mode if the hosted site supports it

## Common use cases

- Replicating a design from a production site
- Ensuring staging matches production
- Rebuilding a site with a new tech stack while maintaining the same design
- Creating a clone/template based on an existing site
- Quality assurance by comparing before/after deployments
