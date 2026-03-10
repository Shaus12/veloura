import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { ChevronRight, Minus, Plus, Star, Truck, RotateCcw, Shield } from "lucide-react";

import sockPinkStripe from "@/assets/sock-pink-stripe.png";
import sockPinkDots from "@/assets/sock-pink-dots.png";
import productClassic from "@/assets/product-classic.jpg";
import productPilatesRing from "@/assets/product-pilates-ring.jpg";
import productTowel from "@/assets/product-towel.jpg";
import productResistanceBand from "@/assets/product-resistance-band.jpg";

const allProducts = [
  {
    id: "sock-rose-quartz",
    name: "גרב אחיזה Rose Quartz",
    price: 60,
    oldPrice: 90,
    images: [sockPinkStripe],
    color: "ורוד פסים",
    description: "גרבי אחיזה מקצועיות בעיצוב אלגנטי עם פסים ורודים עדינים. בד רך ונושם עם סוליית סיליקון מלאה למקסימום יציבות על הרפורמר ובסטודיו.",
    details: ["בד כותנה מצרית 80%", "סוליית סיליקון מלאה", "תפרים שטוחים למניעת שפשופים", "מתאימות לפילאטיס, יוגה ובר"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "גרביים",
  },
  {
    id: "sock-champagne",
    name: "גרב אחיזה Champagne",
    price: 60,
    oldPrice: 90,
    images: [sockPinkDots],
    color: "ורוד נקודות",
    description: "גרבי אחיזה יוקרתיות בדוגמת נקודות שמפניה. שילוב מושלם בין סטייל לפונקציונליות עם אחיזה מקסימלית.",
    details: ["בד כותנה מצרית 80%", "סוליית סיליקון מלאה", "תפרים שטוחים למניעת שפשופים", "מתאימות לפילאטיס, יוגה ובר"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "גרביים",
  },
  {
    id: "sock-lifestyle",
    name: "גרב אחיזה LŪNA Classic",
    price: 60,
    oldPrice: 90,
    images: [productClassic],
    color: "ורוד קלאסי",
    description: "הגרב הקלאסית של LŪNA — עיצוב נצחי בגוון ורוד עדין. נוחות מירבית עם אחיזה מקצועית לכל סוגי האימונים.",
    details: ["בד כותנה מצרית 80%", "סוליית סיליקון מלאה", "תפרים שטוחים למניעת שפשופים", "מתאימות לפילאטיס, יוגה ובר"],
    sizes: ["S (35-37)", "M (38-40)", "L (41-43)"],
    category: "גרביים",
  },
  {
    id: "rec-1",
    name: "טבעת פילאטיס פרימיום",
    price: 89,
    images: [productPilatesRing],
    description: "טבעת התנגדות מקצועית לחיטוב וחיזוק. עשויה מפיברגלס קל משקל עם ריפודי EVA נוחים.",
    details: ["פיברגלס קל משקל", "ריפודי EVA אנטומיים", "קוטר 36 ס\"מ", "מתאימה לכל הרמות"],
    category: "אביזרים",
  },
  {
    id: "rec-2",
    name: "מגבת סטודיו מיקרופייבר",
    price: 49,
    images: [productTowel],
    description: "מגבת סטודיו רכה וסופגת במיוחד. ייבוש מהיר ונוחה לנשיאה.",
    details: ["מיקרופייבר 300 GSM", "ייבוש מהיר", "40x80 ס\"מ", "ניתנת לכביסה במכונה"],
    category: "אביזרים",
  },
  {
    id: "rec-3",
    name: "גומיית התנגדות LŪNA",
    price: 39,
    images: [productResistanceBand],
    description: "גומיית לטקס איכותית לאימון בבית ובסטודיו. התנגדות בינונית מתאימה למגוון תרגילים.",
    details: ["לטקס טבעי", "התנגדות בינונית", "אורך 200 ס\"מ", "כולל שקית נשיאה"],
    category: "אביזרים",
  },
];

const reviews = [
  { name: "מיכל ד.", rating: 5, text: "הגרביים הכי נוחות שהיו לי! האחיזה מעולה ברפורמר.", date: "לפני שבוע" },
  { name: "נועה ל.", rating: 5, text: "עיצוב מהמם ואיכות מדהימה. כבר הזמנתי זוג שני!", date: "לפני שבועיים" },
  { name: "שירה כ.", rating: 4, text: "מאוד מרוצה, הבד רך ונעים והאחיזה חזקה. ממליצה.", date: "לפני חודש" },
];

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = allProducts.find((p) => p.id === productId);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-foreground mb-4">המוצר לא נמצא</h1>
          <Button variant="hero" onClick={() => navigate("/")}>חזרה לדף הבית</Button>
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

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <AnnouncementBar />
      <Navigation />

      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-6xl px-6 pt-28 pb-4">
        <nav className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">דף הבית</button>
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
            <div className="mb-8">
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
              variant="hero"
              size="lg"
              className="px-12 py-6 h-auto w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={product.sizes ? !selectedSize : false}
            >
              {product.sizes && !selectedSize ? "בחרי מידה" : "הוסיפי לסל"}
            </Button>

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

      {/* Reviews */}
      <section className="py-16 px-6">
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
                  onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0); }}
                  className="text-right group"
                >
                  <div className="overflow-hidden rounded-3xl bg-card shadow-card mb-4 aspect-square">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
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
