import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const { token, amount, customerName, customerEmail, customerPhone, shippingAddress, couponCode, discount, items } =
      await req.json();

    const SUMIT_SECRET = Deno.env.get("SUMIT_API_SECRET_KEY");
    console.log("SUMIT_SECRET exists:", !!SUMIT_SECRET, "length:", SUMIT_SECRET?.length);
    if (!SUMIT_SECRET) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing API key" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const chargeBody = {
      Customer: {
        ExternalIdentifier: customerEmail,
        Name: customerName,
        EmailAddress: customerEmail,
        Phone: customerPhone || "",
      },
      ChargeAmount: amount,
      Description: `הזמנה מ-VELŌURA - ${items.length} פריטים`,
      VATIncluded: true,
      VATRate: 0,
      SingleUseToken: token,
      Items: items.map((item: { name: string; price: number; quantity: number }) => ({
        Description: item.name,
        UnitCost: item.price,
        Quantity: item.quantity,
      })),
      Credentials: {
        CompanyID: 767581436,
        APIKey: SUMIT_SECRET,
      },
    };
    console.log("Sending to Sumit:", JSON.stringify(chargeBody, null, 2));

    // Call Sumit Transaction API to charge
    const chargeResponse = await fetch(
      "https://api.sumit.co.il/billing/payments/charge",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Customer: {
            ExternalIdentifier: customerEmail,
            Name: customerName,
            EmailAddress: customerEmail,
            Phone: customerPhone || "",
          },
          ChargeAmount: amount,
          Description: `הזמנה מ-VELŌURA - ${items.length} פריטים`,
          VATIncluded: true,
          VATRate: 0,
          SingleUseToken: token,
          Items: items.map((item: { name: string; price: number; quantity: number }) => ({
            Description: item.name,
            UnitCost: item.price,
            Quantity: item.quantity,
          })),
          CompanyID: 767581436,
          APIKey: SUMIT_SECRET,
        }),
      }
    );

    const chargeData = await chargeResponse.json();

    // Save order to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("orders").insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      items: JSON.stringify(items),
      total_amount: amount,
      shipping_cost: amount >= 250 ? 0 : 30,
      shipping_address: shippingAddress ? JSON.stringify(shippingAddress) : null,
      coupon_code: couponCode || null,
      discount_amount: discount || 0,
      status: chargeData.Data?.ResponseCode === 0 ? "completed" : "failed",
      payment_token: token,
      sumit_response: chargeData,
    });

    if (chargeData.Data?.ResponseCode === 0) {
      return new Response(
        JSON.stringify({ success: true, data: chargeData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: chargeData.UserErrorMessage || "Payment failed",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
