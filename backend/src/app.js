import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import directoryRoutes from './routes/directoryRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import ratingRoutes from './routes/ratingRoutes.js'
import workerRoutes from './routes/workerRoutes.js'

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  }),
)
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'Digital Labor Chowk API running' })
})

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/directory', directoryRoutes)
app.use('/api/ratings', ratingRoutes)

export default app
