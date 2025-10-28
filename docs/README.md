# 📚 CleanFlow Documentation

## 🎯 Project Overview

CleanFlow is a multilingual web application designed to help users maintain organized and clean living spaces. The project provides practical guidelines, daily routines, and mental frameworks for creating and maintaining order in personal environments.

## 🏗️ Architecture

### Frontend Structure

```
CleanFlow/
├── index.html              # Main application entry point
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   ├── js/
│   │   └── translator.js   # Translation system
│   └── images/             # Static assets
├── locales/                # Translation files
│   ├── he/                 # Hebrew (original)
│   ├── en/                 # English
│   ├── ru/                 # Russian
│   ├── ar/                 # Arabic
│   ├── zh/                 # Chinese
│   └── hi/                 # Hindi
└── scripts/
    └── validate-translations.js  # Translation validator
```

### Translation System

The translation system is built around JSON files that contain all text content for each supported language. The system supports:

- **Dynamic Language Switching**: Users can switch languages without page reload
- **RTL Support**: Proper right-to-left support for Arabic and Hebrew
- **Persistent Preferences**: Language choice is saved in localStorage
- **Fallback Handling**: Graceful degradation when translations are missing

### Key Components

#### 1. CleanFlowTranslator Class

Located in `assets/js/translator.js`, this class handles:

- Loading translation files
- Managing language state
- Updating DOM content
- Persisting user preferences

#### 2. Translation Files

Each language has a `translation.json` file with:

- Metadata (language code, direction, version)
- All text content organized by sections
- Language selector options
- Footer and credit information

#### 3. Responsive Design

The CSS system includes:

- Mobile-first responsive design
- Print-optimized layouts
- Dark mode support
- Accessibility features

## 🌐 Internationalization (i18n)

### Supported Languages

| Language | Code | Direction | Status |
|----------|------|-----------|--------|
| Hebrew | `he` | RTL | ✅ Complete |
| English | `en` | LTR | ✅ Complete |
| Russian | `ru` | LTR | ✅ Complete |
| Arabic | `ar` | RTL | ✅ Complete |
| Chinese | `zh` | LTR | ✅ Complete |
| Hindi | `hi` | LTR | ✅ Complete |

### Adding New Languages

1. **Create Language Directory**

   ```bash
   mkdir locales/[language-code]
   ```

2. **Create Translation File**

   ```bash
   cp locales/en/translation.json locales/[language-code]/translation.json
   ```

3. **Translate Content**
   - Translate all text while preserving JSON structure
   - Keep emojis and special characters
   - Maintain consistent tone and style

4. **Update JavaScript**
   Add language to `supportedLanguages` array in `translator.js`

5. **Test Thoroughly**
   - Test all sections display correctly
   - Verify RTL support if applicable
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
      "items": ["Item 1", "Item 2"],
      "tip": "Optional tip"
    }
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
      "en": "English"
    }
  }
}
```

## 🎨 Design System

### Color Palette

```css
:root {
  --ink: #0f172a;      /* Primary text */
  --sub: #475569;      /* Secondary text */
  --frame: #e2e8f0;    /* Borders */
  --accent: #2563eb;   /* Primary accent */
  --accent-2: #0ea5e9; /* Secondary accent */
  --ok: #16a34a;       /* Success */
  --warn: #d97706;     /* Warning */
  --paper: #ffffff;    /* Background */
}
```

### Typography

- **Primary Font**: Rubik, Noto Sans Hebrew, Assistant
- **Fallback**: system-ui, Segoe UI, Arial, Helvetica, sans-serif
- **Monospace**: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas

### Layout Principles

- **Mobile-First**: Responsive design starting from mobile
- **Print-Friendly**: Optimized for A4 printing
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Minimal dependencies, fast loading

## 🛠️ Development

### Local Development

1. **Clone Repository**

   ```bash
   git clone https://github.com/AnLoMinus/CleanFlow.git
   cd CleanFlow
   ```

2. **Start Development Server**

   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

3. **Open Browser**
   Navigate to `http://localhost:8000`

### Validation

Run the translation validator:

```bash
node scripts/validate-translations.js
```

This will check:

- JSON syntax validity
- Required keys presence
- Content completeness
- Structure consistency

### Testing

#### Manual Testing Checklist

- [ ] All languages load correctly
- [ ] Language switching works
- [ ] RTL languages display properly
- [ ] Print functionality works
- [ ] Responsive design on mobile
- [ ] No console errors
- [ ] Accessibility features work

#### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Mobile Optimizations

- Single column layout
- Larger touch targets
- Simplified navigation
- Optimized font sizes

### Print Optimizations

- A4 page size
- Optimized margins
- Removed interactive elements
- High contrast colors

## ♿ Accessibility

### Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Respects user preferences
- **Focus Management**: Clear focus indicators

### Testing

- Use screen readers (NVDA, JAWS, VoiceOver)
- Test keyboard-only navigation
- Verify color contrast ratios
- Check with accessibility tools (axe, WAVE)

## 🚀 Deployment

### GitHub Pages

1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Select source branch
4. Site will be available at `https://username.github.io/CleanFlow`

### Other Hosting

- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Firebase Hosting**: Google's hosting service
- **Any Static Host**: Works with any static file hosting

### Performance Optimization

- **Minification**: Minify CSS and JS for production
- **Compression**: Enable gzip compression
- **Caching**: Set appropriate cache headers
- **CDN**: Use CDN for global distribution

## 🔧 Maintenance

### Regular Tasks

- **Translation Updates**: Keep translations current
- **Browser Testing**: Test new browser versions
- **Security Updates**: Monitor for security issues
- **Performance Monitoring**: Track loading times

### Monitoring

- **Analytics**: Track usage patterns
- **Error Tracking**: Monitor JavaScript errors
- **Performance**: Monitor Core Web Vitals
- **Accessibility**: Regular accessibility audits

## 📈 Future Enhancements

### Planned Features

- **PWA Support**: Progressive Web App capabilities
- **Offline Mode**: Work without internet connection
- **Customization**: User-customizable themes
- **Export Options**: PDF, image export
- **Social Sharing**: Share guidelines on social media

### Potential Languages

- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Korean (ko)
- Portuguese (pt)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/AnLoMinus/CleanFlow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AnLoMinus/CleanFlow/discussions)
- **Email**: Contact through GitHub profile

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: [AnLoMinus](https://github.com/AnLoMinus)
