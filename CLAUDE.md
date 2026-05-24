# CLAUDE.md - AI Assistant Guide for Orange County Website

## Project Overview

This is the official Orange County Florida website redesign - a modern, responsive static website featuring an AI-powered chatbot assistant. The project is designed to provide citizens with easy access to county services, information, and support.

**Project Type:** Static HTML/CSS/JavaScript website (no backend framework)
**Primary Goal:** Modernize citizen engagement with accessible, mobile-first design and AI chatbot support
**Deployment:** Automated via GitHub Actions to GitHub Pages

---

## Behavioral Guidelines

Source: https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Repository Structure

```
OC-Website/
├── index.html              # Main homepage (single-page application)
├── styles.css              # All styling and responsive design rules
├── script.js               # Interactive features and chatbot logic
├── images/                 # Image assets and logos
│   ├── oc-logo.svg        # Orange County logo (SVG - preferred)
│   ├── oc-logo.png        # Orange County logo (PNG fallback)
│   └── LOGO-INSTRUCTIONS.txt
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment workflow
├── README.md              # User-facing documentation
├── FEATURES.md            # Feature highlights for stakeholders
└── CLAUDE.md              # This file - AI assistant guide
```

---

## Architecture & Technology Stack

### Core Technologies
- **HTML5:** Semantic markup for accessibility and SEO
- **CSS3:** Modern features (Grid, Flexbox, Custom Properties/CSS Variables)
- **Vanilla JavaScript:** No frameworks - lightweight and performant
- **Font Awesome 6.4.0:** Icon library (loaded via CDN)

### Design Principles
1. **Mobile-First:** Responsive design prioritizes mobile experience
2. **Progressive Enhancement:** Core functionality works without JavaScript
3. **Accessibility:** WCAG 2.1 compliant design patterns
4. **Performance:** Minimal dependencies, optimized load times
5. **Semantic HTML:** Proper document structure for screen readers and SEO

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Brand Identity & Colors

### Official Orange County Colors
Defined as CSS custom properties in `styles.css`:

```css
:root {
    --primary-blue: #0088B8;    /* Primary brand color */
    --dark-blue: #005A7A;       /* Darker variant for contrast */
    --light-blue: #E6F4F9;      /* Backgrounds and accents */
    --orange: #FF8C42;          /* Secondary brand color */
    --dark-gray: #333333;       /* Text color */
    --medium-gray: #666666;     /* Secondary text */
    --light-gray: #F5F5F5;      /* Backgrounds */
    --white: #FFFFFF;
    --success: #4CAF50;         /* Success states */
    --warning: #FFA726;         /* Warning states */
    --border-radius: 8px;
    --transition: all 0.3s ease;
}
```

**IMPORTANT:** Always use CSS variables (e.g., `var(--primary-blue)`) instead of hardcoded colors to maintain brand consistency.

---

## Key Components & Features

### 1. Header & Navigation (`index.html:12-39`)
- **Sticky Header:** Remains visible on scroll with dynamic shadow
- **Responsive Mobile Menu:** Toggles to hamburger menu on small screens
- **Logo:** SVG format (preferred) with PNG fallback
- **Search Button:** Placeholder for future search functionality

**JavaScript Behavior:**
- Mobile menu toggle animation (script.js:1-22)
- Closes menu when clicking outside (script.js:14-22)
- Dynamic box shadow on scroll (script.js:261-271)

### 2. Hero Section (`index.html:41-54`)
- **Gradient Background:** CSS gradient overlay for visual appeal
- **Call-to-Action Buttons:** Primary and secondary button styles
- **Responsive Text:** Scales appropriately for all screen sizes

### 3. Quick Access Cards (`index.html:57-111`)
- **6 Primary Services:** Most-used citizen services
- **Icon-Based Design:** Font Awesome icons for visual recognition
- **Hover Effects:** Scale transform and color changes
- **Click Analytics:** Console logging for future analytics integration (script.js:292-298)

### 4. AI Chatbot (`index.html:265-307`)
The flagship feature of the website.

#### Chatbot Architecture
**Components:**
- Toggle button (fixed bottom-right position)
- Chat window with header, messages area, and input
- Quick reply buttons for common queries
- Message rendering system

**Knowledge Base Structure (`script.js:33-103`):**
```javascript
const chatbotKnowledge = {
    'keyword': {
        response: "Bot response text",
        links: [
            { text: 'Link Text', url: 'URL' }
        ]
    }
}
```

**Current Topics:**
- Property tax payments
- Permits and licenses
- Public records requests
- Parks and recreation
- Waste collection
- Library services
- Hours of operation
- Employment opportunities
- Emergency services
- Contact information

**Response Logic (`script.js:177-211`):**
1. Convert user message to lowercase
2. Search for keyword matches in knowledge base
3. Check for greetings (hi, hello, hey)
4. Check for thank you messages
5. Return default response with suggestions if no match

**Adding New Responses:**
To add chatbot knowledge, edit `script.js` and add entries to `chatbotKnowledge`:
```javascript
'your-keyword': {
    response: "Your helpful response here",
    links: [
        { text: 'Relevant Link', url: '#' }
    ]
}
```

### 5. News Section (`index.html:114-157`)
- **Card-Based Layout:** 3 featured news articles
- **"New" Badge:** Highlight recent updates
- **Placeholder Images:** via.placeholder.com (replace with actual images)
- **Responsive Grid:** Stacks on mobile, 3 columns on desktop

### 6. Departments Section (`index.html:160-206`)
- **8 Major Departments:** Grid layout with icons
- **Click Events:** Alert navigation (placeholder for real links) (script.js:285-290)
- **Hover Effects:** Visual feedback with transform and color change

### 7. Footer (`index.html:209-263`)
- **4-Column Layout:** Logo/contact, quick links, services, social/newsletter
- **Newsletter Signup:** Form submission with alert (script.js:274-282)
- **Social Media Links:** Placeholder links for Facebook, Twitter, Instagram, YouTube
- **Responsive:** Stacks vertically on mobile

---

## CSS Conventions & Patterns

### Layout Strategy
- **Flexbox:** Used for header, navigation, cards
- **CSS Grid:** Used for service cards, news grid, departments grid
- **Max-width Container:** `.container` class with 1200px max-width and 20px padding

### Responsive Breakpoints
```css
@media (max-width: 768px) {
    /* Tablet and mobile styles */
}

@media (max-width: 480px) {
    /* Mobile-only styles */
}
```

### Common CSS Patterns
- **Card Hover Effect:** `transform: translateY(-5px)` + `box-shadow` increase
- **Smooth Transitions:** Use `var(--transition)` for consistent timing
- **Border Radius:** Use `var(--border-radius)` (8px)
- **Section Padding:** Typically 80px vertical, 0 horizontal (adjusts for mobile)

### Naming Conventions
- **BEM-inspired:** `.component-element-modifier` pattern
- **Semantic Class Names:** Describe content, not appearance
- **Examples:** `.quick-access-card`, `.chatbot-window`, `.news-grid`

---

## JavaScript Conventions & Patterns

### Code Organization
JavaScript is organized by feature/component:
1. Mobile menu toggle (lines 1-22)
2. Chatbot functionality (lines 24-231)
3. Smooth scrolling (lines 233-255)
4. Header scroll effects (lines 257-271)
5. Form handling (lines 273-282)
6. Click analytics (lines 284-298)
7. Intersection Observer animations (lines 300-321)

### DOM Selection
- **Prefer `getElementById`** for unique elements
- **Use `querySelector/querySelectorAll`** for class/attribute selectors
- **Cache DOM references** at top of relevant code sections

### Event Handling Patterns
```javascript
// Direct event listener
element.addEventListener('click', () => { ... });

// Event delegation for dynamic content
document.addEventListener('click', (e) => {
    if (e.target.matches('.selector')) { ... }
});
```

### Animation Patterns
**Intersection Observer** for scroll-triggered animations (script.js:300-321):
- Elements start with `opacity: 0` and `translateY(30px)`
- Animate to visible when 10% enters viewport
- Applied to: `.quick-access-card`, `.news-card`, `.department-card`

---

## Development Workflow

### Git Branch Strategy
- **Main branch:** Production-ready code
- **Feature branches:** Named with `claude/` prefix for AI-generated changes
- **Pull Requests:** Required for merging to main

### Commit Message Guidelines
- Use clear, descriptive commit messages
- Format: `[Action] Brief description`
- Examples:
  - `Add GitHub Actions deployment workflow`
  - `Update chatbot knowledge base with new services`
  - `Fix mobile navigation toggle issue`

### Making Changes

#### HTML Changes (`index.html`)
1. **Maintain semantic structure:** Use proper heading hierarchy (h1 → h2 → h3)
2. **Preserve accessibility attributes:** `aria-label`, `alt` text, `role` attributes
3. **Keep responsive structure:** Don't break existing grid/flex layouts
4. **Test mobile menu:** Ensure mobile navigation still works

#### CSS Changes (`styles.css`)
1. **Use CSS variables:** Never hardcode colors or common values
2. **Add comments for new sections:** `/* Section Name */`
3. **Follow existing patterns:** Match naming conventions and structure
4. **Test responsive behavior:** Check mobile, tablet, and desktop views
5. **Maintain specificity:** Avoid overly specific selectors

#### JavaScript Changes (`script.js`)
1. **Preserve existing event listeners:** Don't break current functionality
2. **Add comments for complex logic:** Explain non-obvious code
3. **Use consistent naming:** Follow camelCase convention
4. **Test chatbot:** Verify knowledge base additions work correctly
5. **Check console for errors:** No JavaScript errors in browser console

### Testing Checklist
Before committing changes:
- [ ] Open `index.html` in browser
- [ ] Test mobile navigation (resize window or use dev tools)
- [ ] Verify chatbot opens/closes correctly
- [ ] Test chatbot responses for new knowledge entries
- [ ] Check responsive layouts at 320px, 768px, and 1200px widths
- [ ] Verify all links work (or show appropriate placeholders)
- [ ] Check browser console for errors
- [ ] Validate HTML (optional but recommended)
- [ ] Test on multiple browsers if possible

---

## Deployment Process

### GitHub Actions Workflow
Location: `.github/workflows/deploy.yml`

**Trigger Events:**
- Push to `main` branch (automatic)
- Manual trigger via `workflow_dispatch`

**Deployment Steps:**
1. Checkout code from repository
2. Setup GitHub Pages configuration
3. Upload all files as artifact
4. Deploy to GitHub Pages

**Permissions Required:**
- `contents: read` - Read repository files
- `pages: write` - Write to GitHub Pages
- `id-token: write` - OIDC authentication

**Deployment URL:** Automatically generated by GitHub Pages (check repository settings)

### Manual Deployment
If needed, deploy manually by:
1. Uploading all files to any static web host
2. Ensuring directory structure is maintained
3. No special server configuration required (static files only)

---

## Common Modification Patterns

### Adding a New Service Card
1. **HTML** (`index.html` in `.quick-access-grid`):
```html
<div class="quick-access-card">
    <div class="icon-wrapper">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Service Name</h3>
    <p>Service description</p>
    <a href="#" class="card-link">Action Text <i class="fas fa-arrow-right"></i></a>
</div>
```

2. **CSS**: No changes needed (inherits existing styles)

3. **JavaScript**: Add to Intersection Observer if animation desired

### Adding Chatbot Knowledge
**Edit `script.js`**, add to `chatbotKnowledge` object:
```javascript
'new-topic': {
    response: "Detailed, helpful response to user query",
    links: [
        { text: 'Primary Resource', url: 'https://...' },
        { text: 'Additional Info', url: 'https://...' }
    ]
}
```

**Keywords are matched with:**
- Exact keyword match (case-insensitive)
- Keyword without spaces (e.g., 'property tax' matches 'propertytax')

### Adding a News Article
**Edit `index.html`** in `.news-grid`:
```html
<article class="news-card">
    <div class="news-image">
        <img src="path/to/image.jpg" alt="Description">
        <span class="news-badge">New</span> <!-- Optional -->
    </div>
    <div class="news-content">
        <span class="news-date">Month DD, YYYY</span>
        <h3>Article Headline</h3>
        <p>Article summary or excerpt...</p>
        <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
    </div>
</article>
```

### Changing Brand Colors
**Edit `styles.css`** in `:root` section:
```css
:root {
    --primary-blue: #YOUR_NEW_BLUE;
    --orange: #YOUR_NEW_ORANGE;
    /* Other variables... */
}
```
All components using `var(--primary-blue)` or `var(--orange)` will automatically update.

### Adding a New Department
**Edit `index.html`** in `.departments-grid`:
```html
<div class="department-card">
    <i class="fas fa-icon-name"></i>
    <h3>Department Name</h3>
    <p>Brief description of services</p>
</div>
```

**Update JavaScript** (`script.js:285-290`) to handle clicks if needed.

---

## File Reference Guide

### index.html (14,487 bytes)
**Key Sections:**
- Lines 3-9: Head with metadata and stylesheets
- Lines 12-39: Header and navigation
- Lines 41-54: Hero section
- Lines 57-111: Quick access service cards
- Lines 114-157: News and announcements
- Lines 160-206: Department directory
- Lines 209-263: Footer
- Lines 265-307: Chatbot widget

**External Dependencies:**
- Font Awesome 6.4.0 CDN (line 8)
- styles.css (line 7)
- script.js (line 309)

### styles.css (16,584 bytes)
**Key Sections:**
- Lines 1-15: CSS custom properties (variables)
- Lines 17-35: Reset and base styles
- Lines 37-100: Header and navigation
- Lines 101-200: Hero section and buttons
- Lines 200-300: Quick access cards
- Lines 300-400: News section
- Lines 400-500: Departments and footer
- Lines 500+: Chatbot styles
- End: Responsive media queries

### script.js (12,100 bytes)
**Key Sections:**
- Lines 1-22: Mobile menu functionality
- Lines 24-103: Chatbot knowledge base definition
- Lines 105-231: Chatbot UI and logic
- Lines 233-255: Smooth scroll navigation
- Lines 257-271: Header scroll effects
- Lines 273-282: Newsletter form handling
- Lines 284-298: Analytics event logging
- Lines 300-321: Intersection Observer animations

---

## Best Practices for AI Assistants

### DO:
✅ **Use existing CSS variables** for colors and common values
✅ **Maintain semantic HTML structure** and accessibility attributes
✅ **Follow existing naming conventions** (BEM-inspired class names)
✅ **Test changes locally** before committing (open index.html in browser)
✅ **Preserve responsive design** when modifying layouts
✅ **Add comments** for complex logic or non-obvious code
✅ **Update chatbot knowledge** when adding new services/features
✅ **Keep code simple and readable** (no over-engineering)
✅ **Match existing code style** (indentation, spacing, patterns)
✅ **Verify no console errors** after changes

### DON'T:
❌ **Don't hardcode colors** - use CSS variables
❌ **Don't break mobile responsiveness** - test at multiple screen sizes
❌ **Don't add external dependencies** without good reason (keep it lightweight)
❌ **Don't use frameworks** (React, Vue, etc.) - maintain vanilla JavaScript
❌ **Don't remove accessibility features** (ARIA labels, alt text, semantic HTML)
❌ **Don't ignore browser compatibility** - avoid bleeding-edge features
❌ **Don't create overly complex code** - simplicity is preferred
❌ **Don't skip testing** - always verify changes work
❌ **Don't modify deployment workflow** without explicit request
❌ **Don't change brand colors** without approval

### When Adding Features:
1. **Read existing code first** - understand current patterns
2. **Match existing style** - consistency is key
3. **Consider mobile first** - design for small screens
4. **Test thoroughly** - verify in multiple scenarios
5. **Document if complex** - add helpful comments
6. **Update chatbot if relevant** - keep AI assistant knowledgeable
7. **Maintain performance** - avoid heavy libraries or slow operations

### When Fixing Bugs:
1. **Identify root cause** - don't just patch symptoms
2. **Test edge cases** - ensure fix doesn't break other scenarios
3. **Check responsive behavior** - verify fix works on all screen sizes
4. **Validate HTML/CSS** - ensure standards compliance
5. **Clear browser cache** - test with fresh page load
6. **Document the fix** - add comment explaining non-obvious solutions

### Code Quality Standards:
- **HTML:** Valid HTML5, semantic elements, proper nesting
- **CSS:** DRY principles, organized by component, mobile-first media queries
- **JavaScript:** Clear variable names, modular functions, event delegation where appropriate
- **Comments:** Explain "why" not "what" - code should be self-documenting
- **Formatting:** Consistent indentation (4 spaces), readable line breaks

---

## Troubleshooting Common Issues

### Chatbot Not Responding
**Cause:** Keyword not in knowledge base or typo in user input
**Solution:** Check `chatbotKnowledge` object for matching keywords

### Mobile Menu Not Toggling
**Cause:** JavaScript error or event listener not attached
**Solution:** Check browser console for errors; verify `mobileMenuToggle` exists

### Styles Not Applying
**Cause:** CSS specificity issue or typo in class name
**Solution:** Verify class names match between HTML and CSS; check for specificity conflicts

### Images Not Loading
**Cause:** Incorrect file path or missing file
**Solution:** Verify image exists in `images/` directory; check file path in HTML

### GitHub Actions Deployment Failing
**Cause:** Permission issues or workflow syntax error
**Solution:** Check Actions tab for error details; verify repository Pages settings

### Responsive Layout Breaking
**Cause:** Hard-coded widths or missing media queries
**Solution:** Use percentage/flexible units; test at breakpoints (768px, 480px)

---

## Future Enhancement Opportunities

The codebase is designed for easy expansion. Consider these opportunities:

### Backend Integration
- Connect chatbot to county databases for real-time information
- Implement actual payment processing for property tax
- Real public records search functionality
- Department-specific pages with full information

### Advanced Features
- Multi-language support (Spanish, Creole)
- Advanced search with autocomplete
- Interactive events calendar with filtering
- User accounts and personalized dashboards
- Email notifications for services
- Live chat escalation to human agents

### AI/ML Enhancements
- Natural language processing for chatbot
- Machine learning to improve responses over time
- Sentiment analysis on citizen feedback
- Predictive search suggestions

### Analytics & Optimization
- Google Analytics or similar integration
- A/B testing for UI improvements
- Performance monitoring
- User behavior tracking
- Service usage statistics

### Accessibility Improvements
- Screen reader testing and optimization
- Keyboard navigation improvements
- High contrast mode toggle
- Font size adjustment controls
- Translation API integration

---

## Quick Reference

### File Modification Priority
**High Impact:** Changes users see directly
- `index.html` - Content, structure, features
- `styles.css` - Visual appearance, branding
- `script.js` - Interactivity, chatbot knowledge

**Configuration:**
- `.github/workflows/deploy.yml` - Deployment automation

**Documentation:**
- `README.md` - User documentation
- `FEATURES.md` - Stakeholder information
- `CLAUDE.md` - AI assistant guide (this file)

### Essential Commands
```bash
# Start local development (open in browser)
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux

# Check git status
git status

# Create feature branch
git checkout -b claude/feature-description

# Commit changes
git add .
git commit -m "Description of changes"

# Push to remote
git push -u origin claude/feature-description
```

### Key URLs & Resources
- **Font Awesome Icons:** https://fontawesome.com/icons
- **CSS Tricks (Grid/Flexbox):** https://css-tricks.com/
- **MDN Web Docs:** https://developer.mozilla.org/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **GitHub Pages Docs:** https://docs.github.com/en/pages

---

## Contact & Support

For questions about this codebase or to report issues:
1. Check this CLAUDE.md file for guidance
2. Review README.md for user-facing documentation
3. Examine existing code patterns before implementing new features
4. Test thoroughly before committing changes

**Remember:** This website serves the citizens of Orange County, Florida. Changes should prioritize user experience, accessibility, and reliability.

---

**Document Version:** 1.0
**Last Updated:** November 22, 2025
**Maintained by:** AI assistants working on OC-Website repository
**Purpose:** Comprehensive guide for AI-assisted development and maintenance
