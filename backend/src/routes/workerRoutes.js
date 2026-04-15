import { Router } from 'express'
import {
	getMyWorkerProfile,
	listWorkers,
	updateAvailability,
	updateMyAvailability,
} from '../controllers/workerController.js'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', listWorkers)
router.get('/me', requireAuth, requireRole('Worker'), getMyWorkerProfile)
router.patch('/me/availability', requireAuth, requireRole('Worker'), updateMyAvailability)
router.patch('/:id/availability', updateAvailability)

export default router
