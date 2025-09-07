import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String, default: "" },
    location: { type: String, default: "" },
    salary: { type: String, default: "" },
    description: { type: String, default: "" },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      default: "full-time",
    },
    tags: [{ type: String }],
    remote: { type: Boolean, default: false },
    applyUrl: { type: String, default: "" },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Create text index for search functionality
JobSchema.index({
  title: "text",
  company: "text",
  description: "text",
  tags: "text",
});

export default mongoose.model("Job", JobSchema);
