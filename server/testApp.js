import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())

// Lightweight mock routes for tests
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body || {}
  if (!name || !email || !password) return res.status(400).json({ message: 'invalid' })
  return res.json({ id: 'test', name, role: 'user' })
})

app.get('/jobs', (_req, res) => {
  res.json({ items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 })
})

export default app

