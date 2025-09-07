import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.model('Application', ApplicationSchema)
