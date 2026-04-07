import bcrypt from 'bcryptjs'
import DirectoryEntry from '../models/DirectoryEntry.js'
import Rating from '../models/Rating.js'
import User from '../models/User.js'
import Worker from '../models/Worker.js'

const seedUsers = [
  { name: 'Worker Demo', email: 'worker@dlc.com', password: '123456', role: 'Worker' },
  { name: 'Employer Demo', email: 'employer@dlc.com', password: '123456', role: 'Employer' },
]

const seedWorkers = [
  { code: 'w1', name: 'राजेश', skill: 'plumber', chowk: 'Ranipur Chowk', distance: 1.2, rating: 4.6, available: true },
  { code: 'w2', name: 'सलीम', skill: 'electrician', chowk: 'BHEL Tiraha', distance: 3.8, rating: 4.4, available: true },
  { code: 'w3', name: 'मुकेश', skill: 'mason', chowk: 'Jwalapur Adda', distance: 5, rating: 4.2, available: true },
  { code: 'w4', name: 'अमित', skill: 'helper', chowk: 'Railway Gate Point', distance: 2.4, rating: 4.1, available: true },
  { code: 'w5', name: 'सुरेश', skill: 'painter', chowk: 'Har Ki Pauri Road', distance: 6.2, rating: 4.8, available: false },
]

const seedDirectory = [
  { name: 'Haridwar Tools Hub', type: 'Hardware Shop', icon: '🏪', area: 'Ranipur More', contact: '+91 98990 11882' },
  { name: 'Shakti Equipment Rental', type: 'Rental Service', icon: '🚜', area: 'Jwalapur', contact: '+91 97555 42010' },
  { name: 'Ganga Paint & Pipe Store', type: 'Hardware Shop', icon: '🛒', area: 'BHEL Sector 2', contact: '+91 98100 11029' },
]

const seedRatings = [
  { workerCode: 'w1', punctuality: 5, skillQuality: 4, paymentBehavior: 5, mutualRespect: 5 },
  { workerCode: 'w2', punctuality: 4, skillQuality: 4, paymentBehavior: 4, mutualRespect: 5 },
  { workerCode: 'w3', punctuality: 4, skillQuality: 5, paymentBehavior: 4, mutualRespect: 4 },
]

export async function seedDatabase() {
  const [userCount, workerCount, directoryCount, ratingCount] = await Promise.all([
    User.countDocuments(),
    Worker.countDocuments(),
    DirectoryEntry.countDocuments(),
    Rating.countDocuments(),
  ])

  if (!userCount) {
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    )
    await User.insertMany(hashedUsers)
  }

  if (!workerCount) {
    await Worker.insertMany(seedWorkers)
  }

  if (!directoryCount) {
    await DirectoryEntry.insertMany(seedDirectory)
  }

  if (!ratingCount) {
    await Rating.insertMany(seedRatings)
  }
}
