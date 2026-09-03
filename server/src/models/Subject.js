import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    credits: { type: Number, required: true, min: 1 },
    department: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    semester: { type: Number, required: true },
    isCore: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model('Subject', subjectSchema);
