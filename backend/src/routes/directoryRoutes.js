import { Router } from 'express'
import { listDirectory } from '../controllers/directoryController.js'

const router = Router()

router.get('/', listDirectory)

export default router
