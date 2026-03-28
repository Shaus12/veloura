"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { ChevronRight, Minus, Plus, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

import imgClassic from "@/assets/product_classic_1773579003841.png";
import imgChampagne from "@/assets/product_champagne_1773579021607.png";
import imgBallet from "@/assets/product_ballet_1773579037443.png";
import imgRoseQuartz from "@/assets/product_rose_quartz_1773579053445.png";
import imgRing from "@/assets/product_pilates_ring_1773579072379.png";
import imgBand from "@/assets/product_resistance_band_1773579091254.png";
import imgWaterBottle from "@/assets/product_water_bottle_1773592499625.png";
import imgYogaSet from "@/assets/product_yoga_set_1773592518011.png";

const extraImgs = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1599901860904-17e089299dc4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800"
];

const productSpecs = {
  activity: "YOGA, Daily Life, כושר גופני, מנדף לחות, טיולים רגליים, Ballet, Tennis, רכיבה על אופניים",
  material: "Spandex / Nylon / Cotton",
  sockType: "מזדמנים",
  durability: "סטנדרטית",
  features: "אנטי בקטריאלי, Sweat-Absorbent, נגד החלקה, Anti-Foul, Sporty, Thermo",
  height: "צוות",
  season: "סתיו",
  pattern: "מוצק",
  technics: "סרוג",
  style: "ספורטיבי",
  ageGroup: "Adults",
  modelNumber: "DXZP002",
  origin: "China",
  packageSize: "20X15X3 ס\"מ",
  weight: "0.100 ק\"ג",
  moq: "20 זוגות",
  customDesign: "עיצוב מותאם אישית - מקבלים",
  customLogo: "לוגו מותאם אישית - מקבלים",
  customPattern: "תבניות מותאמות אישית",
  logoPosition: "Header card, Cuff, גוף, תחתון",
};

const allProducts = [
  {
    id: "veloura-grip-classic",
    name: "גרבי אחיזה Cloud",
    price: 55,
    priceDollar: 15,
    oldPrice: 65,
    images: [imgClassic.src, ...extraImgs],
    color: "שחור קלאסי",
    description: "גרבי אחיזה מכותנה אורגנית לנשימה ואחיזה מקסימלית על הרפורמר. עיצוב נקי וקלאסי שמתאים לכל לוק בסטודיו.",
    details: ["בד נושם ורך", "אחיזת סיליקון מלאה", "תפרים שטוחים", "מושלם ל-Reformer Girlies"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-champagne",
    name: "גרבי אחיזה Cloud",
    price: 55,
    priceDollar: 15,
    oldPrice: 65,
    images: [imgChampagne.src, ...extraImgs],
    color: "שמפניה עדינה",
    description: "גרבי אחיזה מכותנה אורגנית לנשימה ואחיזה מקסימלית על הרפורמר בעיצוב עדין של שמפניה.",
    details: ["בד נושם ורך", "אחיזת סיליקון מלאה", "תפרים שטוחים", "מושלם ל-Reformer Girlies"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-ballet",
    name: "גרבי אחיזה Cloud",
    price: 55,
    priceDollar: 15,
    oldPrice: 65,
    images: [imgBallet.src, ...extraImgs],
    color: "ורוד בלט",
    description: "גוון ורוד בלט עדין לסטודיו. אחיזה חזקה וסטייל בלתי מתפשר לשעות הפילאטיס שלך.",
    details: ["בד נושם ורך", "אחיזת סיליקון מלאה", "תפרים שטוחים", "מושלם ל-Reformer Girlies"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-rose-quartz",
    name: "גרבי אחיזה Cloud",
    price: 55,
    priceDollar: 15,
    oldPrice: 65,
    images: [imgRoseQuartz.src, ...extraImgs],
    color: "רוז קוורץ",
    description: "רוז קוורץ טרנדי - שילוב של נוחות ואסתטיקה לכל סטודיו שתבחרי.",
    details: ["בד נושם ורך", "אחיזת סיליקון מלאה", "תפרים שטוחים", "עיצוב אסתטי במיוחד"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "veloura-magic-circle",
    name: "טבעת פילאטיס Magic Circle",
    price: 120,
    priceDollar: 35,
    oldPrice: 150,
    images: [imgRing.src, ...extraImgs],
    color: "בז' / עץ מנגו",
    description: "ההתנגדות המושלמת לסטודיו הביתי שלך מכוסה בחומרים עמידים ונעימים למגע בגימור בז' קלאסי.",
    details: ["מעטפת נעימה למגע", "התנגדות חזקה וגמישה לאורך זמן", "מושלם חיזוק שרירי ליבה וירכיים", "עיצוב מינימליסטי מתקדם"],
    category: "Equipment"
  },
  {
    id: "veloura-resistance-band",
    name: "סט גומיות התנגדות מבד",
    price: 89,
    priceDollar: 25,
    oldPrice: 110,
    images: [imgBand.src, ...extraImgs],
    color: "סט גווני אדמה",
    description: "גומיות מבד עבה שלא מחליק לעולם. עיצוב גווני אדמה שמרגיעים את העיניים במהלך כל אימון ביתי.",
    details: ["שלוש רמות התנגדות", "לא מתקפל או מחליק מחומר עמיד", "גימור אסתטי איכותי", "מגיע בתיקייה תואמת"],
    category: "Equipment"
  },
  {
    id: "alibaba-7",
    name: "בקבוק מים נירוסטה 500 מ״ל",
    price: 85,
    priceDollar: 25,
    oldPrice: 120,
    images: [imgWaterBottle.src, ...extraImgs],
    color: "ירוק מנטה",
    description: "בקבוק מבודד לשמירת קור למשך 24 שעות",
    details: ["נירוסטה איכותית", "שומר על קור וחום", "עיצוב מינימליסטי"],
    category: "Accessories"
  },
  {
    id: "alibaba-8",
    name: "סט ספורט ויוגה (2 חלקים)",
    price: 180,
    priceDollar: 50,
    oldPrice: 240,
    images: [imgYogaSet.src, ...extraImgs],
    color: "טאופ טבעי",
    description: "סט ספורט נוח ומחמיא לאימוני פילאטיס ויוגה",
    details: ["בד גמיש ונושם", "גזרה מחמיאה", "מתאים לכל סוגי האימונים"],
    category: "Apparel"
  },
  {
    id: "alibaba-9",
    name: "סט בגדי ספורט Seamless",
    price: 195,
    priceDollar: 55,
    oldPrice: 260,
    images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800", ...extraImgs],
    color: "סגול אפרפר",
    description: "סט איכותי מבד נושם, מושלם לכל אימון",
    details: ["בד ללא תפרים למניעת שפשופים", "גמישות מירבית", "עיצוב מתקדם"],
    category: "Apparel"
  },
  {
    id: "aliexpress-1",
    name: "גרבי יוגה עם אחיזת סיליקון",
    price: 59,
    priceDollar: 15,
    oldPrice: 79,
    images: ["/products/aliexpress_1.jpg", ...extraImgs],
    color: "ססגוני",
    description: "גרבי יוגה מבד כותנה עם רקמה נקודתית מסיליקון, לא מחליקות לאחיזה מושלמת בפילאטיס.",
    details: ["בד כותנה נושם", "רקמה נקודתית מסיליקון", "אחיזה אנטי החלקה"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-2",
    name: "גרבי יוגה דוגמת לחם וקפה",
    price: 59,
    priceDollar: 15,
    oldPrice: 79,
    images: ["/products/aliexpress_2.jpg", ...extraImgs],
    color: "ססגוני",
    description: "גרבי יוגה לנשים מכותנה מעוצבות עם דוגמת לחם וקפה ושוליים דמויי חסה.",
    details: ["בד כותנה נעים", "נקודות סיליקון נגד החלקה", "עיצוב ייחודי"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-3",
    name: "גרבי יוגה כותנה לבנה",
    price: 59,
    priceDollar: 15,
    oldPrice: 79,
    images: ["/products/aliexpress_3.jpg", ...extraImgs],
    color: "לבן",
    description: "גרבי יוגה לנשים מכותנה לבנה רקומות עם נקודות סיליקון למניעת החלקה.",
    details: ["נקודות סיליקון נגד החלקה", "בד נושם ורך", "עיצוב לבן נקי"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-4",
    name: "גרבי יוגה דובדבן",
    price: 59,
    priceDollar: 15,
    oldPrice: 79,
    images: ["/products/aliexpress_4.jpg", ...extraImgs],
    color: "לבן/אדום",
    description: "גרבי יוגה לנשים מכותנה עם רקמת דובדבן, סיליקון עם נקודות לאחיזה אנטי החלקה.",
    details: ["נקודות סיליקון לאחיזה מרבית", "נוחות לאורך זמן", "עיצוב דובדבן"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-5",
    name: "סט 13 חתיכות פילאטיס ויוגה",
    price: 189,
    priceDollar: 50,
    oldPrice: 250,
    images: ["/products/aliexpress_5.jpg", ...extraImgs],
    color: "סגול/שחור",
    description: "סט פילאטיס יוגה 13 חתיכות לבית לנשים מכיל אביזרי כושר והתאמה מושלמים.",
    details: ["13 חתיכות למגוון אימונים", "אידיאלי לאימון ביתי", "עמיד במיוחד"],
    category: "Equipment"
  },
  {
    id: "aliexpress-6",
    name: "טבעת פילאטיס קסם",
    price: 129,
    priceDollar: 35,
    oldPrice: 160,
    images: ["/products/aliexpress_6.jpg", ...extraImgs],
    color: "ורוד/סגול",
    description: "טבעת פילאטיס וכושר להתאמת ירכיים, בטן ורגליים לאימון התנגדות וספורט.",
    details: ["התנגדות גמישה לאורך זמן", "מעטפת נוחה לאחיזה", "מחזק את כל שרירי הליבה"],
    category: "Equipment"
  },
  {
    id: "aliexpress-7",
    name: "לוח פילאטיס רב תכליתי",
    price: 249,
    priceDollar: 65,
    oldPrice: 320,
    images: ["/products/aliexpress_7.jpg", ...extraImgs],
    color: "שחור",
    description: "לוח פילאטיס רב תכליתי לאימוני בטן, רצועות התנגדות וכושר לחיזוק הגוף בבית.",
    details: ["רצועות התנגדות כלולות", "מתאים לחיזוק כללי", "נייד וקל לאחסון"],
    category: "Equipment"
  },
  {
    id: "aliexpress-8",
    name: "מזרן יוגה מתקפל EVA",
    price: 149,
    priceDollar: 40,
    oldPrice: 190,
    images: ["/products/aliexpress_8.jpg", ...extraImgs],
    color: "ורוד/תכלת",
    description: "מזרני יוגה ופילאטיס מתקפלים מ-EVA וידידותיים לסביבה, אידיאליים לנסיעות.",
    details: ["ידידותי לסביבה", "מתקפל בקלות", "עובי אידיאלי לתמיכה (3-6מ״מ)"],
    category: "Accessories"
  }
];

const reviews = [
  { name: "מיכל ד.", rating: 5, text: "הגרביים הכי נוחות שהיו לי! האחיזה מעולה ברפורמר.", date: "לפני שבוע" },
  { name: "נועה ל.", rating: 5, text: "עיצוב מהמם ואיכות מדהימה. כבר הזמנתי זוג שני!", date: "לפני שבועיים" },
  { name: "שירה כ.", rating: 4, text: "מאוד מרוצה, הבד רך ונעים והאחיזה חזקה. ממליצה.", date: "לפני חודש" },
];

const specLabels: Record<string, string> = {
  activity: "פעילות",
  material: "חומר",
  sockType: "סוג גרב",
  durability: "עמידות",
  features: "תכונות",
  height: "גובה",
  season: "עונה",
  pattern: "סוג תבנית",
  technics: "טכניקה",
  style: "סגנון",
  ageGroup: "קבוצת גיל",
  modelNumber: "מספר דגם",
  origin: "מקום ייצור",
  packageSize: "גודל חבילה",
  weight: "משקל",
  moq: "הזמנה מינימלית",
  customDesign: "עיצוב",
  customLogo: "לוגו",
  customPattern: "דפוס",
  logoPosition: "מיקום לוגו",
};

const ProductPage = () => {
  const { productId } = useParams();
  const router = useRouter();
  const { addItem } = useCart();

  const product = allProducts.find((p) => p.id === productId);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-foreground mb-4">המוצר לא נמצא</h1>
          <Button variant="hero" onClick={() => router.push("/")}>חזרה לדף הבית</Button>
        </div>
      </div>
    );
  }

  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) return;
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
    }
  };

  const isSock = product.category === "גרביים";

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <AnnouncementBar />
      <Navigation />
      <CartDrawer />

      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-6xl px-6 pt-28 pb-4">
        <nav className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
          <button onClick={() => router.push("/")} className="hover:text-foreground transition-colors">דף הבית</button>
          <ChevronRight className="w-3 h-3 rotate-180" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Main */}
      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-card shadow-card aspect-square">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.oldPrice && (
                <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-[10px] font-sans font-bold uppercase px-3 py-1 rounded-full">
                  מבצע
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-colors ${
                      i === activeImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-normal text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-sans text-muted-foreground">({reviews.length} ביקורות)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-sans font-semibold text-foreground">₪{product.price}</span>
              {product.priceDollar && (
                <span className="text-lg font-sans font-medium text-muted-foreground">/ ${product.priceDollar}</span>
              )}
              {product.oldPrice && (
                <span className="text-lg font-sans font-light text-muted-foreground line-through">₪{product.oldPrice}</span>
              )}
            </div>

            <p className="text-sm font-sans font-light text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-8">
                <p className="text-sm font-sans font-medium text-foreground mb-3">מידה</p>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-full text-sm font-sans transition-all ${
                        selectedSize === size
                          ? "bg-foreground text-background"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8 hidden">
              <p className="text-sm font-sans font-medium text-foreground mb-3">כמות</p>
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary rounded-r-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm font-sans font-medium min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary rounded-l-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="px-12 py-6 h-auto w-full md:w-auto mt-4 text-black border-black hover:bg-black hover:text-white"
              onClick={() => setIsWaitlistOpen(true)}
            >
              אזל מהמלאי - הצטרפי לרשימת המתנה
            </Button>

            <WaitlistDialog 
              isOpen={isWaitlistOpen}
              onOpenChange={setIsWaitlistOpen}
              productId={product.id}
              productName={product.name}
            />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-sans text-muted-foreground">משלוח חינם מעל ₪250</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-sans text-muted-foreground">החזרה תוך 14 יום</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs font-sans text-muted-foreground">תשלום מאובטח</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      {product.details && (
        <section className="bg-secondary/30 py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-serif font-normal text-foreground mb-8">פרטי המוצר</h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-sans text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Full Specs (socks only) */}
      {isSock && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="flex items-center gap-2 text-2xl font-serif font-normal text-foreground mb-8"
            >
              מפרט טכני מלא
              <ChevronRight className={`w-5 h-5 transition-transform ${showSpecs ? "rotate-90" : "rotate-0"}`} />
            </button>
            {showSpecs && (
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 bg-card rounded-3xl p-8 shadow-card">
                {Object.entries(productSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start py-2 border-b border-border last:border-0">
                    <span className="text-sm font-sans font-medium text-foreground">{specLabels[key] || key}</span>
                    <span className="text-sm font-sans text-muted-foreground text-left max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className={`py-16 px-6 ${isSock ? "" : ""}`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-serif font-normal text-foreground mb-10">ביקורות לקוחות</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-card rounded-3xl p-6 shadow-card">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm font-sans text-foreground mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-sans font-medium text-foreground">{review.name}</span>
                  <span className="text-xs font-sans text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="bg-secondary/30 py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-serif font-normal text-foreground mb-10">מוצרים דומים</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {similarProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { router.push(`/product/${p.id}`); window.scrollTo(0, 0); }}
                  className="text-right group"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-card shadow-card mb-4 aspect-square">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-foreground/5 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    <span className="absolute top-4 right-4 bg-muted text-muted-foreground text-[10px] font-sans font-bold uppercase px-3 py-1 rounded-full">
                      Sold Out
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-medium text-foreground mb-1">{p.name}</h3>
                  <p className="text-sm font-sans font-semibold text-foreground">₪{p.price}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;