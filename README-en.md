# 🧭 CleanFlow (CF) - Room Organization & Cleaning Guidelines

> **English Translation** - For Hebrew version see [README.md](README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Multilingual](https://img.shields.io/badge/Multilingual-6%20Languages-blue.svg)](https://github.com/AnLoMinus/CleanFlow)
[![Version](https://img.shields.io/badge/Version-1.0.1-green.svg)](https://github.com/AnLoMinus/CleanFlow/releases)

> **"A place for everything, and everything in its place"** 🧼✨

CleanFlow is a comprehensive multilingual guide for room organization and cleaning, designed to help you maintain a clean, organized, and peaceful living space. The system provides practical guidelines, daily routines, and mental frameworks for creating and maintaining order in your personal environment.

## 🌍 Supported Languages

- **עברית** (Hebrew) - Original language
- **English** - Complete translation
- **Русский** (Russian) - Complete translation  
- **العربية** (Arabic) - Complete translation
- **中文** (Chinese) - Complete translation
- **हिन्दी** (Hindi) - Complete translation

## ✨ Features

- 🌐 **Multilingual Support**: Dynamic language switching with 6 languages
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🖨️ **Print-Friendly**: Optimized for A4 printing with clean layout
- 💾 **Persistent Settings**: Language preference saved in browser
- 🎨 **Modern UI**: Clean, professional design with Hebrew/RTL support
- ⚡ **Fast Loading**: Lightweight with no external dependencies
- 🔧 **Easy Customization**: JSON-based translation system

## 🚀 Quick Start

### Option 1: Direct Usage

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Use the language selector to switch between languages
4. Print or save as needed

### Option 2: Local Development Server

```bash
# Clone the repository
git clone https://github.com/AnLoMinus/CleanFlow.git
cd CleanFlow

# Start a local server (Python 3)
python -m http.server 8000

# Or using Node.js (if you have http-server installed)
npx http-server

# Open http://localhost:8000 in your browser
```

## 📁 Project Structure

```
CleanFlow/
├── index.html                 # Main HTML file with dynamic content
├── package.json              # Project configuration and dependencies
├── README.md                 # This file
├── LICENSE                   # MIT License
├── CONTRIBUTING.md           # Contribution guidelines
├── .gitignore               # Git ignore rules
├── locales/                  # Translation files
│   ├── he/translation.json   # Hebrew (original)
│   ├── en/translation.json   # English
│   ├── ru/translation.json   # Russian
│   ├── ar/translation.json   # Arabic
│   ├── zh/translation.json   # Chinese
│   └── hi/translation.json   # Hindi
├── assets/                   # Static assets
│   ├── css/                  # Stylesheets (if needed)
│   ├── js/                   # JavaScript files
│   │   └── translator.js     # Translation system
│   └── images/               # Images and icons
├── docs/                     # Documentation
└── scripts/                  # Build and utility scripts
```

## 🎯 Core Principles

### 🏡 Fundamental Principles

- **A place for everything, and everything in its place**
- **Order saves time and creates inner peace**
- **Clean environment = clear mind = open heart**
- **Daily routine of 5-10 minutes of tidying**

### 🧽 Daily Actions

- Make the bed immediately after waking up
- Return clothes to closet or laundry basket
- Clear desk of unnecessary surfaces
- Daily trash disposal
- Ventilate the room at least once a day

### 📅 Weekly Actions

- Thorough floor cleaning: corner to corner
- Clean shelves, windows, and doors
- Sort clothes: fold, donate, or discard
- Refresh energy with good scents and music

### 📦 Organization Rules

- Store by categories: technology, clothes, papers, hobbies
- Use numbered boxes and drawers with labels
- Clear tagging (name, color, icon) for each container
- 90-day rule: not in use? consider donation or disposal

## 🛠️ Technical Details

### Translation System

The project uses a custom JavaScript translation system (`assets/js/translator.js`) that:

- Loads translation files dynamically
- Supports RTL (Right-to-Left) languages
- Saves language preferences in localStorage
- Updates content without page reload

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Print functionality across all supported browsers

### Dependencies

- **None!** This is a pure HTML/CSS/JavaScript project
- No external libraries or frameworks required
- Works offline after initial load

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Adding New Languages

1. Create a new directory in `locales/` with the language code
2. Copy `locales/en/translation.json` as a template
3. Translate all text content while preserving JSON structure
4. Add the language to `supportedLanguages` array in `translator.js`
5. Test thoroughly and submit a pull request

### Improving Translations

- Fix grammar, typos, or cultural adaptations
- Ensure translations maintain the original meaning and tone
- Test the translation in the actual interface
- Consider cultural context and idioms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Original Concept**: AnLoMinus
- **Design Inspiration**: Clean, minimalist organization principles
- **Community**: All contributors and translators
- **Open Source**: Built with love for the global community

## 🔗 Links

- **Live Demo**: [https://anlominus.github.io/CleanFlow](https://anlominus.github.io/CleanFlow)
- **GitHub Repository**: [https://github.com/AnLoMinus/CleanFlow](https://github.com/AnLoMinus/CleanFlow)
- **Author's Website**: [https://anlominus.github.io](https://anlominus.github.io)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/AnLoMinus/CleanFlow/issues) page
2. Create a new issue with detailed description
3. For translation issues, mention the specific language and text

---

**Made with ❤️ by [AnLoMinus](https://github.com/AnLoMinus)**

*"If you don't control your environment – your environment controls you. Turn your room into a small sanctuary of peace and light."* 🕯️
