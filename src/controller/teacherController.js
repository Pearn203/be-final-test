import { v2 as cloudinary } from 'cloudinary';
import User from "../model/userModel.js";
import Teacher from "../model/teacherModel.js";
import TeacherPosition from "../model/teacherPositionModel.js";
import { generateRandomCode } from "../utils/codeGenerator.js";

export const getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const teachers = await Teacher.find()
      .populate("userId", "name email phoneNumber address")
      .populate("teacherPositionsId", "name code")
      .populate("degrees", "type school major year isGraduated")
      .skip(skip)
      .limit(limit);

    const totalTeachers = await Teacher.countDocuments();
    const totalPages = Math.ceil(totalTeachers / limit);

    res.status(200).json({
      teachers: teachers.map((teacher) => ({
        code: teacher.code,
        name: teacher.userId.name,
        email: teacher.userId.email,
        phoneNumber: teacher.userId.phoneNumber,
        isActive: teacher.isActive,
        address: teacher.userId.address,
        teacherPositions: teacher.teacherPositionsId.map((position) => position.name),
        degrees: teacher.degrees.map((degree) => ({
          type: degree.type,
          school: degree.school,
          major: degree.major,
          year: degree.year,
          isGraduated: degree.isGraduated,
        })),
      })),
      currentPage: page,
      totalPages,
      totalTeachers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  const { userId, teacherPositionsId, degrees, name, email, phoneNumber, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingTeacher = await Teacher.findOne({ "userId": userId });
    if (existingTeacher) {
      return res.status(400).json({ message: "Giáo viên đã tồn tại" });
    }

    const teacherPositions = await TeacherPosition.find({
      _id: { $in: teacherPositionsId },
    });

    const code = await generateRandomCode("T", 10);

    const newTeacher = new Teacher({
      code,
      userId,
      teacherPositionsId,
      degrees,
      startDate: new Date(),
      isActive: true,
      isDeleted: false,
    });

    await newTeacher.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
