import { Router } from 'express'
import {
  applyJob,
  createJob,
  getJobDetail,
  getMyApplications,
  getMyJobs,
  getPlatformStats,
  listJobs,
} from '../controllers/jobController.js'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', listJobs)
router.get('/stats', getPlatformStats)
router.get('/:id', getJobDetail)

router.post('/', requireAuth, requireRole('Employer'), createJob)
router.post('/apply', requireAuth, requireRole('Worker'), applyJob)

router.get('/employer/my-jobs', requireAuth, requireRole('Employer'), getMyJobs)
router.get('/worker/my-applications', requireAuth, requireRole('Worker'), getMyApplications)

export default router
