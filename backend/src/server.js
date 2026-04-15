import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import app from './app.js'
import { connectDb } from './config/connectDb.js'
import { seedDatabase } from './config/seedDb.js'

dotenv.config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env'),
})

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
