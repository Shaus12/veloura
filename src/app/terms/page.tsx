import { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש | VELŌURA",
  description: "תנאי השימוש של Veloura",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-6" dir="rtl">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-serif font-medium text-foreground mb-10 text-center">
          תנאי שימוש
        </h1>

        <div className="prose prose-neutral max-w-none font-sans text-foreground/80 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">1. כללי</h2>
            <p>
              ברוכים הבאים לאתר Veloura. השימוש באתר ובשירותים המוצעים בו כפוף לתנאי השימוש המפורטים להלן. גלישה באתר ו/או רכישה מהווה הסכמה לתנאים אלו.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">2. הזמנות ותשלומים</h2>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li>כל המחירים באתר מוצגים בשקלים חדשים (₪) וכוללים מע"מ.</li>
              <li>התשלום מתבצע באמצעות כרטיס אשראי באופן מאובטח.</li>
              <li>ההזמנה תאושר רק לאחר אישור חברת האשראי.</li>
              <li>Veloura שומרת לעצמה את הזכות לבטל הזמנה במקרה של טעות במחיר או חוסר במלאי.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">3. מדיניות משלוחים</h2>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li>משלוח חינם בהזמנות מעל ₪250.</li>
              <li>זמן האספקה הוא 3-7 ימי עסקים.</li>
              <li>המשלוח מתבצע לכל רחבי ישראל.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">4. מדיניות החזרות וביטולים</h2>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li>ניתן להחזיר מוצרים תוך 14 ימים מיום קבלת ההזמנה.</li>
              <li>המוצר חייב להיות באריזה המקורית, ללא סימני שימוש.</li>
              <li>ההחזר הכספי יבוצע לאמצעי התשלום המקורי תוך 7 ימי עסקים.</li>
              <li>מוצרים אישיים כגון גרביים שנפתחו מאריזתם לא ניתנים להחזרה מסיבות היגייניות.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">5. קניין רוחני</h2>
            <p>
              כל התוכן באתר, לרבות תמונות, עיצובים, לוגואים וטקסטים, הם רכוש בלעדי של Veloura ואין לעשות בהם שימוש ללא אישור בכתב.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">6. הגבלת אחריות</h2>
            <p>
              Veloura עושה כמיטב יכולתה להציג מידע מדויק באתר, אך אינה אחראית לטעויות או אי-דיוקים. צבעי המוצרים עשויים להיראות שונה בהתאם להגדרות המסך.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-medium text-foreground mb-3">7. יצירת קשר</h2>
            <p>
              לשאלות בנושא תנאי השימוש, ניתן ליצור קשר בטלפון: <a href="tel:0542961213" className="text-foreground font-medium underline underline-offset-4 hover:opacity-70 transition-opacity">054-296-1213</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
