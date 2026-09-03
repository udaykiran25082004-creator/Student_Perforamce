import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    durationSemesters: { type: Number, default: 8 },
  },
  { timestamps: true },
);

export default mongoose.model('Course', courseSchema);
