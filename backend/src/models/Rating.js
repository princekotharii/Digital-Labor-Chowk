import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema(
  {
    workerCode: { type: String, required: true, index: true },
    punctuality: { type: Number, required: true, min: 1, max: 5 },
    skillQuality: { type: Number, required: true, min: 1, max: 5 },
    paymentBehavior: { type: Number, required: true, min: 1, max: 5 },
    mutualRespect: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
)

export default mongoose.models.Rating || mongoose.model('Rating', ratingSchema)
