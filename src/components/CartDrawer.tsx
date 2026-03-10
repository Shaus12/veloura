import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { X, ShoppingBag } from "lucide-react";
import modelReformer from "@/assets/model-reformer-1.jpg";
import modelStretch from "@/assets/model-stretch-1.jpg";
import modelLifestyle2 from "@/assets/model-lifestyle-2.jpg";

const recommendations = [
  { id: "rec-1", name: "טבעת פילאטיס פרימיום", price: 89, image: modelReformer },
  { id: "rec-2", name: "מגבת סטודיו מיקרופייבר", price: 49, image: modelStretch },
  { id: "rec-3", name: "גומיית התנגדות LŪNA", price: 39, image: modelLifestyle2 },
];

const CartDrawer = () => {
  const { items, removeItem, addItem, itemCount, isDrawerOpen, setDrawerOpen } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent side="left" className="w-full sm:w-[420px] bg-background overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-serif text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            סל הקניות ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground font-sans text-sm py-12">הסל שלך ריק</p>
        ) : (
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center bg-card rounded-2xl p-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm font-medium truncate">{item.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">כמות: {item.quantity}</p>
                  <p className="font-sans text-sm font-semibold">₪{item.price * item.quantity}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="font-serif text-lg">סה״כ</span>
              <span className="font-sans font-semibold text-lg">₪{total}</span>
            </div>
            {total < 250 && (
              <p className="text-xs text-muted-foreground font-sans text-center">
                הוסיפי עוד ₪{250 - total} למשלוח חינם 🚚
              </p>
            )}
            <Button
              variant="hero"
              className="w-full py-5 h-auto"
              onClick={() => { setDrawerOpen(false); navigate("/checkout"); }}
            >
              לתשלום
            </Button>
          </div>
        )}

        {/* Cross-sell recommendations */}
        <div className="border-t border-border pt-6">
          <h3 className="font-serif text-lg mb-4">אולי יעניין אותך גם...</h3>
          <div className="space-y-3">
            {recommendations
              .filter((r) => !items.find((i) => i.id === r.id))
              .map((rec) => (
                <div key={rec.id} className="flex gap-3 items-center bg-card rounded-2xl p-3">
                  <img src={rec.image} alt={rec.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-medium truncate">{rec.name}</p>
                    <p className="font-sans text-sm font-semibold">₪{rec.price}</p>
                  </div>
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => addItem({ id: rec.id, name: rec.name, price: rec.price, image: rec.image })}
                  >
                    הוסיפי
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
