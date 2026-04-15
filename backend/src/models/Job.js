import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    skill: { type: String, required: true, index: true },
    wagePerDay: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true, index: true },
    city: { type: String, required: true, lowercase: true, trim: true, index: true },
    workType: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'Project'], default: 'Daily' },
    workStartDate: { type: Date, required: true, index: true },
    workEndDate: { type: Date, required: false },
    requiredWorkers: { type: Number, default: 1, min: 1 },
    hiredWorkers: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ['Open', 'InProgress', 'Completed', 'Cancelled'], default: 'Open', index: true },
    employerEmail: { type: String, lowercase: true, trim: true, required: true, index: true },
    employerName: { type: String, required: true, trim: true },
    applicants: [
      {
        workerEmail: { type: String, lowercase: true, trim: true },
        workerName: { type: String, trim: true },
        appliedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['Applied', 'Rejected', 'Selected', 'Completed'], default: 'Applied' },
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.models.Job || mongoose.model('Job', jobSchema)
