import Rating from '../models/Rating.js'
import { computeRatingSummary } from '../utils/ratingSummary.js'

function toScore(value) {
  const num = Number(value)
  if (!Number.isFinite(num) || num < 1 || num > 5) {
    return null
  }
  return num
}

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

    const scores = {
      punctuality: toScore(punctuality),
      skillQuality: toScore(skillQuality),
      paymentBehavior: toScore(paymentBehavior),
      mutualRespect: toScore(mutualRespect),
    }

    const hasInvalidScore = Object.values(scores).some((score) => score === null)
    if (hasInvalidScore) {
      return res.status(400).json({
        message: 'All rating fields must be numbers between 1 and 5',
      })
    }

    await Rating.create({
      workerCode: workerId,
      punctuality: scores.punctuality,
      skillQuality: scores.skillQuality,
      paymentBehavior: scores.paymentBehavior,
      mutualRespect: scores.mutualRespect,
    })

    return res.status(201).json({ message: 'Rating submitted' })
  } catch (error) {
    return res.status(500).json({ message: 'Could not submit rating', error: error.message })
  }
}
