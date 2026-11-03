CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'LKR'
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, category, price, currency) VALUES
  ('Daily Vitamin C', 'Vitamins', 1450, 'LKR'),
  ('Gentle Hand Sanitiser', 'Personal care', 890, 'LKR'),
  ('Digital Thermometer', 'Health devices', 2350, 'LKR'),
  ('Daily Multivitamins', 'Vitamins', 2100, 'LKR')
ON CONFLICT DO NOTHING;
