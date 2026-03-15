"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface WaitlistDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
}

export function WaitlistDialog({ isOpen, onOpenChange, productId, productName }: WaitlistDialogProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("נא להזין כתובת אימייל תקינה");
      return;
    }

    setIsLoading(true);
    
    try {
      // @ts-ignore - waitlist table is manually created in Supabase
      const { error } = await (supabase as any)
        .from('waitlist')
        .insert([
          { email, product_id: productId, product_name: productName }
        ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error("אירעה שגיאה בהרשמה. נסי שוב מאוחר יותר.");
      } else {
        toast.success("נרשמת בהצלחה לרשימת ההמתנה!");
        setEmail("");
        onOpenChange(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("אירעה שגיאה בהרשמה. נסי שוב מאוחר יותר.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-serif">הצטרפי לרשימת ההמתנה</DialogTitle>
          <DialogDescription className="font-sans">
            המוצר {productName} כרגע אזל מהמלאי. השאירי את המייל שלך ונעדכן אותך ברגע שיחזור.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <Input
            type="email"
            placeholder="האימייל שלך"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-right"
            required
          />
          <Button type="submit" variant="hero" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "עדכנו אותי"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
