import express from 'express'
import { z } from 'zod'
import Job from '../models/Job.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

const JobSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  location: z.string().default(''),
  salary: z.string().default(''),
  description: z.string().default('')
})

router.get('/', async (_req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 }).limit(50)
  res.json(jobs)
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const parsed = JobSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const job = await Job.create({ ...parsed.data, createdBy: req.user.id })
  res.json(job)
})

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const parsed = JobSchema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const job = await Job.findByIdAndUpdate(req.params.id, parsed.data, { new: true })
  res.json(job)
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
