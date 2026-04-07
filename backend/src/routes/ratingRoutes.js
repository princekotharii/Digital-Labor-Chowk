import { Router } from 'express'
import { getRatingSummary, submitRating } from '../controllers/ratingController.js'

const router = Router()

router.get('/summary', getRatingSummary)
router.post('/', submitRating)

export default router
