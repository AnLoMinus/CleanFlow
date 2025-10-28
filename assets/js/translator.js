/**
 * CleanFlow - Multilingual Translation System
 * Handles dynamic language switching and content translation
 */

class CleanFlowTranslator {
  constructor() {
    this.currentLanguage = 'he'; // Default to Hebrew
    this.translations = {};
    this.supportedLanguages = ['he', 'en', 'ru', 'ar', 'zh', 'hi'];
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.setupEventListeners();
    this.setupLanguageSelector();
    this.updateContent();
  }

  async loadTranslations() {
    for (const lang of this.supportedLanguages) {
      try {
        const response = await fetch(`locales/${lang}/translation.json`);
        this.translations[lang] = await response.json();
      } catch (error) {
        console.error(`Failed to load translation for ${lang}:`, error);
      }
    }
  }

  setupLanguageSelector() {
    this.updateLanguageSelectorOptions();
  }

  updateLanguageSelectorOptions() {
    const selector = document.getElementById('language-selector');
    if (!selector) return;

    // Clear existing options
    selector.innerHTML = '';

    // Add options for each supported language
    this.supportedLanguages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang;
      option.textContent = this.translations[lang]?.languageSelector?.languages[lang] || lang;
      if (lang === this.currentLanguage) {
        option.selected = true;
      }
      selector.appendChild(option);
    });
  }

  setupEventListeners() {
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.addEventListener('change', (e) => {
        this.changeLanguage(e.target.value);
      });
    }

    // Save language preference to localStorage
    const savedLanguage = localStorage.getItem('cleanflow-language');
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      this.changeLanguage(savedLanguage);
    }
  }

  changeLanguage(langCode) {
    if (!this.supportedLanguages.includes(langCode)) {
      console.error(`Unsupported language: ${langCode}`);
      return;
    }

    this.currentLanguage = langCode;
    localStorage.setItem('cleanflow-language', langCode);
    this.updateContent();
  }

  updateContent() {
    const translation = this.translations[this.currentLanguage];
    if (!translation) return;

    // Update document direction and language
    document.documentElement.lang = translation.meta.code;
    document.documentElement.dir = translation.meta.direction;

    // Update title
    document.title = translation.title;

    // Update header content
    this.updateElement('brand-text', translation.brand);
    this.updateElement('main-title', translation.title);
    this.updateElement('main-subtitle', translation.subtitle);

    // Update date labels
    this.updateElement('greg-label', translation.date.gregorian);
    this.updateElement('heb-label', translation.date.hebrew);
    this.updateElement('time-label', translation.date.time);

    // Update sections
    this.updateSection('fundamentals', translation.sections.fundamentals);
    this.updateSection('daily', translation.sections.daily);
    this.updateSection('weekly', translation.sections.weekly);
    this.updateSection('organization', translation.sections.organization);
    this.updateSection('mental', translation.sections.mental);
    this.updateSection('goldenMinutes', translation.sections.goldenMinutes);

    // Update motivation section
    this.updateElement('motivation-text', translation.sections.motivation.text);

    // Update footer
    this.updateElement('verse-text', translation.footer.verse);
    this.updateElement('copyright-text', translation.footer.credits.copyright);
    this.updateElement('design-text', translation.footer.credits.design);
    this.updateElement('related-text', translation.footer.credits.related);
    this.updateElement('footer-note', translation.footer.note);

    // Update language selector label
    this.updateElement('language-label', translation.languageSelector.label);
    
    // Update language selector options
    this.updateLanguageSelectorOptions();
  }

  updateElement(id, text) {
    const element = document.getElementById(id);
    if (element && text) {
      element.textContent = text;
    }
  }

  updateSection(sectionId, sectionData) {
    const section = document.getElementById(sectionId);
    if (!section || !sectionData) return;

    // Update section title
    const titleElement = section.querySelector('h2, .section-title');
    if (titleElement) {
      titleElement.innerHTML = `<span class="emoji">${sectionData.emoji}</span> ${sectionData.title}`;
    }

    // Update checklist items
    const checklistItems = section.querySelectorAll('.checklist');
    checklistItems.forEach((item, index) => {
      if (sectionData.items && sectionData.items[index]) {
        const textElement = item.querySelector('.item-text');
        if (textElement) {
          textElement.textContent = sectionData.items[index];
        }
      }
    });

    // Update tip/note if exists
    const tipElement = section.querySelector('.section-tip');
    if (tipElement && sectionData.tip) {
      tipElement.textContent = sectionData.tip;
    }

    const noteElement = section.querySelector('.section-note');
    if (noteElement && sectionData.note) {
      noteElement.textContent = sectionData.note;
    }
  }

  // Utility method to get current translation
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }
}

// Initialize the translator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.cleanFlowTranslator = new CleanFlowTranslator();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CleanFlowTranslator;
}
