import express from 'express';
import { getAllTeacherPositions, createTeacherPosition } from '../controller/teacherPositionController.js';

const router = express.Router();

router.get('/teacher-positions', getAllTeacherPositions);
router.post('/teacher-positions', createTeacherPosition);

export default router;
