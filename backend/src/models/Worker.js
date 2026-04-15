import mongoose from 'mongoose'

const workerSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, index: true },
    userEmail: { type: String, lowercase: true, trim: true, unique: true, sparse: true, index: true },
    name: { type: String, required: true, trim: true },
    skill: { type: String, required: true, index: true },
    chowk: { type: String, required: true },
    distance: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    available: { type: Boolean, default: true },
    availableUntil: { type: Date, default: null },
  },
  { timestamps: true },
)

export default mongoose.models.Worker || mongoose.model('Worker', workerSchema)
