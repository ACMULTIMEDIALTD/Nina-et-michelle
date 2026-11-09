# העלאת Nina et Michelle לשופיפיי — מדריך השקה

כל מה שצריך כדי להעלות את האתר לשופיפיי ולחבר אותו לדומיין `ninaetmichelle.com`, לפי הסדר.

## מצב נוכחי (2.11.2026) — חנות `nixtjf-b0.myshopify.com`

**כבר בוצע:**
- התבנית **"nina-et-michelle-theme v2 (Nov 2026)"** מפורסמת (תיקוני עברית, מחירים ב-₪, קישורים עם `/he`).
- כל העמודים קיימים עם ה-handles הנכונים.
- בלוג Journal עם 6 הכתבות.
- הקולקציות Tops, Bottoms, Sets ו-Sale.
- 4 מוצרים אמיתיים עם מלאי, צבעים ומידות XS–L, מתורגמים לעברית.
- עברית מופעלת ומפורסמת ב-`/he`, עם תרגום של העמודים, הכתבות, הקולקציות והמוצרים.
- אין איסוף עצמי: הוסר מעמוד המשלוחים, מעמוד יצירת הקשר וממסך המוצר (תבנית **v4**).
- החנות מוגנת בסיסמה. התבנית **v3 (coming soon)** מפורסמת: מבקרים רואים עמוד "בקרוב" עם הרשמה לרשימת המתנה (לקוחות עם התגית `launch-list`).
- הדומיין `ninaetmichelle.com` מחובר ומוגדר כ-Primary (ה-DNS ב-Squarespace מפנה לשופיפיי, והמייל של Google נשאר).

**נשאר:**
1. לפרסם את התבנית **v6** (תקנון חדש, זמני אספקה עד 7 ימי עסקים).
2. תמונות ל-4 המוצרים האמיתיים (Camille Jacket/Pants, Elle Jacket/Pants). מוצרי הדוגמה הועברו לארכיון.
3. חברת שליחויות: חיבור לאחר שהלקוחה תסגור.
4. Grow, ואחריו השקה (ביטול הסיסמה).

| תיקייה | מה יש בה |
|---|---|
| `shopify-theme/` | התבנית עצמה (מעלים כ-ZIP) |
| `shopify-content/pages/` | תוכן העמודים, מוכן להדבקה, באנגלית (`.en.html`) ובעברית (`.he.html`) |
| `shopify-content/articles/` | 6 כתבות ה-Journal, באנגלית ובעברית |
| `shopify-content/INDEX.md` | טבלה עם כותרת, handle, תקציר, תגית, תאריך ותמונה לכל עמוד וכתבה |
| `images/` | התמונות של הכתבות |
| `tools/export_shopify_content.py` | מייצא מחדש את `shopify-content/` מהאתר הסטטי (למשל אחרי עדכון התקנון) |

---

## 1. העלאת התבנית

1. יוצרים ZIP מהתבנית (מתוך תיקיית הריפו):
   ```bash
   cd shopify-theme && zip -r ../nina-et-michelle-theme.zip . -x '.*' && cd ..
   ```
2. **Online Store ← Themes ← Add theme ← Upload zip file** ← בוחרים את הקובץ.
3. לא מפרסמים עדיין. קודם ממלאים את התוכן (שלבים 2–6), בודקים ב-Preview ורק אז **Publish**.
4. **Customize ← Theme settings ← Brand:** מוודאים את מספר הוואטסאפ ומוסיפים את קישור האינסטגרם.

## 2. שפות

1. **Settings ← Languages:** מוסיפים **Hebrew** ולוחצים **Publish**. האנגלית נשארת שפת ברירת המחדל, והעברית נמצאת בכתובת `/he`.
2. מתקינים את האפליקציה החינמית **Translate & Adapt** של שופיפיי. דרכה מדביקים את הגרסה העברית של כל עמוד וכתבה (קבצי `.he.html`).
   הטקסטים של התבנית עצמה (תפריטים, פוטר, סל) כבר מתורגמים בתוך התבנית.

## 3. עמודים (Online Store ← Pages)

לכל עמוד: **Add page** ← כותרת ← בעורך לוחצים על כפתור `<>` (Show HTML) ← מדביקים את תוכן הקובץ ← בוחרים Template ← שומרים.
**חשוב:** ה-handle (בתחתית העמוד, תחת "Search engine listing") חייב להיות בדיוק כמו בטבלה, אחרת הקישורים בפוטר לא יעבדו.

| כותרת | handle | Template | תוכן |
|---|---|---|---|
| About | `about` | `page.about` | (ריק — התוכן בתבנית) |
| Contact | `contact` | `page.contact` | (ריק — התוכן בתבנית) |
| Terms & Conditions | `terms` | `page` | `pages/terms.en.html` |
| Privacy Policy | `privacy` | `page` | `pages/privacy.en.html` |
| Accessibility Statement | `accessibility` | `page` | `pages/accessibility.en.html` |
| Shipping & Returns | `shipping-returns` | `page` | `pages/shipping-returns.en.html` |
| FAQ | `faq` | `page` | `pages/faq.en.html` |
| Size Guide | `size-guide` | `page` | `pages/size-guide.en.html` |

> **התקנון:** עורך הדין מעדכן אותו לפי הדרישות של Grow (כתובת העסק, הגבלת גיל 18, זמן אספקה מקסימלי). אחרי העדכון: מעדכנים את `terms.html` ואת `he/terms.html`, מריצים `python3 tools/export_shopify_content.py` ומדביקים מחדש.

כדאי גם להעתיק את התקנון ואת מדיניות הפרטיות אל **Settings ← Policies**. שופיפיי מציגה אותן בקופה.

## 4. Journal (Online Store ← Blog posts)

1. **Manage blogs ← Add blog:** כותרת `Journal`, handle `journal`.
2. לכל כתבה ב-`shopify-content/INDEX.md`: **Add blog post** ← כותרת ← תוכן מהקובץ `articles/<handle>.en.html` (במצב HTML) ← **Excerpt** = התקציר מהטבלה ← **Tags** = התגית ← **Featured image** = התמונה מ-`images/` ← **Blog** = Journal ← handle כמו בטבלה ← **Visibility** עם התאריך מהטבלה.

## 5. קולקציות ומוצרים

1. **Products ← Collections:** יוצרים קולקציות עם ה-handles `tops`, `bottoms` ו-`sets`. ה-handles חייבים להיות בדיוק אלה, כי הפוטר מקשר אליהם. קולקציית `sale` אופציונלית.
2. **Products ← Add product** לכל פריט: תמונות, מחיר, וריאנט **Size** (ו-**Color** אם יש), מלאי, ושיוך לקולקציה.
   המחירים באתר הסטטי הם מחירי דוגמה. מכניסים את המחירים האמיתיים של הלקוחה.
3. **Settings ← Shipping and delivery:** תעריפי משלוח, ומשלוח חינם מעל ₪500 (כמו שכתוב בבאנר העליון).
4. **Settings ← Taxes and duties:** מוודאים שהמחירים כוללים מע"מ.

## 6. תשלום — Grow

1. אחרי שהתקנון המעודכן עולה, שולחים ל-Grow את כתובת האתר לאישור.
2. אחרי האישור: **Settings ← Payments** ← מתקינים את Grow לפי ההנחיות שלהם ← **Activate**.
3. **Settings ← Checkout:** לוודא שמספר הטלפון נדרש בקופה, אם צריך למשלוחים.

## 7. חיבור הדומיין `ninaetmichelle.com`

1. **Settings ← Domains ← Connect existing domain** ← `ninaetmichelle.com`.
2. אצל רשם הדומיין (DNS):
   - **A record:** Host ‏`@` ← ‏`23.227.38.65`
   - **CNAME:** Host ‏`www` ← ‏`shops.myshopify.com`
   - מוחקים רשומות A או CNAME ישנות של `@` ושל `www` (למשל של GitHub Pages). **לא נוגעים ברשומות MX** — הן של המייל `contact@ninaetmichelle.com`.
3. חוזרים לשופיפיי ← **Verify connection**. האימות יכול לקחת עד 48 שעות, ותעודת ה-SSL מונפקת אוטומטית.
4. מגדירים את `ninaetmichelle.com` כ-**Primary domain**.

## 8. לפני ההשקה

- [ ] תפריט, פוטר וכל הקישורים עובדים, גם בעברית (`/he`)
- [ ] תיבת אישור התקנון בסל חוסמת מעבר לתשלום בלי סימון
- [ ] רכישת בדיקה אמיתית ב-Grow, ואחריה זיכוי
- [ ] מייל אישור ההזמנה מגיע (**Settings ← Notifications**: שם השולח והלוגו)
- [ ] **Online Store ← Preferences:** כותרת ותיאור לגוגל
- [ ] **Online Store ← Preferences ← Password protection:** מבטלים את הסיסמה — זו ההשקה
