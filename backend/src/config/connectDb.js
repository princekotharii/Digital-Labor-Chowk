import mongoose from 'mongoose'

export async function connectDb() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    return false
  }

  try {
    await mongoose.connect(uri)
    return true
  } catch {
    return false
  }
}
