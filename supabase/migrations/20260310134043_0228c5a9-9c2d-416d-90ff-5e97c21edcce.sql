
-- Create orders table to track purchases
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  shipping_cost NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed',
  payment_token TEXT,
  sumit_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow inserts from edge functions (service role)
CREATE POLICY "Service role can manage orders"
  ON public.orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
