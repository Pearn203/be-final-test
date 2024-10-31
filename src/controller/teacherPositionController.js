import TeacherPosition from "../model/teacherPositionModel.js";
import { generateRandomCode } from "../utils/codeGenerator.js";

export const getAllTeacherPositions = async (req, res) => {
  try {
    const teacherPositions = await TeacherPosition.find();
    res.status(200).json(teacherPositions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacherPosition = async (req, res) => {
  const { name, des, isActive, isDeleted } = req.body;

  try {
    const existingPosition = await TeacherPosition.findOne({ name });
    if (existingPosition) {
      return res.status(400).json({ message: "Vị trí công tác đã tồn tại" });
    }

    const code = await generateRandomCode("TP", 3);

    const newTeacherPosition = new TeacherPosition({
      code,
      name,
      des,
      isActive,
      isDeleted,
    });

    await newTeacherPosition.save();

    res.status(201).json(newTeacherPosition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
