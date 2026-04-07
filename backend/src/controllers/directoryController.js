import DirectoryEntry from '../models/DirectoryEntry.js'

export async function listDirectory(req, res) {
  try {
    const entries = await DirectoryEntry.find().sort({ createdAt: -1 }).lean()
    return res.json({
      entries: entries.map((entry) => ({
        id: entry._id.toString(),
        name: entry.name,
        type: entry.type,
        icon: entry.icon,
        area: entry.area,
        contact: entry.contact,
      })),
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load directory', error: error.message })
  }
}
