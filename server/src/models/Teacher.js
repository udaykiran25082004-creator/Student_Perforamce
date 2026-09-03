import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, default: 'Lecturer' },
    experienceYears: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Teacher', teacherSchema);
