"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickReplies = [
  "מה הגדלים הזמינים?",
  "איך עובד המשלוח?",
  "מה מדיניות ההחזרות?",
  "מתי המבצע נגמר?",
];

const botResponses: Record<string, string> = {
  "מה הגדלים הזמינים?": "הגרביים שלנו זמינות בגדלים S (35-37), M (38-40), L (41-43). ממליצות לבחור לפי מידת הנעל הרגילה שלך! 👟",
  "איך עובד המשלוח?": "משלוח חינם בהזמנות מעל ₪250! משלוח רגיל תוך 3-5 ימי עסקים, משלוח אקספרס תוך 1-2 ימי עסקים. 🚚",
  "מה מדיניות ההחזרות?": "ניתן להחזיר מוצרים תוך 30 יום מיום הקבלה, כל עוד הם באריזתם המקורית ולא נעשה בהם שימוש. 💕",
  "מתי המבצע נגמר?": "המבצע הנוכחי פעיל ל-24 שעות בלבד! הגרביים ב-₪60 במקום ₪90. כדאי לנצל! ⏰",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "היי! 👋 אני כאן לעזור. איך אפשר לסייע לך?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    const userMsg: Message = { role: "user", text };
    const botReply = botResponses[text] || "תודה על הפנייה! צוות השירות שלנו יחזור אלייך בהקדם. בינתיים, מוזמנת לעיין בקולקציה שלנו 💕";
    setMessages((prev) => [...prev, userMsg, { role: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-primary rounded-full shadow-elevated flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform duration-300"
        aria-label={isOpen ? "סגור צ'אט" : "פתח צ'אט"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 max-h-[28rem] bg-background rounded-3xl shadow-elevated border border-border flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-primary px-5 py-4 rounded-t-3xl">
            <p className="font-serif text-lg text-primary-foreground">VELŌURA צ׳אט</p>
            <p className="text-xs font-sans text-primary-foreground/70">אנחנו כאן בשבילך</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-60">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-sans ${
                    msg.role === "user"
                      ? "bg-primary/10 text-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-[10px] font-sans px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && input.trim() && sendMessage(input.trim())}
              placeholder="כתבי הודעה..."
              className="flex-1 text-sm font-sans px-4 py-2 rounded-full bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Button
              size="icon"
              variant="default"
              className="rounded-full w-9 h-9"
              onClick={() => input.trim() && sendMessage(input.trim())}
              aria-label="שלח הודעה"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
