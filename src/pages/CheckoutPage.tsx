import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, CreditCard, Lock, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    OfficeGuy: {
      Payments: {
        BindFormSubmit: (config: {
          CompanyID: number;
          APIPublicKey: string;
        }) => void;
      };
    };
    jQuery: any;
  }
}

const COMPANY_ID = 767581436;
const API_PUBLIC_KEY = "4B46Y4gkPjWj23sofFZWCAdeGC1gMH9HDtnQ9n0N652huKlm3B";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, itemCount } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const formRef = useRef<HTMLFormElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    // Initialize Sumit payments when script is loaded
    const initSumit = () => {
      if (window.OfficeGuy?.Payments && window.jQuery) {
        window.OfficeGuy.Payments.BindFormSubmit({
          CompanyID: COMPANY_ID,
          APIPublicKey: API_PUBLIC_KEY,
        });
      } else {
        setTimeout(initSumit, 200);
      }
    };
    initSumit();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) {
      toast.error("נא למלא שם ואימייל");
      return;
    }

    setIsProcessing(true);

    // The Sumit JS library adds og-token to the form after tokenization
    // We need to wait for it and then send to our server
    const checkToken = () => {
      const form = formRef.current;
      if (!form) return;

      const tokenInput = form.querySelector<HTMLInputElement>('[name="og-token"]');
      if (tokenInput?.value) {
        processPayment(tokenInput.value);
      } else {
        // Sumit is still processing, wait a bit
        setTimeout(checkToken, 500);
      }
    };

    // Submit the form through Sumit's handler first
    // Sumit's BindFormSubmit intercepts submit and tokenizes
    setTimeout(checkToken, 1000);
  };

  const processPayment = async (token: string) => {
    try {
      // Call our edge function to process the charge
      const response = await fetch(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/sumit-charge`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            amount: total,
            customerName,
            customerEmail,
            customerPhone,
            items: items.map((i) => ({
              name: i.name,
              price: i.price,
              quantity: i.quantity,
            })),
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("התשלום בוצע בהצלחה! 🎉");
        navigate("/");
      } else {
        toast.error(data.error || "שגיאה בתשלום, נסי שוב");
      }
    } catch {
      toast.error("שגיאה בתשלום, נסי שוב");
    } finally {
      setIsProcessing(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <AnnouncementBar />
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[60vh] pt-28 px-6">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-serif text-foreground mb-2">הסל שלך ריק</h1>
          <p className="text-muted-foreground font-sans text-sm mb-6">הוסיפי מוצרים לסל כדי להמשיך לתשלום</p>
          <Button variant="hero" onClick={() => navigate("/")}>
            חזרה לחנות
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <AnnouncementBar />
      <Navigation />

      <div className="container mx-auto max-w-5xl px-6 pt-28 pb-4">
        <nav className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">
            דף הבית
          </button>
          <ChevronRight className="w-3 h-3 rotate-180" />
          <span className="text-foreground">תשלום</span>
        </nav>
      </div>

      <section className="container mx-auto max-w-5xl px-6 pb-20">
        <h1 className="text-3xl font-serif font-normal text-foreground mb-10">השלמת הזמנה</h1>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Payment Form */}
          <div className="md:col-span-3">
            {/* Customer Details */}
            <div className="bg-card rounded-3xl p-8 shadow-card mb-6">
              <h2 className="text-lg font-serif text-foreground mb-6">פרטי לקוח</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">שם מלא *</label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="ישראלה ישראלי"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">אימייל *</label>
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="email@example.com"
                    dir="ltr"
                    className="rounded-xl text-left"
                  />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">טלפון</label>
                  <Input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="050-0000000"
                    dir="ltr"
                    className="rounded-xl text-left"
                  />
                </div>
              </div>
            </div>

            {/* Credit Card Form - Sumit Integration */}
            <div className="bg-card rounded-3xl p-8 shadow-card">
              <h2 className="text-lg font-serif text-foreground mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                פרטי תשלום
              </h2>

              <form ref={formRef} data-og="form" onSubmit={handleFormSubmit}>
                <div className="og-errors text-destructive text-sm font-sans mb-4" />

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">מספר כרטיס</label>
                    <input
                      type="text"
                      size={20}
                      maxLength={20}
                      data-og="cardnumber"
                      placeholder="0000 0000 0000 0000"
                      dir="ltr"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm text-left"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">חודש</label>
                      <input
                        type="text"
                        size={2}
                        maxLength={2}
                        data-og="expirationmonth"
                        placeholder="MM"
                        dir="ltr"
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">שנה</label>
                      <input
                        type="text"
                        size={4}
                        maxLength={4}
                        data-og="expirationyear"
                        placeholder="YYYY"
                        dir="ltr"
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">CVV</label>
                      <input
                        type="text"
                        size={4}
                        maxLength={4}
                        data-og="cvv"
                        placeholder="***"
                        dir="ltr"
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-sans font-medium text-foreground mb-1.5 block">תעודת זהות</label>
                    <input
                      type="text"
                      data-og="citizenid"
                      placeholder="מספר ת.ז."
                      dir="ltr"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm text-left"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 mb-6 text-xs text-muted-foreground font-sans">
                  <Lock className="w-3.5 h-3.5" />
                  <span>התשלום מאובטח ומוצפן בתקן PCI DSS</span>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full py-6 h-auto text-base"
                  disabled={isProcessing}
                >
                  {isProcessing ? "מעבד תשלום..." : `שלמי ₪${total}`}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-card rounded-3xl p-8 shadow-card sticky top-28">
              <h2 className="text-lg font-serif text-foreground mb-6">סיכום הזמנה</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-medium truncate">{item.name}</p>
                      <p className="font-sans text-xs text-muted-foreground">כמות: {item.quantity}</p>
                    </div>
                    <p className="font-sans text-sm font-semibold">₪{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">סה״כ מוצרים</span>
                  <span>₪{total}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">משלוח</span>
                  <span>{total >= 250 ? "חינם 🚚" : "₪30"}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-serif text-lg">סה״כ לתשלום</span>
                  <span className="font-sans font-bold text-lg">₪{total >= 250 ? total : total + 30}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
