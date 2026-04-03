-- Financial transactions table for expenses and income
CREATE TABLE financial_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('expense', 'collection')),
  category TEXT NOT NULL CHECK (category IN ('daily_expense', 'monthly_bill', 'adhoc_expense', 'fee_collection')),
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow authenticated users to read financial transactions" ON financial_transactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to manage financial transactions" ON financial_transactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('superadmin', 'admin')
    )
  );