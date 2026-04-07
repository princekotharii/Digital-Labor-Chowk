import Rating from '../models/Rating.js'
import { computeRatingSummary } from '../utils/ratingSummary.js'

export async function getRatingSummary(req, res) {
  try {
    const ratings = await Rating.find().lean()
    return res.json(computeRatingSummary(ratings))
  } catch (error) {
    return res.status(500).json({ message: 'Could not load rating summary', error: error.message })
  }
}

export async function submitRating(req, res) {
  try {
    const { workerId, punctuality, skillQuality, paymentBehavior, mutualRespect } = req.body

    if (!workerId) {
      return res.status(400).json({ message: 'workerId is required' })
    }

    await Rating.create({
      workerCode: workerId,
      punctuality: Number(punctuality || 0),
      skillQuality: Number(skillQuality || 0),
      paymentBehavior: Number(paymentBehavior || 0),
      mutualRespect: Number(mutualRespect || 0),
    })

    return res.status(201).json({ message: 'Rating submitted' })
  } catch (error) {
    return res.status(500).json({ message: 'Could not submit rating', error: error.message })
  }
}
