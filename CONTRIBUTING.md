# 🤝 Contributing to CleanFlow

Thank you for your interest in contributing to CleanFlow! This document provides guidelines for contributing to this multilingual room organization project.

## 🌟 How to Contribute

### 1. **Translation Improvements**

- Fix grammar, typos, or cultural adaptations
- Improve existing translations for better clarity
- Ensure translations maintain the original meaning and tone
- Consider cultural context and local idioms

### 2. **New Language Support**

- Add support for additional languages
- Follow the existing translation structure
- Test thoroughly in the interface
- Provide cultural context notes when relevant

### 3. **Code Improvements**

- Bug fixes and performance optimizations
- UI/UX enhancements
- Accessibility improvements
- Cross-browser compatibility fixes

### 4. **Documentation**

- Improve README and documentation
- Add usage examples
- Create tutorials or guides
- Translate documentation to other languages

## 🚀 Getting Started

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of JSON structure
- Familiarity with Git and GitHub
- For translations: native or near-native proficiency in the target language

### Setup

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## 📝 Translation Guidelines

### Adding a New Language

1. **Create Language Directory**

   ```bash
   mkdir locales/[language-code]
   ```

2. **Create Translation File**

   ```bash
   cp locales/en/translation.json locales/[language-code]/translation.json
   ```

3. **Translate Content**
   - Translate all text content while preserving JSON structure
   - Keep emojis and special characters intact
   - Maintain the same tone and style as the original

4. **Update JavaScript**
   Add the new language to the `supportedLanguages` array in `assets/js/translator.js`:

   ```javascript
   this.supportedLanguages = ['he', 'en', 'ru', 'ar', 'zh', 'hi', 'new-lang'];
   ```

5. **Test Translation**
   - Test all sections display correctly
   - Verify RTL support for Arabic/Hebrew if applicable
   - Check print functionality
   - Test language switching

### Translation File Structure

```json
{
  "meta": {
    "language": "Language Name",
    "code": "lang-code",
    "direction": "ltr|rtl",
    "version": "1.0.0"
  },
  "title": "Page Title",
  "subtitle": "Page Subtitle",
  "brand": "Brand Name",
  "date": {
    "gregorian": "Gregorian Date Label",
    "hebrew": "Hebrew Date Label", 
    "time": "Time Label"
  },
  "sections": {
    "fundamentals": {
      "title": "Section Title",
      "emoji": "🏡",
      "items": ["Item 1", "Item 2", "..."],
      "tip": "Optional tip text"
    }
    // ... other sections
  },
  "footer": {
    "verse": "Inspirational quote",
    "credits": {
      "copyright": "Copyright text",
      "design": "Design credit",
      "related": "Related links"
    },
    "note": "Footer note"
  },
  "languageSelector": {
    "label": "Language selector label",
    "languages": {
      "he": "עברית",
      "en": "English",
      // ... all languages
    }
  }
}
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Browser and Version**: Chrome 95, Firefox 94, Safari 15, etc.
2. **Operating System**: Windows 10, macOS 12, Ubuntu 20.04, etc.
3. **Steps to Reproduce**: Clear, numbered steps
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Screenshots**: If applicable
7. **Console Errors**: Any JavaScript errors

## 💡 Feature Requests

For feature requests, please:

1. Check existing issues first
2. Provide clear description of the feature
3. Explain the use case and benefits
4. Consider implementation complexity
5. Be open to discussion and alternatives

## 📋 Pull Request Process

### Before Submitting

- [ ] Test your changes thoroughly
- [ ] Ensure no console errors
- [ ] Test in multiple browsers
- [ ] Verify print functionality works
- [ ] Check responsive design
- [ ] Update documentation if needed

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Translation improvement
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested print functionality
- [ ] Tested responsive design

## Screenshots
If applicable, add screenshots

## Additional Notes
Any additional information
```

## 🎯 Code Style Guidelines

### HTML

- Use semantic HTML elements
- Include proper accessibility attributes
- Maintain consistent indentation (2 spaces)

### CSS

- Use CSS custom properties (variables)
- Follow BEM methodology for class names
- Maintain consistent formatting
- Use meaningful comments

### JavaScript

- Use modern ES6+ features
- Follow consistent naming conventions
- Add comments for complex logic
- Handle errors gracefully

## 🌍 Cultural Considerations

When translating, consider:

1. **Cultural Context**: Adapt examples to local culture
2. **Religious Sensitivity**: Be respectful of different beliefs
3. **Local Customs**: Consider local organization habits
4. **Language Direction**: Proper RTL support for Arabic/Hebrew
5. **Date Formats**: Use appropriate date formatting
6. **Units**: Consider metric vs imperial systems

## 📞 Communication

### Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Be respectful and constructive
- Provide context and details

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different perspectives and experiences

## 🏆 Recognition

Contributors will be:

- Listed in the README acknowledgments
- Mentioned in release notes
- Credited in the project documentation

## 📚 Resources

- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)
- [Translation Best Practices](https://www.w3.org/International/techniques/developing-specs)

---

Thank you for contributing to CleanFlow! Together, we can help people around the world create more organized and peaceful living spaces. 🧭✨
