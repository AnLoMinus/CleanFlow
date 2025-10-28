#!/usr/bin/env node

/**
 * CleanFlow - Automated Version Update Script
 * Automatically updates version numbers across all relevant files
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class VersionUpdater {
  constructor() {
    this.projectRoot = path.join(__dirname, "..");
    this.filesToUpdate = [
      "package.json",
      "README.md",
      "README-en.md",
      "PUSH_DESCRIPTION.md",
      "CHANGELOG.md",
    ];
    this.localesDir = path.join(this.projectRoot, "locales");
    this.supportedLanguages = ["he", "en", "ru", "ar", "zh", "hi"];
  }

  async updateVersion(newVersion, changeType = "patch", description = "") {
    console.log(`🔄 Updating version to ${newVersion}...`);

    try {
      // 1. Get current version
      const currentVersion = this.getCurrentVersion();
      console.log(`📋 Current version: ${currentVersion}`);

      // 2. Validate new version format
      if (!this.isValidVersion(newVersion)) {
        throw new Error(`Invalid version format: ${newVersion}`);
      }

      // 3. Update package.json
      this.updatePackageJson(newVersion);

      // 4. Update README files
      this.updateReadmeFiles(newVersion);

      // 5. Update translation files
      this.updateTranslationFiles(newVersion);

      // 6. Update CHANGELOG
      this.updateChangelog(newVersion, changeType, description);

      // 7. Update PUSH_DESCRIPTION
      this.updatePushDescription(newVersion);

      // 8. Validate changes
      this.validateChanges();

      console.log(`✅ Version updated successfully to ${newVersion}`);
      console.log(`📝 Don't forget to commit and push your changes!`);
    } catch (error) {
      console.error(`❌ Error updating version: ${error.message}`);
      process.exit(1);
    }
  }

  getCurrentVersion() {
    const packagePath = path.join(this.projectRoot, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return packageJson.version;
  }

  isValidVersion(version) {
    const semverRegex = /^\d+\.\d+\.\d+$/;
    return semverRegex.test(version);
  }

  updatePackageJson(newVersion) {
    console.log("📦 Updating package.json...");
    const packagePath = path.join(this.projectRoot, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

    packageJson.version = newVersion;

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
  }

  updateReadmeFiles(newVersion) {
    console.log("📋 Updating README files...");

    // Update README.md
    this.updateFileVersion("README.md", newVersion);

    // Update README-en.md
    this.updateFileVersion("README-en.md", newVersion);
  }

  updateFileVersion(filename, newVersion) {
    const filePath = path.join(this.projectRoot, filename);
    let content = fs.readFileSync(filePath, "utf8");

    // Update version badge
    const versionRegex =
      /\[!\[Version\]\(https:\/\/img\.shields\.io\/badge\/Version-\d+\.\d+\.\d+-green\.svg\)\]/g;
    content = content.replace(
      versionRegex,
      `[![Version](https://img.shields.io/badge/Version-${newVersion}-green.svg)]`
    );

    fs.writeFileSync(filePath, content);
  }

  updateTranslationFiles(newVersion) {
    console.log("🌍 Updating translation files...");

    this.supportedLanguages.forEach((lang) => {
      const translationPath = path.join(
        this.localesDir,
        lang,
        "translation.json"
      );

      if (fs.existsSync(translationPath)) {
        const translation = JSON.parse(
          fs.readFileSync(translationPath, "utf8")
        );
        translation.meta.version = newVersion;

        fs.writeFileSync(
          translationPath,
          JSON.stringify(translation, null, 2) + "\n"
        );
        console.log(`  ✓ Updated ${lang}/translation.json`);
      }
    });
  }

  updateChangelog(newVersion, changeType, description) {
    console.log("📝 Updating CHANGELOG.md...");

    const changelogPath = path.join(this.projectRoot, "CHANGELOG.md");
    let content = fs.readFileSync(changelogPath, "utf8");

    const today = new Date().toLocaleDateString("he-IL");
    const changeTypeEmoji = this.getChangeTypeEmoji(changeType);
    const changeTypeTitle = this.getChangeTypeTitle(changeType);

    const newEntry = `## 📅 גרסה ${newVersion} - ${today}

### ${changeTypeEmoji} ${changeTypeTitle}
${description ? `- ${description}` : "- עדכון גרסה"}

---

`;

    // Insert after the first line (after the title)
    const lines = content.split("\n");
    lines.splice(1, 0, newEntry);

    fs.writeFileSync(changelogPath, lines.join("\n"));
  }

  updatePushDescription(newVersion) {
    console.log("📄 Updating PUSH_DESCRIPTION.md...");

    const pushDescPath = path.join(this.projectRoot, "PUSH_DESCRIPTION.md");
    let content = fs.readFileSync(pushDescPath, "utf8");

    const today = new Date().toLocaleDateString("he-IL");

    // Update version in title
    content = content.replace(
      /# 📝 תוכן לתיאור הפוש - CleanFlow v\d+\.\d+\.\d+/g,
      `# 📝 תוכן לתיאור הפוש - CleanFlow v${newVersion}`
    );

    // Update version and date at the end
    content = content.replace(
      /\*\*גרסה\*\*: \d+\.\d+\.\d+/g,
      `**גרסה**: ${newVersion}`
    );
    content = content.replace(/\*\*תאריך\*\*: .*/g, `**תאריך**: ${today}`);

    fs.writeFileSync(pushDescPath, content);
  }

  getChangeTypeEmoji(changeType) {
    const emojis = {
      major: "🚀",
      minor: "✨",
      patch: "🐛",
      feat: "✨",
      fix: "🐛",
      chore: "🔧",
    };
    return emojis[changeType] || "🔧";
  }

  getChangeTypeTitle(changeType) {
    const titles = {
      major: "שינויים משמעותיים",
      minor: "תכונות חדשות",
      patch: "תיקוני באגים",
      feat: "תכונות חדשות",
      fix: "תיקוני באגים",
      chore: "שיפורים טכניים",
    };
    return titles[changeType] || "שיפורים טכניים";
  }

  validateChanges() {
    console.log("🔍 Validating changes...");

    try {
      // Validate translations
      execSync("node scripts/validate-translations.js", {
        cwd: this.projectRoot,
        stdio: "inherit",
      });

      console.log("✅ All validations passed!");
    } catch (error) {
      console.error("❌ Validation failed:", error.message);
      throw error;
    }
  }

  // Helper method to calculate next version
  calculateNextVersion(currentVersion, changeType) {
    const [major, minor, patch] = currentVersion.split(".").map(Number);

    switch (changeType) {
      case "major":
        return `${major + 1}.0.0`;
      case "minor":
        return `${major}.${minor + 1}.0`;
      case "patch":
        return `${major}.${minor}.${patch + 1}`;
      default:
        return `${major}.${minor}.${patch + 1}`;
    }
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🔄 CleanFlow Version Updater

Usage:
  node scripts/update-version.js <version> [changeType] [description]
  
Examples:
  node scripts/update-version.js 1.0.1 patch "Fix Russian translation issue"
  node scripts/update-version.js 1.1.0 minor "Add Spanish language support"
  node scripts/update-version.js 2.0.0 major "Complete UI redesign"
  
Change Types:
  - patch: Bug fixes (1.0.0 → 1.0.1)
  - minor: New features (1.0.0 → 1.1.0)
  - major: Breaking changes (1.0.0 → 2.0.0)
    `);
    process.exit(0);
  }

  const newVersion = args[0];
  const changeType = args[1] || "patch";
  const description = args.slice(2).join(" ") || "";

  const updater = new VersionUpdater();
  updater.updateVersion(newVersion, changeType, description);
}

module.exports = VersionUpdater;
