const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, items, total } = await req.json();

    if (!customerEmail || !customerName) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing customer details" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const itemsHtml = items
      .map(
        (item: { name: string; quantity: number; price: number }) =>
          `<tr><td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:left">₪${item.price * item.quantity}</td></tr>`
      )
      .join("");

    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <div style="text-align:center;padding:20px 0;border-bottom:2px solid #e8d5d0">
          <h1 style="font-size:28px;color:#333;margin:0">VELŌURA</h1>
          <p style="color:#888;font-size:12px;letter-spacing:2px;margin:4px 0 0">GRIP SOCKS</p>
        </div>
        <div style="padding:30px 0">
          <h2 style="font-size:22px;color:#333">תודה על ההזמנה, ${customerName}! 🎉</h2>
          <p style="color:#666;line-height:1.6">ההזמנה שלך התקבלה ואנחנו מטפלים בה. נעדכן אותך כשהמשלוח ייצא.</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <thead>
            <tr style="background:#f9f5f3">
              <th style="padding:10px 8px;text-align:right;font-size:14px">מוצר</th>
              <th style="padding:10px 8px;text-align:center;font-size:14px">כמות</th>
              <th style="padding:10px 8px;text-align:left;font-size:14px">מחיר</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div style="text-align:left;padding:15px 0;border-top:2px solid #e8d5d0;font-size:18px;font-weight:bold">
          סה״כ: ₪${total}
        </div>
        <div style="padding:20px 0;text-align:center;color:#888;font-size:12px">
          <p>נשמח לעמוד לשירותך 💕</p>
          <p>VELŌURA © ${new Date().getFullYear()}</p>
        </div>
      </div>
    `;

    // Use Supabase built-in SMTP (via Auth admin) or Resend
    // For now, use the Lovable AI gateway to send via Resend-compatible API
    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_KEY) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from: "VELŌURA <orders@veloura.co.il>",
          to: [customerEmail],
          subject: `אישור הזמנה — VELŌURA`,
          html,
        }),
      });
      const emailData = await emailRes.json();
      console.log("Resend response:", JSON.stringify(emailData));

      return new Response(
        JSON.stringify({ success: true, data: emailData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fallback: log the email (no email provider configured)
    console.log("No RESEND_API_KEY configured. Email would be sent to:", customerEmail);
    return new Response(
      JSON.stringify({ success: true, message: "Email logged (no provider configured)" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
