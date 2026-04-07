import { Router } from 'express'
import { listWorkers, updateAvailability } from '../controllers/workerController.js'

const router = Router()

router.get('/', listWorkers)
router.patch('/:id/availability', updateAvailability)

export default router
