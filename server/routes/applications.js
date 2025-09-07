import express from 'express'
import { z } from 'zod'
import Application from '../models/Application.js'
import Job from '../models/Job.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

const ApplySchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().optional()
})

router.post('/', requireAuth, async (req, res) => {
  const parsed = ApplySchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const job = await Job.findById(parsed.data.jobId)
  if (!job) return res.status(404).json({ message: 'Job not found' })
  const app = await Application.create({ job: job._id, user: req.user.id, coverLetter: parsed.data.coverLetter || '' })
  res.status(201).json(app)
})

router.get('/mine', requireAuth, async (req, res) => {
  const apps = await Application.find({ user: req.user.id }).populate('job')
  res.json(apps)
})

export default router
