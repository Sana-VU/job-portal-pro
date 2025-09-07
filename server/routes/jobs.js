import express from "express";
import { z } from "zod";
import Job from "../models/Job.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

const JobSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  image: z.string().url().optional().or(z.literal("")),
  location: z.string().default(""),
  salary: z.string().default(""),
  description: z.string().default(""),
  type: z.enum(["full-time", "part-time", "contract"]).default("full-time"),
  tags: z.array(z.string()).default([]),
  remote: z.boolean().default(false),
  applyUrl: z.string().url().optional().or(z.literal("")),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
});

// Get jobs with search and filters
router.get("/", async (req, res) => {
  try {
    const {
      query,
      location,
      type,
      remote,
      min,
      max,
      page = 1,
      limit = 20,
    } = req.query;

    // Build search query
    let searchQuery = {};

    // Text search
    if (query) {
      searchQuery.$text = { $search: query };
    }

    // Location filter
    if (location) {
      searchQuery.location = { $regex: location, $options: "i" };
    }

    // Type filter
    if (type) {
      searchQuery.type = type;
    }

    // Remote filter
    if (remote !== undefined) {
      searchQuery.remote = remote === "true";
    }

    // Salary range filter
    if (min || max) {
      searchQuery.$or = [];
      if (min) searchQuery.$or.push({ salaryMin: { $gte: Number(min) } });
      if (max) searchQuery.$or.push({ salaryMax: { $lte: Number(max) } });
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const [jobs, total] = await Promise.all([
      Job.find(searchQuery)
        .sort(query ? { score: { $meta: "textScore" } } : { createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("createdBy", "name"),
      Job.countDocuments(searchQuery),
    ]);

    res.json({
      items: jobs,
      total,
      page: pageNum,
      pageSize: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// Get job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: "Invalid job ID" });
  }
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const parsed = JobSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const job = await Job.create({ ...parsed.data, createdBy: req.user.id });
  res.json(job);
});

router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const parsed = JobSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const job = await Job.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
  });
  res.json(job);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
