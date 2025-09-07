import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import User from '../models/User.js'

const router = express.Router()

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

router.post('/register', async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const { name, email, password } = parsed.data
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ message: 'Email already registered' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash })
  const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' })
  return res.json({ id: user._id, name: user.name, role: user.role })
})

router.post('/login', async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const { email, password } = parsed.data
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' })
  return res.json({ id: user._id, name: user.name, role: user.role })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ ok: true })
})

router.get('/me', (req, res) => {
  const token = req.cookies?.token
  if (!token) return res.json(null)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.json(payload)
  } catch {
    res.json(null)
  }
})

export default router
