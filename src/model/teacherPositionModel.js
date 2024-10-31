import mongoose from 'mongoose';

const teacherPositionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  des: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true
});

const TeacherPosition = mongoose.model('TeacherPosition', teacherPositionSchema);

export default TeacherPosition;
