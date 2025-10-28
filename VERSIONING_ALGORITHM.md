# 🔄 CleanFlow - הוראות אלגוריתם לעדכון גרסאות ושינויים

## 📋 סקירה כללית

מסמך זה מגדיר את האלגוריתם המדויק לביצוע כל שינוי בפרויקט CleanFlow, כולל עדכון גרסאות, תיעוד שינויים ועדכון תגיות בכל המקומות הרלוונטיים.

---

## 🎯 עקרונות יסוד

### 📌 כללי חובה

1. **כל שינוי מחייב עדכון גרסה** - אין שינויים ללא עדכון גרסה
2. **תיעוד מלא** - כל שינוי מתועד ב-CHANGELOG.md
3. **עדכון תגיות** - מספר הגרסה מעודכן בכל המקומות הרלוונטיים
4. **בדיקות חובה** - כל שינוי נבדק לפני הפרסום
5. **גיבוי** - גיבוי לפני כל שינוי משמעותי

---

## 🔢 סוגי גרסאות

### 📈 Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH
```

- **MAJOR** (X.0.0): שינויים לא תואמים לאחור
- **MINOR** (0.X.0): תכונות חדשות תואמות לאחור
- **PATCH** (0.0.X): תיקוני באגים תואמים לאחור

### 🏷️ דוגמאות לעדכון גרסאות

- **1.0.0 → 1.0.1**: תיקון באג במערכת התרגום
- **1.0.1 → 1.1.0**: הוספת שפה חדשה (ספרדית)
- **1.1.0 → 2.0.0**: שינוי מבנה קבצי התרגום

---

## 📝 אלגוריתם עדכון גרסה

### שלב 1: הכנה לפני השינוי

```bash
# 1. בדוק את הסטטוס הנוכחי
git status
git log --oneline -5

# 2. צור branch חדש לשינוי
git checkout -b feature/version-update-v1.0.1

# 3. גבה את הקבצים הקריטיים
cp README.md README.md.backup
cp package.json package.json.backup
cp CHANGELOG.md CHANGELOG.md.backup
```

### שלב 2: עדכון מספר הגרסה

#### 📦 package.json

```json
{
  "version": "1.0.1",  // עדכן כאן
  "description": "CleanFlow - מערכת כללים לסדר וארגון החדר עם תמיכה רב-לשונית",
  // ... שאר התוכן
}
```

#### 📋 README.md (עברית)

```markdown
[![Version](https://img.shields.io/badge/Version-1.0.1-green.svg)](https://github.com/AnLoMinus/CleanFlow/releases)
```

#### 📋 README-en.md (אנגלית)

```markdown
[![Version](https://img.shields.io/badge/Version-1.0.1-green.svg)](https://github.com/AnLoMinus/CleanFlow/releases)
```

#### 📄 CHANGELOG.md

```markdown
## 📅 גרסה 1.0.1 - [תאריך]

### 🐛 תיקוני באגים
- תיקון בעיה במערכת התרגום לשפה הרוסית
- שיפור ביצועים בטעינת קבצי תרגום

### 🔧 שיפורים טכניים
- אופטימיזציה נוספת להדפסה
- שיפור נגישות לקוראי מסך
```

#### 🌐 קבצי תרגום (meta.version)

```json
{
  "meta": {
    "language": "עברית",
    "code": "he",
    "direction": "rtl",
    "version": "1.0.1"  // עדכן כאן
  },
  // ... שאר התוכן
}
```

#### 📄 PUSH_DESCRIPTION.md

```markdown
# 📝 תוכן לתיאור הפוש - CleanFlow v1.0.1

## 🎯 תיאור קצר
תיקון בעיות במערכת התרגום ושיפור אופטימיזציה להדפסה

## 🚀 תכונות עיקריות
- ✅ **תיקון מערכת התרגום** - סלקטורים נכונים לאלמנטים
- ✅ **שיפור אופטימיזציה להדפסה** - צמצום רווחים לתוכן רוסי
- ✅ **שיפור נגישות** - תמיכה בקוראי מסך וניווט מקלדת

## 🔧 תיקונים שבוצעו
- תיקון מערכת התרגום - סלקטורים נכונים לאלמנטים
- תיקון סדר טעינה - תרגומים נטענים לפני יצירת ממשק
- אופטימיזציה להדפסה - צמצום רווחים לתוכן רוסי
- שיפור נגישות - תמיכה בקוראי מסך וניווט מקלדת

**גרסה**: 1.0.1  
**תאריך**: [תאריך נוכחי]  
**סטטוס**: יציב ומוכן לשימוש
```

### שלב 3: עדכון קבצי תרגום

```bash
# עדכן את meta.version בכל קבצי התרגום
for lang in he en ru ar zh hi; do
  sed -i '' 's/"version": "1.0.0"/"version": "1.0.1"/g' locales/$lang/translation.json
done
```

### שלב 4: בדיקות חובה

```bash
# 1. בדוק תקינות JSON
node scripts/validate-translations.js

# 2. בדוק שהשרת עובד
python3 -m http.server 8001 &
curl -s -o /dev/null -w "%{http_code}" http://localhost:8001
pkill -f "python.*http.server"

# 3. בדוק שהקבצים נטענים
for lang in he en ru ar zh hi; do
  echo "Checking $lang..."
  curl -s http://localhost:8001/locales/$lang/translation.json | jq .meta.version
done
```

### שלב 5: עדכון תיעוד

```bash
# עדכן את תאריך העדכון האחרון
sed -i '' 's/\*\*עדכון אחרון\*\*: .*/\*\*עדכון אחרון\*\*: [תאריך נוכחי]/' CHANGELOG.md
```

### שלב 5.1: עדכון PUSH_DESCRIPTION.md

```bash
# עדכן את תיאור הפוש עם השינויים החדשים
cat > PUSH_DESCRIPTION.md << 'EOF'
# 📝 תוכן לתיאור הפוש - CleanFlow v1.0.1

## 🎯 תיאור קצר
תיקון בעיות במערכת התרגום ושיפור אופטימיזציה להדפסה

## 🚀 תכונות עיקריות
- ✅ **תיקון מערכת התרגום** - סלקטורים נכונים לאלמנטים
- ✅ **שיפור אופטימיזציה להדפסה** - צמצום רווחים לתוכן רוסי
- ✅ **שיפור נגישות** - תמיכה בקוראי מסך וניווט מקלדת

## 🔧 תיקונים שבוצעו
- תיקון מערכת התרגום - סלקטורים נכונים לאלמנטים
- תיקון סדר טעינה - תרגומים נטענים לפני יצירת ממשק
- אופטימיזציה להדפסה - צמצום רווחים לתוכן רוסי
- שיפור נגישות - תמיכה בקוראי מסך וניווט מקלדת

**גרסה**: 1.0.1  
**תאריך**: [תאריך נוכחי]  
**סטטוס**: יציב ומוכן לשימוש
EOF
```

### שלב 6: commit ו-push

```bash
# 1. הוסף את כל השינויים
git add .

# 2. commit עם הודעה ברורה
git commit -m "chore: bump version to 1.0.1

- Fix Russian translation display issue
- Optimize print layout for better spacing
- Update all version references across project
- Improve accessibility for screen readers"

# 3. push ל-branch
git push origin feature/version-update-v1.0.1

# 4. צור Pull Request
# 5. לאחר אישור - merge ל-main
# 6. צור Git Tag
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

---

## 🔍 רשימת קבצים לעדכון

### 📋 קבצים חובה לעדכון בכל שינוי גרסה

- [ ] `package.json` - שדה version
- [ ] `README.md` - תגית Version
- [ ] `README-en.md` - תגית Version  
- [ ] `CHANGELOG.md` - הוספת רשומה חדשה
- [ ] `PUSH_DESCRIPTION.md` - **עדכון מלא של תיאור הפוש** (חשוב!)
- [ ] `locales/*/translation.json` - meta.version בכל השפות

#### 📝 הערה חשובה על PUSH_DESCRIPTION.md

הקובץ `PUSH_DESCRIPTION.md` הוא **חובה לעדכון מלא** בכל שינוי גרסה כי:

- הוא משמש לתיאור הפוש ב-GitHub
- הוא צריך לשקף את השינויים החדשים
- הוא צריך להיות מעודכן עם הגרסה החדשה
- הוא צריך לכלול תיאור מדויק של מה השתנה

#### 🎯 תבניות PUSH_DESCRIPTION.md לפי סוג השינוי

**תיקון באג (Patch):**

```markdown
## 🎯 תיאור קצר
תיקון בעיות במערכת התרגום ושיפור אופטימיזציה להדפסה

## 🔧 תיקונים שבוצעו
- תיקון מערכת התרגום - סלקטורים נכונים לאלמנטים
- תיקון סדר טעינה - תרגומים נטענים לפני יצירת ממשק
- אופטימיזציה להדפסה - צמצום רווחים לתוכן רוסי
```

**תכונה חדשה (Minor):**

```markdown
## 🎯 תיאור קצר
הוספת תמיכה בשפה הספרדית ושיפורי ממשק משתמש

## 🚀 תכונות חדשות
- ✅ **תמיכה בספרדית** - תרגום מלא לשפה הספרדית
- ✅ **שיפור ממשק משתמש** - עיצוב משופר לבחירת שפה
- ✅ **אופטימיזציה נוספת** - שיפור ביצועים בטעינת תרגומים
```

**שינוי משמעותי (Major):**

```markdown
## 🎯 תיאור קצר
עיצוב מחדש של הממשק ומערכת תרגום מתקדמת

## 🚀 שינויים משמעותיים
- ✅ **עיצוב מחדש** - ממשק משתמש חדש ומודרני
- ✅ **מערכת תרגום מתקדמת** - תמיכה ב-10+ שפות
- ✅ **אפליקציית PWA** - תמיכה במצב לא מקוון
- ⚠️ **שינויים לא תואמים** - מבנה קבצי התרגום השתנה
```

### 📋 קבצים אופציונליים (לפי הצורך)

- [ ] `docs/README.md` - אם יש שינויים טכניים
- [ ] `CONTRIBUTING.md` - אם יש שינויים בהנחיות
- [ ] `assets/css/main.css` - אם יש שינויים בעיצוב
- [ ] `assets/js/translator.js` - אם יש שינויים בפונקציונליות

---

## 🚨 בדיקות איכות חובה

### ✅ לפני כל release

```bash
# 1. בדיקת תקינות JSON
node scripts/validate-translations.js

# 2. בדיקת מבנה הפרויקט
find . -name "*.json" -o -name "*.md" -o -name "*.html" | wc -l

# 3. בדיקת גודל קבצים
du -sh assets/ locales/ *.html *.md

# 4. בדיקת קישורים שבורים
grep -r "http" *.md | grep -v "github.com\|anlominus.github.io"

# 5. בדיקת עקביות גרסאות
grep -r "1.0.0" package.json README*.md CHANGELOG.md
```

### ✅ בדיקות פונקציונליות

- [ ] מעבר בין כל השפות עובד
- [ ] הדפסה עובדת בכל השפות
- [ ] עיצוב רספונסיבי עובד
- [ ] נגישות עובדת (קוראי מסך)
- [ ] אין שגיאות JavaScript בקונסול

---

## 📊 תבניות הודעות

### 🏷️ Git Commit Messages

```
type: brief description

Detailed description of changes:
- Specific change 1
- Specific change 2
- Specific change 3

Closes #issue_number (if applicable)
```

**דוגמאות:**

```
feat: add Spanish language support

- Add Spanish translation file
- Update language selector
- Add Spanish to supported languages array
- Update documentation

Closes #15
```

```
fix: resolve Russian text overflow in print layout

- Reduce margins from 12mm to 8mm
- Optimize spacing between sections
- Update print CSS for better A4 fit
```

```
chore: bump version to 1.1.0

- Update version in all relevant files
- Add changelog entry for Spanish support
- Update badges and documentation
```

### 📝 Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Translation improvement
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Version bump

## Testing
- [ ] All translations validated
- [ ] Print functionality tested
- [ ] Responsive design verified
- [ ] No console errors
- [ ] Accessibility tested

## Version Impact
- [ ] Major version bump (breaking changes)
- [ ] Minor version bump (new features)
- [ ] Patch version bump (bug fixes)

## Screenshots
If applicable, add screenshots

## Additional Notes
Any additional information
```

---

## 🔄 תהליך Release מלא

### 📋 Checklist לפני Release

- [ ] כל הקבצים עודכנו עם הגרסה החדשה
- [ ] CHANGELOG.md עודכן עם השינויים
- [ ] בדיקות איכות עברו בהצלחה
- [ ] Pull Request נוצר ואושר
- [ ] Git tag נוצר
- [ ] Release notes נכתבו ב-GitHub

### 🚀 תהליך Release

```bash
# 1. עדכן גרסה לפי האלגוריתם למעלה
# 2. בצע את כל הבדיקות
# 3. צור Pull Request
# 4. לאחר merge:
git checkout main
git pull origin main
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1

# 5. צור Release ב-GitHub עם הערות
```

---

## 📞 תמיכה ועזרה

### 🆘 אם משהו לא עובד

1. בדוק את הלוגים: `git log --oneline -10`
2. בדוק את הסטטוס: `git status`
3. חזור לגרסה הקודמת: `git checkout v1.0.0`
4. בדוק את הקבצים: `git diff HEAD~1`

### 📚 משאבים נוספים

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

---

**עדכון אחרון**: 28 באוקטובר 2024  
**גרסה**: 1.0.0  
**מחבר**: AnLoMinus
