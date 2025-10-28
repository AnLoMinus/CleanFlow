#!/usr/bin/env node

/**
 * CleanFlow Translation Helper Script
 * Helps validate and manage translation files
 */

const fs = require("fs");
const path = require("path");

class TranslationValidator {
  constructor() {
    this.localesDir = path.join(__dirname, "..", "locales");
    this.supportedLanguages = ["he", "en", "ru", "ar", "zh", "hi"];
    this.errors = [];
    this.warnings = [];
  }

  async validateAll() {
    console.log("🔍 Validating CleanFlow translations...\n");

    // Check if locales directory exists
    if (!fs.existsSync(this.localesDir)) {
      this.errors.push("Locales directory not found");
      return this.report();
    }

    // Validate each language
    for (const lang of this.supportedLanguages) {
      await this.validateLanguage(lang);
    }

    // Check for missing languages
    const existingLanguages = fs.readdirSync(this.localesDir);
    for (const lang of this.supportedLanguages) {
      if (!existingLanguages.includes(lang)) {
        this.errors.push(`Missing language directory: ${lang}`);
      }
    }

    return this.report();
  }

  async validateLanguage(langCode) {
    const langDir = path.join(this.localesDir, langCode);
    const translationFile = path.join(langDir, "translation.json");

    console.log(`📋 Validating ${langCode}...`);

    // Check if directory exists
    if (!fs.existsSync(langDir)) {
      this.errors.push(`${langCode}: Directory not found`);
      return;
    }

    // Check if translation file exists
    if (!fs.existsSync(translationFile)) {
      this.errors.push(`${langCode}: translation.json not found`);
      return;
    }

    try {
      // Parse JSON
      const content = fs.readFileSync(translationFile, "utf8");
      const translation = JSON.parse(content);

      // Validate structure
      this.validateStructure(langCode, translation);

      // Validate content
      this.validateContent(langCode, translation);
    } catch (error) {
      this.errors.push(`${langCode}: Invalid JSON - ${error.message}`);
    }
  }

  validateStructure(langCode, translation) {
    const requiredKeys = [
      "meta",
      "title",
      "subtitle",
      "brand",
      "date",
      "sections",
      "footer",
      "languageSelector",
    ];

    for (const key of requiredKeys) {
      if (!translation[key]) {
        this.errors.push(`${langCode}: Missing required key '${key}'`);
      }
    }

    // Validate meta object
    if (translation.meta) {
      const metaKeys = ["language", "code", "direction", "version"];
      for (const key of metaKeys) {
        if (!translation.meta[key]) {
          this.errors.push(`${langCode}: Missing meta.${key}`);
        }
      }

      // Validate language code matches directory
      if (translation.meta.code !== langCode) {
        this.errors.push(
          `${langCode}: meta.code mismatch (${translation.meta.code})`
        );
      }
    }

    // Validate sections
    if (translation.sections) {
      const requiredSections = [
        "fundamentals",
        "daily",
        "weekly",
        "organization",
        "mental",
        "goldenMinutes",
        "motivation",
      ];

      for (const section of requiredSections) {
        if (!translation.sections[section]) {
          this.errors.push(`${langCode}: Missing section '${section}'`);
        } else {
          // Validate section structure
          if (!translation.sections[section].title) {
            this.errors.push(`${langCode}: Missing ${section}.title`);
          }
          if (!translation.sections[section].emoji) {
            this.errors.push(`${langCode}: Missing ${section}.emoji`);
          }
          if (
            translation.sections[section].items &&
            !Array.isArray(translation.sections[section].items)
          ) {
            this.errors.push(`${langCode}: ${section}.items must be an array`);
          }
        }
      }
    }
  }

  validateContent(langCode, translation) {
    // Check for empty strings
    this.checkEmptyStrings(langCode, translation, "");

    // Check for missing translations (English fallback)
    if (langCode !== "en") {
      try {
        const englishFile = path.join(
          this.localesDir,
          "en",
          "translation.json"
        );
        const englishContent = fs.readFileSync(englishFile, "utf8");
        const englishTranslation = JSON.parse(englishContent);

        this.compareTranslations(langCode, translation, englishTranslation);
      } catch (error) {
        this.warnings.push(
          `${langCode}: Could not compare with English (${error.message})`
        );
      }
    }
  }

  checkEmptyStrings(langCode, obj, path) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof value === "string" && value.trim() === "") {
        this.warnings.push(`${langCode}: Empty string at ${currentPath}`);
      } else if (typeof value === "object" && value !== null) {
        this.checkEmptyStrings(langCode, value, currentPath);
      }
    }
  }

  compareTranslations(langCode, translation, englishTranslation) {
    // This is a simplified comparison - in a real scenario you'd want more sophisticated checking
    const englishKeys = this.getAllKeys(englishTranslation);
    const translationKeys = this.getAllKeys(translation);

    for (const key of englishKeys) {
      if (!translationKeys.includes(key)) {
        this.warnings.push(`${langCode}: Missing translation key '${key}'`);
      }
    }
  }

  getAllKeys(obj, prefix = "") {
    let keys = [];
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.push(fullKey);

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        keys = keys.concat(this.getAllKeys(value, fullKey));
      }
    }
    return keys;
  }

  report() {
    console.log("\n📊 Validation Report:");
    console.log("=".repeat(50));

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log("✅ All translations are valid!");
      return true;
    }

    if (this.errors.length > 0) {
      console.log("\n❌ Errors:");
      this.errors.forEach((error) => console.log(`  • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log("\n⚠️  Warnings:");
      this.warnings.forEach((warning) => console.log(`  • ${warning}`));
    }

    console.log(
      `\n📈 Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`
    );

    return this.errors.length === 0;
  }
}

// CLI usage
if (require.main === module) {
  const validator = new TranslationValidator();
  validator.validateAll().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = TranslationValidator;
