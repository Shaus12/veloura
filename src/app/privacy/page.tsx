import { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | VELŌURA",
  description: "מדיניות הפרטיות של Veloura",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-6" dir="rtl">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-serif font-medium text-foreground mb-10 text-center">
          מדיניות פרטיות
        </h1>

        <div className="prose prose-neutral max-w-none font-sans text-foreground/80 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">1. כללי</h2>
            <p>
              Veloura ("החברה", "אנחנו") מכבדת את פרטיות המשתמשים באתר שלנו. מדיניות פרטיות זו מסבירה אילו מידע אנו אוספים, כיצד אנו משתמשים בו ואילו זכויות עומדות לרשותכם.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">2. מידע שאנו אוספים</h2>
            <p>אנו אוספים את סוגי המידע הבאים:</p>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li><strong>מידע אישי:</strong> שם, כתובת דוא"ל, מספר טלפון, כתובת למשלוח ופרטי תשלום בעת ביצוע הזמנה.</li>
              <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה ונתוני שימוש באתר.</li>
              <li><strong>עוגיות (Cookies):</strong> אנו משתמשים בעוגיות לצורך שיפור חוויית המשתמש ולצרכי אנליטיקה.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">3. שימוש במידע</h2>
            <p>אנו משתמשים במידע שנאסף למטרות הבאות:</p>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li>עיבוד ומשלוח הזמנות</li>
              <li>תקשורת עם לקוחות בנוגע להזמנות ושירות</li>
              <li>שיפור האתר וחוויית הקנייה</li>
              <li>שליחת עדכונים ומבצעים (בהסכמת המשתמש בלבד)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">4. שיתוף מידע</h2>
            <p>
              אנחנו לא מוכרים, סוחרים או מעבירים את המידע האישי שלכם לצדדים שלישיים, למעט ספקי שירות הנדרשים לצורך ביצוע ההזמנה (כגון חברת משלוחים ומעבד תשלומים).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">5. אבטחת מידע</h2>
            <p>
              אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע האישי שלכם, לרבות הצפנת SSL לכל העברת נתונים.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">6. זכויות המשתמש</h2>
            <p>
              בהתאם לחוק הגנת הפרטיות, יש לכם זכות לעיין במידע שנאסף עליכם, לבקש תיקון או מחיקה של המידע. לשם כך, ניתן לפנות אלינו בטלפון 054-296-1213.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">7. יצירת קשר</h2>
            <p>
              לשאלות בנושא מדיניות הפרטיות, ניתן ליצור קשר בטלפון: <a href="tel:0542961213" className="text-foreground font-medium underline underline-offset-4 hover:opacity-70 transition-opacity">054-296-1213</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
