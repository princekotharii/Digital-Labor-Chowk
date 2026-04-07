import mongoose from 'mongoose'

const directoryEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true },
    icon: { type: String, default: '' },
    area: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.DirectoryEntry || mongoose.model('DirectoryEntry', directoryEntrySchema)
