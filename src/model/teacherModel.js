import mongoose from 'mongoose';

const degreeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  school: { type: String, required: true },
  major: { type: String, required: true },
  year: { type: Number, required: true },
  isGraduated: { type: Boolean, required: true },
});

const teacherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition', required: true }],
  degrees: [degreeSchema],
}, {
  timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
