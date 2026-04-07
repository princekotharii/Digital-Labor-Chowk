import 'dotenv/config'
import app from './app.js'
import { connectDb } from './config/connectDb.js'
import { seedDatabase } from './config/seedDb.js'

const port = Number(process.env.PORT || 5000)

async function startServer() {
  const dbConnected = await connectDb()
  if (dbConnected) {
    console.log('MongoDB connected')
    await seedDatabase()
  } else {
    console.log('MongoDB not configured. Using in-memory seed data.')
  }

  app.listen(port, () => {
    console.log(`API server running on port ${port}`)
  })
}

startServer()
