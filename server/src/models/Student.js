import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    academicYear: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    cgpa: { type: Number, default: 0 },
    attendance: { type: Number, default: 0 },
    requiredCredits: { type: Number, default: 20 },
    earnedCredits: { type: Number, default: 0 },
    status: { type: String, default: 'ACTIVE' },
  },
  { timestamps: true },
);

export default mongoose.model('Student', studentSchema);
