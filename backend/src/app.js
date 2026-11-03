import express from 'express'
import cors from 'cors'
import pg from 'pg'

const app = express()
const port = Number(process.env.PORT || 4000)
const { Pool } = pg
const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : null

app.use(cors())
app.use(express.json())

const demoProducts = [
  { id: 1, name: 'Daily Vitamin C', category: 'Vitamins', price: 1450, currency: 'LKR' },
  { id: 2, name: 'Gentle Hand Sanitiser', category: 'Personal care', price: 890, currency: 'LKR' },
  { id: 3, name: 'Digital Thermometer', category: 'Health devices', price: 2350, currency: 'LKR' },
  { id: 4, name: 'Daily Multivitamins', category: 'Vitamins', price: 2100, currency: 'LKR' }
]

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'medicart-api' }))
app.get('/api/products', async (_req, res, next) => {
  try {
    if (!pool) return res.json({ items: demoProducts, source: 'demo' })
    const result = await pool.query('SELECT id, name, category, price, currency FROM products ORDER BY id')
    res.json({ items: result.rows, source: 'postgresql' })
  } catch (error) { next(error) }
})
app.post('/api/orders', async (req, res, next) => {
  try {
    const { customerName, phone, address, items } = req.body || {}
    if (!customerName?.trim() || !phone?.trim() || !address?.trim() || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Customer details and at least one item are required.' })
    }
    if (!pool) return res.status(201).json({ message: 'Demo order accepted; not saved.', orderId: `DEMO-${Date.now()}` })
    const result = await pool.query(
      'INSERT INTO orders (customer_name, phone, address, items) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
      [customerName.trim(), phone.trim(), address.trim(), JSON.stringify(items)]
    )
    res.status(201).json({ message: 'Order created', orderId: result.rows[0].id, createdAt: result.rows[0].created_at })
  } catch (error) { next(error) }
})
app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ error: 'An unexpected server error occurred.' })
})
export { app }
