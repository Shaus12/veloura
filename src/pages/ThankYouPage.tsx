import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { CheckCircle, Package, Mail } from "lucide-react";
import { useEffect } from "react";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    orderName?: string;
    orderEmail?: string;
    orderTotal?: number;
    orderItems?: { name: string; quantity: number; price: number }[];
  } | null;

  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <AnnouncementBar />
      <Navigation />

      <section className="container mx-auto max-w-2xl px-6 pt-32 pb-20 text-center">
        <div className="bg-card rounded-3xl p-10 md:p-14 shadow-card space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-3xl md:text-4xl font-serif font-normal text-foreground">
            תודה רבה, {state.orderName}!
          </h1>
          <p className="text-muted-foreground font-sans text-base leading-relaxed max-w-md mx-auto">
            ההזמנה שלך התקבלה בהצלחה ואנחנו בודקים אותה כעת.
            <br />
            נשלח לך אישור למייל בהקדם.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-sans">
            <Mail className="w-4 h-4" />
            <span>{state.orderEmail}</span>
          </div>

          {/* Order summary */}
          <div className="border-t border-border pt-6 space-y-3 text-right">
            <h3 className="font-serif text-lg flex items-center gap-2">
              <Package className="w-5 h-5" />
              פרטי ההזמנה
            </h3>
            {state.orderItems?.map((item, i) => (
              <div key={i} className="flex justify-between font-sans text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold">₪{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-serif text-lg">
              <span>סה״כ</span>
              <span className="font-sans font-bold">₪{state.orderTotal}</span>
            </div>
          </div>

          <Button variant="hero" size="lg" className="mt-6" onClick={() => navigate("/")}>
            חזרה לחנות
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
