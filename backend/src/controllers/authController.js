import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'digital-labor-chowk-secret',
    { expiresIn: '7d' },
  )
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'name, email, password and role are required' })
    }

    const normalizedEmail = String(email).toLowerCase().trim()
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ message: 'Account already exists with this email.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
    })

    const token = signToken(user)
    return res.status(201).json({ user: sanitizeUser(user), token })
  } catch (error) {
    return res.status(500).json({ message: 'Could not register user', error: error.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' })
    }

    const normalizedEmail = String(email).toLowerCase().trim()
    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = signToken(user)
    return res.json({ user: sanitizeUser(user), token })
  } catch (error) {
    return res.status(500).json({ message: 'Could not login user', error: error.message })
  }
}
