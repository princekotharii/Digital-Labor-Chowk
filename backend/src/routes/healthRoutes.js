import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ ok: true, service: 'digital-labor-chowk-api' })
})

export default router
